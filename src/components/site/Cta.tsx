import home from "@/content/inicio.json";
import Pic from "./Pic";
import TLink from "./TLink";

/** Closing banner shown at the end of every page (texts: inicio.json → cta). */
export default function Cta({ image = home.cta.image }: { image?: string }) {
  const { label, title, button } = home.cta;
  return (
    <section className="cta">
      <div className="hero-media" data-parallax>
        <Pic src={image} alt="" />
      </div>
      <div className="cta-inner" data-reveal="stagger">
        <p className="t-label">{label}</p>
        <h2 className="t-display t-xxl">{title}</h2>
        <TLink href="/contactanos/" className="btn btn-light">
          {button}
        </TLink>
      </div>
    </section>
  );
}
