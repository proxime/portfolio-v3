"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { Content, ProjectItem } from "@/content/types";
import { Icon } from "./Icon";
import { ProjectGallery } from "./ProjectGallery";

type ProjectsCopy = Content["projects"];

const glows = [
  "radial-gradient(circle at 30% 30%, rgba(59,130,246,.5), transparent 60%)",
  "radial-gradient(circle at 70% 40%, rgba(139,92,246,.5), transparent 60%)",
  "radial-gradient(circle at 40% 60%, rgba(99,102,241,.5), transparent 60%)",
];

const linkClass =
  "inline-flex items-center gap-1.5 text-sm font-medium text-zinc-200 transition-colors hover:text-violet-300";
const tagClass =
  "rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-1 font-mono text-[11px] font-medium text-zinc-300";

/**
 * `onImage` gives the badge a dark backdrop: over a screenshot (which may be light)
 * the tinted, see-through version is unreadable.
 */
function StatusBadge({
  project,
  copy,
  onImage = false,
  className = "",
}: {
  project: ProjectItem;
  copy: ProjectsCopy;
  onImage?: boolean;
  className?: string;
}) {
  if (!project.status) return null;
  const live = project.status === "live";
  const tint = live ? "bg-emerald-400/12" : "bg-amber-400/12";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide ${
        live ? "border-emerald-400/30 text-emerald-300" : "border-amber-400/30 text-amber-300"
      } ${onImage ? "bg-[#0a0a0f]/85 backdrop-blur-sm" : tint} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-emerald-400" : "bg-amber-400"}`} />
      {live ? copy.statusLive : copy.statusWip}
    </span>
  );
}

/**
 * First screenshot of a project. On a card it fills the frame (cropped); in the dialog it is shown whole.
 * The card asks for more pixels than its width: a screenshot wider than 16:10 is scaled up to cover
 * the frame, and a variant picked for the frame width alone would come out blurry.
 */
function Thumbnail({
  project,
  copy,
  glow,
  variant,
}: {
  project: ProjectItem;
  copy: ProjectsCopy;
  glow: string;
  variant: "card" | "dialog";
}) {
  const image = project.images?.[0];
  if (image) {
    return (
      <div className="thumb">
        <Image
          src={image}
          alt={project.title}
          fill
          quality={90}
          sizes={
            variant === "card"
              ? "(min-width: 1024px) 520px, (min-width: 640px) 70vw, 140vw"
              : "(min-width: 768px) 720px, 100vw"
          }
          className={variant === "card" ? "object-cover object-top" : "object-contain"}
        />
      </div>
    );
  }
  // Striped placeholder until the project gets a screenshot.
  return (
    <div className="thumb" aria-hidden="true">
      <div className="thumb-stripes" />
      <div className="thumb-glow" style={{ background: glow }} />
      <span className="relative font-mono text-[11px] uppercase tracking-widest text-zinc-500">{copy.thumbLabel}</span>
    </div>
  );
}

function ProjectLinks({ project, copy }: { project: ProjectItem; copy: ProjectsCopy }) {
  return (
    <>
      {project.demoUrl && (
        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={`relative z-10 ${linkClass}`}>
          <Icon name="external" className="h-4 w-4" />
          {copy.demo}
        </a>
      )}
      {project.codeUrl && (
        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className={`relative z-10 ${linkClass}`}>
          <Icon name="code" className="h-4 w-4" />
          {copy.code}
        </a>
      )}
    </>
  );
}

export function ProjectCards({ projects }: { projects: ProjectsCopy }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Stays set after closing, so the dialog keeps its content while it fades out.
  const [selected, setSelected] = useState<{ project: ProjectItem; glow: string } | null>(null);

  const open = (project: ProjectItem, glow: string) => {
    // The dialog has to hold the new project before it opens.
    flushSync(() => setSelected({ project, glow }));
    dialogRef.current?.showModal();
  };

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.items.map((project, i) => {
          const glow = glows[i % glows.length];
          return (
            <article key={project.id} className="card group flex h-full flex-col overflow-hidden p-0">
              <div className="relative">
                <Thumbnail project={project} copy={projects} glow={glow} variant="card" />
                <StatusBadge project={project} copy={projects} onImage className="absolute right-3 top-3" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-1.5 font-display text-lg font-semibold text-zinc-100 transition-colors group-hover:text-white">
                  {project.title}
                </h3>
                <p className="mb-4 text-pretty text-sm leading-relaxed text-zinc-400">{project.desc}</p>

                <ul className="mb-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li key={tag} className={tagClass}>
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center gap-4 pt-1">
                  {/* The ::after of this button covers the whole card, so a click anywhere opens the details. */}
                  <button
                    type="button"
                    onClick={() => open(project, glow)}
                    aria-label={`${projects.details}: ${project.title}`}
                    aria-haspopup="dialog"
                    className={`cursor-pointer after:absolute after:inset-0 after:rounded-2xl ${linkClass}`}
                  >
                    <Icon name="layers" className="h-4 w-4" />
                    {projects.details}
                  </button>
                  <ProjectLinks project={project} copy={projects} />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="project-dialog-title"
        className="project-dialog"
        // A click on the backdrop lands on the <dialog> itself; clicks inside land on its children.
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        {selected && (
          <div className="relative">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={projects.close}
              className="absolute right-4 top-4 z-10 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-white/10 bg-[#0f0f17]/80 text-zinc-300 backdrop-blur transition-colors hover:text-white"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>

            {selected.project.images && selected.project.images.length > 1 ? (
              // The key resets the gallery to its first slide when another project is opened.
              <ProjectGallery
                key={selected.project.id}
                images={selected.project.images}
                title={selected.project.title}
                copy={projects}
              />
            ) : (
              <Thumbnail project={selected.project} copy={projects} glow={selected.glow} variant="dialog" />
            )}

            <div className="p-6 md:p-8">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <h3 id="project-dialog-title" className="font-display text-2xl font-bold text-zinc-100 md:text-3xl">
                  {selected.project.title}
                </h3>
                <StatusBadge project={selected.project} copy={projects} />
              </div>

              <div className="space-y-4">
                {selected.project.details.map((paragraph) => (
                  <p key={paragraph} className="text-pretty leading-relaxed text-zinc-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              {selected.project.highlights && (
                <ul className="mt-6 space-y-3">
                  {selected.project.highlights.map((point) => (
                    <li key={point} className="flex gap-3 leading-relaxed text-zinc-400">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-linear-to-br from-blue-400 to-violet-500" />
                      <span className="text-pretty">{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {selected.project.tags.map((tag) => (
                  <li key={tag} className={tagClass}>
                    {tag}
                  </li>
                ))}
              </ul>

              {(selected.project.demoUrl || selected.project.codeUrl) && (
                <div className="mt-7 flex items-center gap-5 border-t border-white/[0.07] pt-5">
                  <ProjectLinks project={selected.project} copy={projects} />
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
