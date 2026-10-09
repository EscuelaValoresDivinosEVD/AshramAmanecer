"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Site header, footer and scroll effects; the visitor app (/ahora) has its own shell. */
export default function SiteChrome({ header, footer, children }: { header: ReactNode; footer: ReactNode; children: ReactNode }) {
  const app = usePathname().startsWith("/ahora");
  return (
    <>
      {!app && header}
      {children}
      {!app && footer}
    </>
  );
}
