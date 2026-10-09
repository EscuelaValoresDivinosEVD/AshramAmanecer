import { site } from "@/data/site";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, seo } from "@/lib/seo";
import type { Metadata, Viewport } from "next";
import { Inter_Tight, Oswald, Spectral } from "next/font/google";
import localFont from "next/font/local";
import Providers from "@/components/Providers";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Motion from "@/components/site/Motion";
import SiteChrome from "@/components/site/SiteChrome";
import Analytics from "@/components/site/Analytics";
import "./globals.css";
import "./site.css";

const serif = Spectral({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"], variable: "--font-serif" });
const sans = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
const display = localFont({ src: "../fonts/mc-merchant.woff2", variable: "--font-display", display: "swap" });
const cond = Oswald({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-cond" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...seo({ path: "/" }),
  keywords: ["ashram", "Shiva Kriya Yoga", "retiro espiritual", "yoga", "meditación", "Cuenca", "Ecuador", "Mataji Shaktiananda", "Babaji"],
};

// Structured data so search engines know the ashram as a place you can visit and stay at.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": `${SITE_URL}/#ashram`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og.jpg`,
  logo: `${SITE_URL}/brand/icono.svg`,
  telephone: site.phone,
  email: site.email,
  address: { "@type": "PostalAddress", addressLocality: "Sustag", addressRegion: "Azuay", addressCountry: "EC" },
  sameAs: [site.social.instagram, site.social.facebook].filter(Boolean),
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          <SiteChrome header={<Header />} footer={<><Footer /><Motion /></>}>
            {children}
          </SiteChrome>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
