"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MAP_HEIGHT, MAP_WIDTH, type Place } from "@/data/places";
import { usePageTransition } from "./Providers";

gsap.registerPlugin(useGSAP);

/** PROVISIONAL detail page — layout and copy to be defined. */
export default function PlaceDetail({ place }: { place: Place }) {
  const root = useRef<HTMLElement>(null);
  const { navigate } = usePageTransition();
  const focus = `${((place.x + place.w / 2) / MAP_WIDTH) * 100}% ${((place.y + place.h / 2) / MAP_HEIGHT) * 100}%`;

  useGSAP(
    () => {
      gsap
        .timeline({ delay: 0.35 })
        .from(".detail-bg img", { scale: 1.9, duration: 2.2, ease: "power3.out" }, 0)
        .from(".detail-figure", { autoAlpha: 0, y: 40, scale: 0.94, duration: 1.3, ease: "power3.out" }, 0.1)
        .from(".detail-copy > *", { autoAlpha: 0, y: 24, stagger: 0.08, duration: 1, ease: "power3.out" }, 0.3);
    },
    { scope: root },
  );

  return (
    <main ref={root} className="detail">
      <div className="detail-bg" aria-hidden>
        <img src="/map/base-1600.webp" alt="" style={{ objectPosition: focus, transformOrigin: focus }} />
      </div>
      <div className="detail-inner">
        <figure className="detail-figure">
          <span className="bld-glow" />
          <img src={place.image} alt={place.name} />
        </figure>
        <div className="detail-copy">
          <img className="detail-brand" src="/brand/icono-arena.svg" alt="Ashram Caminantes del Amanecer" />
          <h1>{place.name}</h1>
          <p className="detail-tagline">{place.tagline}</p>
          <p>
            Página provisional. Aquí irá la descripción del lugar, fotografías, horarios y todo lo que quieras contar
            sobre este espacio.
          </p>
          <a
            href="/"
            className="back-link"
            onClick={(e) => {
              e.preventDefault();
              navigate("/", { revealMap: true });
            }}
          >
            ← Volver al mapa
          </a>
        </div>
      </div>
    </main>
  );
}
