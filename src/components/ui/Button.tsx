import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

const styles = {
  base: "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-mono text-sm font-medium tracking-tight transition-colors duration-200",
  primary:
    "bg-accent text-[#03201b] hover:bg-accent/90 shadow-[0_0_0_1px_rgba(94,234,212,0.35),0_8px_24px_-8px_rgba(94,234,212,0.4)]",
  ghost:
    "border border-line bg-surface text-dim hover:border-accent/40 hover:text-foreground",
  plain: "text-dim hover:text-accent",
} as const;

type Variant = keyof typeof styles;

type BaseProps = { variant?: Variant; className?: string };
type AnchorProps = BaseProps & ComponentPropsWithoutRef<"a"> & { href: string };
type NativeButtonProps = BaseProps & ComponentPropsWithoutRef<"button">;

export function Button(props: AnchorProps | NativeButtonProps) {
  const { variant = "primary", className, ...rest } = props;
  const classes = cn(styles.base, styles[variant], className);

  if ("href" in rest) {
    return <a className={classes} {...(rest as AnchorProps)} />;
  }
  return <button className={classes} {...(rest as NativeButtonProps)} />;
}