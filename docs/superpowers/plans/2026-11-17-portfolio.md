# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Jednostronicowe, dwujęzyczne portfolio w Next.js, wierne designowi z Claude Design i wypełnione treścią z CV.

**Architecture:** Statyczna strona w App Routerze z dwoma root layoutami (grupy tras `(pl)` i `(en)`), które renderują ten sam komponent `PortfolioPage` z innym słownikiem treści. Cała treść żyje w `src/content`, komponenty są czystą prezentacją. Stan po stronie klienta mają tylko: nawigacja, akordeon, oś czasu doświadczenia i formularz (server action + Resend).

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, `simple-icons`, `node:test`.

**Źródła:** specyfikacja `docs/superpowers/specs/2026-11-17-portfolio-design.md` oraz pakiet `design_handoff_portfolio` z projektu „portfolio” w Claude Design (README + `design/*.jsx` + `design/Portfolio.html`). Pakietu nie ma w repozytorium: wykonawca musi mieć go w kontekście. Wszystkie klasy Tailwind i wartości przenosimy z plików designu bez zmian, poza odstępstwami ze specyfikacji.

**Zasada dla commitów:** właściciel commituje sam. Plan nie zawiera kroków `git commit`; po każdym zadaniu zmiany zostają w drzewie roboczym.

---

## Struktura plików

```
src/app/globals.css                 style globalne i klasy z prototypu
src/app/(pl)/layout.tsx             root layout PL (lang="pl", metadane PL)
src/app/(pl)/page.tsx               strona "/"
src/app/(en)/layout.tsx             root layout EN (lang="en", metadane EN)
src/app/(en)/en/page.tsx            strona "/en"
src/app/actions.ts                  server action sendContactMessage
src/app/sitemap.ts, robots.ts       pliki SEO
src/content/types.ts                typy słownika treści
src/content/site.ts                 dane osobowe, linki, adres strony
src/content/pl.ts, en.ts            treść PL i EN
src/content/index.ts                getContent(lang)
src/lib/contact.ts                  walidacja formularza (czysta funkcja)
src/lib/contact.test.ts             testy walidacji
src/lib/fonts.ts                    next/font
src/lib/metadata.ts                 buildMetadata(lang)
src/lib/tech-icons.ts               mapowanie slug -> ikona simple-icons
src/components/RootShell.tsx        wspólne <html>/<body>
src/components/PortfolioPage.tsx    kompozycja sekcji
src/components/Icon.tsx             ikony UI (inline SVG)
src/components/SectionHead.tsx      nagłówek sekcji
src/components/Nav.tsx              klient: scroll, menu mobilne
src/components/Hero.tsx             hero split + karta kodu
src/components/About.tsx            bio + panel liczb
src/components/CompAccordion.tsx    klient: akordeon
src/components/TechStack.tsx        grupy chipów
src/components/TechIcon.tsx         logo lub monogram
src/components/Experience.tsx       klient: oś czasu + panel szczegółów
src/components/Projects.tsx         3 karty
src/components/Contact.tsx          lewa kolumna kontaktu
src/components/ContactForm.tsx      klient: formularz
src/components/Footer.tsx           stopka
```

---

### Task 1: Szkielet projektu

**Files:** cały katalog projektu (generator), potem usunięcie plików startowych.

- [x] **Step 1:** W pustym katalogu projektu uruchomić generator (katalog `docs/` nie koliduje):

```
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --disable-git --yes
```

- [x] **Step 2:** `npm install simple-icons`
- [x] **Step 3:** Usunąć `src/app/page.tsx`, `src/app/layout.tsx`, pliki SVG z `public/` i startową treść `globals.css`.
- [x] **Step 4:** W `tsconfig.json` dodać `"allowImportingTsExtensions": true` (testy `node:test` importują z rozszerzeniem `.ts`). W `package.json` dodać skrypt `"test": "node --test src/lib/contact.test.ts"`.
- [x] **Step 5:** `git init` bez commita.

### Task 2: Treść i typy

**Files:** Create `src/content/types.ts`, `site.ts`, `pl.ts`, `en.ts`, `index.ts`.

