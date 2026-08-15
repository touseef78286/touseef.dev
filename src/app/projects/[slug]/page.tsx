import Link from "next/link";
import { notFound } from "next/navigation";
import {
  generateProjectMetadata,
  getProject,
  projects,
  type Challenge,
} from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { SystemPipeline } from "@/components/projects/SystemPipeline";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { IconArrowUpRight } from "@/components/ui/icons";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return generateProjectMetadata(slug);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <main className="pt-16">
      <article>
        {/* Hero */}
        <header className="relative overflow-hidden border-b border-line-soft">
          <div
            aria-hidden
            className={
              project.accent === "teal"
                ? "bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]"
                : "bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]"
            }
          />
          <Container className="relative py-16 sm:py-24">
            <Reveal>
              <Link
                href="/#systems"
                className="mb-8 inline-flex items-center gap-2 font-mono text-[13px] text-dim transition-colors hover:text-accent"
              >
                <span aria-hidden>←</span> all systems
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone="accent">
                  sys/{project.index} · {project.category}
                </Chip>
                <Chip
                  tone={
                    project.status === "live"
                      ? "accent"
                      : project.status === "in-development"
                        ? "default"
                        : "violet"
                  }
                >
                  {project.statusLabel}
                </Chip>
                <Chip tone="muted">{project.year}</Chip>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-dim">
                {project.oneLiner}
              </p>
            </Reveal>
          </Container>
        </header>

        {/* Problem & why it matters */}
        <Container className="py-14 sm:py-20">
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
            <Reveal className="h-full">
              <div className="card flex h-full flex-col gap-3 p-6 sm:p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                  {"// problem"}
                </p>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  What I was trying to solve
                </h2>
                <p className="text-pretty text-sm leading-relaxed text-dim">
                  {project.problem}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.06} className="h-full">
              <div className="card flex h-full flex-col gap-3 p-6 sm:p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                  {"// why it matters"}
                </p>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Why I cared about it
                </h2>
                <p className="text-pretty text-sm leading-relaxed text-dim">
                  {project.whyMatters}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Architecture */}
          <div className="mt-16 sm:mt-20">
            <Reveal>
              <div className="mb-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  [ architecture ]
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  How the system is put together
                </h2>
              </div>
            </Reveal>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Reveal className="h-full">
                <SystemPipeline stages={project.pipeline.stages} note={project.pipeline.note} />
              </Reveal>
              <Reveal delay={0.08} className="h-full">
                <div className="card flex h-full flex-col p-6 sm:p-7">
                  <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                    stack
                  </p>
                  <dl className="space-y-5">
                    {project.stack.map((area) => (
                      <div key={area.area}>
                        <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
                          {area.area}
                        </dt>
                        <dd className="mt-2 flex flex-wrap gap-2">
                          {area.items.map((item) => (
                            <Chip key={item}>{item}</Chip>
                          ))}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {project.links.some((l) => l.kind !== "docs") ? (
                    <div className="mt-6 flex flex-wrap gap-2 border-t border-line-soft pt-5">
                      {project.links
                        .filter((l) => l.kind !== "docs")
                        .map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-3.5 py-2 font-mono text-[12px] text-accent transition-colors hover:bg-accent/15"
                          >
                            {link.label}
                            <IconArrowUpRight className="h-3 w-3" />
                          </a>
                        ))}
                    </div>
                  ) : null}
                </div>
              </Reveal>
            </div>
          </div>

          {/* Implementation */}
          {project.implementation.length > 0 ? (
            <div className="mt-16 sm:mt-20">
              <Reveal>
                <div className="mb-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    [ implementation ]
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    Decisions that mattered
                  </h2>
                </div>
              </Reveal>
              <Reveal>
                <ul className="space-y-3">
                  {project.implementation.map((point) => (
                    <li
                      key={point}
                      className="card flex items-baseline gap-4 p-5"
                    >
                      <span aria-hidden className="font-mono text-sm text-accent">
                        ▸
                      </span>
                      <p className="text-pretty text-[15px] leading-relaxed text-dim">
                        {point}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ) : null}

          {/* Challenges */}
          {project.challenges.length > 0 ? (
            <div className="mt-16 sm:mt-20">
              <Reveal>
                <div className="mb-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    [ challenges ]
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    Where it fought back
                  </h2>
                </div>
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
                {project.challenges.map((c: Challenge, i) => (
                  <Reveal key={c.problem} index={i} className="h-full">
                    <div className="card flex h-full flex-col gap-3 p-6">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
                        <span className="text-danger">! </span>problem
                      </p>
                      <p className="text-pretty text-sm leading-relaxed text-dim">
                        {c.problem}
                      </p>
                      <p className="mt-auto border-t border-line-soft pt-3 text-pretty text-sm leading-relaxed text-foreground">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ok">
                          → resolution{" "}
                        </span>
                        {c.solution}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null}

          {/* Results + lessons */}
          {project.results && project.results.length > 0 ? (
            <div className="mt-16 sm:mt-20">
              <Reveal>
                <div className="mb-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    [ results ]
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    What it shipped
                  </h2>
                </div>
              </Reveal>
              <Reveal>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {project.results.map((r) => (
                    <li key={r} className="card flex items-baseline gap-3 p-5">
                      <span aria-hidden className="text-ok">●</span>
                      <p className="text-pretty text-sm leading-relaxed text-dim">
                        {r}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ) : null}

          {project.lessons && project.lessons.length > 0 ? (
            <div className="mt-16 sm:mt-20">
              <Reveal>
                <div className="mb-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    [ lessons ]
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    What I took with me
                  </h2>
                </div>
              </Reveal>
              <Reveal>
                <ol className="space-y-3">
                  {project.lessons.map((lesson, i) => (
                    <li
                      key={lesson}
                      className="card flex items-baseline gap-4 p-5"
                    >
                      <span
                        aria-hidden
                        className="font-mono text-sm text-accent-2"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-pretty text-[15px] leading-relaxed text-dim">
                        {lesson}
                      </p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          ) : null}
        </Container>
      </article>

      {/* Related */}
      {related.length > 0 ? (
        <section className="border-t border-line-soft py-16 sm:py-20">
          <Container>
            <Reveal>
              <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                [ more systems ]
              </p>
            </Reveal>
            <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
              {related.map((p, i) => (
                <Reveal key={p.slug} index={i} className="h-full">
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}