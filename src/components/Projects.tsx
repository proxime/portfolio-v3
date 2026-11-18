import { site } from "@/content/site";
import type { Content } from "@/content/types";
import { Icon } from "./Icon";
import { ProjectCards } from "./ProjectCards";
import { SectionHead, sectionClass } from "./SectionHead";

export function Projects({ projects }: { projects: Content["projects"] }) {
  return (
    <section id="projects" className={sectionClass}>
      <SectionHead heading={projects.heading} />

      <ProjectCards projects={projects} />

      <div className="mt-12 flex justify-center">
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost group inline-flex h-12 items-center gap-2.5 rounded-full px-7 font-semibold"
        >
          <Icon name="github" className="btn-ghost-ic h-5 w-5" />
          {projects.viewGithub}
          <Icon
            name="arrowUpRight"
            className="h-4 w-4 text-violet-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </section>
  );
}
