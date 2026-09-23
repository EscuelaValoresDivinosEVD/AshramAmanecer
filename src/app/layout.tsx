import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter_Tight, Oswald } from "next/font/google";
import localFont from "next/font/local";
import Providers from "@/components/Providers";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Motion from "@/components/site/Motion";
import "./globals.css";
import "./site.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-serif" });
const sans = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
const display = localFont({ src: "../fonts/mc-merchant.woff2", variable: "--font-display", display: "swap" });
const cond = Oswald({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-cond" });

export const metadata: Metadata = {
  title: "Ashram Caminantes del Amanecer",
  description: "Shiva Kriya Yoga Ashram, un refugio de luz y espiritualidad profunda en los Andes ecuatorianos.",
};

export const viewport: Viewport = { themeColor: "#1f343e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${serif.variable} ${sans.variable} ${cond.variable}`}>
      <head>
        {/* Lets CSS hide scroll-reveal elements before JS animates them in (no flash). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
          <Motion />
        </Providers>
      </body>
    </html>
  );
}
