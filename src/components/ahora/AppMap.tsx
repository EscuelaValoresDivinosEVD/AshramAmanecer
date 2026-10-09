"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { MAP_HEIGHT, MAP_WIDTH, places, type Place } from "@/data/places";
import { espacios } from "@/data/espacios";
import { caminos } from "@/data/caminos";
import { useAlphaMasks } from "../InteractiveMap";

// Area that holds every place, with a margin: the starting view shows it whole.
const PAD = 160;
const BOX = {
  x0: Math.min(...places.map((p) => p.x)) - PAD,
  y0: Math.min(...places.map((p) => p.y)) - PAD,
  x1: Math.max(...places.map((p) => p.x + p.w)) + PAD,
  y1: Math.max(...places.map((p) => p.y + p.h)) + PAD,
};
const MAX_ZOOM = 6; // times the starting scale
const PANEL_SPACE = 120; // bottom chips/hint strip
const ORDER = [...places].sort((a, b) => a.x - b.x);

const coverOf = (p: Place) => espacios.find((e) => p.href === `/espacios/${e.slug}/`)?.images[0];

type Label = { p: Place; left: number; top: number; w: number; ax: number; ay: number };

/** Lay labels out in screen pixels so they do not overlap: above, below, left or right of each building. */
function layoutLabels(k: number, active: string | null): Label[] {
  const placed: { l: number; t: number; r: number; b: number }[] = [];
  const hits = (a: { l: number; t: number; r: number; b: number }) => placed.some((o) => a.l < o.r && a.r > o.l && a.t < o.b && a.b > o.t);
  // Active first, then larger buildings.
  const order = [...places].sort((a, b) => (a.slug === active ? -1 : b.slug === active ? 1 : b.w * b.h - a.w * a.h));
  return order.map((p) => {
    const w = p.name.length * 7 + 22, h = 24;
    const cx = (p.x + p.w / 2) * k, top = p.y * k, bottom = (p.y + p.h) * k, left = p.x * k, right = (p.x + p.w) * k, cy = (p.y + p.h / 2) * k;
    // Candidates: above, below, beside, then rings further out; kept inside the starting view.
    const minL = BOX.x0 * k + 4, maxL = BOX.x1 * k - w - 4;
    const base = [
      { l: cx - w / 2, t: top - h - 6 },
      { l: cx - w / 2, t: bottom + 6 },
      { l: right + 6, t: cy - h / 2 },
      { l: left - w - 6, t: cy - h / 2 },
    ];
    const rings = [28, 56, 84, 112, 140, 170, 200].flatMap((r) =>
      [-90, -45, -135, 90, 45, 135, 0, 180].map((deg) => ({
        l: cx - w / 2 + Math.cos((deg * Math.PI) / 180) * (r + w / 2),
        t: top - h - 6 + Math.sin((deg * Math.PI) / 180) * r,
      })),
    );
    const options = [...base, ...rings].map((o) => ({ l: Math.max(minL, Math.min(maxL, o.l)), t: o.t }));
    const pick = options.find((o) => !hits({ l: o.l - 3, t: o.t - 3, r: o.l + w + 3, b: o.t + h + 3 })) ?? options[0];
    placed.push({ l: pick.l, t: pick.t, r: pick.l + w, b: pick.t + h });
    // Leader line: from the label edge nearest the building to the building's centre.
    const lx = Math.max(pick.l, Math.min(pick.l + w, cx)), ly = Math.max(pick.t, Math.min(pick.t + h, cy));
    return { p, left: pick.l + w / 2, top: pick.t, w, ax: lx, ay: ly };
  });
}

