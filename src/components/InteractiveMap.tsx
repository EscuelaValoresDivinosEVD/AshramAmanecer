"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MAP_HEIGHT, MAP_WIDTH, places, type Place } from "@/data/places";
import { MAP_REVEAL_ID, getLenis, usePageTransition } from "./Providers";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Cloud layers. Each one is centred at (cx, cy) in viewport %, sized in vmax,
 * and on scroll travels to (toX, toY) vmax. Outer clouds stay at the edges to
 * frame the site; inner ones fade out completely.
 */
const CLOUDS = [
  { src: 2, cx: 20, cy: 25, w: 115, flip: false, toX: -46, toY: -14, toScale: 1.3, toOpacity: 0.9 },
  { src: 3, cx: 82, cy: 22, w: 115, flip: true, toX: 46, toY: -16, toScale: 1.3, toOpacity: 0.9 },
  { src: 4, cx: 15, cy: 80, w: 120, flip: false, toX: -48, toY: 16, toScale: 1.35, toOpacity: 0.95 },
  { src: 1, cx: 85, cy: 82, w: 120, flip: true, toX: 48, toY: 14, toScale: 1.35, toOpacity: 0.95 },
  { src: 3, cx: 36, cy: 50, w: 90, flip: false, toX: -80, toY: 5, toScale: 1.5, toOpacity: 0 },
  { src: 2, cx: 64, cy: 50, w: 90, flip: true, toX: 80, toY: -5, toScale: 1.5, toOpacity: 0 },
];

/** Buildings nearer the bottom of the photo are in front: test them first. */
const HIT_ORDER = [...places].sort((a, b) => b.y + b.h - (a.y + a.h));
const MASK_SCALE = 0.5;

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

function useAlphaMasks() {
  const masks = useRef<Record<string, { data: Uint8ClampedArray; w: number; h: number }>>({});
  useEffect(() => {
    places.forEach((p) => {
      const img = new Image();
      img.src = p.image;
      img.onload = () => {
        const w = Math.ceil(p.w * MASK_SCALE);
        const h = Math.ceil(p.h * MASK_SCALE);
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        const ctx = c.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, w, h);
        masks.current[p.slug] = { data: ctx.getImageData(0, 0, w, h).data, w, h };
      };
    });
  }, []);

  // (mx, my) in base-image pixels → building under that point, by its alpha.
  return useCallback((mx: number, my: number): Place | null => {
    for (const p of HIT_ORDER) {
      if (mx < p.x || my < p.y || mx >= p.x + p.w || my >= p.y + p.h) continue;
      const m = masks.current[p.slug];
      if (!m) return p; // mask not ready yet: fall back to the bounding box
      const ix = Math.floor((mx - p.x) * MASK_SCALE);
      const iy = Math.floor((my - p.y) * MASK_SCALE);
      if (m.data[(iy * m.w + ix) * 4 + 3] > 90) return p;
    }
    return null;
  }, []);
}

