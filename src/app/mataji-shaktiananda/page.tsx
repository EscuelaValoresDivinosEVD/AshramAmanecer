import type { Metadata } from "next";
import { PageHero, Quote } from "@/components/site/Blocks";
import Cta from "@/components/site/Cta";
import Pic from "@/components/site/Pic";
import TLink from "@/components/site/TLink";
import { maestros, matajiQuote } from "@/data/maestros";
import { site } from "@/data/site";

export const metadata: Metadata = { title: `Mataji Shaktiananda · ${site.name}` };

export default function Page() {
  const mataji = maestros[0];
  return (
    <main>
      <PageHero eyebrow="Shaktiananda Ma en Caminantes del Amanecer" title="Mataji Shaktiananda" image="2019/01/016.jpg" />
      <section className="sec grid-lines">
        <div className="wrap feature">
          <div className="feature-copy" data-reveal="stagger">
            <p className="t-label">{mataji.name}</p>
            <h2 className="t-display t-serif t-xl">Discípula directa del Mahavatar Babaji</h2>
            <div className="prose">
              {mataji.text.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
            <TLink href={site.external.mataji} className="btn">
              Visitar la web de Mataji Shaktiananda ↗
            </TLink>
          </div>
          <div className="feature-media frame" data-clip>
            <Pic src="2019/01/09.jpg" sizes="(max-width: 860px) 100vw, 50vw" alt="Mataji Shaktiananda en ceremonia" />
          </div>
        </div>
      </section>
      <Quote text={matajiQuote} image="2023/05/Ma-lingam.jpg" />
      <Cta />
    </main>
  );
}
