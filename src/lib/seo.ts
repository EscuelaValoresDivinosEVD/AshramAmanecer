import type { Metadata } from "next";

export const SITE_URL = "https://ashramcaminantesdelamanecer.com";
export const SITE_NAME = "Ashram Caminantes del Amanecer";
export const SITE_DESCRIPTION =
  "Shiva Kriya Yoga Ashram en Sustag, a 30 minutos de Cuenca, Ecuador: retiros espirituales, yoga, meditación y hospedaje en un refugio de luz en los Andes.";

/** Trim to ~155 chars on a word boundary, without markdown marks. */
export function clip(text: string, max = 155) {
  const t = text.replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, t.lastIndexOf(" ", max)).replace(/[,;:.\s]+$/, "") + "…";
}

/** Title, description, canonical URL and social preview for one page. */
export function seo({ title, description, path }: { title?: string; description?: string; path: string }): Metadata {
  const full = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} · Shiva Kriya Yoga cerca de Cuenca, Ecuador`;
  const desc = clip(description || SITE_DESCRIPTION);
  return {
    title: full,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description: desc,
      url: path,
      siteName: SITE_NAME,
      locale: "es_EC",
      type: "website",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Vista aérea del Ashram Caminantes del Amanecer" }],
    },
    twitter: { card: "summary_large_image", title: full, description: desc, images: ["/og.jpg"] },
  };
}
