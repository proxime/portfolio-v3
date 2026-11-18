"use client";

import { useState } from "react";
import type { Competency } from "@/content/types";
import { Icon } from "./Icon";

/** Competencies accordion: one item open at a time, the first one by default. */
export function CompAccordion({ items }: { items: Competency[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
      {items.map((item, i) => {
        const isOpen = i === open;
        const panelId = `competency-${item.id}`;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full cursor-pointer items-center gap-4 p-4 text-left transition-colors md:p-5 md:hover:bg-white/[0.025]"
              >
                <span
                  className={`inline-grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition-colors duration-300 ${
                    isOpen
                      ? "border-violet-400/40 bg-violet-500/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-violet-300"
                  }`}
                >
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <span className="flex-1 font-display font-semibold leading-tight text-zinc-100">{item.title}</span>
                <Icon
                  name="chevron"
                  className={`h-4 w-4 text-zinc-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            </h3>
            {/* Height animates through grid rows (0fr to 1fr); a closed panel is inert, so it is skipped by keyboard and screen readers. */}
            <div
              id={panelId}
              inert={!isOpen}
              className={`-mt-1 grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 pl-[4.5rem] text-pretty text-sm leading-relaxed text-zinc-400 md:px-5 md:pb-5 md:pl-[4.75rem]">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
