"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** stagger index convenience */
  index?: number;
  duration?: number;
};

/** Scroll-reveal wrapper. Respects prefers-reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  index = 0,
  duration = 0.7,
}: Props) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: (delay + index * 0.07) % 0.7, duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}