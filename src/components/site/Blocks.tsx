import type { Block } from "@/data/pages";
import Pic from "./Pic";
import Rich, { plain } from "./Rich";

// MC Merchant is wide: shrink hero titles so their longest word always fits.
function heroTitleSize(title: string) {
  const longest = Math.max(...title.split(/\s+/).map((w) => w.length));
  return { fontSize: `min(clamp(2.4rem, 6vw, 5.8rem), ${(84 / (Math.max(longest, 8) * 0.82)).toFixed(2)}vw)` };
}

export function PageHero({ eyebrow, title, lead, image, foot }: { eyebrow: string; title: string; lead?: string; image: string; foot?: string }) {
  return (
    <section className="hero">
      <div className="hero-media" data-parallax>
        <Pic src={image} priority alt="" />
      </div>
      <div className="hero-inner">
        <p className="t-label" data-reveal>
          {eyebrow}
        </p>
        <h1 className="t-display t-xxl" style={heroTitleSize(title)} data-reveal>
          {title}
        </h1>
        {lead && (
          <p className="hero-lead" data-reveal>
            <Rich text={lead} />
          </p>
        )}
      </div>
      <div className="hero-foot">
        <span className="t-cond">{foot ?? "Sustag · Cuenca · 3.100 m"}</span>
        <span className="t-caps">Desliza ↓</span>
      </div>
    </section>
  );
}

/** Big uppercase statement whose words fill in while scrolling. */
export function Statement({ label, text, children }: { label?: string; text: string; children?: React.ReactNode }) {
  const words = plain(text).split(" ");
  return (
    <section className="sec grid-lines">
      <div className="wrap statement">
        {label && (
          <p className="t-label" data-reveal>
            {label}
          </p>
        )}
        <p className="t-display" data-fill aria-label={plain(text)}>
          <span className="indent" aria-hidden />
          {words.map((w, i) => (
            <span key={i} aria-hidden>
              <span className="fill-word">{w}</span>{" "}
            </span>
          ))}
        </p>
        {children}
      </div>
    </section>
  );
}

function Intro({ b }: { b: Extract<Block, { type: "intro" }> }) {
  return (
    <section className="sec-tight">
      <div className="wrap intro-cols">
        <p className="t-label">{b.eyebrow ?? "✦"}</p>
        <div className="prose" data-reveal="stagger">
          {b.title && <h2 className="t-display t-l">{b.title}</h2>}
          {b.text.map((t, i) => (
            <p key={i}>
              <Rich text={t} />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Split({ b }: { b: Extract<Block, { type: "split" }> }) {
  return (
    <section className="sec-tight">
      <div className={`wrap split${b.reverse ? " reverse" : ""}`}>
        <div className="split-media" data-clip>
          <Pic src={b.image} sizes="(max-width: 860px) 100vw, 50vw" alt={b.title} />
        </div>
        <div className="split-copy">
          <div data-reveal="stagger">
            {b.eyebrow && <p className="t-label">{b.eyebrow}</p>}
            <h2 className="t-display t-xl">{b.title}</h2>
          </div>
          <div className="prose" data-reveal="stagger">
            {b.text.map((t, i) => (
              <p key={i}>
                <Rich text={t} />
              </p>
            ))}
          </div>
          {b.note && (
            <p className="note" data-reveal>
              <Rich text={b.note} />
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function InfoBox({ b }: { b: Extract<Block, { type: "infobox" }> }) {
  return (
    <section className="sec-tight">
      <div className="wrap">
        <div className="infobox" data-reveal>
          <h2 className="t-italic">{b.title}</h2>
          <ul>
            {b.items.map((it, i) => (
              <li key={i}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  {it.title && <strong>{it.title}. </strong>}
                  <Rich text={it.text} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function SecHead({ eyebrow, title, aside }: { eyebrow?: string; title?: string; aside?: React.ReactNode }) {
  if (!eyebrow && !title) return null;
  return (
    <div className="sec-head">
      <div data-reveal="stagger">
        {eyebrow && <p className="t-label">{eyebrow}</p>}
        {title && <h2 className="t-display t-xl">{title}</h2>}
      </div>
      {aside && <div className="sec-head-aside">{aside}</div>}
    </div>
  );
}

function Cards({ b }: { b: Extract<Block, { type: "cards" }> }) {
  return (
    <section className="sec-tight">
      <div className="wrap">
        <SecHead eyebrow={b.eyebrow} title={b.title} />
        <div className="cards" data-reveal="stagger">
          {b.items.map((it) => (
            <article key={it.title} className="card">
              <div className="card-media">
                <Pic src={it.image} sizes="(max-width: 700px) 100vw, 33vw" alt={it.title} />
              </div>
              <h3 className="t-italic">{it.title}</h3>
              <p>{it.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq({ b }: { b: Extract<Block, { type: "faq" }> }) {
  return (
    <section className="sec-tight">
      <div className="wrap">
        <div className="faq" data-reveal>
          {b.items.map((it, i) => (
            <details key={i} open={i === 0}>
              <summary>{it.q}</summary>
              <div className="prose">
                {it.a.map((t, j) => (
                  <p key={j}>{t}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Details({ b }: { b: Extract<Block, { type: "details" }> }) {
  return (
    <section className="sec-tight">
      <div className="wrap details">
        <div className="details-head" data-reveal="stagger">
          {b.eyebrow && <p className="t-label">{b.eyebrow}</p>}
          <h2 className="t-display t-l">{b.title}</h2>
        </div>
        <div className="details-list" data-reveal="stagger">
          {b.groups.map((g) => (
            <div key={g.title} className="details-item">
              <h3 className="t-italic">{g.title}</h3>
              <div className="prose">
                {g.lines.map((l, i) => (
                  <p key={i}>
                    <Rich text={l} />
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Route({ from, to, title, text, dark }: { from: string; to: string; title: string; text: string; dark?: boolean }) {
  return (
    <section className={`sec route${dark ? " on-dark" : ""}`}>
      <p className="route-ghost" aria-hidden data-reveal>
        {from} — {to}
      </p>
      <div className="wrap route-line" data-reveal>
        <span className="end">{from}</span>
        <span className="dots" />
        <div className="route-mid">
          <h3 className="t-display">{title}</h3>
          <p>{text}</p>
        </div>
        <span className="dots" />
        <span className="end">{to}</span>
      </div>
    </section>
  );
}

export function Quote({ text, author, image }: { text: string; author?: string; image?: string }) {
  const inner = (
    <div className="quote" data-reveal="stagger">
      <span className="quote-mark" aria-hidden>
        “
      </span>
      <blockquote>{text}</blockquote>
      {author && <cite>{author}</cite>}
    </div>
  );
  if (!image) return <section className="sec">{inner}</section>;
  return (
    <section className="quote-bg">
      <div className="hero-media" data-parallax>
        <Pic src={image} alt="" />
      </div>
      {inner}
    </section>
  );
}

export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "intro":
            return <Intro key={i} b={b} />;
          case "split":
            return <Split key={i} b={b} />;
          case "infobox":
            return <InfoBox key={i} b={b} />;
          case "cards":
            return <Cards key={i} b={b} />;
          case "faq":
            return <Faq key={i} b={b} />;
          case "details":
            return <Details key={i} b={b} />;
          case "route":
            return <Route key={i} {...b} />;
          case "quote":
            return <Quote key={i} {...b} />;
        }
      })}
    </>
  );
}
