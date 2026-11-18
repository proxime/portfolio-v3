# Portfolio: specyfikacja wdrożenia

Data: 2026-11-17

## Cel

Jednostronicowe portfolio Norberta Kułaka (Full-stack Developer) w Next.js, oparte na gotowym designie i na treści z aktualnego CV. Strona zastępuje obecną wersję pod `norbert-kulak.pl`.

## Źródło designu

Projekt „portfolio” w Claude Design, pakiet `design_handoff_portfolio` (README, `design/Portfolio.html`, pliki `.jsx`). README z tego pakietu jest obowiązującą specyfikacją wizualną: kolory, typografia, odstępy, stany hover, breakpointy, dostępność i warianty domyślne (hero „split” z kartą kodu, akordeon kompetencji, chipy z logo, oś czasu doświadczenia, wyśrodkowane nagłówki z gradientowym podkreśleniem).

Ten dokument opisuje tylko odstępstwa od README i decyzje, których README nie rozstrzyga. Gdzie nie ma tu zapisu, obowiązuje README.

## Technologia

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, npm.
- Strona w całości statyczna (SSG), hosting na Vercel.
- Fonty przez `next/font/google` z podzbiorem `latin-ext`: Space Grotesk, Inter, JetBrains Mono.
- Komponenty klienckie tylko tam, gdzie jest stan: nawigacja (scroll, menu mobilne), akordeon kompetencji, oś czasu doświadczenia, formularz kontaktowy. Reszta to komponenty serwerowe.
- Bez bibliotek UI i bez biblioteki animacji.

## Odstępstwa od README

### Języki

- Dwa adresy zamiast przełączania w przeglądarce: `/` po polsku, `/en` po angielsku. Bez `localStorage`.
- Każdy język ma własny root layout (grupy tras `(pl)` i `(en)`), więc `<html lang>` jest poprawny już w HTML-u z serwera.
- Przełącznik PL/EN z designu jest linkiem do drugiej wersji. Skutek: wskaźnik nie animuje przesunięcia, bo zmiana języka to pełne przejście między stronami.
- Metadane per język: tytuł, opis, `canonical`, `hreflang` dla obu wersji, Open Graph. Do tego `sitemap.xml` i `robots.txt`.

### Nawigacja i kolejność sekcji

- Kolejność: Hero, O mnie, Doświadczenie, Tech stack, Projekty, Kontakt, Stopka.
- W nawigacji i stopce dochodzi link „Doświadczenie”.
- Główny przycisk w hero to „O mnie” / „About me” i prowadzi do sekcji „O mnie”.
- Przewijanie do kotwic przez CSS (`scroll-behavior: smooth`, `scroll-margin-top: 72px`), bez obsługi w JavaScript. Przy `prefers-reduced-motion` bez płynnego przewijania.

### Hero

- Rola: „Full-stack Developer”.
- Karta kodu: wiersz `experience: 6` (liczba lat z panelu „O mnie”), a pod nim `available: true`.
- Zdanie wartości oparte na podsumowaniu z CV.

### O mnie

- Bio w dwóch akapitach na podstawie CV, bez zdania „po godzinach” i bez deklaracji, których nie da się poprzeć.
- Panel liczb: „6” lat doświadczenia; pod spodem „4 produkty komercyjne” i „15 aplikacji React w jednej platformie”.
- Sześć kompetencji: interfejsy React i Next.js, funkcje full-stack (NestJS, GraphQL), integracje CMS, wydajność i stabilność na produkcji, praca z AI, współpraca. Wypadają „Dostępność” i „Animacje”. Dochodzą dwie ikony w stylu pozostałych: dokument (CMS) i iskry (AI).

### Tech stack

- Pozycje zgodne z CV, w grupach: Frontend, Stylowanie, Dane i API, Formularze, Backend, Narzędzia, AI.
- Loga wbudowane przy budowaniu z pakietu `simple-icons` (inline SVG w kolorach marek, czarne loga wymuszone na biało). Brak loga w pakiecie oznacza dwuliterowy monogram z designu. Bez żądań do CDN.

### Doświadczenie

- Pięć pozycji: platforma AI roleplay, marketplace do rezerwacji barmanów, strona szwajcarskiego biura inżynierskiego, platforma ESG i compliance, Nextrope.
- Projekty komercyjne są zanonimizowane: bez nazw klientów, produktów i domen.
- Mapowanie pól na layout z designu: na liście po lewej okres, nazwa projektu i podpis „rola · firma”; w panelu szczegółów nadtytuł z nazwą firmy, tytuł z nazwą projektu, wiersz meta z okresem i rolą (zamiast lokalizacji), opis, punkty.
- Dodatek: pod punktami wiersz chipów z technologiami projektu, w stylu tagów z kart projektów.

### Projekty

- Trzy karty z placeholderami w wyglądzie z designu. Treść, miniatury i linki zostaną uzupełnione później.
- Dopóki projekt nie ma linków, „Demo” i „Kod” nie są renderowane jako aktywne linki.
- Przycisk „Zobacz więcej na GitHubie” prowadzi do `github.com/proxime`.

### Kontakt

- Formularz wysyła wiadomość naprawdę: server action wywołuje API Resend. Konfiguracja przez zmienne środowiskowe `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
- Walidacja po stronie serwera (imię, poprawny e-mail, treść), pole-pułapka na boty.
- Stany: wysyłanie, sukces („Wysłano - dzięki!”), błąd z komunikatem i linkiem do e-maila. Brak konfiguracji daje stan błędu, nigdy udawany sukces.

### Stopka

- Tagline: „Zbudowane w Next.js i Tailwind CSS.” / „Built with Next.js and Tailwind CSS.”

## Treść i dane

- Cała treść PL i EN w jednym module danych z typami TypeScript; komponenty nie zawierają tekstów.
- Dane osobowe i linki w jednym miejscu: imię i nazwisko, e-mail, GitHub, LinkedIn, ścieżka do CV.
- Do uzupełnienia przez właściciela: adres profilu LinkedIn, plik CV w PDF (`public/cv/`), trzy projekty, klucz Resend.

## Weryfikacja

- `npm run build` i `npm run lint` bez błędów.
- Sprawdzenie w przeglądarce na szerokościach 390, 820 i 1440 px: obie wersje językowe, przełącznik języka, menu mobilne, akordeon, oś czasu doświadczenia, formularz w stanie błędu bez konfiguracji.

## Poza zakresem

- Treść i miniatury projektów własnych.
- Porządki na GitHubie.
- Wdrożenie na Vercel i przepięcie domeny.
