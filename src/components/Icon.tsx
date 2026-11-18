import {
  ArrowDown,
  ArrowLeftRight,
  ArrowUpRight,
  Braces,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  CodeXml,
  Download,
  ExternalLink,
  Layers,
  type LucideIcon,
  Mail,
  Menu,
  Phone,
  Plug,
  Rocket,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

/** Interface icons come from Lucide. Content refers to them by these names. */
const lucideIcons = {
  mail: Mail,
  phone: Phone,
  arrowDown: ArrowDown,
  arrowUpRight: ArrowUpRight,
  download: Download,
  external: ExternalLink,
  code: CodeXml,
  layers: Layers,
  sparkles: Sparkles,
  braces: Braces,
  plug: Plug,
  rocket: Rocket,
  calendar: Calendar,
  briefcase: Briefcase,
  chevron: ChevronDown,
  check: Check,
  menu: Menu,
  close: X,
  // Stand-ins in the tech stack for things that have no logo of their own.
  arrowLeftRight: ArrowLeftRight,
  shieldCheck: ShieldCheck,
} satisfies Record<string, LucideIcon>;

/** Lucide no longer ships brand icons, so these two are drawn here in the same stroke style. */
const brandIcons = {
  github: (
    <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.5 11.5 0 0 0-6 0C6.3 2.3 5.3 2.6 5.3 2.6a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.9 9c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof lucideIcons | keyof typeof brandIcons;

const STROKE_WIDTH = 1.6;

type IconProps = {
  name: IconName;
  className?: string;
  style?: CSSProperties;
};

export function Icon({ name, className = "w-5 h-5", style }: IconProps) {
  if (name === "github" || name === "linkedin") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        style={style}
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {brandIcons[name]}
      </svg>
    );
  }
  const Lucide = lucideIcons[name];
  return <Lucide className={className} style={style} strokeWidth={STROKE_WIDTH} aria-hidden="true" />;
}
