import InteractiveMap from "@/components/InteractiveMap";
import { Quote, Route, SecHead, Statement } from "@/components/site/Blocks";
import Cta from "@/components/site/Cta";
import EventList from "@/components/site/EventList";
import LazyVideo from "@/components/site/LazyVideo";
import Panels from "@/components/site/Panels";
import Pic from "@/components/site/Pic";
import Rail from "@/components/site/Rail";
import TLink from "@/components/site/TLink";
import home from "@/content/inicio.json";
import { espacios } from "@/data/espacios";
import { matajiQuote } from "@/data/maestros";
import { site } from "@/data/site";

// Home texts: src/content/inicio.json (Pages CMS).

export default function Home() {
  const { statement, banner, kriya, quote, rail, practices, events, route } = home;
  return (
    <main>
      <InteractiveMap />

      <Statement label={statement.label} text={statement.text}>
        <div className="intro-cols">
          <p className="t-label">{statement.sideLabel}</p>
          <div className="prose" data-reveal="stagger">
            <p>{statement.body}</p>
            <p>
              <TLink href="/quienes-somos/" className="link-arrow">
                {statement.link} →
              </TLink>
            </p>
          </div>
        </div>
      </Statement>

      <section className="px-banner">
        <div className="px-img" data-parallax>
          <Pic src={banner.image} alt="Vista del Ashram desde lo alto" />
        </div>
        <div className="px-copy">
          <p className="t-cond">{banner.figures}</p>
          <h2 className="t-display t-xxl" data-reveal>
            {banner.title}
          </h2>
          <p data-reveal>{banner.text}</p>
          <TLink href="/refugio-natural/" className="btn btn-light" data-reveal>
            {banner.button}
          </TLink>
        </div>
      </section>

      <section className="sec on-dark grid-lines">
        <div className="wrap feature">
          <div className="feature-copy" data-reveal="stagger">
            <p className="t-label">{kriya.label}</p>
            <h2 className="t-display t-xl">{kriya.title}</h2>
            <div className="prose">
              <p>
                <strong>{kriya.lead}</strong>
              </p>
              <p>{kriya.text}</p>
            </div>
            <TLink href={site.external.kriya} className="btn">
              {kriya.button} ↗
            </TLink>
          </div>
          <div className="feature-media frame frame-video" data-clip>
            <Pic src={kriya.image} alt="" />
            <LazyVideo
              title="Shiva Kriya Yoga en el Ashram"
              src="https://customer-lgjk79hzuw551moh.cloudflarestream.com/99b40440ead09357ddca16401d5c3012/iframe?muted=true&loop=true&autoplay=true&controls=false&preload=auto"
            />
          </div>
        </div>
      </section>

      <Quote text={matajiQuote} author={quote.author} image={quote.image} />

      <Rail items={espacios} title={rail.title} intro={rail.text} />

      <section className="sec grid-lines">
        <div className="wrap">
          <SecHead
            eyebrow={practices.label}
            title={practices.title}
            aside={
              <TLink href="/experimentar-el-ashram/" className="link-arrow">
                {practices.link} →
              </TLink>
            }
          />
          <Panels items={practices.items.map((p) => ({ ...p, key: p.title, href: "/experimentar-el-ashram/" }))} />
        </div>
      </section>

      <section className="sec bg-crema-2">
        <div className="wrap">
          <SecHead
            eyebrow={events.label}
            title={events.title}
            aside={
              <TLink href="/talleres-y-retiros/" className="link-arrow">
                {events.link} →
              </TLink>
            }
          />
          <EventList />
        </div>
      </section>

      <Route {...route} />

      <Cta />
    </main>
  );
}