export default function InteractiveMap() {
  const section = useRef<HTMLElement>(null);
  const zoom = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const [active, setActive] = useState<string | null>(null);
  const hitTest = useAlphaMasks();
  const { navigate } = usePageTransition();
  const leaving = useRef(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: MAP_REVEAL_ID,
          trigger: section.current,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.4,
          onUpdate: (st) => {
            // Only touch React state when the threshold is crossed, not every frame.
            const next = st.progress > 0.88;
            if (next !== openRef.current) setOpen((openRef.current = next));
          },
        },
      });

      tl.to(".intro-icon", { y: -140, duration: 0.3 }, 0)
        .to(".intro-letters", { y: -70, duration: 0.3 }, 0)
        .to(".map-intro", { autoAlpha: 0, duration: 0.24 }, 0.02)
        .to(".map-fog", { autoAlpha: 0, duration: 0.7 }, 0)
        .fromTo(zoom.current, { scale: 1.3 }, { scale: 1, duration: 1, ease: "power1.out" }, 0)
        .fromTo(".map-hint", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.88);

      gsap.utils.toArray<HTMLElement>(".cloud").forEach((el, i) => {
        const c = CLOUDS[i];
        gsap.set(el, { xPercent: -50, yPercent: -50 });
        tl.to(
          el,
          { x: `${c.toX}vmax`, y: `${c.toY}vmax`, scale: c.toScale, autoAlpha: c.toOpacity, duration: 0.95, ease: "power1.inOut" },
          0.05,
        );
      });
    },
    { scope: section },
  );

  // "Descubrir": glide down to the end of the reveal so the map is explorable.
  const discover = () => {
    const st = ScrollTrigger.getById(MAP_REVEAL_ID);
    if (!st) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(st.end, { duration: 3, easing: (t) => 1 - Math.pow(1 - t, 3) });
    else window.scrollTo({ top: st.end, behavior: "smooth" });
  };

  const pointToImage = (clientX: number, clientY: number) => {
    const r = stage.current!.getBoundingClientRect();
    return hitTest(((clientX - r.left) / r.width) * MAP_WIDTH, ((clientY - r.top) / r.height) * MAP_HEIGHT);
  };

  const go = (p: Place) => {
    if (leaving.current) return;
    leaving.current = true;
    setActive(p.slug);
    // Dive into the building while the page veil comes in.
    const z = zoom.current!.getBoundingClientRect();
    const b = stage.current!.querySelector<HTMLElement>(`[data-slug="${p.slug}"]`)!.getBoundingClientRect();
    gsap.set(zoom.current, { transformOrigin: `${b.left + b.width / 2 - z.left}px ${b.top + b.height / 2 - z.top}px` });
    gsap.to(zoom.current, { scale: 2.6, duration: 1.2, ease: "power3.in" });
    navigate(`/lugares/${p.slug}/`);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!open || leaving.current || e.pointerType === "touch") return;
    setActive(pointToImage(e.clientX, e.clientY)?.slug ?? null);
  };

  const onClick = (e: React.MouseEvent) => {
    if (!open || leaving.current || e.detail === 0) return;
    const hit = pointToImage(e.clientX, e.clientY);
    if (!hit) return setActive(null);
    // Touch has no hover: first tap shows the name, second tap enters.
    const isTouch = (e.nativeEvent as PointerEvent).pointerType === "touch";
    if (isTouch && active !== hit.slug) return setActive(hit.slug);
    go(hit);
  };

  const activePlace = places.find((p) => p.slug === active);

  return (
    <section ref={section} className={`map-section${open ? " is-open" : ""}`} aria-label="Mapa interactivo del Ashram">
      <div className="map-viewport">
        <img className="map-backdrop" src="/map/base-blur.webp" alt="" aria-hidden />
        <div ref={zoom} className="map-zoom">
          <div
            ref={stage}
            className={`map-stage${activePlace ? " has-active" : ""}`}
            onPointerMove={onPointerMove}
            onPointerLeave={() => !leaving.current && setActive(null)}
            onClick={onClick}
          >
            <img
              className="map-base"
              src="/map/base-2600.webp"
              srcSet="/map/base-1600.webp 1600w, /map/base-2600.webp 2600w, /map/base-3600.webp 3600w"
              sizes="max(100vw, 178svh)"
              alt="Vista aérea del Ashram Caminantes del Amanecer entre las montañas"
              fetchPriority="high"
              decoding="async"
              draggable={false}
            />
            <div className="map-dim" />
            {places.map((p) => (
              <button
                key={p.slug}
                type="button"
                data-slug={p.slug}
                className={`bld${active === p.slug ? " is-active" : ""}`}
                style={{ left: pct(p.x, MAP_WIDTH), top: pct(p.y, MAP_HEIGHT), width: pct(p.w, MAP_WIDTH), height: pct(p.h, MAP_HEIGHT) } as CSSProperties}
                tabIndex={open ? 0 : -1}
                aria-label={p.name}
                onFocus={() => setActive(p.slug)}
                onBlur={() => setActive((s) => (s === p.slug ? null : s))}
                onClick={(e) => {
                  // Pointer clicks are handled by the stage's alpha hit-test.
                  if (e.detail === 0) go(p);
                }}
              >
                <span className="bld-glow" />
                <img src={p.image} alt="" draggable={false} decoding="async" />
              </button>
            ))}
            {activePlace && (
              <div
                key={activePlace.slug}
                className="bld-label"
                style={{ left: pct(activePlace.x + activePlace.w / 2, MAP_WIDTH), top: pct(activePlace.y, MAP_HEIGHT) }}
              >
                <strong>{activePlace.name}</strong>
                <span>{activePlace.tagline}</span>
              </div>
            )}
          </div>
        </div>

        <div className="map-fog" />
        <div className="map-clouds" aria-hidden>
          {CLOUDS.map((c, i) => (
            <div
              key={i}
              className="cloud"
              style={{ left: `${c.cx}%`, top: `${c.cy}%`, width: `${c.w}vmax` }}
            >
              <img
                src={`/map/clouds/cloud-${c.src}.webp`}
                alt=""
                decoding="async"
                style={c.flip ? { transform: "scaleX(-1)" } : undefined}
              />
            </div>
          ))}
        </div>

        <div className="map-intro">
          <div className="intro-icon">
            <img src="/brand/icono.svg" alt="" />
          </div>
          <h1 className="intro-letters">
            <img src="/brand/letras-arco.svg" alt="Ashram Caminantes del Amanecer" />
          </h1>
          <button type="button" className="discover-btn" onClick={discover}>
            Descubrir <span aria-hidden>↓</span>
          </button>
        </div>
        <p className="map-hint">Pasa el cursor sobre cada lugar para conocerlo</p>
      </div>
    </section>
  );
}
