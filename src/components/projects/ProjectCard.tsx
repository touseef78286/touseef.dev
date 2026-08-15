import Link from "next/link";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/ui/Chip";
import { IconArrowUpRight } from "@/components/ui/icons";

export function ProjectCard({ project }: { project: Project }) {
  const isTeal = project.accent === "teal";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card group relative flex flex-col gap-5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-card sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "font-mono text-[11px] uppercase tracking-[0.2em]",
            isTeal ? "text-accent" : "text-accent-2",
          )}
        >
          sys/{project.index} · {project.category}
        </span>
        <IconArrowUpRight
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            isTeal ? "text-accent" : "text-accent-2",
          )}
        />
      </div>

      <div>
        <h3 className="text-balance text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-dim">
          {project.oneLiner}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2">
        <Chip tone={project.status === "live" ? "accent" : "violet"}>
          {project.statusLabel}
        </Chip>
        <Chip tone="muted">{project.year}</Chip>
        {project.stack.slice(0, 2).flatMap((s) => s.items).slice(0, 2).map((t) => (
          <Chip key={t} tone="muted">
            {t}
          </Chip>
        ))}
      </div>

      <span className="mt-2 flex items-center gap-2 font-mono text-[13px] text-accent">
        Read the case study <span aria-hidden>→</span>
      </span>
    </Link>
  );
}