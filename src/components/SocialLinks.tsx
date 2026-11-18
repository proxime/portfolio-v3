import { site } from "@/content/site";
import { Icon } from "./Icon";

const sizes = {
  md: { link: "h-11 w-11 border border-transparent hover:border-white/12", icon: "h-5 w-5" },
  sm: { link: "h-10 w-10", icon: "h-[18px] w-[18px]" },
};

/** GitHub and LinkedIn icon links. A profile without a URL in `site` is not rendered. */
export function SocialLinks({ size = "md" }: { size?: keyof typeof sizes }) {
  const profiles = [
    { icon: "github", label: "GitHub", href: site.github },
    { icon: "linkedin", label: "LinkedIn", href: site.linkedin },
  ] as const;
  const s = sizes[size];

  return (
    <div className="flex items-center gap-1">
      {profiles.map(
        (profile) =>
          profile.href && (
            <a
              key={profile.icon}
              href={profile.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={profile.label}
              className={`grid place-items-center rounded-full text-zinc-400 transition hover:bg-white/[0.04] hover:text-zinc-100 ${s.link}`}
            >
              <Icon name={profile.icon} className={s.icon} />
            </a>
          ),
      )}
    </div>
  );
}
