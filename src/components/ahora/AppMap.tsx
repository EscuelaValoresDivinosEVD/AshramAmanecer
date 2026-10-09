"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { MAP_HEIGHT, MAP_WIDTH, places, type Place } from "@/data/places";
import { espacios } from "@/data/espacios";
import { caminos } from "@/data/caminos";
import { useAlphaMasks } from "../InteractiveMap";

// Area that holds every place, with a margin.
const PAD = 160;
const BOX = {
  x0: Math.min(...places.map((p) => p.x)) - PAD,
  y0: Math.min(...places.map((p) => p.y)) - PAD,
  x1: Math.max(...places.map((p) => p.x + p.w)) + PAD,
  y1: Math.max(...places.map((p) => p.y + p.h)) + PAD,
};
const ORDER = [...places].sort((a, b) => a.x - b.x);
const coverOf = (p: Place) => espacios.find((e) => p.href === `/espacios/${e.slug}/`)?.images[0];

type View = { k: number; x: number; y: number }; // scale (screen px per photo px) and photo origin on screen
type Label = { p: Place; dx: number; dy: number; w: number; lx: number; ly: number };

/** Place labels around each building (screen px, relative to the building centre) so they do not overlap. */
function layoutLabels(k: number, active: string | null): Label[] {
  const placed: { l: number; t: number; r: number; b: number }[] = [];
  const hits = (a: { l: number; t: number; r: number; b: number }) => placed.some((o) => a.l < o.r && a.r > o.l && a.t < o.b && a.b > o.t);
  const order = [...places].sort((a, b) => (a.slug === active ? -1 : b.slug === active ? 1 : b.w * b.h - a.w * a.h));
  return order.map((p) => {
    const w = p.name.length * 7 + 22, h = 24;
    const cx = (p.x + p.w / 2) * k, cy = (p.y + p.h / 2) * k;
    const top = p.y * k, bottom = (p.y + p.h) * k, left = p.x * k, right = (p.x + p.w) * k;
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
    const pick = [...base, ...rings].find((o) => !hits({ l: o.l - 3, t: o.t - 3, r: o.l + w + 3, b: o.t + h + 3 })) ?? base[0];
    placed.push({ l: pick.l, t: pick.t, r: pick.l + w, b: pick.t + h });
    // Leader line end on the label edge nearest the building centre.
    const lx = Math.max(pick.l, Math.min(pick.l + w, cx)), ly = Math.max(pick.t, Math.min(pick.t + h, cy));
    return { p, dx: pick.l - cx, dy: pick.t - cy, w, lx: lx - cx, ly: ly - cy };
  });
}

/**
 * Visitor-app map, handled like a photo: drag to move (with inertia), pinch
 * or double-tap to zoom, tap a building for its card. Labels keep their size.
 */
