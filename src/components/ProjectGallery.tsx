"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Content } from "@/content/types";
import { Icon } from "./Icon";

type GalleryProps = {
  images: string[];
  title: string;
  copy: Content["projects"];
};

const arrowClass =
  "absolute top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/10 bg-[#0f0f17]/80 text-zinc-200 backdrop-blur transition hover:text-white aria-disabled:cursor-default aria-disabled:opacity-35 aria-disabled:hover:text-zinc-200";

/**
 * Screenshot gallery for the project dialog. The track is a native scroll-snap row,
 * so swiping works on touch screens; buttons, dots and arrow keys scroll it by one slide.
 */
export function ProjectGallery({ images, title, copy }: GalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollToSlide = (target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: target * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
  };

  // Left and right arrow keys work while the dialog is open, wherever the focus is.
  useEffect(() => {
    const track = trackRef.current;
    const dialog = track?.closest("dialog");
    if (!track || !dialog) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (!dialog.open) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const current = Math.round(track.scrollLeft / track.clientWidth);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({
        left: (current + (event.key === "ArrowRight" ? 1 : -1)) * track.clientWidth,
        behavior: reduceMotion ? "auto" : "smooth",
      });
      event.preventDefault();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={(event) => {
          const track = event.currentTarget;
          setIndex(Math.round(track.scrollLeft / track.clientWidth));
        }}
        className="gallery-track flex snap-x snap-mandatory overflow-x-auto"
      >
        {images.map((src, i) => (
          <div key={src} className="thumb w-full shrink-0 snap-center">
            <Image
              src={src}
              alt={`${title}: ${copy.imageLabel} ${i + 1}`}
              fill
              quality={90}
              sizes="(min-width: 768px) 720px, 100vw"
              // Shown whole: screenshots that are not 16:10 get bars instead of being cropped and scaled up.
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* aria-disabled instead of disabled: a disabled button would drop the keyboard focus out of the dialog. */}
      <button
        type="button"
        onClick={() => scrollToSlide(index - 1)}
        aria-disabled={index === 0}
        aria-label={copy.prevImage}
        className={`left-3 ${arrowClass}`}
      >
        <Icon name="chevron" className="h-4 w-4 rotate-90" />
      </button>
      <button
        type="button"
        onClick={() => scrollToSlide(index + 1)}
        aria-disabled={index === images.length - 1}
        aria-label={copy.nextImage}
        className={`right-3 ${arrowClass}`}
      >
        <Icon name="chevron" className="h-4 w-4 -rotate-90" />
      </button>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center rounded-full border border-white/10 bg-[#0f0f17]/80 px-1.5 backdrop-blur">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => scrollToSlide(i)}
            aria-label={`${copy.imageLabel} ${i + 1} / ${images.length}`}
            aria-current={i === index ? "true" : undefined}
            className="grid h-6 cursor-pointer place-items-center px-1"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-4 bg-linear-to-r from-blue-400 to-violet-500" : "w-1.5 bg-white/30"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
