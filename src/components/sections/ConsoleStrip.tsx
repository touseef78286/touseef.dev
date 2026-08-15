"use client";

/**
 * Decorative console strip. Types boot/intro lines once, pauses when
 * off-screen, and renders fully statically under prefers-reduced-motion.
 */
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

const LINES = [
  { text: "boot agent_runtime", tone: "dim" },
  { text: "load toolkit: agents · automation · systems", tone: "dim" },
  { text: "spawn orchestrator", tone: "dim" },
  { text: "status: ready to build", tone: "accent" },
] as const;

const TYPE_MS = 22;
const PAUSE_BETWEEN_MS = 320;

export function ConsoleStrip({ className }: { className?: string }) {
  const reduceMotion = usePrefersReducedMotion();
  const [visibleChars, setVisibleChars] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    if (rootRef.current) io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  // Every state transition is scheduled through a timeout (never synchronous
  // within the effect body) so reduced-motion users get a static panel.
  useEffect(() => {
    if (reduceMotion || finished || !inView) return;
    const line = LINES[lineIndex].text;
    if (visibleChars < line.length) {
      const t = setTimeout(() => setVisibleChars((c) => c + 1), TYPE_MS);
      return () => clearTimeout(t);
    }
    if (lineIndex < LINES.length - 1) {
      const t = setTimeout(
        () => {
          setLineIndex((i) => i + 1);
          setVisibleChars(0);
        },
        PAUSE_BETWEEN_MS,
      );
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setFinished(true), 500);
    return () => clearTimeout(t);
  }, [visibleChars, lineIndex, finished, inView, reduceMotion]);

  const complete = reduceMotion || finished;
  const current = LINES[lineIndex];
  const typed = complete ? current.text : current.text.slice(0, visibleChars);

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="Demo console output: agent runtime booted, ready to build"
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-[#05080d] font-mono text-[12.5px] leading-relaxed shadow-card",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line-soft px-4 py-2.5">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-danger/70" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-warn/70" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ok/70" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
          agent_console
        </span>
      </div>
      <div className="space-y-1 px-4 py-4">
        {LINES.slice(0, complete ? LINES.length : lineIndex + 1).map(
          (line, i) => {
            const isActive = i === lineIndex && !complete;
            return (
              <p
                key={i}
                className={cn(
                  "truncate",
                  line.tone === "accent" ? "text-accent" : "text-dim",
                )}
              >
                <span className="text-mute">$ </span>
                {isActive ? (
                  <>
                    {typed}
                    {inView ? (
                      <span className="caret-blink text-accent">▌</span>
                    ) : null}
                  </>
                ) : (
                  line.text
                )}
              </p>
            );
          },
        )}
      </div>
    </div>
  );
}