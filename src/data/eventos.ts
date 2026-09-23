import data from "@/content/eventos.json";

// Talleres y retiros — content in src/content/eventos.json (Pages CMS).
// `ejemplos: true` shows the "Ejemplo" tag next to every event.

export type Evento = {
  slug: string;
  date: string;
  duration: string;
  title: string;
  text: string;
  image: string;
  href: string;
};

export const eventosSample: boolean = data.ejemplos;
export const eventos: Evento[] = data.eventos;
