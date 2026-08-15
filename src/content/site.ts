/**
 * ============================================================================
 * SITE IDENTITY — SINGLE SOURCE OF TRUTH FOR PERSONAL FACTS
 * ============================================================================
 * All personal facts live here. Edit this file to update the whole site.
 * No fabricated metrics, companies, or claims are used anywhere.
 * ============================================================================
 */

export type SiteConfig = {
  handle: string;
  name: string;
  role: string;
  tagline: string;
  summary: string;
  located: string;
  focus: string[];
  availability: {
    status: "available" | "unavailable";
    label: string;
  };
  links: {
    github?: string;
    linkedin?: string;
    x?: string;
    email: string;
    domain: string;
  };
  curatedFacts: {
    label: string;
    value: string;
  }[];
};

export const siteConfig: SiteConfig = {
  handle: "touseef",
  name: "Touseef Panjtan",
  role: "Software Engineer · AI Systems Builder",
  tagline: "I engineer AI systems that think, act, and automate.",
  summary:
    "I build AI agents, automation systems, and intelligent infrastructure — treating every product as a system to be architected, measured, and refined.",
  located: "Islamabad",
  focus: [
    "AI Agents",
    "Multi-Agent Systems",
    "AI Automation",
    "LLM Applications",
    "Full-Stack Software",
    "Developer Tooling",
  ],
  availability: {
    status: "available",
    label: "available for new projects",
  },
  links: {
    github: "https://github.com/touseef78286",
    linkedin: "https://www.linkedin.com/in/touseef-panjtan-162a04375",
    email: "Touseefpanjtan52@gmail.com",
    // Edit if the site is deployed on a custom domain.
    domain: "touseef.dev",
  },
  curatedFacts: [
    { label: "Focus", value: "AI · Automation · Systems" },
    { label: "Mode", value: "Builder / Generalist" },
    { label: "Located", value: "Islamabad" },
  ],
};