- [x] **Step 1:** `types.ts` definiuje `Lang = "pl" | "en"` oraz `Content` z polami: `nav` (about, skills, experience, projects, contact, cv, menuLabel, langLabel), `hero` (overline, role, value, ctaPrimary, ctaCv, codeExperience), `about` (heading, bio: [string, string], years, yearsLabel, yearsNote, stats: {value,label}[2], competenciesKicker, competencies: {id, icon, title, desc}[]), `stack` (heading, groups: {label, items: {name, slug: string | null}[]}[]), `experience` (heading, items: {period, title, employer, role, desc, points: string[], tags: string[]}[]), `projects` (heading, statusLive, statusWip, demo, code, viewGithub, thumbLabel, items: {id, title, desc, tags, status: "live" | "wip", demoUrl?: string, codeUrl?: string}[]), `contact` (heading, lead, note, form: {name, email, message, send, sending, sent, namePh, emailPh, messagePh, errorValidation, errorSend, errorFallback}), `footer` (tagline, rights), `meta` (title, description).
- [x] **Step 2:** `site.ts` eksportuje `site = { firstName: "Norbert", lastName: "Kułak", email, github: "https://github.com/proxime", linkedin: string | null, cvPath: string | null, url: "https://norbert-kulak.com" }`. `linkedin` i `cvPath` zostają `null`, dopóki właściciel ich nie poda; komponenty nie renderują wtedy tych linków.
- [x] **Step 3:** `pl.ts` i `en.ts` według sekcji „Odstępstwa od README” w specyfikacji. Pięć pozycji doświadczenia w kolejności: platforma AI roleplay (08.2025 — teraz), marketplace (03.2026 — teraz), strona biura inżynierskiego (10.2026 — 11.2026), platforma ESG (11.2021 — 11.2025), Nextrope (06.2020 — 01.2021). Bez nazw klientów, produktów, domen, współpracowników i bez liczb, których nie ma w CV. Trzy projekty jako placeholdery z tytułami w nawiasach kwadratowych, bez `demoUrl` i `codeUrl`.
- [x] **Step 4:** `index.ts` eksportuje `getContent(lang: Lang): Content`.

### Task 3: Walidacja formularza (TDD)

**Files:** Create `src/lib/contact.ts`, Test `src/lib/contact.test.ts`.

- [x] **Step 1: Test**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { validateContact } from "./contact.ts";

const valid = { name: "Anna", email: "anna@example.com", message: "Dzień dobry, mam pytanie.", website: "" };

test("accepts a valid message and trims fields", () => {
  const result = validateContact({ ...valid, name: "  Anna  " });
  assert.deepEqual(result, {
    ok: true,
    spam: false,
    data: { name: "Anna", email: "anna@example.com", message: "Dzień dobry, mam pytanie." },
  });
});

test("rejects an empty name", () => {
  assert.deepEqual(validateContact({ ...valid, name: "   " }), { ok: false, field: "name" });
});

test("rejects a malformed email", () => {
  assert.deepEqual(validateContact({ ...valid, email: "anna@" }), { ok: false, field: "email" });
});

test("rejects a too short message", () => {
  assert.deepEqual(validateContact({ ...valid, message: "hej" }), { ok: false, field: "message" });
});

test("rejects oversized fields", () => {
  assert.deepEqual(validateContact({ ...valid, message: "a".repeat(5001) }), { ok: false, field: "message" });
});

