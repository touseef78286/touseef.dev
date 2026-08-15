import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Props = ComponentProps<"span"> & {
  tone?: "default" | "accent" | "violet" | "muted";
};

export function Chip({ tone = "default", className, ...props }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none tracking-wide",
        tone === "default" && "border-line bg-surface text-dim",
        tone === "accent" &&
          "border-accent/30 bg-accent/10 text-accent",
        tone === "violet" &&
          "border-accent-2/30 bg-accent-2/10 text-accent-2",
        tone === "muted" && "border-line-soft text-mute",
        className,
      )}
      {...props}
    />
  );
}