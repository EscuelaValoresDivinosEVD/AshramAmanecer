import { seo } from "@/lib/seo";
import type { Metadata } from "next";
import { PageHero } from "@/components/site/Blocks";
import { MorePages } from "@/components/site/ContentPage";
import Cta from "@/components/site/Cta";
import { site } from "@/data/site";
import fotos from "@/content/portadas.json";

export const metadata: Metadata = seo({ title: "Estadía y hospedaje", description: "Habitaciones, amenidades, lineamientos y cómo llegar al Ashram Caminantes del Amanecer en Sustag, cerca de Cuenca, Ecuador. Todo para planificar tu visita.", path: "/estadias/" });

export default function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Estadía"
        title="Tu estadía en el Ashram"
        image={fotos.estadia.hero}
        lead="El Ashram ofrece una cuidada infraestructura de habitaciones y amenidades para garantizar una estadía confortable a todos sus huéspedes."
      />
      <MorePages current="/estadias/" limit={99} title="Todo para tu visita" />
      <Cta />
    </main>
  );
}
