import type { MetadataRoute } from "next";
import { espacios } from "@/data/espacios";
import { mostrarTalleres, TALLERES_PATH } from "@/data/eventos";
import { pages } from "@/data/pages";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// Every public page; Talleres y retiros only while that section is switched on.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/espacios/",
    ...espacios.map((e) => `/espacios/${e.slug}/`),
    "/estadias/",
    ...pages.map((p) => p.path),
    "/mataji-shaktiananda/",
    "/contactanos/",
    ...(mostrarTalleres ? [TALLERES_PATH] : []),
  ];
  return [...new Set(paths)].map((p) => ({ url: SITE_URL + p, priority: p === "/" ? 1 : 0.7 }));
}