export default function AppMap() {
  const box = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const view = useRef<View>({ k: 0, x: 0, y: 0 });
  const limits = useRef({ min: 0.05, max: 1.2 });
  const anim = useRef(0);
  const [labelK, setLabelK] = useState(0); // scale the labels were laid out for
  const [active, setActive] = useState<string | null>(null);
  const hitTest = useAlphaMasks();
  const activePlace = places.find((p) => p.slug === active);

  const size = () => {
    const el = box.current!;
    return { w: el.clientWidth, h: el.clientHeight, free: el.clientHeight - (panel.current?.offsetHeight ?? 0) };
  };

  // Keep the photo covering the screen; centre it when it is smaller.
  const clamp = (v: View): View => {
    const { w, h } = size();
    const pw = MAP_WIDTH * v.k, ph = MAP_HEIGHT * v.k;
    const x = pw <= w ? (w - pw) / 2 : Math.min(0, Math.max(w - pw, v.x));
    const y = ph <= h ? (h - ph) / 2 : Math.min(0, Math.max(h - ph, v.y));
    return { k: v.k, x, y };
  };

  const apply = useCallback((v: View) => {
    view.current = v;
    const s = stage.current;
    if (!s) return;
    s.style.transform = `translate3d(${v.x}px, ${v.y}px, 0) scale(${v.k})`;
    s.style.setProperty("--inv", String(1 / v.k));
  }, []);

  // Re-lay out labels once the view settles (not on every frame).
  const settle = useRef(0);
  const settleLabels = useCallback(() => {
    clearTimeout(settle.current);
    settle.current = window.setTimeout(() => setLabelK(view.current.k), 120);
  }, []);

  const animateTo = useCallback(
    (target: View, ms = 450) => {
      cancelAnimationFrame(anim.current);
      const from = { ...view.current }, to = clamp(target), t0 = performance.now();
      const step = (t: number) => {
        const e = Math.min(1, (t - t0) / ms), q = 1 - Math.pow(1 - e, 3);
        apply({ k: from.k + (to.k - from.k) * q, x: from.x + (to.x - from.x) * q, y: from.y + (to.y - from.y) * q });
        if (e < 1) anim.current = requestAnimationFrame(step);
        else settleLabels();
      };
      anim.current = requestAnimationFrame(step);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [apply, settleLabels],
  );

  // Zoom to scale k keeping screen point (sx, sy) fixed.
  const zoomAt = (v: View, k: number, sx: number, sy: number): View => {
    const kk = Math.max(limits.current.min, Math.min(limits.current.max, k));
    return { k: kk, x: sx - ((sx - v.x) / v.k) * kk, y: sy - ((sy - v.y) / v.k) * kk };
  };

  // View centred on photo point (ix, iy) at scale k, in the space above the bottom panel.
  const centred = (ix: number, iy: number, k: number): View => {
    const { w, free } = size();
    return { k, x: w / 2 - ix * k, y: free / 2 - iy * k };
  };

  // Starting view: the photo fills the screen height, centred on the ashram.
  useLayoutEffect(() => {
    const init = () => {
      const { w, h } = size();
      const cover = Math.max(w / MAP_WIDTH, h / MAP_HEIGHT);
      limits.current = { min: Math.min(cover, w / (BOX.x1 - BOX.x0)), max: cover * 4 };
      const first = !view.current.k;
      if (!first) return apply(clamp(view.current));
      const p = places.find((q) => q.slug === new URLSearchParams(window.location.search).get("lugar"));
      if (p) {
        setActive(p.slug);
        apply(clamp(centred(p.x + p.w / 2, p.y + p.h / 2, cover * 2)));
      } else apply(clamp(centred((BOX.x0 + BOX.x1) / 2, (BOX.y0 + BOX.y1) / 2, cover)));
      setLabelK(view.current.k);
    };
    init();
    window.addEventListener("resize", init);
    return () => window.removeEventListener("resize", init);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const focus = useCallback(
    (p: Place) => {
      setActive(p.slug);
      // Wait a frame so the bottom card has its height.
      requestAnimationFrame(() => {
        const cover = Math.max(size().w / MAP_WIDTH, size().h / MAP_HEIGHT);
        animateTo(centred(p.x + p.w / 2, p.y + p.h / 2, Math.min(cover * 3, Math.max(view.current.k, cover * 1.8))));
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [animateTo],
  );

  // Gestures: one finger pans (with inertia), two fingers pinch, double tap zooms, tap selects.
  useEffect(() => {
    const el = box.current!;
    const pts = new Map<number, { x: number; y: number }>();
    let last: { d: number; mx: number; my: number } | null = null;
    let moved = 0;
    let vel = { x: 0, y: 0, t: 0 };
    let lastTap = { t: 0, x: 0, y: 0 };
    const local = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const gesture = () => {
      const [a, b] = [...pts.values()];
      return b ? { d: Math.hypot(a.x - b.x, a.y - b.y), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 } : { d: 0, mx: a.x, my: a.y };
    };

    const down = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("button, a")) return;
      cancelAnimationFrame(anim.current);
      el.setPointerCapture(e.pointerId);
      pts.set(e.pointerId, local(e));
      if (pts.size === 1) moved = 0;
      last = gesture();
      vel = { x: 0, y: 0, t: performance.now() };
    };
    const move = (e: PointerEvent) => {
      if (!pts.has(e.pointerId) || !last) return;
      pts.set(e.pointerId, local(e));
      const g = gesture();
      let v = { ...view.current, x: view.current.x + g.mx - last.mx, y: view.current.y + g.my - last.my };
      if (g.d && last.d) v = zoomAt(v, v.k * (g.d / last.d), g.mx, g.my);
      const now = performance.now(), dt = Math.max(1, now - vel.t);
      vel = { x: (g.mx - last.mx) / dt, y: (g.my - last.my) / dt, t: now };
      moved += Math.abs(g.mx - last.mx) + Math.abs(g.my - last.my) + Math.abs(g.d - last.d);
      apply(clamp(v));
      last = g;
    };
    const up = (e: PointerEvent) => {
      if (!pts.has(e.pointerId)) return;
      const p = local(e);
      const wasPinch = pts.size > 1;
      pts.delete(e.pointerId);
      last = pts.size ? gesture() : null;
      if (pts.size) return;
      if (moved < 8 && !wasPinch) {
        const now = performance.now();
        if (now - lastTap.t < 300 && Math.hypot(p.x - lastTap.x, p.y - lastTap.y) < 30) {
          // Double tap: zoom in there, or back out when already close.
          const v = view.current;
          const k = v.k * 2.2 > limits.current.max ? limits.current.min : v.k * 2.2;
          animateTo(zoomAt(v, k, p.x, p.y), 350);
          lastTap = { t: 0, x: 0, y: 0 };
          return;
        }
        lastTap = { t: now, x: p.x, y: p.y };
        const v = view.current;
        const hit = hitTest((p.x - v.x) / v.k, (p.y - v.y) / v.k);
        if (hit) focus(hit);
        else setActive(null);
        return;
      }
      // Inertia after a flick.
      if (performance.now() - vel.t > 80) return settleLabels();
      let { x: vx, y: vy } = vel;
      const glide = () => {
        vx *= 0.94;
        vy *= 0.94;
        apply(clamp({ ...view.current, x: view.current.x + vx * 16, y: view.current.y + vy * 16 }));
        if (Math.abs(vx) + Math.abs(vy) > 0.02) anim.current = requestAnimationFrame(glide);
        else settleLabels();
      };
      anim.current = requestAnimationFrame(glide);
    };
    // Trackpad pinch (ctrl+wheel) zooms; plain wheel pans.
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      const v = view.current;
      if (e.ctrlKey) apply(clamp(zoomAt(v, v.k * Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top)));
      else apply(clamp({ ...v, x: v.x - e.deltaX, y: v.y - e.deltaY }));
      settleLabels();
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("wheel", wheel, { passive: false });
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("wheel", wheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus, hitTest]);

  const labels = useMemo(() => (labelK ? layoutLabels(labelK, active) : []), [labelK, active]);
  const cover = activePlace && coverOf(activePlace);

  return (
    <main className="amap">
      <div ref={box} className="amap-view">
        <img className="amap-backdrop" src="/map/base-blur.webp" alt="" aria-hidden />
        <div ref={stage} className={`amap-stage${activePlace ? " has-active" : ""}`} style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}>
          <img
            className="map-base"
            src="/map/base-2600.webp"
            srcSet="/map/base-1600.webp 1600w, /map/base-2600.webp 2600w, /map/base-3600.webp 3600w"
            sizes="300vh"
            alt="Vista aérea del Ashram"
            draggable={false}
          />
          <div className="amap-shade" />
          <svg className="amap-roads" viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} aria-hidden>
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
            <div key={p.slug} className={`abld${active === p.slug ? " is-active" : ""}`} style={{ left: p.x, top: p.y, width: p.w, height: p.h }}>
              <span className="bld-glow" />
              <img src={p.image} alt="" draggable={false} decoding="async" />
            </div>
          ))}
          {labels.map(({ p, dx, dy, w, lx, ly }) => (
            // Pinned to the building centre; counter-scaled so text keeps its size.
            <div key={p.slug} className="amap-pin" style={{ left: p.x + p.w / 2, top: p.y + p.h / 2 }}>
              <span
                className={`amap-leader${active === p.slug ? " is-active" : ""}`}
                style={{ width: Math.hypot(lx, ly), transform: `rotate(${Math.atan2(ly, lx)}rad)` }}
              />
              <button
                type="button"
                className={`amap-label${active === p.slug ? " is-active" : ""}`}
                style={{ left: dx, top: dy, minWidth: w }}
                onClick={() => focus(p)}
              >
                {p.name}
              </button>
            </div>
          ))}
        </div>
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
