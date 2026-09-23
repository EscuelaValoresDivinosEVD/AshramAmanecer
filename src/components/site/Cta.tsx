import Pic from "./Pic";
import TLink from "./TLink";

/** Closing banner shown at the end of every page. */
export default function Cta({ image = "2019/01/slidecontactos.jpg" }: { image?: string }) {
  return (
    <section className="cta">
      <div className="hero-media" data-parallax>
        <Pic src={image} alt="" />
      </div>
      <div className="cta-inner" data-reveal="stagger">
        <p className="t-label">Procúrate un encuentro con tu Ser</p>
        <h2 className="t-display t-xxl">Comienza tu camino</h2>
        <TLink href="/contactanos/" className="btn btn-light">
          Contáctanos
        </TLink>
      </div>
    </section>
  );
}
