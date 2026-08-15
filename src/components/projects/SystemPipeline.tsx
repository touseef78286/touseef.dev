"use client";

/**
 * Interactive pipeline visualizer for case studies. Shows how a request
 * flows through the system: stage cards + animated connectors + an optional
 * "simulate run" that lights stages in sequence. Fully keyboard operable.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import type { PipelineStage } from "@/content/projects";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/ui/Chip";

const CONNECTOR_VERB: Record<PipelineStage["kind"], string> = {
  input: "intake",
  planner: "plans",
  agent: "acts",
  tool: "executes",
  model: "synthesizes",
  gate: "validates",
  output: "returns",
};

const KIND_TONE: Record<
  PipelineStage["kind"],
  "default" | "accent" | "violet" | "muted"
> = {
  input: "muted",
  planner: "accent",
  agent: "violet",
  tool: "default",
  model: "violet",
  gate: "default",
  output: "accent",
};

function StageCard({
  stage,
  index,
  expanded,
  onToggle,
  active,
}: {
  stage: PipelineStage;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "card relative overflow-hidden transition-all duration-300",
        active && "border-accent/40 bg-surface-2",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center gap-4 px-4 py-3.5 text-left"
      >
        <span
          aria-hidden
          className={cn(
            "grid h-8 w-8 shrink-0 place-items-center rounded-md border font-mono text-[11px] transition-colors",
            active
              ? "border-accent/50 bg-accent/15 text-accent"
              : "border-line bg-surface-2 text-mute",
          )}
        >
          {String(index).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-mono text-[13.5px] font-medium text-foreground">
            {stage.label}
          </span>
          <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-mute">
            {stage.kind}
          </span>
        </span>
        <Chip tone={active ? "accent" : KIND_TONE[stage.kind]}>
          {active ? "running" : CONNECTOR_VERB[stage.kind]}
        </Chip>
      </button>
      {expanded || active ? (
        <div className="border-t border-line-soft px-4 py-3 pl-[4.5rem]">
          <p className="text-pretty text-sm leading-relaxed text-dim">
            {stage.detail}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function Connector({ active }: { active: boolean }) {
  return (
    <div aria-hidden className="relative mx-auto h-9 w-px overflow-visible">
      <span className="absolute inset-x-0 top-0 h-full bg-line" />
      {active ? (
        <span className="flow-dot absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent" />
      ) : null}
    </div>
  );
}

export function SystemPipeline({
  stages,
  note,
}: {
  stages: PipelineStage[];
  note: string;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [running, setRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const timers = useRef<number[]>([]);

  const toggle = useCallback((id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = useCallback(() => {
    if (running) {
      setRunning(false);
      setActiveStep(-1);
      timers.current.forEach(clearTimeout);
      timers.current = [];
      return;
    }
    setRunning(true);
    setActiveStep(0);
    stages.slice(1).forEach((_, i) => {
      const id = window.setTimeout(() => setActiveStep(i + 1), 850 * (i + 1));
      timers.current.push(id);
    });
    const end = window.setTimeout(() => {
      setActiveStep(-1);
      setRunning(false);
    }, 850 * stages.length + 500);
    timers.current.push(end);
  }, [running, stages]);

  return (
    <div className="card flex h-full flex-col p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            architecture · flow
          </p>
          <p className="mt-1.5 text-pretty text-[13px] leading-relaxed text-dim">
            {note}
          </p>
        </div>
        <button
          type="button"
          onClick={run}
          className={cn(
            "inline-flex items-center gap-2 whitespace-nowrap rounded-lg border px-3.5 py-2 font-mono text-[12px] transition-colors",
            running
              ? "border-warn/40 bg-warn/10 text-warn"
              : "border-accent/35 bg-accent/10 text-accent hover:bg-accent/15",
          )}
        >
          <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", running ? "bg-warn animate-pulse" : "bg-ok")} />
          {running ? "Stop run" : "Simulate run"}
        </button>
      </div>

      <ol className="flex flex-1 flex-col">
        {stages.map((stage, i) => (
          <li key={stage.id} className="contents">
            {i > 0 ? <Connector active={i === activeStep} /> : null}
            <StageCard
              stage={stage}
              index={i + 1}
              expanded={!!expanded[stage.id]}
              onToggle={() => toggle(stage.id)}
              active={i === activeStep}
            />
          </li>
        ))}
      </ol>

      <p className="mt-4 font-mono text-[11px] leading-relaxed text-mute">
        {running ? "▌ simulating request in flight…" : "tap a stage to inspect · run simulates the flow"}
        <span aria-hidden> {stages.length} nodes</span>
      </p>
    </div>
  );
}