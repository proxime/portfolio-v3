import type { Content } from "@/content/types";
import { CompAccordion } from "./CompAccordion";
import { SectionHead, sectionClass } from "./SectionHead";

function ExperienceHighlight({ about }: { about: Content["about"] }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 md:p-7">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl"
      />
      <div className="flex items-end gap-4">
        <span className="grad-text font-display text-6xl font-bold leading-[0.85] tracking-tight md:text-7xl">
          {about.years}
        </span>
        <div className="pb-1.5">
          <div className="font-display text-lg font-semibold leading-tight text-zinc-100">{about.yearsLabel}</div>
          <div className="text-sm text-zinc-500">{about.yearsNote}</div>
        </div>
      </div>
      <div className="my-5 h-px bg-white/[0.07]" />
      <div className="grid grid-cols-2 gap-5">
        {about.stats.map((stat) => (
          <div key={stat.label}>
            <div className="grad-text mb-1 font-display text-2xl font-bold leading-none md:text-3xl">{stat.value}</div>
            <div className="text-sm leading-snug text-zinc-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function About({ about }: { about: Content["about"] }) {
  return (
    <section id="about" className={sectionClass}>
      <SectionHead heading={about.heading} />

      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <p className="text-pretty text-lg font-light leading-relaxed text-zinc-200 md:text-xl">{about.bio[0]}</p>
          <p className="text-pretty text-base leading-relaxed text-zinc-400">{about.bio[1]}</p>
          <ExperienceHighlight about={about} />
        </div>

        <div className="flex flex-col gap-5">
          <div className="text-sm font-medium uppercase tracking-widest text-zinc-500">{about.competenciesKicker}</div>
          <CompAccordion items={about.competencies} />
        </div>
      </div>
    </section>
  );
}
