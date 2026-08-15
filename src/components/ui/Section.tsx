import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Props = ComponentProps<"section"> & {
  id?: string;
};

export function Section({ id, className, ...props }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className={cn("relative", className)}
      {...props}
    />
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  align = "start",
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "start" | "center";
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 sm:mb-14",
        align === "center" && "items-center text-center",
      )}
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
        <span className="text-mute">[</span> {eyebrow}{" "}
        <span className="text-mute">]</span>
      </p>
      <h2
        id={id ? `${id}-heading` : undefined}
        className="max-w-2xl text-balance text-3xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-dim sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}