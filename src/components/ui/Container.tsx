import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/** Max-width content wrapper with consistent horizontal padding. */
export function Container({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}
      {...props}
    />
  );
}