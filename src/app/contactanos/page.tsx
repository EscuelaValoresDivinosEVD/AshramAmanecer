import type { Metadata } from "next";
import { PageHero } from "@/components/site/Blocks";
import FormEmbed from "@/components/site/FormEmbed";
import TLink from "@/components/site/TLink";
import { site } from "@/data/site";

export const metadata: Metadata = { title: `Contáctanos · ${site.name}` };

export default function Page() {
  return (
    <main>
      <PageHero eyebrow="Procúrate un encuentro con tu Ser" title="Contáctanos" image="2019/01/slidecontactos.jpg" />
      <section className="sec grid-lines">
        <div className="wrap contact-grid">
          <div className="contact-info" data-reveal="stagger">
            <p className="t-label">Escríbenos</p>
            <h2 className="t-display t-serif t-l">Para contactarte con un representante del Ashram</h2>
            <div className="prose">
              <p>
                Puedes hacernos llegar tu mensaje completando el formulario. Si quieres saber más sobre las próximas
                actividades programadas junto a Mataji Shaktiananda, te invitamos a que sigas nuestras Redes Sociales o
                visites el <TLink href="/talleres-y-retiros/">Calendario de Actividades</TLink>.
              </p>
            </div>
            <ul className="contact-list">
              <li>
                <span>Teléfono</span>
                <TLink href={site.phoneHref}>{site.phone}</TLink>
              </li>
              <li>
                <span>Email</span>
                <TLink href={`mailto:${site.email}`}>{site.email}</TLink>
              </li>
              <li>
                <span>Ubicación</span>
                <span>{site.location}</span>
              </li>
              <li>
                <span>Redes</span>
                <span>
                  <TLink href={site.social.instagram}>Instagram</TLink> · <TLink href={site.social.facebook}>Facebook</TLink>
                </span>
              </li>
            </ul>
          </div>
          <div className="contact-form" data-reveal>
            <FormEmbed src={site.forms.contact} title="Contacto" height={520} />
          </div>
        </div>
      </section>
    </main>
  );
}
