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
/** Talleres y retiros on/off: when false the section is hidden everywhere
 * (menu, header, footer, home, its page) but all its content stays saved. */
export const mostrarTalleres: boolean = data.mostrar;
export const TALLERES_PATH = "/talleres-y-retiros/";
export const eventos: Evento[] = data.eventos;
