import type { Metadata } from "next";
import { PageHero } from "@/components/site/Blocks";
import { MorePages } from "@/components/site/ContentPage";
import Cta from "@/components/site/Cta";
import { site } from "@/data/site";

export const metadata: Metadata = { title: `Estadía · ${site.name}` };

export default function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Estadía"
        title="Tu estadía en el Ashram"
        image="2019/01/22-1.jpg"
        lead="El Ashram ofrece una cuidada infraestructura de habitaciones y amenidades para garantizar una estadía confortable a todos sus huéspedes."
      />
      <MorePages current="/estadias/" limit={99} title="Todo para tu visita" />
      <Cta />
    </main>
  );
}
