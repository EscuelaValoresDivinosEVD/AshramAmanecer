import Link from "next/link";
import NowCard from "@/components/ahora/NowCard";
import { IconFonda, IconMapa, IconReloj } from "@/components/ahora/Icons";
import app from "@/content/ahora.json";

// Home of the visitor app. Texts and the Fonda link: src/content/ahora.json (Pages CMS).

export default function Page() {
  return (
    <main className="app-home">
      <p className="app-welcome">{app.bienvenida}</p>
      <NowCard />
      <nav className="app-tiles" aria-label="Aplicaciones">
        {app.fonda ? (
          <a href={app.fonda} className="app-tile">
            <span className="app-tile-icon"><IconFonda /></span>
            <strong>Fonda</strong>
            <span>Menú y pedidos</span>
          </a>
        ) : (
          // No link yet: shown, but not clickable.
          <div className="app-tile is-soon" aria-disabled>
            <span className="app-tile-icon"><IconFonda /></span>
            <strong>Fonda</strong>
            <span>Muy pronto</span>
          </div>
        )}
        <Link href="/ahora/mapa/" className="app-tile">
          <span className="app-tile-icon"><IconMapa /></span>
          <strong>Mapa</strong>
          <span>Explora el Ashram</span>
        </Link>
        <Link href="/ahora/cronograma/" className="app-tile">
          <span className="app-tile-icon"><IconReloj /></span>
          <strong>Cronograma</strong>
          <span>Actividades del día</span>
        </Link>
      </nav>
      <a href="/" className="app-site-link">Visitar el sitio web →</a>
    </main>
  );
}
