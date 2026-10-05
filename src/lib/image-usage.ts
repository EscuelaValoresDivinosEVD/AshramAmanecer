import { readdirSync } from "fs";
import path from "path";
import manifest from "@/data/images.json";
import inicio from "@/content/inicio.json";
import espaciosData from "@/content/espacios.json";
import maestrosData from "@/content/maestros.json";
import eventosData from "@/content/eventos.json";
import portadas from "@/content/portadas.json";
import { pages } from "@/data/pages";
import { places } from "@/data/places";

// Builds the admin image gallery (/admin/imagenes/): every image the site
// shows, where it appears, and a link that opens that spot in Pages CMS.

const CMS = "https://app.pagescms.org/EscuelaValoresDivinosEVD/AshramAmanecer/main";
const cmsFile = (name: string) => `${CMS}/file/${name}`;
const cmsEntry = (collection: string, file: string) => `${CMS}/collection/${collection}/edit/${encodeURIComponent(file)}`;

/** file + JSON path let the admin API replace exactly this occurrence. */
export type Usage = { where: string; page?: string; edit?: string; file?: string; ptr?: (string | number)[] };
export type ImageRow = {
  src: string;
  thumb: string;
  w?: number;
  h?: number;
  desc?: string;
  group: string;
  usages: Usage[];
  /** Only replaceable in code (map geometry, logos, clouds). */
  codeOnly?: boolean;
};

type Entry = { src: string; sm: string; w: number; h: number; desc?: string };
const meta = new Map((manifest as Entry[]).map((e) => [e.src, e]));

