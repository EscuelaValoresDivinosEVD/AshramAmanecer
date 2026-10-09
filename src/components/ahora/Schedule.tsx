"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cronograma, ecuadorNow, nowAndNext, placeName } from "@/data/cronograma";

/** Daily routine with "now" and "next" highlighted (Ecuador time). */
export default function Schedule() {
  const [now, setNow] = useState<number | null>(null);
  const curRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    const tick = () => setNow(ecuadorNow());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  const scrolled = useRef(false);
  useEffect(() => {
    if (now !== null && !scrolled.current && curRef.current) {
      scrolled.current = true;
      curRef.current.scrollIntoView({ block: "center" });
    }
  }, [now]);

  const list = cronograma.actividades;
  const { current, next } = now === null ? { current: -1, next: -1 } : nowAndNext(list, now);

  return (
    <main className="app-page">
      <p className="sched-note">{cronograma.nota}</p>
      {cronograma.ejemplo && <p className="sched-sample">Horario de ejemplo · se reemplazará por el horario real</p>}
      <ol className="sched">
        {list.map((a, i) => {
          const lugar = placeName(a.lugar);
          const state = i === current ? " is-now" : i === next ? " is-next" : "";
          return (
            <li key={i} ref={i === current ? curRef : undefined} className={`sched-item${state}`}>
              <span className="sched-time">
                {a.hora}
                {a.fin && <small>{a.fin}</small>}
              </span>
              <div className="sched-body">
                {i === current && <span className="now-tag">Ahora</span>}
                {i === next && <span className="now-tag is-next">Siguiente</span>}
                <strong>{a.titulo}</strong>
                {lugar && (
                  <Link href={`/ahora/mapa/?lugar=${a.lugar}`} className="sched-place">
                    {lugar} · ver en el mapa
                  </Link>
                )}
                {a.detalle && <p>{a.detalle}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