test("flags a filled honeypot as spam", () => {
  const result = validateContact({ ...valid, website: "http://spam.example" });
  assert.equal(result.ok && result.spam, true);
});
```

- [x] **Step 2:** `npm test`, oczekiwany wynik: FAIL (brak modułu `contact.ts`).
- [x] **Step 3: Implementacja**

```ts
export type ContactInput = { name: string; email: string; message: string; website: string };
export type ContactData = { name: string; email: string; message: string };
export type ContactField = "name" | "email" | "message";
export type ContactValidation =
  | { ok: true; spam: boolean; data: ContactData }
  | { ok: false; field: ContactField };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: ContactInput): ContactValidation {
  const data: ContactData = {
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
  };
  if (data.name.length < 1 || data.name.length > 100) return { ok: false, field: "name" };
  if (data.email.length > 200 || !EMAIL_PATTERN.test(data.email)) return { ok: false, field: "email" };
  if (data.message.length < 10 || data.message.length > 5000) return { ok: false, field: "message" };
  return { ok: true, spam: input.website.trim() !== "", data };
}
```

- [x] **Step 4:** `npm test`, oczekiwany wynik: 6 testów PASS.

### Task 4: Style globalne, fonty, wspólne UI

**Files:** Create `src/app/globals.css`, `src/lib/fonts.ts`, `src/components/RootShell.tsx`, `Icon.tsx`, `SectionHead.tsx`.

- [x] **Step 1:** `globals.css`: `@import "tailwindcss"`, blok `@theme` z `--font-sans`, `--font-display`, `--font-mono` wskazującymi na zmienne z `next/font`, potem klasy przeniesione z `<style>` w `Portfolio.html`: `:root`, `html`, `body`, `::selection`, scrollbar, `.grad-text`, `.card` (+ `::before`, hover, lift tylko w `#projects`), `.exp-detail`, `.tech-chip-l`, `.tech-ico`, `.tech-logo`, `.tech-ico-mono`, `.btn-grad`, `.btn-ghost`, `.field`, `.thumb*`, `.ping`, tło hero (`.hero-bg`, `.hero-grid`, `.hero-glow-a/b`, `.hero-fade`), karta kodu (`.hero-code*`, `.c-*`), oba bloki media dla ≤1023 px i ≤767 px. Pominąć: `.reveal`, warianty nagłówków (`data-headings`, `data-headstyle`, `.sh-topbar`), `.exp-cardbtn-on`, `.tech-ico-lg/xl`, `.tech-mono-bare`, `.wall-*`, `.tech-chip`, `.hero-glow-c`, `.hero-mega*`. Dodać `section[id] { scroll-margin-top: 72px; }` i klasę `.section` z odstępami 96/128, 72 i 56 px zamiast selektora `section[class~="py-24"]`.
- [x] **Step 2:** `fonts.ts`: `Space_Grotesk` (400–700), `Inter` (300–700), `JetBrains_Mono` (400–600), wszystkie z `subsets: ["latin", "latin-ext"]`, `display: "swap"` i zmiennymi CSS.
- [x] **Step 3:** `RootShell({ lang, children })` renderuje `<html lang>` z klasami zmiennych fontów i `<body>`.
- [x] **Step 4:** `Icon` przenosi ścieżki z `ui.jsx` 1:1 i dodaje dwie nowe w tym samym stylu (viewBox 24, stroke 1.6): `fileText` i `sparkles`. `SectionHead({ heading })`: wyśrodkowany `h2` + gradientowe podkreślenie 64×3 px.

### Task 5: Sekcje

**Files:** Create pozostałe pliki z `src/components/`.

Każdy komponent dostaje gotowe fragmenty słownika przez propsy i nie importuje treści samodzielnie.

