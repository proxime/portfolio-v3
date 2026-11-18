import type { Metadata } from "next";
import { getContent, langPath } from "@/content";
import { fullName, site } from "@/content/site";
import type { Lang } from "@/content/types";

const ogLocale: Record<Lang, string> = { pl: "pl_PL", en: "en_US" };

/** Image shown when the site link is pasted on LinkedIn, Slack and the like (1200×630, in /public). */
const previewImage = "/og.png";

export function buildMetadata(lang: Lang): Metadata {
  const { meta } = getContent(lang);
  const other: Lang = lang === "pl" ? "en" : "pl";

  return {
    metadataBase: new URL(site.url),
    title: meta.title,
    description: meta.description,
    authors: [{ name: fullName, url: site.url }],
    alternates: {
      canonical: langPath[lang],
      languages: { pl: langPath.pl, en: langPath.en, "x-default": langPath.pl },
    },
    openGraph: {
      type: "website",
      url: langPath[lang],
      title: meta.title,
      description: meta.description,
      siteName: fullName,
      locale: ogLocale[lang],
      alternateLocale: ogLocale[other],
      images: [{ url: previewImage, width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [previewImage],
    },
  };
}
