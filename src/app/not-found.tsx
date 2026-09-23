import Link from "next/link";

export default function NotFound() {
  return (
    <main className="next-section">
      <h2>Este sendero no lleva a ningún lugar</h2>
      <Link href="/" className="back-link">← Volver al mapa</Link>
    </main>
  );
}
