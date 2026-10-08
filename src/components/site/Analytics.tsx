"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Google Analytics 4 (same property as the previous site). It only loads after
// the visitor accepts cookies; the choice is remembered in this browser.
const GA_ID = "G-60QGLSHEMS";
const KEY = "ashram-cookies";

type W = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };

function loadGA() {
  const w = window as W;
  if (w.gtag) return;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID, { anonymize_ip: true });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

const read = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

export default function Analytics() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const c = read();
    setChoice(c);
    if (c === "si") loadGA();
  }, []);

  // Client-side navigations don't reload the page: report them as page views.
  const [first, setFirst] = useState(true);
  useEffect(() => {
    if (first) return setFirst(false);
    const w = window as W;
    if (choice === "si" && w.gtag) w.gtag("event", "page_view", { page_path: pathname, page_location: location.href });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const decide = (c: "si" | "no") => {
    try {
      localStorage.setItem(KEY, c);
    } catch {}
    setChoice(c);
    if (c === "si") loadGA();
  };

  if (choice !== null || pathname.startsWith("/admin")) return null;
  return (
    <div className="cookies" role="dialog" aria-label="Cookies">
      <p>
        Usamos cookies de Google Analytics para saber cuántas personas visitan el sitio y mejorarlo. ¿Nos permites medir
        tu visita?
      </p>
      <div>
        <button type="button" className="btn btn-accent" onClick={() => decide("si")}>
          Aceptar
        </button>
        <button type="button" className="btn" onClick={() => decide("no")}>
          Rechazar
        </button>
      </div>
    </div>
  );
}
