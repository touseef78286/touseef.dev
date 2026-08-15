import type { Metadata } from "next";

/**
 * ============================================================================
 * PROJECTS — TECH CASE STUDIES
 * ============================================================================
 * Content integrity rules (ADR-003):
 *   - No fabricated metrics, users, revenue, or production claims.
 *   - Replace any `[project …]` placeholders with real, verifiable facts.
 * Fields left qualitative are intentionally safe.
 */

export type PipelineStage = {
  id: string;
  label: string;
  detail: string;
  kind:
    | "input"
    | "agent"
    | "planner"
    | "tool"
    | "model"
    | "gate"
    | "output";
};

export type StackArea = { area: string; items: string[] };

export type Challenge = { problem: string; solution: string };

export type ProjectLink = {
  label: string;
  href: string;
  kind: "demo" | "repo" | "docs";
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  status: "live" | "in-development" | "experimental" | "archived";
  statusLabel: string;
  year: string;
  category: string;
  oneLiner: string;
  problem: string;
  whyMatters: string;
  pipeline: { note: string; stages: PipelineStage[] };
  stack: StackArea[];
  implementation: string[];
  challenges: Challenge[];
  results?: string[];
  lessons?: string[];
  links: ProjectLink[];
  featured?: boolean;
  accent: "teal" | "violet";
};