/** Visitor-app map: whole ashram at a glance, every place named; pinch or +/− to zoom, tap for details. */
export default function AppMap() {
  const scroller = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [kMin, setKMin] = useState(0);
  const [k, setK] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const hitTest = useAlphaMasks();
  const activePlace = places.find((p) => p.slug === active);
  // Image point to keep at a screen point after the next scale change.
  const anchor = useRef<{ ix: number; iy: number; sx: number; sy: number } | null>(null);

  const visibleH = () => (scroller.current?.clientHeight ?? 0) - (panel.current?.offsetHeight ?? PANEL_SPACE);

  // Starting scale: the whole built area fits above the bottom panel.
  useLayoutEffect(() => {
    const fit = () => {
      const sc = scroller.current;
      if (!sc) return;
      const km = Math.min(sc.clientWidth / (BOX.x1 - BOX.x0), Math.max(120, visibleH()) / (BOX.y1 - BOX.y0));
      setKMin(km);
      setK((cur) => (cur ? Math.max(cur, km) : km));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // Stage is at least as big as the viewport: the photo is centred when smaller.
  const stageW = MAP_WIDTH * k, stageH = MAP_HEIGHT * k;

  const centerOn = useCallback((ix: number, iy: number, scale: number, smooth = false) => {
    const sc = scroller.current;
    if (!sc) return;
    sc.scrollTo({ left: ix * scale - sc.clientWidth / 2, top: iy * scale - visibleH() / 2, behavior: smooth ? "smooth" : "auto" });
  }, []);

  // First view: the whole built area, or ?lugar=<slug> (links from the schedule).
  const started = useRef(false);
  useLayoutEffect(() => {
    if (!k || started.current) return;
    started.current = true;
    const p = places.find((q) => q.slug === new URLSearchParams(window.location.search).get("lugar"));
    if (p) {
      setActive(p.slug);
      anchor.current = { ix: p.x + p.w / 2, iy: p.y + p.h / 2, sx: -1, sy: -1 };
      setK(kMin * 2.2);
    } else centerOn((BOX.x0 + BOX.x1) / 2, (BOX.y0 + BOX.y1) / 2, k);
  }, [k, kMin, centerOn]);

  // After a scale change, scroll so the anchored point stays put.
  useLayoutEffect(() => {
    const a = anchor.current, sc = scroller.current;
    if (!a || !sc) return;
    anchor.current = null;
    if (a.sx < 0) return centerOn(a.ix, a.iy, k);
    sc.scrollLeft = a.ix * k - a.sx;
    sc.scrollTop = a.iy * k - a.sy;
  }, [k, centerOn]);

  const zoomTo = useCallback(
    (next: number, sx?: number, sy?: number) => {
      const sc = scroller.current;
      if (!sc || !kMin) return;
      const nk = Math.max(kMin, Math.min(kMin * MAX_ZOOM, next));
      const px = sx ?? sc.clientWidth / 2, py = sy ?? visibleH() / 2;
      anchor.current = { ix: (sc.scrollLeft + px) / k, iy: (sc.scrollTop + py) / k, sx: px, sy: py };
      setK(nk);
    },
    [k, kMin],
  );

  // Pinch to zoom (two fingers); one finger scrolls natively.
  useEffect(() => {
    const sc = scroller.current;
    if (!sc) return;
    let start: { d: number; k: number } | null = null;
    const dist = (t: TouchList) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    const mid = (t: TouchList) => {
      const r = sc.getBoundingClientRect();
      return [(t[0].clientX + t[1].clientX) / 2 - r.left, (t[0].clientY + t[1].clientY) / 2 - r.top];
    };
    const onStart = (e: TouchEvent) => {
      if (e.touches.length === 2) start = { d: dist(e.touches), k };
    };
    const onMove = (e: TouchEvent) => {
      if (!start || e.touches.length !== 2) return;
      e.preventDefault();
      const [mx, my] = mid(e.touches);
      zoomTo(start.k * (dist(e.touches) / start.d), mx, my);
    };
    const onEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) start = null;
    };
    // Trackpad pinch / ctrl+wheel on computers.
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const r = sc.getBoundingClientRect();
      zoomTo(k * Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top);
    };
    sc.addEventListener("touchstart", onStart, { passive: true });
    sc.addEventListener("touchmove", onMove, { passive: false });
    sc.addEventListener("touchend", onEnd);
    sc.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      sc.removeEventListener("touchstart", onStart);
      sc.removeEventListener("touchmove", onMove);
      sc.removeEventListener("touchend", onEnd);
      sc.removeEventListener("wheel", onWheel);
    };
  }, [k, zoomTo]);

  const focus = (p: Place) => {
    setActive(p.slug);
    const target = Math.max(k, kMin * 2.2);
    if (target !== k) {
      anchor.current = { ix: p.x + p.w / 2, iy: p.y + p.h / 2, sx: -1, sy: -1 };
      setK(target);
    } else centerOn(p.x + p.w / 2, p.y + p.h / 2, k, true);
  };

  const onStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const hit = hitTest(((e.clientX - r.left) / r.width) * MAP_WIDTH, ((e.clientY - r.top) / r.height) * MAP_HEIGHT);
    if (hit) focus(hit);
    else setActive(null);
  };

  const labels = useMemo(() => (k ? layoutLabels(k, active) : []), [k, active]);
  const cover = activePlace && coverOf(activePlace);
  const zoomed = kMin ? k / kMin : 1;

  return (
    <main className="amap">
      <div ref={scroller} className="amap-scroll">
        <div className="amap-canvas" style={{ width: `max(100%, ${stageW}px)`, height: `max(100%, ${stageH + PANEL_SPACE}px)` }}>
          <div className={`amap-stage${activePlace ? " has-active" : ""}`} style={{ width: stageW, height: stageH }} onClick={onStageClick}>
            <img
              className="map-base"
              src="/map/base-2600.webp"
              srcSet="/map/base-1600.webp 1600w, /map/base-2600.webp 2600w, /map/base-3600.webp 3600w"
              sizes={`${Math.round(stageW)}px`}
              alt="Vista aérea del Ashram"
              draggable={false}
            />
            <div className="amap-shade" />
            <svg className="amap-roads" viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} preserveAspectRatio="none" aria-hidden>
              {caminos.map((c, i) => {
                const d = c.puntos.map(([x, y], j) => `${j ? "L" : "M"}${x} ${y}`).join(" ");
                return (
                  <g key={i} className={`road road-${c.tipo}`}>
                    <path d={d} className="road-casing" />
                    <path d={d} className="road-line" />
                  </g>
                );
              })}
            </svg>
            {places.map((p) => (
              <div
                key={p.slug}
                className={`abld${active === p.slug ? " is-active" : ""}`}
                style={{ left: p.x * k, top: p.y * k, width: p.w * k, height: p.h * k }}
              >
                <span className="bld-glow" />
                <img src={p.image} alt="" draggable={false} decoding="async" />
              </div>
            ))}
            <svg className="amap-leaders" width={stageW} height={stageH} aria-hidden>
              {labels.map(({ p, ax, ay }) => (
                <line key={p.slug} x1={ax} y1={ay} x2={(p.x + p.w / 2) * k} y2={(p.y + p.h / 2) * k} className={active === p.slug ? "is-active" : ""} />
              ))}
            </svg>
            {labels.map(({ p, left, top, w }) => (
              <button
                key={p.slug}
                type="button"
                className={`amap-label${active === p.slug ? " is-active" : ""}`}
                style={{ left, top, minWidth: w }}
                onClick={(e) => {
                  e.stopPropagation();
                  focus(p);
                }}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div ref={panel} className="amap-panel">
        <div className="amap-zoom">
        <button type="button" onClick={() => zoomTo(k * 1.6)} disabled={zoomed >= MAX_ZOOM - 0.01} aria-label="Acercar">+</button>
        <button type="button" onClick={() => zoomTo(k / 1.6)} disabled={zoomed <= 1.01} aria-label="Alejar">−</button>
        <button
          type="button"
          className="amap-fit"
          onClick={() => {
            setActive(null);
            anchor.current = { ix: (BOX.x0 + BOX.x1) / 2, iy: (BOX.y0 + BOX.y1) / 2, sx: -1, sy: -1 };
            if (k === kMin) centerOn(anchor.current.ix, anchor.current.iy, k, true), (anchor.current = null);
            else setK(kMin);
          }}
          aria-label="Ver todo el Ashram"
        >
          ⤢
        </button>
        </div>

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
          <p className="amap-hint">Toca un lugar · pellizca para acercar</p>
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
