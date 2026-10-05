import type { Metadata } from "next";
import ImageGallery from "@/components/site/ImageGallery";
import { collectImages } from "@/lib/image-usage";

export const metadata: Metadata = {
  title: "Imágenes del sitio · Administración",
  robots: { index: false, follow: false },
};

export default function Page() {
  const { used, unused } = collectImages();
  const uses = used.reduce((n, r) => n + r.usages.length, 0);
  return (
    <main className="admin">
      <div className="wrap">
        <p className="t-label">Administración</p>
        <h1 className="t-display t-xl">Imágenes del sitio</h1>
        <p className="admin-lead">
          {used.length} imágenes en {uses} lugares. Cada tarjeta dice dónde aparece la imagen; «Cambiar en el panel» abre esa
          sección en Pages CMS para reemplazarla. Las marcadas «Solo por código» (mapa y logos) pídeselas a Claude.
        </p>
        <ImageGallery used={used} unused={unused} />
      </div>
    </main>
  );
}