export function collectImages() {
  const rows = new Map<string, ImageRow>();
  const add = (src: string | undefined, group: string, u: Usage, codeOnly = false) => {
    if (!src) return;
    let r = rows.get(src);
    if (!r) {
      const m = meta.get(src);
      r = { src, thumb: m?.sm ?? src, w: m?.w, h: m?.h, desc: m?.desc, group, usages: [], codeOnly };
      rows.set(src, r);
    }
    r.usages.push(u);
  };

  // Inicio
  const home = cmsFile("inicio");
  const fi = "src/content/inicio.json";
  add(inicio.banner.image, "Inicio", { where: "Inicio › Foto grande «Un refugio de luz»", page: "/", edit: home, file: fi, ptr: ["banner", "image"] });
  add(inicio.kriya.image, "Inicio", { where: "Inicio › Shiva Kriya Yoga (antes del video)", page: "/", edit: home, file: fi, ptr: ["kriya", "image"] });
  add(inicio.quote.image, "Inicio", { where: "Inicio › Cita de Mataji (fondo)", page: "/", edit: home, file: fi, ptr: ["quote", "image"] });
  inicio.practices.items.forEach((it, i) =>
    add(it.image, "Inicio", { where: `Inicio › Paneles de prácticas › ${it.title}`, page: "/", edit: home, file: fi, ptr: ["practices", "items", i, "image"] }),
  );
  add(inicio.cta.image, "Inicio", { where: "Banner final «Comienza tu camino» (casi todas las páginas)", page: "/", edit: home, file: fi, ptr: ["cta", "image"] });

  // Espacios
  const esp = cmsFile("espacios");
  espaciosData.espacios.forEach((e, ei) =>
    e.images.forEach((src, i) =>
      add(src, "Espacios de Luz", {
        where: `Espacios › ${e.name} › ${i === 0 ? "Portada (también en listado y carrusel)" : `Galería, foto ${i + 1}`}`,
        page: `/espacios/${e.slug}/`,
        edit: esp,
        file: "src/content/espacios.json",
        ptr: ["espacios", ei, "images", i],
      }),
    ),
  );

  // Block pages
  const files = readdirSync(path.join(process.cwd(), "src/content/paginas"));
  for (const p of pages) {
    const file = files.find((f) => p.path.replace(/\/$/, "").endsWith(f.replace(/\.json$/, "")));
    const fp = file ? `src/content/paginas/${file}` : undefined;
    const edit = fp ? cmsEntry("paginas", fp) : undefined;
    add(p.hero, "Páginas", { where: `${p.title} › Portada`, page: p.path, edit, file: fp, ptr: ["hero"] });
    p.blocks.forEach((b, i) => {
      if (b.type === "split") add(b.image, "Páginas", { where: `${p.title} › Sección ${i + 1} «${b.title}»`, page: p.path, edit, file: fp, ptr: ["blocks", i, "image"] });
      if (b.type === "quote") add(b.image, "Páginas", { where: `${p.title} › Sección ${i + 1} (cita)`, page: p.path, edit, file: fp, ptr: ["blocks", i, "image"] });
      if (b.type === "cards")
        b.items.forEach((it, k) =>
          add(it.image, "Páginas", { where: `${p.title} › Tarjeta «${it.title}»`, page: p.path, edit, file: fp, ptr: ["blocks", i, "items", k, "image"] }),
        );
    });
  }

  // Other pages
  const port = cmsFile("portadas");
  add(portadas.espacios.hero, "Páginas", { where: "Espacios de Luz (listado) › Portada", page: "/espacios/", edit: port, file: "src/content/portadas.json", ptr: ["espacios", "hero"] });
  add(portadas.espacios.cta, "Páginas", { where: "Espacios de Luz (listado) › Banner final", page: "/espacios/", edit: port, file: "src/content/portadas.json", ptr: ["espacios", "cta"] });
  add(portadas.estadia.hero, "Páginas", { where: "Estadía › Portada", page: "/estadias/", edit: port, file: "src/content/portadas.json", ptr: ["estadia", "hero"] });
  add(portadas.mataji.hero, "Páginas", { where: "Mataji Shaktiananda › Portada", page: "/mataji-shaktiananda/", edit: port, file: "src/content/portadas.json", ptr: ["mataji", "hero"] });
  add(portadas.mataji.foto, "Páginas", { where: "Mataji Shaktiananda › Foto junto al texto", page: "/mataji-shaktiananda/", edit: port, file: "src/content/portadas.json", ptr: ["mataji", "foto"] });
  add(portadas.mataji.cita, "Páginas", { where: "Mataji Shaktiananda › Fondo de la cita", page: "/mataji-shaktiananda/", edit: port, file: "src/content/portadas.json", ptr: ["mataji", "cita"] });
  add(portadas.talleres.hero, "Páginas", { where: "Talleres y retiros › Portada", page: "/talleres-y-retiros/", edit: port, file: "src/content/portadas.json", ptr: ["talleres", "hero"] });
  add(portadas.contacto.hero, "Páginas", { where: "Contáctanos › Portada", page: "/contactanos/", edit: port, file: "src/content/portadas.json", ptr: ["contacto", "hero"] });

  maestrosData.maestros.forEach((m, i) =>
    add(m.image, "Maestros y eventos", { where: `Maestros › ${m.name}`, page: "/quienes-somos/", edit: cmsFile("maestros"), file: "src/content/maestros.json", ptr: ["maestros", i, "image"] }),
  );
  eventosData.eventos.forEach((e, i) =>
    add(e.image, "Maestros y eventos", { where: `Talleres y retiros › ${e.title}`, page: "/talleres-y-retiros/", edit: cmsFile("eventos"), file: "src/content/eventos.json", ptr: ["eventos", i, "image"] }),
  );

  // Map and brand: fixed artwork, replaced in code only.
  add("/map/base-1600.webp", "Mapa y marca", { where: "Mapa › Foto aérea de fondo (los edificios están alineados al píxel)", page: "/" }, true);
  places.forEach((p) => add(p.image, "Mapa y marca", { where: `Mapa › Recorte del edificio «${p.name}»`, page: "/" }, true));
  [1, 2, 3, 4].forEach((n) => add(`/map/clouds/cloud-${n}.webp`, "Mapa y marca", { where: `Mapa › Nube ${n}`, page: "/" }, true));
  for (const [f, label] of [
    ["icono.svg", "Ícono (domo) en malva"],
    ["icono-arena.svg", "Ícono (domo) en arena: header y favicon"],
    ["letras-arco.svg", "Letras en arco: entrada del Inicio"],
    ["letras.svg", "Letras: menú lateral"],
  ])
    add(`/brand/${f}`, "Mapa y marca", { where: `Logo › ${label}` }, true);

  const used = [...rows.values()];
  const unused: ImageRow[] = (manifest as Entry[])
    .filter((e) => !rows.has(e.src))
    .map((e) => ({ src: e.src, thumb: e.sm, w: e.w, h: e.h, desc: e.desc, group: "Sin usar (biblioteca)", usages: [] }));
  return { used, unused };
}
