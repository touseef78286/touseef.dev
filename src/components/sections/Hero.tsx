"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { ConsoleStrip } from "@/components/sections/ConsoleStrip";

const GraphCanvas = dynamic(
  () => import("@/components/three/GraphCanvas").then((m) => m.GraphCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full min-h-64 w-full place-items-center">
        <div className="h-40 w-40 rounded-full border border-line bg-surface/60" />
      </div>
    ),
  },
);

export function Hero() {
  const tagline = siteConfig.tagline;
  const words = tagline.split(" ");
  const punch = words.slice(-3).join(" ");
  const rest = words.slice(0, -3).join(" ");

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Backdrop layers */}
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute right-0 top-1/3 h-72 w-72 translate-x-1/3 rounded-full bg-accent-2/10 blur-[110px]"
      />

      <Container className="relative pt-28 pb-14 sm:pt-36 sm:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Identity */}
          <div>
            <motion.p
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-dim"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-ok" />
              {siteConfig.availability.label}
              <span className="text-mute">·</span>
              <span className="text-accent">{siteConfig.located}</span>
            </motion.p>

            <h1 className="text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-[4.2rem]">
              {rest}{" "}
              <span className="text-accent">{punch}</span>
            </h1>

            <motion.p
              className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-dim sm:text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              {siteConfig.summary} Every system here is built to be observed,
              measured, and pushed further — never shipped and forgotten.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
            >
              <a
                href="#systems"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-mono text-sm font-medium text-[#03201b] shadow-[0_0_0_1px_rgba(94,234,212,0.35),0_8px_24px_-8px_rgba(94,234,212,0.4)] transition-colors hover:bg-accent/90"
              >
                View the systems
                <span aria-hidden>→</span>
              </a>
              <a
                href="#approach"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-3 font-mono text-sm font-medium text-dim transition-colors hover:border-accent/40 hover:text-foreground"
              >
                Read the approach
              </a>
            </motion.div>

            <motion.ul
              className="mt-10 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              aria-label="Focus areas"
            >
              {siteConfig.focus.map((f) => (
                <li key={f}>
                  <Chip tone={f === "AI Agents" || f === "AI Automation" ? "accent" : "default"}>
                    {f}
                  </Chip>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Visual */}
          <motion.div
            className="relative mx-auto w-full max-w-md lg:max-w-none"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative aspect-square">
              <GraphCanvas className="absolute inset-0" />
              <div
                aria-hidden
                className="absolute inset-0 flex items-end justify-center pb-3"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute">
                  agent_network · core
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Console */}
        <motion.div
          className="mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34 }}
        >
          <ConsoleStrip />
        </motion.div>
      </Container>
    </section>
  );
}