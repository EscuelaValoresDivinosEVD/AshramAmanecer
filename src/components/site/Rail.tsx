"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Espacio } from "@/data/espacios";
import Pic from "./Pic";
import TLink from "./TLink";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Pinned section that scrolls the Espacios de Luz sideways (reference "Our Camps"). */
export default function Rail({ items, intro, title }: { items: Espacio[]; intro: string; title: string }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 861px)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: ".rail-pin",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
        gsap.to(".rail-progress i", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="rail on-dark grid-lines">
      <div className="rail-pin">
        <div ref={track} className="rail-track">
          <div className="rail-intro">
            <p className="t-label">{items.length} espacios de luz</p>
            <h2 className="t-display t-xl" style={{ margin: "0.4rem 0 1.4rem" }}>
              {title}
            </h2>
            <p>{intro}</p>
            <p>
              <TLink href="/espacios/" className="link-arrow">
                Ver todos los espacios →
              </TLink>
            </p>
          </div>
          {items.map((e, i) => (
            <TLink key={e.slug} href={`/espacios/${e.slug}/`} className="rail-card">
              <Pic src={e.images[0]} sizes="(max-width: 860px) 78vw, 26vw" alt={e.name} />
              <div className="rail-card-copy">
                <span className="t-cond">
                  {String(i + 1).padStart(2, "0")} · {e.kind}
                </span>
                <h3 className="t-display">{e.name}</h3>
              </div>
            </TLink>
          ))}
        </div>
        <div className="rail-progress" aria-hidden>
          <i />
        </div>
      </div>
    </section>
  );
}
