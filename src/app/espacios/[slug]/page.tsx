import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, SecHead } from "@/components/site/Blocks";
import Cta from "@/components/site/Cta";
import Pic from "@/components/site/Pic";
import TLink from "@/components/site/TLink";
import { espacios, getEspacio } from "@/data/espacios";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => espacios.map((e) => ({ slug: e.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getEspacio((await params).slug);
  return e ? { title: `${e.name} · ${site.name}`, description: e.text.slice(0, 160) } : {};
}

export default async function Page({ params }: Props) {
  const e = getEspacio((await params).slug);
  if (!e) notFound();
  const i = espacios.indexOf(e);
  const others = [1, 2, 3, 4].map((d) => espacios[(i + d) % espacios.length]);
  const [cover, ...gallery] = e.images;

  return (
    <main>
      <PageHero eyebrow={e.kind} title={e.name} image={cover} foot={`Espacio de Luz ${String(i + 1).padStart(2, "0")} / ${espacios.length}`} />
      <section className="sec grid-lines">
        <div className="wrap intro-cols" style={{ marginTop: 0 }}>
          <p className="t-label">{e.kind}</p>
          <div className="prose" data-reveal="stagger">
            <p style={{ fontFamily: "var(--reading)", fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", lineHeight: 1.35 }}>{e.text}</p>
            <p>
              <TLink href="/espacios/" className="link-arrow">
                ← Todos los espacios
              </TLink>
            </p>
          </div>
        </div>
      </section>
      {gallery.length > 0 && (
        <section className="sec-tight" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <p className="t-label" style={{ marginBottom: "1.2rem" }}>
              Una mirada de cerca
            </p>
            <div className="gallery" data-reveal="stagger">
              {gallery.map((g) => (
                <div key={g} className="frame">
                  <Pic src={g} sizes="(max-width: 700px) 50vw, 33vw" alt={e.name} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="sec-tight bg-crema-2">
        <div className="wrap">
          <SecHead eyebrow="Otros espacios" title="Sigue recorriendo" />
          <div className="cards" data-reveal="stagger">
            {others.map((o) => (
              <TLink key={o.slug} href={`/espacios/${o.slug}/`} className="card">
                <div className="card-media">
                  <Pic src={o.images[0]} sizes="(max-width: 700px) 100vw, 25vw" alt={o.name} />
                </div>
                <h3 className="t-italic">{o.name}</h3>
                <span className="card-kind">{o.kind}</span>
              </TLink>
            ))}
          </div>
        </div>
      </section>
      <Cta />
    </main>
  );
}
