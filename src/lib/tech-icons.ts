import {
  siApollographql,
  siClaude,
  siDocker,
  siFirebase,
  siGithubcopilot,
  siGraphql,
  siJavascript,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siReacthookform,
  siSanity,
  siSentry,
  siStorybook,
  siStripe,
  siStyledcomponents,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  siZod,
  type SimpleIcon,
} from "simple-icons";

const icons: Record<string, SimpleIcon> = {
  apollographql: siApollographql,
  claude: siClaude,
  docker: siDocker,
  firebase: siFirebase,
  githubcopilot: siGithubcopilot,
  graphql: siGraphql,
  javascript: siJavascript,
  mongodb: siMongodb,
  nestjs: siNestjs,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  postgresql: siPostgresql,
  react: siReact,
  reacthookform: siReacthookform,
  sanity: siSanity,
  sentry: siSentry,
  storybook: siStorybook,
  stripe: siStripe,
  styledcomponents: siStyledcomponents,
  supabase: siSupabase,
  tailwindcss: siTailwindcss,
  typescript: siTypescript,
  vercel: siVercel,
  vite: siVite,
  zod: siZod,
};

/** Brand colours darker than this are unreadable on the page background, so the logo is drawn white. */
const MIN_BRIGHTNESS = 0.25;

function brightness(hex: string): number {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

export type TechIconData = { path: string; color: string };

/** Logo path and display colour for a Simple Icons slug, or null when there is no logo. */
export function getTechIcon(slug: string | null): TechIconData | null {
  const icon = slug ? icons[slug] : undefined;
  if (!icon) return null;
  return {
    path: icon.path,
    color: brightness(icon.hex) < MIN_BRIGHTNESS ? "#ffffff" : `#${icon.hex}`,
  };
}

/** Two-character fallback shown when a technology has no logo. */
export function monogram(name: string): string {
  const cleaned = name.replace(/[^A-Za-z0-9]/g, "");
  return cleaned.slice(0, 2) || name.slice(0, 2);
}