export const projects: Project[] = [
  {
    slug: "agentnet",
    index: "01",
    title: "AgentNet",
    oneLiner:
      "A multi-agent orchestration framework — planner agents, specialist workers, and human approval gates wired into one production pipeline.",
    status: "experimental",
    statusLabel: "experimental · active",
    year: "2026",
    category: "Multi-Agent Systems",
    accent: "teal",
    featured: true,
    problem:
      "Single-prompt LLM calls cap out at reasoning depth and tool coverage. Teams need modular, observable, governable agent systems — not unmonitored auto-pilots.",
    whyMatters:
      "The difference between a demo and a deployed AI product is architecture: who delegates, who verifies, who approves. AgentNet is a reference implementation of that discipline.",
    pipeline: {
      note: "One request in, a verified, human-approved result out. Every step is observable.",
      stages: [
        {
          id: "user",
          label: "User input",
          detail: "A goal, not a script — the operator states intent in natural language.",
          kind: "input",
        },
        {
          id: "planner",
          label: "Planner agent",
          detail: "Decomposes the goal into a plan graph and selects available specialist toolkits.",
          kind: "planner",
        },
        {
          id: "supervisor",
          label: "Supervisor",
          detail: "Delegates plan nodes to worker agents, monitors progress, and re-plans on failure.",
          kind: "agent",
        },
        {
          id: "workers",
          label: "Specialist agents",
          detail: "Parallel workers execute scoped tasks using tools: search, code, data, documents.",
          kind: "agent",
        },
        {
          id: "tools",
          label: "Tool layer",
          detail: "Sandboxed tool execution with typed schemas and rollback semantics.",
          kind: "tool",
        },
        {
          id: "validator",
          label: "Validator",
          detail: "Checks outputs against the original goal and the plan before anything ships.",
          kind: "gate",
        },
        {
          id: "approval",
          label: "Human approval",
          detail: "Sensitive actions pause here — a human confirms before execution continues.",
          kind: "gate",
        },
        {
          id: "output",
          label: "Verified output",
          detail: "Result, full trace, and cost ledger returned to the operator.",
          kind: "output",
        },
      ],
    },
    stack: [
      { area: "Runtime", items: ["TypeScript", "Node.js"] },
      { area: "Agents", items: ["LLM router", "tool schemas"] },
      { area: "Observability", items: ["structured traces", "cost/step ledger"] },
      { area: "Platform", items: ["worker pool", "approval queue"] },
    ],
    implementation: [
      "Plan graph representation — goals decompose into verified, executable node graphs.",
      "Tool layer with typed schemas, sandboxing, and idempotent worker retries.",
      "Validation gate triangulates worker output against the original goal statement.",
      "Human-in-the-loop approval queue for high-impact or irreversible actions.",
      "Step-level tracing and a cost ledger so every run is auditable.",
    ],
    challenges: [
      {
        problem: "Agents drifted off the plan and burned tokens on dead ends.",
        solution:
          "The supervisor re-plans on failure with a bounded budget and early hop limits.",
      },
      {
        problem: "Unrestricted tool use is a security risk.",
        solution:
          "Sandboxed execution, schema-validated inputs, and approval gates on sensitive tools.",
      },
    ],
    results: undefined,
    lessons: [
      "The planner is the highest-leverage component in any agent system.",
      "Observability is not optional — you cannot fix what you cannot trace.",
      "A human approval gate converts 'magic' into engineering trust.",
    ],
    links: [
      { label: "Back to index", href: "/", kind: "docs" },
      // [project:repo] { label: "Repository", href: "https://github.com/[owner:…]", kind: "repo" },
      // [project:demo] { label: "Live demo", href: "…", kind: "demo" },
    ],
  },
  {
    slug: "linkedin-engagement-engine",
    index: "02",
    title: "LinkedIn Engagement Engine",
    category: "AI Automation",
    status: "live",
    statusLabel: "live · deployed",
    year: "2025",
    accent: "violet",
    featured: true,
    oneLiner:
      "An AI agent that researches, drafts, and schedules LinkedIn content — with human-in-the-loop publishing controls.",
    problem:
      "Consistent, high-quality personal-brand content is a scheduling problem as much as a writing problem. Slow manual pipelines mean missed momentum.",
    whyMatters:
      "It takes the repetitive work — research, drafting, scheduling — out of publishing while keeping the human author in control.",
    pipeline: {
      note: "From raw interest to scheduled post, the operator stays in control at the approval step.",
      stages: [
        {
          id: "topics",
          label: "Topic intake",
          detail: "Candidate topics from operator notes; tagged and prioritised.",
          kind: "input",
        },
        {
          id: "research",
          label: "Research agent",
          detail: "Gathers sources and angle candidates for each topic.",
          kind: "agent",
        },
        {
          id: "draft",
          label: "Drafting agent",
          detail: "Generates post variants tuned to tone and platform format.",
          kind: "agent",
        },
        {
          id: "review",
          label: "Review & refine",
          detail: "Quality checks against guidelines; suggestions for human edit.",
          kind: "model",
        },
        {
          id: "approve",
          label: "Human approval",
          detail: "Editor reviews, edits, approves — nothing publishes without it.",
          kind: "gate",
        },
        {
          id: "schedule",
          label: "Scheduling",
          detail: "Approved posts enter the queue and publish at optimal times.",
          kind: "output",
        },
      ],
    },
    stack: [
      { area: "AI", items: ["LLM pipeline", "retrieval"] },
      { area: "Platform", items: ["API integration", "scheduler queue"] },
      { area: "App", items: ["TypeScript"] },
    ],
    implementation: [
      "Topic-to-post pipeline where each stage is observable and editable.",
      "Tone and formatting rules applied as structured constraints, not prompts alone.",
      "Approval-first publishing: everything queues behind a human gate.",
    ],
    challenges: [
      {
        problem: "Automated posts risk sounding generic or off-brand.",
        solution:
          "Structured brand rules plus mandatory human approval on every draft.",
      },
      {
        problem: "Platform APIs have strict rate and content limits.",
        solution:
          "A scheduler queue that spaces actions and retries with backoff.",
      },
    ],
    results: undefined,
    lessons: [
      "Automation that edits out the human is automation that loses trust.",
      "Pipeline observability matters as much as pipeline speed.",
    ],
    links: [
      // [project:repo] { label: "Repository", href: "…", kind: "repo" },
      { label: "Back to index", href: "/", kind: "docs" },
    ],
  },
  {
    slug: "global-problem-intelligence",
    index: "03",
    title: "Global Problem Intelligence",
    category: "AI Research System",
    status: "in-development",
    statusLabel: "in development",
    year: "2026",
    accent: "teal",
    featured: true,
    oneLiner:
      "A research system that continuously scans the world's biggest unsolved problems and turns them into structured, verifiable research briefs.",
    problem:
      "Attention scatters. Signals about global-scale problems are fragmented across thousands of sources, languages, and formats.",
    whyMatters:
      "Structured intelligence — not raw feeds — is what lets people and systems act on the world's hardest problems.",
    pipeline: {
      note: "Continuous scanning in, verified research briefs out.",
      stages: [
        {
          id: "sources",
          label: "Source intake",
          detail: "Curated feeds, papers, signals, and reports from many domains.",
          kind: "input",
        },
        {
          id: "triage",
          label: "Signal triage",
          detail: "Dedupes, ranks, and clusters incoming signals by relevance and novelty.",
          kind: "agent",
        },
        {
          id: "research",
          label: "Research agents",
          detail: "Deep-dive briefs on clusters: causes, actors, gaps, leverage points.",
          kind: "planner",
        },
        {
          id: "verify",
          label: "Evidence validation",
          detail: "Claims are tracked to sources and confidence-scored with citations.",
          kind: "gate",
        },
        {
          id: "brief",
          label: "Structured brief output",
          detail: "Machine-readable briefs with citations, gaps, and next actions.",
          kind: "output",
        },
      ],
    },
    stack: [
      { area: "Data", items: ["crawlers", "dedup/cluster pipeline"] },
      { area: "AI", items: ["LLM brief generation", "citation tracking"] },
      { area: "Storage", items: ["structured gap/brief store"] },
      { area: "UX", items: ["browse + search interface"] },
    ],
    implementation: [
      "Always-on pipeline: intake → triage → deep-dive → validate → brief.",
      "Evidence is first-class: every claim anchors to a retrievable source.",
      "Structured schema makes briefs consumable by humans and downstream systems.",
    ],
    challenges: [
      {
        problem: "Signal noise drowns meaningful problems.",
        solution:
          "Novelty + salience ranking and cluster-level deduplication before research runs.",
      },
      {
        problem: "LLMs hallucinate sources.",
        solution:
          "An evidence validator that only admits claims resolvable to real sources.",
      },
    ],
    results: undefined,
    lessons: [
      "Information systems should end in structured, verifiable decisions — not feeds.",
    ],
    links: [
      // [project:repo], [project:demo]
      { label: "Back to index", href: "/", kind: "docs" },
    ],
  },
  {
    slug: "deepresearch",
    index: "04",
    title: "deepresearch",
    category: "Developer Tooling",
    status: "experimental",
    statusLabel: "experimental",
    year: "2025",
    accent: "violet",
    oneLiner:
      "A terminal-first research assistant that turns a question into a cited brief with your LLM of choice.",
    problem:
      "Research lives in tabs: a dozen searches, no structure, no citations, no file to keep.",
    whyMatters:
      "A CLI-first tool keeps research in the developer loop — scriptable, diffable, and out of the browser tab graveyard.",
    pipeline: {
      note: "Question in, cited brief out — all offline-friendly, model-agnostic.",
      stages: [
        {
          id: "ask",
          label: "Question input",
          detail: "A plain question with scoped options (depth, sources, format).",
          kind: "input",
        },
        {
          id: "split",
          label: "Query planner",
          detail: "Splits the question into sub-questions and search tasks.",
          kind: "planner",
        },
        {
          id: "fetch",
          label: "Search & fetch",
          detail: "Queries sources and pulls candidate documents page by page.",
          kind: "tool",
        },
        {
          id: "synthesize",
          label: "Synthesis",
          detail: "Composes a brief with inline citations and explicit gaps.",
          kind: "model",
        },
        {
          id: "cite",
          label: "Citation validation",
          detail: "Every citation resolves to an actually-fetched source.",
          kind: "gate",
        },
        {
          id: "write",
          label: "Markdown output",
          detail: "A usable .md brief the operator can keep, edit, or pipe.",
          kind: "output",
        },
      ],
    },
    stack: [
      { area: "CLI", items: ["Node/TypeScript", "commander-style CLIs", "TUI output"] },
      { area: "AI", items: ["model-agnostic LLM client"] },
      { area: "Output", items: ["Markdown briefs", "citation JSON"] },
    ],
    implementation: [
      "Model-agnostic: point it at any provider you configure.",
      "Planner splits broad questions into parallel, answerable subtasks.",
      "Strict citation rule: a claim is only cited if the source was actually retrieved.",
    ],
    challenges: [
      {
        problem: "Terminal UIs bury information in logs.",
        solution:
          "A compact, live status view that streams progress without flooding the screen.",
      },
      {
        problem: "Cite accuracy is make-or-break.",
        solution:
          "The validator only permits citations that resolve within the session's fetched corpus.",
      },
    ],
    results: undefined,
    lessons: [
      "Good developer tooling is mostly editing friction out until the loop feels instant.",
    ],
    links: [
      // [project:repo] { label: "npm / repo", href: "…", kind: "repo" },
      { label: "Back to index", href: "/", kind: "docs" },
    ],
  },
];

export type ProjectSlug = (typeof projects)[number]["slug"];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function generateProjectMetadata(slug: string): Metadata {
  const project = getProject(slug);
  if (!project) {
    return { title: "Project not found" };
  }
  return {
    title: `${project.title} — Case Study`,
    description: project.oneLiner,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.oneLiner,
      type: "article",
    },
  };
}