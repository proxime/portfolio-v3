"use client";

import { type CSSProperties, useState } from "react";
import type { Content, ExperienceItem } from "@/content/types";
import { Icon } from "./Icon";
import { SectionHead, sectionClass } from "./SectionHead";

/** `animated` plays the entrance (panel fade, then points one by one); used when the visitor picks an entry. */
function ExperienceDetail({ item, animated = false }: { item: ExperienceItem; animated?: boolean }) {
  return (
    <article className={`card card-static relative p-6 md:p-8 ${animated ? "detail-in" : ""}`}>
      <span
        aria-hidden="true"
        className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-violet-300"
      >
        <Icon name="briefcase" className="h-5 w-5" />
      </span>
      <div className="mb-2 pr-14 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-violet-300/90">
        {item.employer}
      </div>
      <h3 className="pr-14 font-display text-2xl font-bold leading-tight text-zinc-100 md:text-3xl">{item.title}</h3>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-400">
        <span className="inline-flex items-center gap-2">
          <Icon name="calendar" className="h-4 w-4 text-violet-300/80" />
          {item.period}
        </span>
        <span className="inline-flex items-center gap-2">
          <Icon name="code" className="h-4 w-4 text-violet-300/80" />
          {item.role}
        </span>
      </div>

      <div className="my-6 h-px bg-white/[0.07]" />

      <p className="mb-6 text-pretty leading-relaxed text-zinc-300">{item.desc}</p>

      <ul className="space-y-3">
        {item.points.map((point, i) => (
          <li
            key={point}
            className="detail-point flex gap-3 leading-relaxed text-zinc-400"
            style={{ "--i": i } as CSSProperties}
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-linear-to-br from-blue-400 to-violet-500" />
            <span className="text-pretty">{point}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-1 font-mono text-[11px] font-medium text-zinc-300"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Experience({ experience }: { experience: Content["experience"] }) {
  // `dotTop` is the selected button's offset inside the list; the gradient dot slides there along the line.
  const [selection, setSelection] = useState({ active: 0, dotTop: 0, picked: false });
  const { items } = experience;
  const { active } = selection;

  return (
    <section id="experience" className={sectionClass}>
      <SectionHead heading={experience.heading} />

      {/* Desktop (≥1024px): timeline on the left, selected entry on the right */}
      <div className="hidden items-start gap-12 lg:grid lg:grid-cols-[300px_1fr]">
        <div className="relative pl-8">
          <span className="absolute bottom-2 left-[5px] top-2 w-px bg-linear-to-b from-blue-500/60 via-violet-500/40 to-transparent" />
          <span
            aria-hidden="true"
            className="absolute left-0 top-1.5 z-10 h-3 w-3 rounded-full bg-linear-to-br from-blue-400 to-violet-500 shadow-[0_0_0_4px_rgba(139,92,246,0.18)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ transform: `translateY(${selection.dotTop}px)` }}
          />
          <div className="flex flex-col gap-7">
            {items.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={(event) => setSelection({ active: i, dotTop: event.currentTarget.offsetTop, picked: true })}
                  aria-pressed={on}
                  className="group relative cursor-pointer text-left"
                >
                  <span className="absolute -left-8 top-1.5 h-3 w-3 rounded-full border-2 border-zinc-600 bg-[#0d0d14] transition-colors duration-300 group-hover:border-violet-400" />
                  <span
                    className={`mb-1 block font-mono text-xs tracking-wide transition-colors duration-300 ${
                      on ? "text-violet-300" : "text-zinc-500"
                    }`}
                  >
                    {item.period}
                  </span>
                  <span
                    className={`block font-display font-semibold leading-snug transition-colors duration-300 ${
                      on ? "text-zinc-100" : "text-zinc-300 group-hover:text-zinc-100"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`block text-sm transition-colors duration-300 ${on ? "text-zinc-400" : "text-zinc-500"}`}
                  >
                    {item.role} · {item.employer}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The key remounts the panel on every pick, which restarts its entrance animation. */}
        <ExperienceDetail key={active} item={items[active]} animated={selection.picked} />
      </div>

      {/* Tablet and below: every entry as a full card */}
      <div className="flex flex-col gap-5 lg:hidden">
        {items.map((item) => (
          <ExperienceDetail key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
