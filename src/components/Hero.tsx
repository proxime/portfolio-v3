import type { CSSProperties } from "react";
import { fullName, site } from "@/content/site";
import type { Content } from "@/content/types";
import { Icon } from "./Icon";
import { SocialLinks } from "./SocialLinks";

function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-grid" />
      <div className="hero-glow hero-glow-a" />
      <div className="hero-glow hero-glow-b" />
      <div className="hero-fade" />
    </div>
  );
}

type Token = { text: string; className?: string };

/* Typing animation timing: the card types itself once on load, line by line (CSS only). */
const CHAR_MS = 13;
const LINE_PAUSE_MS = 70;
const START_MS = 350;

const str = (value: string): Token => ({ text: `'${value}'`, className: "c-str" });
const prop = (name: string): Token[] => [{ text: "  " }, { text: name, className: "c-prop" }, { text: ": " }];

/** `added` marks the line as a freshly added one, the way a diff shows it. */
type Line = { tokens: Token[]; added?: boolean };

type CodeCardProps = { role: string; stack: string[]; years: string; availability: string };

function buildLines({ role, stack, years, availability }: CodeCardProps): Line[] {
  return [
    {
      tokens: [
        { text: "const", className: "c-key" },
        { text: " " },
        { text: "developer", className: "c-var" },
        { text: " " },
        { text: "=", className: "c-op" },
        { text: " {" },
      ],
    },
    { tokens: [...prop("name"), str(fullName), { text: "," }] },
    { tokens: [...prop("role"), str(role), { text: "," }] },
    {
      tokens: [
        ...prop("stack"),
        { text: "[" },
        ...stack.flatMap((name, i) => (i < stack.length - 1 ? [str(name), { text: ", " }] : [str(name)])),
        { text: "]," },
      ],
    },
    { tokens: [...prop("experience"), { text: years, className: "c-lit" }, { text: "," }] },
    // The availability note lives here instead of in a badge: the one line of the file that just changed.
    {
      added: true,
      tokens: [
        ...prop("available"),
        { text: "true", className: "c-lit" },
        { text: ", " },
        { text: `// ${availability}`, className: "c-comment" },
      ],
    },
    { tokens: [{ text: "};" }] },
  ];
}

/** Adds the character count and start delay each line needs for the typing animation. */
function scheduleLines(lines: Line[]) {
  const scheduled: (Line & { chars: number; delay: number })[] = [];
  let delay = START_MS;
  for (const line of lines) {
    const chars = line.tokens.reduce((sum, token) => sum + token.text.length, 0);
    scheduled.push({ ...line, chars, delay });
    delay += chars * CHAR_MS + LINE_PAUSE_MS;
  }
  return { scheduled, end: delay };
}

function CodeCard(props: CodeCardProps) {
  const { scheduled, end } = scheduleLines(buildLines(props));

  return (
    <div className="hero-code card overflow-hidden">
      <div className="hero-code-bar" aria-hidden="true">
        <span className="hero-dot bg-[#ff5f57]" />
        <span className="hero-dot bg-[#febc2e]" />
        <span className="hero-dot bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-zinc-500">developer.ts</span>
      </div>
      <pre className="hero-code-body">
        <code>
          {scheduled.map((line, i) => (
            <span
              key={i}
              className={`hero-code-line block ${line.added ? "hero-code-line-added" : ""}`}
              style={line.added ? ({ "--delay": `${line.delay}ms` } as CSSProperties) : undefined}
            >
              <span
                className="type-line"
                style={
                  {
                    "--chars": line.chars,
                    "--delay": `${line.delay}ms`,
                    "--duration": `${line.chars * CHAR_MS}ms`,
                  } as CSSProperties
                }
              >
                {line.tokens.map((token, j) => (
                  <span key={j} className={token.className}>
                    {token.text}
                  </span>
                ))}
              </span>
              {i === scheduled.length - 1 && (
                <span className="type-caret" style={{ "--delay": `${end}ms` } as CSSProperties} aria-hidden="true" />
              )}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

type HeroProps = { hero: Content["hero"]; stack: string[]; years: string };

export function Hero({ hero, stack, years }: HeroProps) {
  return (
    <section id="top" className="relative flex min-h-[92vh] items-center overflow-hidden">
      <HeroBackground />
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 font-mono text-sm text-zinc-400 md:text-base">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              {hero.overline}
            </p>
            <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-zinc-100 sm:text-6xl md:text-7xl">
              {site.firstName}
              <br />
              <span className="grad-text">{site.lastName}</span>
            </h1>
            <p className="mt-5 font-mono text-base text-zinc-300 md:text-lg">{hero.role}</p>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-zinc-400 md:text-lg">
              {hero.value}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#about"
                className="btn-grad group inline-flex h-12 items-center gap-2 rounded-full px-6 font-semibold text-white"
              >
                {hero.ctaPrimary}
                <Icon name="arrowDown" className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              {site.cvPath && (
                <a
                  href={site.cvPath}
                  download
                  className="btn-ghost inline-flex h-12 items-center gap-2 rounded-full px-6 font-semibold"
                >
                  <Icon name="download" className="btn-ghost-ic h-4 w-4" />
                  {hero.ctaCv}
                </a>
              )}
              <div className="ml-1">
                <SocialLinks />
              </div>
            </div>
          </div>

          <CodeCard role={hero.role} stack={stack} years={years} availability={hero.availability} />
        </div>
      </div>
    </section>
  );
}
