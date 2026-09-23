// EJEMPLOS PROVISIONALES — the old site had no working events. Replace these
// with the real calendar (dates, titles, texts, images, sign-up links).

export type Evento = {
  slug: string;
  date: string;
  duration: string;
  title: string;
  text: string;
  image: string;
  href: string;
};

export const eventosSample = true;

export const eventos: Evento[] = [
  {
    slug: "equilibrio-vital",
    date: "25 · 05",
    duration: "Full Day",
    title: "Equilibrio Vital",
    text: "Un día completo de práctica, silencio y alimentación consciente en el Ashram.",
    image: "2023/05/meditando3.jpg",
    href: "/contactanos/",
  },
  {
    slug: "retiro-shiva-kriya-yoga",
    date: "12 · 07",
    duration: "5 días",
    title: "Retiro de Shiva Kriya Yoga",
    text: "Inmersión en las técnicas de Kriya junto a las actividades diarias del Ashram.",
    image: "2024/01/SKY.jpg",
    href: "/contactanos/",
  },
  {
    slug: "taller-shiva-tandava",
    date: "09 · 08",
    duration: "Fin de semana",
    title: "Taller de Shiva Tandava",
    text: "Movimiento, danza y mudras para la reactivación de la energía Shakti-Kundalini.",
    image: "2024/01/Tandava.jpg",
    href: "/contactanos/",
  },
  {
    slug: "fuego-sagrado",
    date: "21 · 09",
    duration: "Ceremonia",
    title: "Fuego Sagrado del Equinoccio",
    text: "Homa Vidya especial con la comunidad del Ashram y sus Iniciados.",
    image: "2024/01/Fuego-1.jpg",
    href: "/contactanos/",
  },
];
