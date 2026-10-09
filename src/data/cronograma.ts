import data from "@/content/cronograma.json";
import { places } from "./places";

// Daily routine for the visitor app (src/content/cronograma.json, Pages CMS).

export type Actividad = { hora: string; fin?: string; titulo: string; lugar?: string; detalle?: string };

export const cronograma = {
  ejemplo: data.ejemplo,
  nota: data.nota,
  actividades: [...(data.actividades as Actividad[])].sort((a, b) => toMin(a.hora) - toMin(b.hora)),
};

export function toMin(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + (m || 0);
}

/** Minutes since midnight in Ecuador, whatever the phone's time zone. */
export function ecuadorNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "America/Guayaquil", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return (get("hour") % 24) * 60 + get("minute");
}

/** Index of the activity happening now and of the next one (-1 when none). */
export function nowAndNext(list: Actividad[], now: number) {
  let current = -1;
  list.forEach((a, i) => {
    const end = a.fin ? toMin(a.fin) : i + 1 < list.length ? toMin(list[i + 1].hora) : 24 * 60;
    if (now >= toMin(a.hora) && now < end) current = i;
  });
  const next = list.findIndex((a) => toMin(a.hora) > now);
  return { current, next };
}

export const placeName = (slug?: string) => places.find((p) => p.slug === slug)?.name;
