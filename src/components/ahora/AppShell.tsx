"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { IconAtras } from "./Icons";

const TITLES: Record<string, string> = { "/ahora/mapa/": "Mapa", "/ahora/cronograma/": "Cronograma" };

/** Top bar of the visitor app + offline support (service worker). */
export default function AppShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const norm = path.endsWith("/") ? path : `${path}/`;
  const home = norm === "/ahora/";

  useEffect(() => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/ahora/sw.js", { scope: "/ahora/" }).catch(() => {});
  }, []);

  return (
    <div className="app">
      <header className="app-bar">
        {home ? (
          <span className="app-bar-brand">
            <img src="/brand/icono-arena.svg" alt="" />
            Ahora en el Ashram
          </span>
        ) : (
          <>
            <Link href="/ahora/" className="app-back" aria-label="Volver al inicio de la app">
              <IconAtras />
            </Link>
            <span className="app-bar-title">{TITLES[norm] ?? ""}</span>
            <img className="app-bar-icon" src="/brand/icono-arena.svg" alt="" />
          </>
        )}
      </header>
      <div className="app-body">{children}</div>
    </div>
  );
}
