import { en } from "./en";
import { pl } from "./pl";
import type { Content, Lang } from "./types";

const dictionaries: Record<Lang, Content> = { pl, en };

export function getContent(lang: Lang): Content {
  return dictionaries[lang];
}

/** URL path of each language version. */
export const langPath: Record<Lang, string> = { pl: "/", en: "/en" };
