# Portfolio

One-page, bilingual portfolio built with Next.js 16 (App Router), TypeScript and Tailwind CSS 4.
Polish lives at `/`, English at `/en`.

## Commands

```
npm run dev     # development server
npm run build   # production build
npm run lint    # ESLint
npm test        # unit tests (contact form validation)
```

## Where things are

- `src/content/site.ts`: name, e-mail, GitHub, LinkedIn URL and the CV path. LinkedIn links and CV buttons appear once `linkedin` and `cvPath` are set (put the PDF in `public/cv/`).
- `src/content/pl.ts`, `src/content/en.ts`: all page copy, including the project texts.
- `src/content/project-media.ts`: per project, the status badge, screenshots and links, shared by both languages. Screenshots go to `public/projects/` (lowercase file names, ideally 16:10): the first is the card thumbnail, more than one turns the details dialog into a gallery. A card shows "Demo" and "Code" links when `demoUrl` / `codeUrl` are set.
- `src/content/stack.ts`: technology chips. Logos come from `simple-icons` via `src/lib/tech-icons.ts`.
- `src/components/`: one component per section.
- `docs/superpowers/`: the spec and the implementation plan.

## Contact form

The form posts to a server action that sends the message through Resend. Copy `.env.example` to `.env.local` and fill in the three variables; set the same variables in the hosting environment.