- [x] **Step 1: `Nav` (klient).** Źródło: `Nav` w `sections-top.jsx`. Zmiany: pięć linków (z „Doświadczenie”), zwykłe kotwice `href="#id"` bez `onNav`, logo jako link `#top`, przełącznik języka jako `<Link>` do `/` lub `/en` z `aria-label` ze słownika i wskaźnikiem ustawionym według bieżącego języka, przycisk CV tylko gdy `site.cvPath` nie jest `null` (atrybut `download`).
- [x] **Step 2: `Hero` (serwer).** Źródło: `HeroBg`, `HeroSplit`, `HeroCTAs`, `HeroSocials`, `HeroOverline`, `HeroCodeCard` w `hero.jsx`. Zmiany: bez `Reveal`, przycisk główny do `#experience`, linki społecznościowe z `site`, w karcie kodu wiersz `experience: '<codeExperience>'` zamiast `available: true`, stack z trzech pierwszych pozycji pierwszej grupy.
- [x] **Step 3: `About` (serwer) + `CompAccordion` (klient).** Źródło: `About`, `ExperienceHighlight`, `CompAccordion` w `sections-top.jsx`. Ikona kompetencji z pola `icon` w danych.
- [x] **Step 4: `TechStack` + `TechIcon` (serwer).** Źródło: `Stack`, `GroupChips`, `GroupLabelSide` w `stack.jsx`. `tech-icons.ts` importuje wybrane ikony z `simple-icons` i eksportuje `getTechIcon(slug)` zwracające `{ path, hex } | null`; `TechIcon` renderuje inline `<svg viewBox="0 0 24 24">` z `fill` równym kolorowi marki (biały dla `nextdotjs` i `vercel`), a przy `null` monogram z `monoText`.
- [x] **Step 5: `Experience` (klient).** Źródło: `ExpList` (wariant `timeline`), `ExpItemText`, `ExpDetail`, `Experience` w `experience.jsx`. Zmiany: sekcja dostaje `id="experience"`; lista pokazuje okres, `title` i podpis `role · employer`; w panelu nadtytuł `employer`, tytuł `title`, w wierszu meta okres i rola (ikona `briefcase`), pod punktami chipy `tags`; przyciski listy z `aria-pressed`.
- [x] **Step 6: `Projects` (serwer).** Źródło: `Projects`, `ProjectThumb` w `sections-bottom.jsx`. Linki „Demo” i „Kod” tylko gdy projekt ma `demoUrl` / `codeUrl`; przycisk GitHub do `site.github`.
- [x] **Step 7: `Contact` (serwer) + `ContactForm` (klient) + `actions.ts`.** Źródło: `Contact`, `Field` w `sections-bottom.jsx`. `actions.ts` (`"use server"`) eksportuje `sendContactMessage(prev, formData)` zwracające `{ status: "idle" | "sent" | "error", error?: "validation" | "send" }`: waliduje przez `validateContact`, przy spamie zwraca `sent` bez wysyłki, przy braku zmiennych środowiskowych lub błędzie odpowiedzi zwraca `error: "send"`, w pozostałych przypadkach wysyła `POST https://api.resend.com/emails` (`from`, `to`, `reply_to`, `subject`, `text`). `ContactForm` używa `useActionState`, pola mają `name`, `required` i `maxLength`, jest ukryte pole-pułapka `website`, przycisk pokazuje `sending` / `sent`, błąd wyświetla komunikat z linkiem `mailto:` w elemencie z `role="alert"`.
- [x] **Step 8: `Footer` (serwer) i `PortfolioPage`.** Źródło: `Footer` w `sections-bottom.jsx`. Rok liczony przy budowaniu. `PortfolioPage({ lang })` składa: `Nav`, `main` (Hero, About, TechStack, Experience, Projects, Contact), `Footer`.

### Task 6: Trasy i SEO

**Files:** Create `src/app/(pl)/layout.tsx`, `(pl)/page.tsx`, `(en)/layout.tsx`, `(en)/en/page.tsx`, `src/lib/metadata.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`.

- [x] **Step 1:** `buildMetadata(lang)` zwraca `Metadata`: `metadataBase` z `site.url`, tytuł i opis ze słownika, `alternates.canonical` (`/` lub `/en`), `alternates.languages` (`pl`, `en`, `x-default`), `openGraph` (type `website`, `locale`).
- [x] **Step 2:** Każdy layout eksportuje `metadata = buildMetadata(lang)` i renderuje `RootShell`; każda strona renderuje `<PortfolioPage lang="..." />`.
- [x] **Step 3:** `sitemap.ts` z dwoma adresami i wzajemnymi `alternates`, `robots.ts` z `allow: "/"` i adresem sitemapy.

### Task 7: Weryfikacja

- [x] **Step 1:** `npm test`: 6 testów PASS.
- [x] **Step 2:** `npm run lint`: bez błędów.
- [x] **Step 3:** `npm run build`: bez błędów, `/` i `/en` oznaczone jako statyczne.
- [x] **Step 4:** Uruchomić `npm run start` i sprawdzić w przeglądarce na 390, 820 i 1440 px, w obu językach: brak poziomego przewijania, przełącznik języka, menu mobilne, akordeon, oś czasu doświadczenia, formularz bez konfiguracji pokazuje błąd z linkiem do e-maila, konsola bez błędów.
