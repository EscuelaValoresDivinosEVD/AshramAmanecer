import type { Metadata } from "next";
import { PageHero, SecHead } from "@/components/site/Blocks";
import Cta from "@/components/site/Cta";
import EventList from "@/components/site/EventList";
import Panels from "@/components/site/Panels";
import { eventos } from "@/data/eventos";
import { site } from "@/data/site";

export const metadata: Metadata = { title: `Talleres y retiros · ${site.name}` };

export default function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Actividades mensuales"
        title="Talleres y retiros"
        image="2023/05/meditando3.jpg"
        lead="Además de las actividades especiales programadas mensualmente, diariamente se contemplan clases de Shakti Yoga y Tandava Kundalini, junto con la realización opcional de Karma Yoga."
      />
      <section className="sec grid-lines">
        <div className="wrap">
          <SecHead eyebrow="Próximas fechas · ejemplos provisionales" title="Calendario" />
          <Panels
            items={eventos.map((e) => ({ key: e.slug, title: e.title, meta: `${e.date} · ${e.duration}`, text: e.text, image: e.image, href: e.href, cta: "Inscríbete" }))}
          />
        </div>
      </section>
      <section className="sec-tight bg-crema-2">
        <div className="wrap">
          <SecHead eyebrow="Todas las actividades" title="Agenda" />
          <EventList />
        </div>
      </section>
      <Cta />
    </main>
  );
}
