import Image from "next/image";
import type { Content, StackItem } from "@/content/types";
import { getTechIcon, monogram } from "@/lib/tech-icons";
import { Icon } from "./Icon";
import { SectionHead, sectionClass } from "./SectionHead";

/** Vector logo first, then a picture, then a Lucide stand-in, and a monogram as the last resort. */
function TechIcon({ item }: { item: StackItem }) {
  const logo = getTechIcon(item.slug);
  if (logo) {
    return (
      <span className="tech-ico" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="tech-logo" fill={logo.color}>
          <path d={logo.path} fillRule={logo.evenOdd ? "evenodd" : undefined} />
        </svg>
      </span>
    );
  }
  if (item.image) {
    return (
      <span className="tech-ico" aria-hidden="true">
        <Image src={item.image} alt="" width={20} height={20} className="h-5 w-5" />
      </span>
    );
  }
  if (item.icon) {
    return (
      <span className="tech-ico text-violet-300" aria-hidden="true">
        <Icon name={item.icon} className="h-[18px] w-[18px]" />
      </span>
    );
  }
  return (
    <span className="tech-ico tech-ico-mono" aria-hidden="true">
      {monogram(item.name)}
    </span>
  );
}

export function TechStack({ stack }: { stack: Content["stack"] }) {
  return (
    <section id="skills" className={sectionClass}>
      <SectionHead heading={stack.heading} />

      <div className="mx-auto flex max-w-5xl flex-col gap-9">
        {stack.groups.map((group) => (
          <div key={group.label} className="grid gap-3 md:grid-cols-[180px_1fr] md:items-start md:gap-8">
            <h3 className="flex items-center gap-3 md:pt-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-linear-to-r from-blue-500 to-violet-500" />
              <span className="font-mono text-xs font-normal uppercase tracking-[0.18em] text-zinc-400">
                {group.label}
              </span>
            </h3>
            <ul className="flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <li key={item.name} className="tech-chip inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4">
                  <TechIcon item={item} />
                  <span className="whitespace-nowrap text-sm font-medium text-zinc-200">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
