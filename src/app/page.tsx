import InteractiveMap from "@/components/InteractiveMap";
import { Quote, Route, SecHead, Statement } from "@/components/site/Blocks";
import Cta from "@/components/site/Cta";
import EventList from "@/components/site/EventList";
import Panels, { type PanelItem } from "@/components/site/Panels";
import Pic from "@/components/site/Pic";
import Rail from "@/components/site/Rail";
import TLink from "@/components/site/TLink";
import { espacios } from "@/data/espacios";
import { matajiQuote } from "@/data/maestros";

// Home texts verbatim from the previous site's home page.

const practicas: PanelItem[] = [
  { key: "fuego", title: "Fuego Sagrado", meta: "Homa Vidya · Diario", image: "2024/01/Fuego-1.jpg", href: "/experimentar-el-ashram/", text: "En Caminantes del Amanecer, se enciende el Fuego Sagrado todos los días, en la forma en que el Mahavatar Babaji se lo reveló a la Madre Shaktiananda." },
  { key: "arati", title: "Arati", meta: "Mañana y tarde", image: "2024/01/Arati-3.jpg", href: "/experimentar-el-ashram/", text: "Una ceremonia diaria que establece un profundo contacto con la divinidad. Su fundamento reside en la ofrenda de amor, devoción y gratitud." },
  { key: "shakti", title: "Shakti Yoga", meta: "Semanal", image: "2024/01/hatha.jpg", href: "/experimentar-el-ashram/", text: "Activación, desbloqueo y sutilización del sistema físico/etérico para un desarrollo espiritual firme y definitivo hacia el Ser." },
  { key: "tandava", title: "Shiva Tandava", meta: "Semanal", image: "2024/01/Tandava.jpg", href: "/experimentar-el-ashram/", text: "La reactivación de la energía vital Shakti-Kundalini mediante dinámicas de movimiento y danza." },
  { key: "dhyana", title: "Meditación", meta: "Dhyana", image: "2024/01/Dhyana.jpg", href: "/experimentar-el-ashram/", text: "Salones especialmente diseñados para alcanzar profundos estados meditativos, en silencio o guiado por los sonidos de la naturaleza." },
];

export default function Home() {
  return (
    <main>
      <InteractiveMap />

      <Statement
        label="La estación de luz de la Conciencia Babaji en América"
        text="El Ashram Caminantes del Amanecer es la estación de la Conciencia Babaji en América, el centro mundial de la enseñanza de Shiva Kriya Yoga, la sabiduría de realización de Mataji Shaktiananda y el Mahavatar Babaji."
      >
        <div className="intro-cols">
          <p className="t-label">Los Andes ecuatorianos</p>
          <div className="prose" data-reveal="stagger">
            <p>
              Es un refugio de luz y espiritualidad profunda, situado en los Andes Ecuatorianos, destinado a la activación
              más plena del potencial evolutivo del ser humano consciente.
            </p>
            <p>
              <TLink href="/quienes-somos/" className="link-arrow">
                Saber más →
              </TLink>
            </p>
          </div>
        </div>
      </Statement>

      <section className="px-banner">
        <div className="px-img" data-parallax>
          <Pic src="2023/05/Ashram-general.jpg" alt="Vista del Ashram desde lo alto" />
        </div>
        <div className="px-copy">
          <p className="t-cond">3.100 m · 50 hectáreas · Bosque andino</p>
          <h2 className="t-display t-xxl" data-reveal>
            Un refugio de luz
          </h2>
          <p data-reveal>
            A 30 minutos de la ciudad de Cuenca, muy cercano al parque nacional “El Cajas”. Su belleza natural, custodiada
            por ríos y cascadas, permite un profundo contacto con la naturaleza.
          </p>
          <TLink href="/refugio-natural/" className="btn btn-light" data-reveal>
            Un refugio natural
          </TLink>
        </div>
      </section>

      <section className="sec on-dark grid-lines">
        <div className="wrap feature">
          <div className="feature-copy" data-reveal="stagger">
            <p className="t-label">El propósito fundamental del Ashram</p>
            <h2 className="t-display t-xl">Shiva Kriya Yoga</h2>
            <div className="prose">
              <p>
                <strong>La práctica del milenario Shiva Kriya Yoga y sus diferentes áreas de sabiduría es el propósito fundamental del Ashram.</strong>
              </p>
              <p>
                Todo ser que desee realizar una práctica consciente en sus espacios, tendrá la oportunidad de experimentar la
                Ciencia Kriya en sus niveles más profundos. Se trata de un foco energético activo, que propicia la conexión
                cósmica de todas aquellas almas que se propongan un avance real en su sendero interno.
              </p>
            </div>
            <TLink href="https://www.kriyayogashiva.com" className="btn">
              Shiva Kriya Yoga ↗
            </TLink>
          </div>
          <div className="feature-media frame frame-video" data-clip>
            <Pic src="2019/11/kriya-in-ashram.jpg" alt="" />
            <iframe
              title="Shiva Kriya Yoga en el Ashram"
              src="https://customer-lgjk79hzuw551moh.cloudflarestream.com/99b40440ead09357ddca16401d5c3012/iframe?muted=true&loop=true&autoplay=true&controls=false&preload=auto"
              allow="autoplay; encrypted-media"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Quote text={matajiQuote} author="Mataji Shaktiananda y el Mahavatar Babaji" image="2023/05/MA3.jpg" />

      <Rail items={espacios} title="Espacios de Luz" intro="Espacios destinados a la práctica de Shiva Kriya Yoga, Hatha Yoga, meditación y contemplación, diariamente activados con los códigos milenarios de los mantras y las formas rituales védicas." />

      <section className="sec grid-lines">
        <div className="wrap">
          <SecHead
            eyebrow="Diseño de activación diario"
            title="Experimentar el Ashram"
            aside={
              <TLink href="/experimentar-el-ashram/" className="link-arrow">
                Todas las prácticas →
              </TLink>
            }
          />
          <Panels items={practicas} />
        </div>
      </section>

      <section className="sec bg-crema-2">
        <div className="wrap">
          <SecHead
            eyebrow="Actividades mensuales"
            title="Talleres y retiros"
            aside={
              <TLink href="/talleres-y-retiros/" className="link-arrow">
                Ver calendario →
              </TLink>
            }
          />
          <EventList />
        </div>
      </section>

      <Route from="Cuenca" to="Ashram" title="30 minutos" text="Sustag, zona rural en las afueras de Cuenca, a 3.100 m s.n.m., muy cerca del Parque Nacional El Cajas." />

      <Cta />
    </main>
  );
}
