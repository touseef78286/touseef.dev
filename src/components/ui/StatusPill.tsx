import { cn } from "@/lib/utils";

export function StatusPill({
  status,
  className,
}: {
  status: "ok" | "warn" | "info" | "muted";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider",
        status === "ok" && "border-ok/25 bg-ok/10 text-ok",
        status === "warn" && "border-warn/25 bg-warn/10 text-warn",
        status === "info" && "border-accent/25 bg-accent/10 text-accent",
        status === "muted" && "border-line text-mute",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "ok" && "bg-ok pulse-dot",
          status === "warn" && "bg-warn",
          status === "info" && "bg-accent pulse-dot",
          status === "muted" && "bg-mute",
        )}
      />
      {status === "ok" ? "Operational" : null}
      {status === "warn" ? "Attention required" : null}
      {status === "info" ? "In development" : null}
    </span>
  );
}