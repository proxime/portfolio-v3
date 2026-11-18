import type { IconName } from "@/components/Icon";
import type { ContactErrorCode } from "@/lib/contact";

export type Lang = "pl" | "en";

export type Competency = {
  id: string;
  icon: IconName;
  title: string;
  desc: string;
};

export type StackItem = {
  name: string;
  /** Simple Icons slug, or null when the brand has no logo there. */
  slug: string | null;
};

export type StackGroup = {
  label: string;
  items: StackItem[];
};

export type ExperienceItem = {
  period: string;
  title: string;
  employer: string;
  role: string;
  desc: string;
  points: string[];
  tags: string[];
};

export type ProjectItem = {
  id: string;
  title: string;
  desc: string;
  /** Longer description shown in the details dialog, one entry per paragraph. */
  details: string[];
  /** Bullet points in the details dialog. */
  highlights?: string[];
  tags: string[];
  /** Badge on the thumbnail; leave out for a project that is neither live nor in progress. */
  status?: "live" | "wip";
  /**
   * Screenshots in /public (16:10). The first one is the card thumbnail; with more than one
   * the details dialog shows a gallery. Without any, the striped placeholder is shown.
   */
  images?: string[];
  demoUrl?: string;
  /** Leave out for private repositories: the card then shows no "Code" link. */
  codeUrl?: string;
};

/** A field only defines the messages for the reasons it can actually be rejected for. */
type FieldMessages = Partial<Record<ContactErrorCode, string>>;

export type ContactFormCopy = {
  name: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  sent: string;
  namePh: string;
  emailPh: string;
  messagePh: string;
  /** Message under a field, per reason it was rejected. */
  fieldErrors: {
    name: FieldMessages;
    email: FieldMessages;
    message: FieldMessages;
  };
  errorSend: string;
  errorFallback: string;
};

export type NavCopy = {
  about: string;
  skills: string;
  experience: string;
  projects: string;
  contact: string;
  cv: string;
  menuLabel: string;
  /** Accessible name of the link to the other language version. */
  langLabel: string;
};

export type Content = {
  meta: { title: string; description: string };
  nav: NavCopy;
  hero: {
    /** Comment next to `available: true` in the hero code card. */
    availability: string;
    overline: string;
    role: string;
    value: string;
    ctaPrimary: string;
    ctaCv: string;
  };
  about: {
    heading: string;
    bio: [string, string];
    years: string;
    yearsLabel: string;
    yearsNote: string;
    stats: [{ value: string; label: string }, { value: string; label: string }];
    competenciesKicker: string;
    competencies: Competency[];
  };
  stack: { heading: string; groups: StackGroup[] };
  experience: { heading: string; items: ExperienceItem[] };
  projects: {
    heading: string;
    statusLive: string;
    statusWip: string;
    demo: string;
    code: string;
    viewGithub: string;
    details: string;
    close: string;
    prevImage: string;
    nextImage: string;
    /** Used in accessible names, e.g. "Zdjęcie 2 / 3". */
    imageLabel: string;
    thumbLabel: string;
    items: ProjectItem[];
  };
  contact: {
    heading: string;
    lead: string;
    note: string;
    form: ContactFormCopy;
  };
  footer: { tagline: string; rights: string };
};
