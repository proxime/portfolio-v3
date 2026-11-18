import {
  siApollographql,
  siClaude,
  siCss,
  siDocker,
  siExpress,
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
  siReactquery,
  siRedux,
  siSanity,
  siSass,
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
  css: siCss,
  docker: siDocker,
  express: siExpress,
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
  reactquery: siReactquery,
  redux: siRedux,
  sanity: siSanity,
  sass: siSass,
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

export type TechIconData = {
  path: string;
  color: string;
  /** Some logos are a single path with holes cut by the even-odd fill rule. */
  evenOdd?: boolean;
};

/** Logos that Simple Icons does not have, drawn on the same 24×24 grid. */
const customIcons: Record<string, TechIconData> = {
  // fal.ai, from the LobeHub icon set
  fal: {
    path: "M15.477 0c.415 0 .749.338.788.752a7.775 7.775 0 006.985 6.984c.413.04.752.373.752.788v6.952c0 .415-.338.748-.752.788a7.775 7.775 0 00-6.985 6.984c-.04.414-.373.752-.788.752H8.525c-.416 0-.749-.338-.789-.752a7.775 7.775 0 00-6.984-6.984c-.414-.04-.752-.373-.752-.788V8.524c0-.415.338-.748.752-.788A7.775 7.775 0 007.736.752C7.776.338 8.11 0 8.526 0h6.95zM4.819 11.98a7.226 7.226 0 007.223 7.23 7.226 7.226 0 007.223-7.23c0-3.994-3.234-7.23-7.223-7.23a7.227 7.227 0 00-7.223 7.23z",
    color: "#EC0648",
    evenOdd: true,
  },
};

/** Brand colours darker than this are unreadable on the page background, so the logo is drawn white. */
const MIN_BRIGHTNESS = 0.3;

function brightness(hex: string): number {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/** Logo path and display colour for a slug, or null when there is no vector logo for it. */
export function getTechIcon(slug: string | null): TechIconData | null {
  if (!slug) return null;
  if (customIcons[slug]) return customIcons[slug];
  const icon = icons[slug];
  if (!icon) return null;
  return {
    path: icon.path,
    color: brightness(icon.hex) < MIN_BRIGHTNESS ? "#ffffff" : `#${icon.hex}`,
  };
}

/** Two-character fallback shown when a technology has no logo at all. */
export function monogram(name: string): string {
  const cleaned = name.replace(/[^A-Za-z0-9]/g, "");
  return cleaned.slice(0, 2) || name.slice(0, 2);
}
