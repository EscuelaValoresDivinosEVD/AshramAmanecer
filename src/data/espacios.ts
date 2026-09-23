import data from "@/content/espacios.json";

// "Espacios de Luz" — content in src/content/espacios.json (Pages CMS).

export type Espacio = {
  slug: string;
  name: string;
  /** Short line for cards. */
  kind: string;
  text: string;
  images: string[];
};

export const espaciosIntro: string = data.intro;
export const espacios: Espacio[] = data.espacios;

export const getEspacio = (slug: string) => espacios.find((e) => e.slug === slug);
