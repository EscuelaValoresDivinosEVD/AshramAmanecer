import manifest from "@/data/images.json";

export type Img = { src: string; sm: string; w: number; h: number; alt: string };

type Entry = { src: string; sm: string; w: number; h: number; orig: string; alt: string; desc?: string };

// Lookup by original upload path ("2019/01/19.jpg"), the way content refers to images.
const byOrig = new Map<string, Entry>();
for (const e of manifest as Entry[]) byOrig.set(e.orig.split("/uploads/")[1], e);

export function img(orig: string, alt = ""): Img {
  const e = byOrig.get(orig);
  if (!e) throw new Error(`Imagen no encontrada en images.json: ${orig}`);
  return { src: e.src, sm: e.sm, w: e.w, h: e.h, alt: alt || e.alt || e.desc || "" };
}

export const hasImg = (orig: string) => byOrig.has(orig);
