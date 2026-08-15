"use client";

/**
 * Gates the heavy WebGL scene:
 *  - skipped under prefers-reduced-motion or on weak devices,
 *  - paused when scrolled out of view or page hidden,
 *  - renders a cheap static SVG ellipse in all fallback cases.
 */
import { useEffect, useState } from "react";
import { HeroScene, StaticNodeSphere } from "./GraphCore";
import { useCapableDevice } from "@/lib/hooks";

export function GraphCanvas({ className }: { className?: string }) {
  const capable = useCapableDevice();
  const [inView, setInView] = useState(true);
  const [paused, setPaused] = useState(false);

  // Pause the render loop when the canvas leaves the viewport.
  useEffect(() => {
    if (!capable) return;
    const el = document.querySelector("[data-hero-canvas]");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [capable]);

  useEffect(() => {
    if (!capable) return;
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [capable]);

  const render3D = capable && inView && !paused;

  return (
    <div
      data-hero-canvas
      className={className}
      aria-hidden
      role="presentation"
    >
      {capable ? (
        <HeroScene frameloop={render3D ? "always" : "never"} />
      ) : (
        <StaticNodeSphere className="opacity-90" />
      )}
    </div>
  );
}