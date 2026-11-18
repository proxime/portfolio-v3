import type { MetadataRoute } from "next";
import { langPath } from "@/content";
import { site } from "@/content/site";

const languages = { pl: `${site.url}${langPath.pl}`, en: `${site.url}${langPath.en}` };

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: languages.pl, alternates: { languages } },
    { url: languages.en, alternates: { languages } },
  ];
}
