import ContentPage, { pageMetadata } from "@/components/site/ContentPage";
import Pic from "@/components/site/Pic";
import TLink from "@/components/site/TLink";
import { maestros } from "@/data/maestros";

export const metadata = pageMetadata("/quienes-somos/");

export default function Page() {
  return (
    <ContentPage path="/quienes-somos/">
      <section className="sec on-dark grid-lines">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal="stagger">
              <p className="t-label">Los Maestros</p>
              <h2 className="t-display t-xl">La guía del Ashram</h2>
            </div>
          </div>
          <div className="masters">
            {maestros.map((m) => (
              <article key={m.name} className="master" data-reveal="stagger">
                <div className="frame">
                  <Pic src={m.image} sizes="(max-width: 760px) 100vw, 50vw" alt={m.name} />
                </div>
                <h3 className="t-display t-l">{m.name}</h3>
                <div className="prose">
                  {m.text.map((t, i) => (
                    <p key={i}>{t}</p>
                  ))}
                </div>
                <TLink href={m.href} className="link-arrow">
                  Saber más ↗
                </TLink>
              </article>
            ))}
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
