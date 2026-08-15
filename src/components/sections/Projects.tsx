import { featuredProjects } from "@/content/projects";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function Projects() {
  return (
    <Section id="systems" className="border-t border-line-soft py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            id="systems"
            eyebrow="systems"
            title="Built systems, told as case studies"
            description="Each project is treated like a product: a real problem, a deliberate architecture, and the decisions that made it work. Deep-dives live on their own pages."
          />
        </Reveal>

        {/* Statistics strip — factual structural figures only */}
        <Reveal delay={0.05}>
          <dl className="mb-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:mb-14 lg:grid-cols-4">
            {[
              { k: "Projects", v: String(featuredProjects.length) },
              { k: "Pipeline stages", v: "8 max" },
              { k: "Agents aware", v: "In every build" },
              { k: "Gate", v: "Human approval" },
            ].map((s) => (
              <div key={s.k} className="bg-surface px-5 py-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                  {s.k}
                </dt>
                <dd className="mt-1 font-mono text-sm text-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} index={i} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}