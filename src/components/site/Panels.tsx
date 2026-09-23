"use client";

import { useState } from "react";
import Pic from "./Pic";
import TLink from "./TLink";

export type PanelItem = { key: string; title: string; meta?: string; text: string; image: string; href: string; cta?: string };

/** Row of image panels; the active one widens and shows its copy (reference "Our Trips"). */
export default function Panels({ items }: { items: PanelItem[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="panels" data-reveal>
      {items.map((it, i) => (
        <TLink
          key={it.key}
          href={it.href}
          className={`panel${i === active ? " is-active" : ""}`}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
        >
          <Pic src={it.image} sizes="(max-width: 860px) 100vw, 50vw" alt={it.title} />
          <span className="panel-tab">{it.title}</span>
          <div className="panel-copy">
            {it.meta && <span className="t-cond">{it.meta}</span>}
            <h3 className="t-display">{it.title}</h3>
            <p>{it.text}</p>
            <span className="link-arrow">{it.cta ?? "Saber más"} →</span>
          </div>
        </TLink>
      ))}
    </div>
  );
}
