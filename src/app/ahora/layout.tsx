import type { Metadata, Viewport } from "next";
import AppShell from "@/components/ahora/AppShell";
import "./ahora.css";

// Visitor app: ahora.ashramcaminantesdelamanecer.com (also at /ahora/).
// Installable on the phone (manifest + service worker in public/ahora/).

export const metadata: Metadata = {
  title: "Ahora en el Ashram",
  description: "La app para tu visita al Ashram Caminantes del Amanecer: mapa, cronograma del día y la Fonda.",
  manifest: "/ahora/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Ashram", statusBarStyle: "black-translucent" },
  icons: { apple: "/ahora/icon-180.png" },
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export const viewport: Viewport = { themeColor: "#1f343e", viewportFit: "cover" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
