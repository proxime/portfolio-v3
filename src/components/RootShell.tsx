import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import type { Lang } from "@/content/types";
import { fontVariables } from "@/lib/fonts";

/** Shared <html>/<body> for both root layouts; only the language differs. */
export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} className={fontVariables}>
      <body>
        {children}
        {/* Vercel Web Analytics: page views without cookies. Its script exists only on Vercel
            (VERCEL is set there during the build), so local production builds leave it out. */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
