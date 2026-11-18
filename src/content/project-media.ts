import type { ProjectItem } from "./types";

/**
 * Everything about a project that does not depend on the language: status badge, screenshots and links.
 * Kept in one place so the Polish and English versions cannot drift apart. Texts live in pl.ts and en.ts.
 *
 * - images: files in /public/projects, ideally 16:10. The first is the card thumbnail;
 *   more than one turns the details dialog into a gallery.
 * - codeUrl: leave out for private repositories.
 */
type ProjectMedia = Pick<
  ProjectItem,
  "status" | "images" | "demoUrl" | "codeUrl"
>;

export const projectMedia = {
  "nasze-dania": {
    status: "live",
    images: [
      "/projects/nasze-dania.jpg",
      "/projects/nasze-dania-przepisy.jpg",
      "/projects/nasze-dania-przepis.jpg",
    ],
    demoUrl: "https://zarcienagrubo.vercel.app",
  },
  "chess-outplay": {
    status: "live",
    images: [
      "/projects/chess-outplay.png",
      "/projects/chess-outplay-setup.png",
    ],
    demoUrl: "https://chess-outplay.vercel.app",
  },
  korepetycje: {
    status: "live",
    images: [
      "/projects/korepetycje-dzis.png",
      "/projects/korepetycje-kalendarz.png",
      "/projects/korepetycje-uczniowie.png",
      "/projects/korepetycje-uczen.png",
      "/projects/korepetycje-historia.png",
      "/projects/korepetycje-zadania.png",
    ],
    // Separate instance with sample data; the real one stays private.
    demoUrl: "https://korepetycje-demo.vercel.app",
  },
  "kotor-remix": {
    status: "wip",
    images: [
      "/projects/kotor2-dantooine.jpg",
      "/projects/kotor2-onderon.jpg",
      "/projects/kotor2-nar-shaddaa.jpg",
      "/projects/kotor2-telos.jpg",
      "/projects/kotor2-ravager.jpg",
    ],
  },
  "swtor-pl": {
    status: "wip",
  },
  budapp: {
    images: [
      "/projects/budapp-dashboard.png",
      "/projects/budapp-zlecenia.png",
      "/projects/budapp-zlecenie.png",
      "/projects/budapp-wycena.png",
      "/projects/budapp-kalkulatory.png",
      "/projects/budapp-pracownicy.png",
    ],
  },
  "wnetrza-ai": {
    images: [
      "/projects/wnetrza-ai-1.png",
      "/projects/wnetrza-ai-2.png",
      "/projects/wnetrza-ai-3.png",
    ],
  },
} satisfies Record<string, ProjectMedia>;
