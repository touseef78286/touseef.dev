"use client";

/**
 * Generative node-sphere for the hero — a "graph core" representing an
 * engineer of connected systems. Purposeful, GPU-cheap (points + line
 * segments only), and gated off under prefers-reduced-motion or on weak
 * devices, where a static SVG fallback renders instead.
 */

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = new THREE.Color("#5eead4");
const ACCENT_2 = new THREE.Color("#a78bfa");

/** Deterministic PRNG so the same layout renders every visit. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGraph() {
  const rand = mulberry32(42);
  const COUNT = 720;
  const RADIUS = 2.1;
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const jitter = (rand() - 0.5) * 0.24;

    const r = RADIUS * (1 + jitter);
    const x = r * radiusAtY * Math.cos(theta);
    const z = r * radiusAtY * Math.sin(theta);
    const yPos = r * y;

    positions[i * 3] = x;
    positions[i * 3 + 1] = yPos;
    positions[i * 3 + 2] = z;

    const t = (y + 1) / 2;
    const col = ACCENT.clone().lerp(ACCENT_2, t);
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;

    points.push(new THREE.Vector3(x, yPos, z));
  }

  // Wire up each point to its two nearest neighbours.
  const segments: number[] = [];
  const seen = new Set<string>();
  const MAX_DIST = 0.65;

  for (let i = 0; i < points.length; i++) {
    const nearest: Array<{ j: number; d: number }> = [];
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      const d = points[i].distanceToSquared(points[j]);
      if (nearest.length < 2) {
        nearest.push({ j, d });
        nearest.sort((a, b) => a.d - b.d);
      } else if (d < nearest[1].d) {
        nearest[1] = { j, d };
        nearest.sort((a, b) => a.d - b.d);
      }
    }
    for (const { j, d } of nearest) {
      if (d > MAX_DIST * MAX_DIST) continue;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      segments.push(points[i].x, points[i].y, points[i].z);
      segments.push(points[j].x, points[j].y, points[j].z);
    }
  }

  return { positions, colors, segments };
}

function GraphCore() {
  // Outer group handles the slow auto-rotation, inner group the pointer
  // parallax — child layers of a `pending` smoothing target (see below).
  const spin = useRef<THREE.Group>(null);
  const parallax = useRef<THREE.Group>(null);
  const geom = useMemo(() => {
    const { positions, colors, segments } = buildGraph();

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(segments), 3),
    );
    return { pointsGeo, linesGeo };
  }, []);

  useFrame((state, delta) => {
    const s = spin.current;
    const p = parallax.current;
    if (!s || !p) return;

    // Constant slow rotation of the whole graph.
    s.rotation.y += delta * 0.07;
    s.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.12;

    // Pointer parallax with frame-rate independent smoothing. This scene only
    // mounts on pointer-capable devices (gated in <HeroScene>), so state.pointer
    // is meaningful.
    const amount = 1 - Math.pow(0.001, delta);
    const dx = state.pointer.x * 0.3 - p.rotation.y;
    const dy = -state.pointer.y * 0.18 - p.rotation.x;
    p.rotation.y += dx * amount;
    p.rotation.x += dy * amount;
  });

  return (
    <group ref={spin} position={[0, 0, 0]}>
      <group ref={parallax}>
        <points geometry={geom.pointsGeo}>
          <pointsMaterial
            size={0.035}
            vertexColors
            transparent
            opacity={0.95}
            sizeAttenuation
            depthWrite={false}
          />
        </points>
        <lineSegments geometry={geom.linesGeo}>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={0.16}
            depthWrite={false}
          />
        </lineSegments>
      </group>
    </group>
  );
}

/** Static, dependency-free fallback (also used under reduced motion). */
export function StaticNodeSphere({ className }: { className?: string }) {
  const nodes = useMemo(() => {
    const rand = mulberry32(7);
    const arr: { x: number; y: number; r: number; v: boolean }[] = [];
    for (let i = 0; i < 34; i++) {
      const ang = (i / 34) * Math.PI * 2 + rand() * 0.1;
      const rad = 70 + rand() * 26;
      arr.push({
        x: 120 + Math.cos(ang) * rad,
        y: 120 + Math.sin(ang) * rad,
        r: 1.6 + rand() * 2.4,
        v: rand() > 0.5,
      });
    }
    return arr;
  }, []);

  return (
    <svg
      viewBox="0 0 240 240"
      width="100%"
      height="100%"
      aria-hidden
      role="presentation"
      className={className}
    >
      <defs>
        <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5eead4" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="120" cy="120" r="118" fill="url(#core-glow)" />
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={n.v ? "#5eead4" : "#a78bfa"}
          opacity={0.85}
        />
      ))}
      <circle
        cx="120"
        cy="120"
        r="110"
        fill="none"
        stroke="#5eead4"
        strokeOpacity="0.12"
        strokeWidth="1"
        strokeDasharray="2 6"
      />
    </svg>
  );
}

export function HeroScene({ frameloop }: { frameloop?: "always" | "never" }) {
  return (
    <Canvas
      aria-hidden
      role="presentation"
      frameloop={frameloop ?? "always"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <GraphCore />
    </Canvas>
  );
}