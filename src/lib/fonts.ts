import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

// next/font options must be literals, so the subsets are repeated instead of shared.
// "latin-ext" carries the Polish diacritics.

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const fontVariables = `${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`;
