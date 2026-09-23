import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, pages } from "@/data/pages";
import { site } from "@/data/site";
import Blocks, { PageHero, SecHead } from "./Blocks";
import Cta from "./Cta";
import Pic from "./Pic";
import { plain } from "./Rich";
import TLink from "./TLink";

export function pageMetadata(path: string): Metadata {
  const p = getPage(path);
  return p ? { title: `${p.title} · ${site.name}`, description: p.lead ? plain(p.lead).slice(0, 160) : undefined } : {};
}

/** Next pages to explore: the other stay/experience pages. */
export function MorePages({ current, limit = 4, title = "El Ashram" }: { current: string; limit?: number; title?: string }) {
  const more = pages.filter((p) => p.path !== current && p.path !== "/quienes-somos/").slice(0, limit);
  return (
    <section className="sec-tight">
      <div className="wrap">
        <SecHead eyebrow="Sigue explorando" title={title} />
        <div className="cards" data-reveal="stagger">
          {more.map((p) => (
            <TLink key={p.path} href={p.path} className="card">
              <div className="card-media">
                <Pic src={p.hero} sizes="(max-width: 700px) 100vw, 25vw" alt={p.title} />
              </div>
              <h3 className="t-italic">{p.title}</h3>
              <span className="card-kind">{p.eyebrow}</span>
            </TLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ContentPage({ path, children }: { path: string; children?: React.ReactNode }) {
  const p = getPage(path);
  if (!p) notFound();
  return (
    <main>
      <PageHero eyebrow={p.eyebrow} title={p.title} lead={p.lead} image={p.hero} />
      <Blocks blocks={p.blocks} />
      {children}
      <MorePages current={path} />
      <Cta />
    </main>
  );
}
