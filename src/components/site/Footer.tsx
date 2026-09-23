import { footerColumns, site } from "@/data/site";
import FormEmbed from "./FormEmbed";
import TLink from "./TLink";

export default function Footer() {
  return (
    <footer className="ftr grid-lines">
      <div className="wrap ftr-top">
        <div className="ftr-brand">
          <img src="/brand/icono.svg" alt={site.name} />
        </div>
        <div className="ftr-cols">
          {footerColumns.map((c) => (
            <div key={c.label}>
              <p className="t-label">{c.label}</p>
              <ul>
                {c.links.map((l) => (
                  <li key={l.href}>
                    <TLink href={l.href} external={l.external}>
                      {l.label}
                    </TLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="ftr-tiles">
          <TLink href="/talleres-y-retiros/" className="tile">
            <span className="t-label">Calendario</span>
            <strong>Talleres y retiros</strong>
          </TLink>
          <TLink href="/contactanos/" className="tile tile-accent">
            <span className="t-label">Escríbenos</span>
            <strong>Contáctanos</strong>
          </TLink>
          <div className="tile tile-wide">
            <span className="t-label">Newsletter · Recibe las próximas actividades</span>
            <FormEmbed src={site.forms.newsletter} title="Newsletter" height={190} />
          </div>
        </div>
      </div>
      <p className="ftr-word" aria-hidden>
        Caminantes del Amanecer
      </p>
      <div className="ftr-bottom">
        <span>
          <TLink href={site.phoneHref}>{site.phone}</TLink> · <TLink href={`mailto:${site.email}`}>{site.email}</TLink>
        </span>
        <em>“Procúrate un encuentro con tu Ser”</em>
        <span>
          <TLink href={site.social.instagram}>Instagram</TLink> · <TLink href={site.social.facebook}>Facebook</TLink> · ©{" "}
          {new Date().getFullYear()} {site.name}
        </span>
      </div>
    </footer>
  );
}
