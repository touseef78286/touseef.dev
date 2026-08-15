# Touseef Panjtan — Portfolio

Live at **[touseef.dev](https://touseef.dev)**

Personal portfolio and case studies of an AI systems builder from Islamabad — multi-agent systems, AI automation, LLM applications, and full-stack software. Every product is treated as a system to be architected, measured, and refined.

## Stack

- **Framework** — [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **UI** — React 19, TypeScript, [Tailwind CSS v4](https://tailwindcss.com)
- **Motion** — [Motion](https://motion.dev) for animations
- **3D** — [Three.js](https://threejs.org) + `@react-three/fiber` + `@react-three/drei`

## Features

- Terminal-style hero console that types out a boot sequence
- 3D particle graph canvas (deferred client-side load for performance)
- Systems/architecture philosophy section
- Four case-study pages with animated, step-by-step system pipelines
- Native `<details>`-based FAQ
- SEO: per-page metadata, generated Open Graph image, `sitemap.xml`, `robots.txt`
- Fully static output for fast, cheap hosting on Vercel

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Content

All personal facts (name, role, links, availability) live in one place:

```
src/content/site.ts
```

Project case studies are structured data in:

```
src/content/projects.ts
```

## Deployment

Deploys as a static site. Connect the repo on the [Vercel Platform](https://vercel.com/new) — the production build outputs static HTML for every route, so any static host works.