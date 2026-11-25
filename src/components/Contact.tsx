import { site } from "@/content/site";
import type { Content } from "@/content/types";
import { ContactForm } from "./ContactForm";
import { Icon } from "./Icon";
import { SectionHead, sectionClass } from "./SectionHead";
import { SocialLinks } from "./SocialLinks";

const contactRowClass = "group inline-flex w-fit max-w-full items-center gap-3 text-zinc-100";
const contactIconClass =
  "grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition-colors group-hover:border-violet-400/40 group-hover:bg-violet-500/10 group-hover:text-violet-300";
const contactTextClass = "break-all font-mono text-base transition-colors group-hover:text-violet-300 sm:text-lg";

export function Contact({ contact }: { contact: Content["contact"] }) {
  return (
    <section id="contact" className={sectionClass}>
      <SectionHead heading={contact.heading} />

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <p className="text-pretty text-2xl font-light leading-snug text-zinc-200 md:text-3xl">{contact.lead}</p>
          <div className="flex flex-col gap-3">
            <a href={`mailto:${site.email}`} className={contactRowClass}>
              <span className={contactIconClass}>
                <Icon name="mail" className="h-5 w-5" />
              </span>
              <span className={contactTextClass}>{site.email}</span>
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={contactRowClass}>
              <span className={contactIconClass}>
                <Icon name="phone" className="h-5 w-5" />
              </span>
              <span className={contactTextClass}>{site.phone}</span>
            </a>
          </div>
          <SocialLinks />
        </div>

        <ContactForm copy={contact.form} email={site.email} />
      </div>
    </section>
  );
}
