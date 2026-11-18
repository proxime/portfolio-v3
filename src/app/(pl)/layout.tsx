import type { ReactNode } from "react";
import { RootShell } from "@/components/RootShell";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("pl");

export default function PolishLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="pl">{children}</RootShell>;
}
