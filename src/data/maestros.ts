import data from "@/content/maestros.json";

// Content in src/content/maestros.json (Pages CMS).

export type Maestro = { name: string; image: string; href: string; text: string[] };

export const matajiQuote: string = data.cita;
export const maestros: Maestro[] = data.maestros;
