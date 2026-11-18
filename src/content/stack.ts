import type { StackItem } from "./types";

/** Technology chips shared by both language versions; only group labels are translated. */
export const stackItems = {
  frontend: [
    { name: "React", slug: "react" },
    { name: "Next.js", slug: "nextdotjs" },
    { name: "TypeScript", slug: "typescript" },
    { name: "JavaScript", slug: "javascript" },
    { name: "Zustand", slug: null },
    { name: "Vite", slug: "vite" },
  ],
  styling: [
    { name: "Tailwind CSS", slug: "tailwindcss" },
    { name: "styled-components", slug: "styledcomponents" },
  ],
  data: [
    { name: "GraphQL", slug: "graphql" },
    { name: "Apollo Client", slug: "apollographql" },
    { name: "REST", slug: null },
  ],
  forms: [
    { name: "React Hook Form", slug: "reacthookform" },
    { name: "Zod", slug: "zod" },
  ],
  backend: [
    { name: "Node.js", slug: "nodedotjs" },
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
  ],
} satisfies Record<string, StackItem[]>;
