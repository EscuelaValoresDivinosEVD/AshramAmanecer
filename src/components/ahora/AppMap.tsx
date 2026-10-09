"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MAP_HEIGHT, MAP_WIDTH, places, type Place } from "@/data/places";
import { espacios } from "@/data/espacios";
import { useAlphaMasks } from "../InteractiveMap";

const ZOOMS = [1, 1.7, 2.6];
const pct = (v: number, total: number) => `${(v / total) * 100}%`;
// Places sorted left → right for the chip list.
const ORDER = [...places].sort((a, b) => a.x - b.x);

/** Cover photo of the espacio a building links to, if any. */
const coverOf = (p: Place) => espacios.find((e) => p.href === `/espacios/${e.slug}/`)?.images[0];

/** Map-only explorer for the visitor app: drag to move, tap a building to learn about it. */
export default function AppMap() {
  const scroller = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  // Point to centre once the stage has its new size after a zoom change.
  const pending = useRef<{ x: number; y: number; smooth: boolean } | null>(null);
  const [zoom, setZoom] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const hitTest = useAlphaMasks();
  const activePlace = places.find((p) => p.slug === active);

  // Centre the view on image point (x, y).
  const centerOn = (x: number, y: number, smooth = true) => {
    const sc = scroller.current, st = stage.current;
    if (!sc || !st) return;
    const k = st.offsetWidth / MAP_WIDTH;
    // Keep the point in the part of the screen not covered by the bottom panel.
    const visible = sc.clientHeight - (panel.current?.offsetHeight ?? 0);
    sc.scrollTo({ left: x * k - sc.clientWidth / 2, top: y * k - visible / 2, behavior: smooth ? "smooth" : "auto" });
  };

  const focus = (p: Place) => {
    setActive(p.slug);
    centerOn(p.x + p.w / 2, p.y + p.h / 2);
  };

  // Start on the built area, or on ?lugar=<slug> (links from the schedule).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("lugar");
    const p = places.find((q) => q.slug === slug);
    if (p) {
      setActive(p.slug);
      pending.current = { x: p.x + p.w / 2, y: p.y + p.h / 2, smooth: false };
      setZoom(1);
    } else centerOn((1734 + 3977) / 2, 1450, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Zoom around the centre of the screen.
  const changeZoom = (d: number) => {
    const sc = scroller.current, st = stage.current;
    if (!sc || !st) return;
    const k = st.offsetWidth / MAP_WIDTH;
    const cx = (sc.scrollLeft + sc.clientWidth / 2) / k, cy = (sc.scrollTop + sc.clientHeight / 2) / k;
    const z = Math.max(0, Math.min(ZOOMS.length - 1, zoom + d));
    if (z === zoom) return;
    pending.current = { x: cx, y: cy, smooth: false };
    setZoom(z);
  };

  useEffect(() => {
    const t = pending.current;
    if (!t) return;
    pending.current = null;
    requestAnimationFrame(() => centerOn(t.x, t.y, t.smooth));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom]);

  const onClick = (e: React.MouseEvent) => {
    const r = stage.current!.getBoundingClientRect();
    const hit = hitTest(((e.clientX - r.left) / r.width) * MAP_WIDTH, ((e.clientY - r.top) / r.height) * MAP_HEIGHT);
    setActive(hit?.slug ?? null);
  };

  const cover = activePlace && coverOf(activePlace);

  return (
    <main className="amap">
      <div ref={scroller} className="amap-scroll">
        <div
          ref={stage}
          className={`amap-stage${activePlace ? " has-active" : ""}`}
          style={{ "--z": ZOOMS[zoom] } as CSSProperties}
          onClick={onClick}
        >
          <img className="map-base" src="/map/base-2600.webp" srcSet="/map/base-1600.webp 1600w, /map/base-2600.webp 2600w, /map/base-3600.webp 3600w" sizes="300vh" alt="Vista aérea del Ashram" draggable={false} />
          <div className="map-dim" />
          {places.map((p) => (
            <div
              key={p.slug}
              className={`bld${active === p.slug ? " is-active" : ""}`}
              style={{ left: pct(p.x, MAP_WIDTH), top: pct(p.y, MAP_HEIGHT), width: pct(p.w, MAP_WIDTH), height: pct(p.h, MAP_HEIGHT) }}
            >
              <span className="bld-glow" />
              <img src={p.image} alt="" draggable={false} decoding="async" />
            </div>
          ))}
          {activePlace && (
            <div key={activePlace.slug} className="bld-label" style={{ left: pct(activePlace.x + activePlace.w / 2, MAP_WIDTH), top: pct(activePlace.y, MAP_HEIGHT) }}>
              <strong>{activePlace.name}</strong>
            </div>
          )}
        </div>
      </div>

      <div className="amap-zoom">
        <button type="button" onClick={() => changeZoom(1)} disabled={zoom === ZOOMS.length - 1} aria-label="Acercar">+</button>
        <button type="button" onClick={() => changeZoom(-1)} disabled={zoom === 0} aria-label="Alejar">−</button>
      </div>

      <div ref={panel} className="amap-panel">
        {activePlace ? (
          <div className="amap-sheet">
            <button type="button" className="amap-close" onClick={() => setActive(null)} aria-label="Cerrar">×</button>
            <div className="amap-sheet-media">
              <img src={cover ?? activePlace.image} alt="" className={cover ? "" : "is-cutout"} />
            </div>
            <div className="amap-sheet-copy">
              <strong>{activePlace.name}</strong>
              {activePlace.tagline && <span>{activePlace.tagline}</span>}
              {activePlace.href && (
                <a href={activePlace.href} className="amap-more">
                  Conocer más →
                </a>
              )}
            </div>
          </div>
        ) : (
          <p className="amap-hint">Toca un edificio o elige un lugar</p>
        )}
        <div className="amap-chips">
          {ORDER.map((p) => (
            <button key={p.slug} type="button" className={active === p.slug ? "is-active" : ""} onClick={() => focus(p)}>
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
