import p0 from "@/content/paginas/experimentar-el-ashram.json";
import p1 from "@/content/paginas/hospedaje.json";
import p2 from "@/content/paginas/refugio-natural.json";
import p3 from "@/content/paginas/sala-chikitsa.json";
import p4 from "@/content/paginas/amenidades.json";
import p5 from "@/content/paginas/lineamientos.json";
import p6 from "@/content/paginas/ubicacion-y-como-llegar.json";
import p7 from "@/content/paginas/que-visitar.json";
import p8 from "@/content/paginas/preguntas-frecuentes.json";
import p9 from "@/content/paginas/quienes-somos.json";

// Inner pages built from reusable blocks. Content lives in src/content/paginas/*.json
// (edited through Pages CMS, see .pages.yml); `**x**` marks bold.

export type Block =
  | { type: "intro"; eyebrow?: string; title?: string; text: string[] }
  | { type: "split"; eyebrow?: string; title: string; text: string[]; image: string; note?: string; reverse?: boolean }
  | { type: "infobox"; title: string; items: { title?: string; text: string }[] }
  | { type: "cards"; eyebrow?: string; title?: string; items: { title: string; text: string; image: string }[] }
  | { type: "faq"; items: { q: string; a: string[] }[] }
  | { type: "quote"; text: string; author?: string; image?: string }
  | { type: "details"; eyebrow?: string; title: string; groups: { title: string; lines: string[] }[] }
  | { type: "route"; from: string; to: string; title: string; text: string };

export type Page = {
  path: string;
  eyebrow: string;
  title: string;
  lead?: string;
  hero: string;
  blocks: Block[];
};


export const pages = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9] as Page[];

export const getPage = (path: string) => pages.find((p) => p.path === path);
