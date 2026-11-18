import type { StackItem } from "./types";

/**
 * Technology chips shared by both language versions; only group labels are translated.
 *
 * How a chip gets its icon, in order: `slug` (a vector logo from src/lib/tech-icons.ts),
 * `image` (a small picture in /public/tech), `icon` (a Lucide stand-in for things without a logo).
 * With none of them the chip shows a two-letter monogram.
 */
export const stackItems = {
  frontend: [
    { name: "React", slug: "react" },
    { name: "Next.js", slug: "nextdotjs" },
    { name: "TypeScript", slug: "typescript" },
    { name: "JavaScript", slug: "javascript" },
    { name: "Redux", slug: "redux" },
    { name: "Zustand", slug: null, image: "/tech/zustand.png" },
    { name: "Vite", slug: "vite" },
  ],
  styling: [
    { name: "Tailwind CSS", slug: "tailwindcss" },
    { name: "styled-components", slug: "styledcomponents" },
    { name: "SCSS", slug: "sass" },
    { name: "CSS", slug: "css" },
  ],
  data: [
    { name: "GraphQL", slug: "graphql" },
    { name: "Apollo Client", slug: "apollographql" },
    { name: "React Query", slug: "reactquery" },
    { name: "REST", slug: null, icon: "arrowLeftRight" },
  ],
  forms: [
    { name: "React Hook Form", slug: "reacthookform" },
    { name: "Zod", slug: "zod" },
    { name: "Yup", slug: null, icon: "shieldCheck" },
  ],
  backend: [
    { name: "Node.js", slug: "nodedotjs" },
    { name: "Express", slug: "express" },
    { name: "NestJS", slug: "nestjs" },
    { name: "MongoDB", slug: "mongodb" },
    { name: "PostgreSQL", slug: "postgresql" },
  ],
  tools: [
    { name: "Sanity", slug: "sanity" },
    { name: "Stripe", slug: "stripe" },
    { name: "Sentry", slug: "sentry" },
    { name: "Storybook", slug: "storybook" },
    { name: "Docker", slug: "docker" },
    { name: "Vercel", slug: "vercel" },
    { name: "Supabase", slug: "supabase" },
    { name: "Firebase", slug: "firebase" },
  ],
  ai: [
    { name: "Claude Code", slug: "claude" },
    { name: "GitHub Copilot", slug: "githubcopilot" },
    { name: "fal.ai", slug: "fal" },
  ],
} satisfies Record<string, StackItem[]>;
