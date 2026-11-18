import { getContent } from "@/content";
import type { Lang } from "@/content/types";
import { About } from "./About";
import { Contact } from "./Contact";
import { Experience } from "./Experience";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Nav } from "./Nav";
import { Projects } from "./Projects";
import { TechStack } from "./TechStack";

/** The whole one-page portfolio in the given language. */
export function PortfolioPage({ lang }: { lang: Lang }) {
  const t = getContent(lang);
  const heroStack = t.stack.groups[0].items.slice(0, 3).map((item) => item.name);

  return (
    <>
      <Nav nav={t.nav} lang={lang} />
      <main>
        <Hero hero={t.hero} stack={heroStack} years={t.about.years} />
        <About about={t.about} />
        <Experience experience={t.experience} />
        <TechStack stack={t.stack} />
        <Projects projects={t.projects} />
        <Contact contact={t.contact} />
      </main>
      <Footer footer={t.footer} nav={t.nav} />
    </>
  );
}
