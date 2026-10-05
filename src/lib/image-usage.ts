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

export type Usage = { where: string; page?: string; edit?: string };
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
  add(inicio.banner.image, "Inicio", { where: "Inicio › Foto grande «Un refugio de luz»", page: "/", edit: home });
  add(inicio.kriya.image, "Inicio", { where: "Inicio › Shiva Kriya Yoga (antes del video)", page: "/", edit: home });
  add(inicio.quote.image, "Inicio", { where: "Inicio › Cita de Mataji (fondo)", page: "/", edit: home });
  inicio.practices.items.forEach((it) =>
    add(it.image, "Inicio", { where: `Inicio › Paneles de prácticas › ${it.title}`, page: "/", edit: home }),
  );
  add(inicio.cta.image, "Inicio", { where: "Banner final «Comienza tu camino» (casi todas las páginas)", page: "/", edit: home });

  // Espacios
  const esp = cmsFile("espacios");
  espaciosData.espacios.forEach((e) =>
    e.images.forEach((src, i) =>
      add(src, "Espacios de Luz", {
        where: `Espacios › ${e.name} › ${i === 0 ? "Portada (también en listado y carrusel)" : `Galería, foto ${i + 1}`}`,
        page: `/espacios/${e.slug}/`,
        edit: esp,
      }),
    ),
  );

  // Block pages
  const files = readdirSync(path.join(process.cwd(), "src/content/paginas"));
  for (const p of pages) {
    const file = files.find((f) => p.path.replace(/\/$/, "").endsWith(f.replace(/\.json$/, "")));
    const edit = file ? cmsEntry("paginas", `src/content/paginas/${file}`) : undefined;
    add(p.hero, "Páginas", { where: `${p.title} › Portada`, page: p.path, edit });
    p.blocks.forEach((b, i) => {
      if (b.type === "split") add(b.image, "Páginas", { where: `${p.title} › Sección ${i + 1} «${b.title}»`, page: p.path, edit });
      if (b.type === "quote") add(b.image, "Páginas", { where: `${p.title} › Sección ${i + 1} (cita)`, page: p.path, edit });
      if (b.type === "cards")
        b.items.forEach((it) => add(it.image, "Páginas", { where: `${p.title} › Tarjeta «${it.title}»`, page: p.path, edit }));
    });
  }

  // Other pages
  const port = cmsFile("portadas");
  add(portadas.espacios.hero, "Páginas", { where: "Espacios de Luz (listado) › Portada", page: "/espacios/", edit: port });
  add(portadas.espacios.cta, "Páginas", { where: "Espacios de Luz (listado) › Banner final", page: "/espacios/", edit: port });
  add(portadas.estadia.hero, "Páginas", { where: "Estadía › Portada", page: "/estadias/", edit: port });
  add(portadas.mataji.hero, "Páginas", { where: "Mataji Shaktiananda › Portada", page: "/mataji-shaktiananda/", edit: port });
  add(portadas.mataji.foto, "Páginas", { where: "Mataji Shaktiananda › Foto junto al texto", page: "/mataji-shaktiananda/", edit: port });
  add(portadas.mataji.cita, "Páginas", { where: "Mataji Shaktiananda › Fondo de la cita", page: "/mataji-shaktiananda/", edit: port });
  add(portadas.talleres.hero, "Páginas", { where: "Talleres y retiros › Portada", page: "/talleres-y-retiros/", edit: port });
  add(portadas.contacto.hero, "Páginas", { where: "Contáctanos › Portada", page: "/contactanos/", edit: port });

  maestrosData.maestros.forEach((m) =>
    add(m.image, "Maestros y eventos", { where: `Maestros › ${m.name}`, page: "/quienes-somos/", edit: cmsFile("maestros") }),
  );
  eventosData.eventos.forEach((e) =>
    add(e.image, "Maestros y eventos", { where: `Talleres y retiros › ${e.title}`, page: "/talleres-y-retiros/", edit: cmsFile("eventos") }),
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
