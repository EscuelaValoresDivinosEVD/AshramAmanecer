"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cronograma, ecuadorNow, nowAndNext, placeName } from "@/data/cronograma";

const greeting = (min: number) => (min < 12 * 60 ? "Buenos días" : min < 19 * 60 ? "Buenas tardes" : "Buenas noches");

/** "Now" and "next" from the daily routine, refreshed every minute. */
export default function NowCard() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(ecuadorNow());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const list = cronograma.actividades;
  const { current, next } = now === null ? { current: -1, next: -1 } : nowAndNext(list, now);
  const cur = list[current];
  const nxt = list[next];

  return (
    <Link href="/ahora/cronograma/" className="now-card">
      <p className="now-hello">{now === null ? "Bienvenido" : greeting(now)}</p>
      {cur ? (
        <p className="now-main">
          <span className="now-tag">Ahora</span>
          {cur.titulo}
          {placeName(cur.lugar) && <small> · {placeName(cur.lugar)}</small>}
        </p>
      ) : (
        <p className="now-main">Tiempo libre</p>
      )}
      {nxt && (
        <p className="now-next">
          Luego, a las {nxt.hora}: <strong>{nxt.titulo}</strong>
        </p>
      )}
    </Link>
  );
}
