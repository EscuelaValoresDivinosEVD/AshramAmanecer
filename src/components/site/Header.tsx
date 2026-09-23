"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { headerLeft, headerRight, menu, site } from "@/data/site";
import { getLenis } from "../Providers";
import TLink from "./TLink";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);

  // Hide on scroll down, show on scroll up (reference behaviour).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (Math.abs(dy) > 6) setHidden(dy > 0 && y > 140);
      // On the home page the intro already shows the logo; reveal it in the
      // header only once the visitor has scrolled past the cloud intro.
      setAtTop(y < window.innerHeight * 0.6);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className={`hdr${hidden && !open ? " is-hidden" : ""}${isHome && atTop ? " logo-hidden" : ""}`}>
        <nav className="hdr-side" aria-label="Principal">
          <button type="button" className="pill pill-keep" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu">
            <span className="burger" aria-hidden>
              <i />
              <i />
            </span>
            Menú
          </button>
          {headerLeft.map((l) => (
            <TLink key={l.href} href={l.href} className="pill">
              {l.label}
            </TLink>
          ))}
        </nav>
        <TLink href="/" className="hdr-logo" aria-label={`${site.name} — inicio`}>
          <img src="/brand/icono-arena.svg" alt="" />
        </TLink>
        <nav className="hdr-side right" aria-label="Secundaria">
          {headerRight.map((l, i) => (
            <TLink key={l.href} href={l.href} className={`pill${i === headerRight.length - 1 ? " pill-accent pill-keep" : ""}`}>
              {l.label}
            </TLink>
          ))}
        </nav>
      </header>

      <div className="drawer-backdrop" onClick={() => setOpen(false)} aria-hidden />
      <aside id="menu" className="drawer" aria-label="Menú" aria-hidden={!open} inert={!open}>
        <div className="drawer-top">
          <img src="/brand/letras.svg" alt={site.name} />
          <button type="button" className="drawer-close" onClick={() => setOpen(false)} aria-label="Cerrar menú">
            ✕
          </button>
        </div>
        <div className="drawer-body">
          {menu.map((g) => (
            <div key={g.label} className="drawer-group">
              <p className="t-label">{g.label}</p>
              <ul>
                {g.links.map((l) => (
                  <li key={l.href}>
                    <TLink href={l.href} className={pathname === l.href ? "is-current" : undefined}>
                      {l.label}
                    </TLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="drawer-group">
            <p className="t-label">Sendero</p>
            <ul>
              <li>
                <TLink href={site.external.evd}>Escuela Valores Divinos ↗</TLink>
              </li>
              <li>
                <TLink href={site.external.kriya}>Shiva Kriya Yoga ↗</TLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="drawer-foot">
          <p>
            <span className="t-label">Procúrate un encuentro con tu Ser</span>
            <br />
            {site.phone}
          </p>
          <TLink href="/contactanos/" className="btn btn-accent">
            Contáctanos
          </TLink>
        </div>
      </aside>
    </>
  );
}
