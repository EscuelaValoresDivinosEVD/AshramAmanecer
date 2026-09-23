import sitio from "@/content/sitio.json";

// Global site data: navigation and forms. Contact details are editable in
// src/content/sitio.json (Pages CMS).

export const site = {
  name: "Ashram Caminantes del Amanecer",
  tagline: "Shiva Kriya Yoga Ashram",
  phone: sitio.phone,
  phoneHref: `tel:${sitio.phone.replace(/[^+\d]/g, "")}`,
  email: sitio.email,
  whatsapp: sitio.whatsapp,
  location: sitio.location,
  altitude: sitio.altitude,
  social: {
    instagram: sitio.instagram,
    facebook: sitio.facebook,
  },
  forms: {
    contact: "https://api.leadconnectorhq.com/widget/form/I0iOIno9ELSuf1r3tSrB",
    newsletter: "https://api.leadconnectorhq.com/widget/form/ShGG4vqPjgjU4jA3G0FU",
  },
  external: {
    evd: "https://escuelavaloresdivinos.org",
    mataji: "https://shaktianandama.com",
    babaji: "https://shaktianandama.com/quien-shakti-ma/babaji/",
    kriya: "https://www.kriyayogashiva.com",
  },
};

export type NavLink = { label: string; href: string; external?: boolean };
export type NavGroup = { label: string; links: NavLink[] };

/** Drawer menu (grouped, like the reference's side panel). */
export const menu: NavGroup[] = [
  {
    label: "El Ashram",
    links: [
      { label: "Inicio", href: "/" },
      { label: "Sobre el Ashram", href: "/quienes-somos/" },
      { label: "Mataji Shaktiananda", href: "/mataji-shaktiananda/" },
      { label: "Espacios de Luz", href: "/espacios/" },
    ],
  },
  {
    label: "Experiencia",
    links: [
      { label: "Experimentar el Ashram", href: "/experimentar-el-ashram/" },
      { label: "Talleres y retiros", href: "/talleres-y-retiros/" },
      { label: "Un refugio natural", href: "/refugio-natural/" },
      { label: "Sala Chikitsa", href: "/sala-chikitsa/" },
    ],
  },
  {
    label: "Estadía",
    links: [
      { label: "Hospedaje", href: "/estadias/hospedaje/" },
      { label: "Amenidades", href: "/amenidades/" },
      { label: "Lineamientos", href: "/lineamientos/" },
      { label: "Ubicación y cómo llegar", href: "/estadias/ubicacion-y-como-llegar/" },
      { label: "Qué visitar", href: "/que-visitar/" },
      { label: "Preguntas frecuentes", href: "/preguntas-frecuentes/" },
    ],
  },
];

/** Header pills: left and right of the centred logo. */
export const headerLeft: NavLink[] = [
  { label: "Espacios", href: "/espacios/" },
  { label: "Experimentar", href: "/experimentar-el-ashram/" },
];
export const headerRight: NavLink[] = [
  { label: "Talleres y retiros", href: "/talleres-y-retiros/" },
  { label: "Contáctanos", href: "/contactanos/" },
];

export const footerColumns: NavGroup[] = [
  {
    label: "El Ashram",
    links: [
      { label: "Inicio", href: "/" },
      { label: "Sobre el Ashram", href: "/quienes-somos/" },
      { label: "Espacios de Luz", href: "/espacios/" },
      { label: "Experimentar el Ashram", href: "/experimentar-el-ashram/" },
      { label: "Talleres y retiros", href: "/talleres-y-retiros/" },
    ],
  },
  {
    label: "Estadía",
    links: [
      { label: "Hospedaje y alimentación consciente", href: "/estadias/hospedaje/" },
      { label: "Amenidades", href: "/amenidades/" },
      { label: "Sala Chikitsa", href: "/sala-chikitsa/" },
      { label: "Lineamientos", href: "/lineamientos/" },
      { label: "Ubicación y cómo llegar", href: "/estadias/ubicacion-y-como-llegar/" },
      { label: "Qué visitar", href: "/que-visitar/" },
      { label: "Preguntas frecuentes", href: "/preguntas-frecuentes/" },
    ],
  },
  {
    label: "Sendero",
    links: [
      { label: "Escuela Valores Divinos", href: site.external.evd, external: true },
      { label: "Mataji Shaktiananda", href: site.external.mataji, external: true },
      { label: "Shiva Kriya Yoga", href: site.external.kriya, external: true },
      { label: "Contáctanos", href: "/contactanos/" },
    ],
  },
];
