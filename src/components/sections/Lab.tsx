import { Section, SectionHeader } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const NOTES = [
  "The planner is the highest-leverage component in any agent system.",
  "Automation that edits out the human is automation that loses trust.",
  "If it can't be traced, it can't be trusted.",
  "Information systems should end in verifiable decisions — not feeds.",
  "Good tooling is mostly editing friction out until the loop feels instant.",
  "A demo proves a model. A system proves an engineer.",
];

const EXPLORING = [
  "Agent evaluation harnesses",
  "Self-correcting pipelines",
  "Terminal-first research tooling",
  "Human-in-the-loop UX for agents",
];

export function Lab() {
  return (
    <Section id="lab" className="border-t border-line-soft py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            id="lab"
            eyebrow="lab"
            title="Notes from the lab"
            description="Working principles I've earned by breaking things — and a few experiments currently on the bench."
          />
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
          <Reveal className="h-full">
            <div className="card flex h-full flex-col p-6 sm:p-7">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                lessons.log
              </p>
              <ul className="space-y-4">
                {NOTES.map((note, i) => (
                  <li key={note} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-0.5 font-mono text-sm text-accent"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-pretty text-[15px] leading-relaxed text-dim">
                      {note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <div className="card flex h-full flex-col gap-4 p-6 sm:p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                on_the_bench
              </p>
              <ul className="space-y-3">
                {EXPLORING.map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between rounded-lg border border-line-soft bg-surface-2 px-4 py-3"
                  >
                    <span className="font-mono text-[13px] text-foreground">
                      {item}
                    </span>
                    <span aria-hidden className="text-accent">
                      ◈
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-2 font-mono text-[11px] leading-relaxed text-mute">
                {`// bench_revision: continuous · ownership: human_editor`}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}