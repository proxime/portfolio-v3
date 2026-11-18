type Site = {
  firstName: string;
  lastName: string;
  email: string;
  /** Shown in the contact section, written the way it should be read. */
  phone: string;
  github: string;
  /** Full LinkedIn profile URL. While null, LinkedIn links are not rendered. */
  linkedin: string | null;
  /** Path to the CV inside /public. While null, CV buttons are not rendered. */
  cvPath: string | null;
  url: string;
};

export const site: Site = {
  firstName: "Norbert",
  lastName: "Kułak",
  email: "kulaknorbert@gmail.com",
  phone: "+48 884 287 542",
  github: "https://github.com/proxime",
  linkedin: "https://www.linkedin.com/in/norbert-ku%C5%82ak-a5325a1a0/",
  cvPath: "/Norbert-Kulak-CV.pdf",
  url: "https://norbert-kulak.pl",
};

export const fullName = `${site.firstName} ${site.lastName}`;
