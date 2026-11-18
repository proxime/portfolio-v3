/** Centered section heading with the gradient underline. */
export function SectionHead({ heading }: { heading: string }) {
  return (
    <div className="mb-12 text-center md:mb-16">
      <h2 className="font-display text-4xl font-bold tracking-tight text-zinc-100 md:text-5xl">{heading}</h2>
      <span
        aria-hidden="true"
        className="mx-auto mt-[18px] block h-[3px] w-16 rounded-full bg-linear-to-r from-[#3b82f6] to-[#8b5cf6]"
      />
    </div>
  );
}

/** Shared section wrapper: container width plus the responsive vertical rhythm (56 / 72 / 128px). */
export const sectionClass = "relative mx-auto max-w-6xl px-6 py-14 md:py-[4.5rem] lg:py-32";
