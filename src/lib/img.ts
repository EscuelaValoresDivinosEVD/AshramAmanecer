import manifest from "@/data/images.json";

export type Img = { src: string; sm?: string; w?: number; h?: number; alt: string };

type Entry = { src: string; sm: string; w: number; h: number; orig: string; alt: string; desc?: string };

const bySrc = new Map<string, Entry>();
for (const e of manifest as Entry[]) bySrc.set(e.src, e);

/**
 * Content images are public paths ("/img/espacios/maham11.webp"). Photos from
 * the previous site carry a small version and size in images.json; images
 * uploaded later through the CMS are served as they are.
 */
export function img(src: string, alt = ""): Img {
  const e = bySrc.get(src);
  if (!e) return { src, alt };
  return { src: e.src, sm: e.sm, w: e.w, h: e.h, alt: alt || e.alt || e.desc || "" };
}
