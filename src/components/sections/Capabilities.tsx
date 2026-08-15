import { Section, SectionHeader } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  IconCode,
  IconCpu,
  IconDatabase,
  IconFlow,
  IconLayers,
  IconSpark,
  IconTerminal,
} from "@/components/ui/icons";

const CAPABILITIES = [
  {
    icon: IconSpark,
    title: "AI Agents & Orchestration",
    body: "Planning, tool use, supervisor loops, and token budgets — agents designed as systems with clear roles.",
    tags: ["planner", "tool-use", "budgets"],
  },
  {
    icon: IconLayers,
    title: "Multi-Agent Systems",
    body: "Delegation graphs that split work across specialist agents, with supervision and re-planning on failure.",
    tags: ["delegation", "workers", "re-plan"],
  },
  {
    icon: IconFlow,
    title: "Workflow Automation",
    body: "Pipelines, schedulers, approval queues, and integrations that move work end-to-end without busywork.",
    tags: ["pipelines", "queues", "integrations"],
  },
  {
    icon: IconCpu,
    title: "LLM Applications",
    body: "Retrieval, structured outputs, and eval-driven prompting so model behavior is measured, not hoped.",
    tags: ["retrieval", "structured-out", "evals"],
  },
  {
    icon: IconTerminal,
    title: "Developer Tooling",
    body: "CLIs, terminal-first tools, and DX abstractions that keep builders in the loop and out of tab-hoarding.",
    tags: ["cli", "tui", "dx"],
  },
  {
    icon: IconDatabase,
    title: "Data & Research Systems",
    body: "Continuous pipelines that ingest, triage, and structure information into verifiable, citable output.",
    tags: ["intake", "dedup", "citation"],
  },
  {
    icon: IconCode,
    title: "Full-Stack Engineering",
    body: "Typed backends, pragmatic frontends, and clean APIs — the boring-but-critical glue around the intelligence.",
    tags: ["typescript", "api", "web"],
  },
  {
    icon: IconCpu,
    title: "AI Architecture & Safety",
    body: "Guardrails, human-in-the-loop gates, and cost/observability ledgers built into the architecture from the start.",
    tags: ["guardrails", "h-gate", "observability"],
  },
];

export function Capabilities() {
  return (
    <Section id="capabilities" className="border-t border-line-soft py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            id="capabilities"
            eyebrow="capabilities"
            title="Where I do the work"
            description="Capabilities I bring to a product or system — spanning the intelligence, the automation, and the engineering that holds it together."
          />
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} index={i % 4} className="h-full">
              <div className="flex h-full flex-col gap-3.5 bg-surface p-6 transition-colors duration-300 hover:bg-surface-2">
                <c.icon className="h-5 w-5 text-accent" aria-hidden />
                <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                  {c.title}
                </h3>
                <p className="text-pretty text-[13px] leading-relaxed text-dim">
                  {c.body}
                </p>
                <p className="mt-auto flex flex-wrap gap-1.5 pt-2 font-mono text-[10.5px] text-mute">
                  {c.tags.map((t) => (
                    <span key={t} className="rounded bg-surface-2 px-1.5 py-0.5">
                      {t}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}