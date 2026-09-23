import InteractiveMap from "@/components/InteractiveMap";

export default function Home() {
  return (
    <main>
      <InteractiveMap />
      {/* Placeholder for the sections that come after the map. */}
      <section className="next-section">
        <p className="eyebrow">Próximamente</p>
        <h2>Aquí continúa la página</h2>
        <p>Esta sección es provisional; el mapa se libera del scroll justo antes de llegar aquí.</p>
      </section>
    </main>
  );
}
