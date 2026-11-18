"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { langPath } from "@/content";
import { site } from "@/content/site";
import type { Lang, NavCopy } from "@/content/types";
import { Icon } from "./Icon";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const isScrolled = () => window.scrollY > 16;
const isScrolledOnServer = () => false;

/** Section currently under the reading line, plus where its nav link sits (for the sliding highlight). */
type ActiveSection = { id: string | null; left: number; width: number };

const noSection: ActiveSection = { id: null, left: 0, width: 0 };

export function Nav({ nav, lang }: { nav: NavCopy; lang: Lang }) {
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, isScrolledOnServer);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<ActiveSection>(noSection);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      // The active section is the last one whose top has passed a line at 45% of the viewport.
      const line = window.innerHeight * 0.45;
      let id: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) id = section.id;
      }
      const link = id ? linksRef.current?.querySelector<HTMLElement>(`a[href="#${id}"]`) : null;
      const next: ActiveSection = { id, left: link?.offsetLeft ?? 0, width: link?.offsetWidth ?? 0 };
      setActive((prev) =>
        prev.id === next.id && prev.left === next.left && prev.width === next.width ? prev : next,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Link widths change when the web font replaces the fallback.
    document.fonts.ready.then(schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const links = [
    ["about", nav.about],
    ["experience", nav.experience],
    ["skills", nav.skills],
    ["projects", nav.projects],
    ["contact", nav.contact],
  ] as const;

  const otherLang: Lang = lang === "pl" ? "en" : "pl";
  // Switching language keeps the visitor in the section they were reading.
  const otherLangHref = langPath[otherLang] + (active.id && active.id !== "top" ? `#${active.id}` : "");
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-white/[0.06] bg-[#0A0A0F]/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          onClick={closeMenu}
          className="font-display font-bold leading-[1.05] tracking-tight text-zinc-100 transition hover:opacity-80"
        >
          <span className="block text-[13px]">{site.firstName}</span>
          <span className="grad-text block text-[13px]">{site.lastName}</span>
        </a>

        <div ref={linksRef} className="relative hidden items-center gap-1 md:flex">
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 rounded-lg bg-white/[0.07] transition-[transform,width,opacity] duration-300 ease-out"
            style={{
              width: active.width,
              transform: `translateX(${active.left}px)`,
              opacity: active.width ? 1 : 0,
            }}
          />
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active.id === id ? "location" : undefined}
              className={`relative rounded-lg px-3 py-2 text-sm transition-colors hover:text-zinc-100 ${
                active.id === id ? "text-zinc-100" : "text-zinc-400"
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={otherLangHref}
            hrefLang={otherLang}
            aria-label={nav.langLabel}
            className="relative flex h-9 items-center rounded-full border border-white/10 bg-white/[0.03] px-1 text-xs font-semibold"
          >
            <span
              aria-hidden="true"
              className={`lang-pill absolute bottom-1 left-[2px] top-1 w-9 rounded-full bg-linear-to-r from-blue-500/90 to-violet-500/90 ${
                lang === "en" ? "translate-x-9" : "translate-x-0"
              }`}
            />
            <span className={`relative z-10 w-9 text-center ${lang === "pl" ? "text-white" : "text-zinc-400"}`}>
              PL
            </span>
            <span className={`relative z-10 w-9 text-center ${lang === "en" ? "text-white" : "text-zinc-400"}`}>
              EN
            </span>
          </Link>

          {site.cvPath && (
            <a
              href={site.cvPath}
              download
              className="btn-ghost hidden h-9 items-center gap-1.5 rounded-full px-4 text-sm font-semibold sm:inline-flex"
            >
              <Icon name="download" className="btn-ghost-ic h-4 w-4" />
              {nav.cv}
            </a>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={nav.menuLabel}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-200 md:hidden"
          >
            <Icon name={menuOpen ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? "visible max-h-[28rem] border-t border-white/[0.06]" : "invisible max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={closeMenu}
              aria-current={active.id === id ? "location" : undefined}
              className={`rounded-xl px-3 py-3 text-base transition-colors ${
                active.id === id ? "bg-white/[0.05] text-zinc-100" : "text-zinc-300"
              }`}
            >
              {label}
            </a>
          ))}
          {site.cvPath && (
            <a
              href={site.cvPath}
              download
              onClick={closeMenu}
              className="btn-ghost mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold"
            >
              <Icon name="download" className="btn-ghost-ic h-4 w-4" />
              {nav.cv}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
