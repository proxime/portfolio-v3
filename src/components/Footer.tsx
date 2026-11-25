import { cacheLife } from "next/cache";
import { fullName, site } from "@/content/site";
import type { NavCopy } from "@/content/types";
import { SocialLinks } from "./SocialLinks";

/** Reading the clock is not allowed in a prerendered shell, so the year is a cached value refreshed daily. */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function Footer({ nav }: { nav: NavCopy }) {
  const links = [
    ["about", nav.about],
    ["experience", nav.experience],
    ["skills", nav.skills],
    ["projects", nav.projects],
    ["contact", nav.contact],
  ] as const;

  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
        <a
          href="#top"
          className="text-center font-display font-bold leading-[1.05] md:text-left"
        >
          <span className="block text-[15px] text-zinc-100">
            {site.firstName}
          </span>
          <span className="grad-text block text-[15px]">{site.lastName}</span>
        </a>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              {label}
            </a>
          ))}
        </nav>
        <SocialLinks size="sm" />
      </div>
      <p className="mx-auto max-w-6xl px-6 pb-8 text-center text-xs text-zinc-500">
        © <CurrentYear /> {fullName}
      </p>
    </footer>
  );
}
