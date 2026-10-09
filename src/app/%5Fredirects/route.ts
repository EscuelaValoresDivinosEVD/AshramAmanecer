import imagenes from "../../../archivo/sitio-anterior/imagenes.json";
import { mostrarTalleres, TALLERES_PATH } from "@/data/eventos";

// Builds out/_redirects: Cloudflare sends the old WordPress addresses (same
// domain) to their new pages with a permanent 301, so Google and old links
// keep working. Talleres y retiros goes to the home page while it is switched off.

export const dynamic = "force-static";

const talleres = mostrarTalleres ? TALLERES_PATH : "/";

const pages: [string, string][] = [
  ["/actividades-y-cursos", "/experimentar-el-ashram/"],
  ["/actividades/", "/experimentar-el-ashram/"],
  ["/iniciacion-shiva-kriya-yoga/", "/experimentar-el-ashram/"],
  ["/espacios-sagrados/", "/espacios/"],
  ["/eco-ashram-2/", "/refugio-natural/"],
  ["/que-es-ashram/", "/quienes-somos/"],
  ["/servicios/", "/estadias/hospedaje/"],
  ["/estadias/sala-chikitsa/", "/sala-chikitsa/"],
  ["/eventos-3/*", talleres],
  ["/eventos-3", talleres],
  ["/eventos/*", talleres],
  ...(mostrarTalleres ? [] : ([[TALLERES_PATH, "/"]] as [string, string][])),
  ["/cuadritos/", "/"],
  ["/hover2/", "/"],
  ["/prueba/", "/"],
  ["/pagina-ejemplo/", "/"],
  ["/sample-page/", "/"],
  ["/wp-admin/*", "/"],
  ["/wp-login.php", "/"],
  ["/feed/*", "/"],
];

export function GET() {
  const images = (imagenes as { original: string; sitio_nuevo?: string }[])
    .filter((i) => i.sitio_nuevo)
    .map((i) => [new URL(i.original).pathname, i.sitio_nuevo!] as [string, string]);
  // Old links may come with or without the final slash.
  const both = pages.flatMap(([from, to]): [string, string][] =>
    from.includes("*") || from.includes(".") ? [[from, to]] : [[from.replace(/\/$/, ""), to], [from.replace(/\/?$/, "/"), to]]
  );
  // Exact rules first: Cloudflare only allows 100 rules after the first one with a splat (*).
  const rules = [...both, ...images];
  const lines = [...rules.filter(([f]) => !f.includes("*")), ...rules.filter(([f]) => f.includes("*"))].map(([from, to]) => `${from} ${to} 301`);
  return new Response([...new Set(lines)].join("\n") + "\n", { headers: { "content-type": "text/plain" } });
}
