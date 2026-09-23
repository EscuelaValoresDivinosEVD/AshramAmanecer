import type { Metadata } from "next";
import { PageHero, Statement } from "@/components/site/Blocks";
import Cta from "@/components/site/Cta";
import Pic from "@/components/site/Pic";
import TLink from "@/components/site/TLink";
import { espacios, espaciosIntro } from "@/data/espacios";
import { site } from "@/data/site";

export const metadata: Metadata = { title: `Espacios de Luz · ${site.name}`, description: espaciosIntro.slice(0, 160) };

export default function Page() {
  return (
    <main>
      <PageHero eyebrow="Geometría sagrada" title="Espacios de Luz" image="/img/espacios/maham5-1.webp" lead="Templos, cuevas, jardines y salones consagrados, en armonía con el bosque andino." />
      <Statement label="Espacios sagrados" text={espaciosIntro} />
      <section className="sec-tight">
        <div className="wrap">
          <div className="cards" data-reveal="stagger">
            {espacios.map((e, i) => (
              <TLink key={e.slug} href={`/espacios/${e.slug}/`} className="card">
                <div className="card-media">
                  <Pic src={e.images[0]} sizes="(max-width: 700px) 100vw, 33vw" alt={e.name} />
                  <span className="card-index">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="t-italic">{e.name}</h3>
                <span className="card-kind">{e.kind}</span>
              </TLink>
            ))}
          </div>
        </div>
      </section>
      <Cta image="/img/espacios/shivakunda3.webp" />
    </main>
  );
}
