import { Section, SectionHeader } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconCube, IconLayers, IconSpark, IconTerminal } from "@/components/ui/icons";

const PRINCIPLES = [
  {
    icon: IconLayers,
    title: "Systems before demos",
    body: "Architecture first. A feature that survives contact with real data is worth ten that demo clean. I design for failure cases, cost, and observability from day one.",
    tag: "arch → build → ship → iterate",
  },
  {
    icon: IconSpark,
    title: "Agents with guardrails",
    body: "Planners delegate, supervisors monitor, validators check, humans approve. Trust is engineered in — never assumed from a clever prompt.",
    tag: "planner · supervisor · validator · human-gate",
  },
  {
    icon: IconTerminal,
    title: "Automation that compounds",
    body: "Automate the repeatable so humans spend time on judgment. Every automation is built to be measured, tuned, and safely overridden.",
    tag: "measure → tune → scale",
  },
  {
    icon: IconCube,
    title: "Observability by default",
    body: "If it can't be traced, it can't be trusted. Steps, costs, and decisions are recorded so every run is auditable and every failure is diagnosable.",
    tag: "trace · ledger · audit",
  },
];

export function Approach() {
  return (
    <Section id="approach" className="border-t border-line-soft py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            id="approach"
            eyebrow="approach"
            title="Demos impress. Systems deliver."
            description="A short manifesto for how I build software — especially software that uses AI."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} index={i} className="h-full">
              <div className="card flex h-full flex-col gap-4 p-6 transition-colors duration-300 hover:border-accent/25 sm:p-7">
                <div className="flex items-center justify-between">
                  <p.icon className="h-6 w-6 text-accent" aria-hidden />
                  <span className="font-mono text-[11px] tracking-[0.2em] text-mute">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="text-pretty text-sm leading-relaxed text-dim">
                  {p.body}
                </p>
                <p className="mt-auto pt-2 font-mono text-[11px] tracking-wide text-mute">
                  {p.tag}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}