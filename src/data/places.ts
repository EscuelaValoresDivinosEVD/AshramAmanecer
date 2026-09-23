// Size of the base aerial photo (original of public/map/base-*.webp). Every building cutout
// was matched pixel-exact against this image, so x/y/w/h are in its pixels.
export const MAP_WIDTH = 5494;
export const MAP_HEIGHT = 3090;

export type Place = {
  slug: string;
  /** PROVISIONAL name — replace with the real one. */
  name: string;
  /** PROVISIONAL short description — replace with real copy. */
  tagline: string;
  /** Page the building opens. Buildings not yet identified use /lugares/<slug>/. */
  href?: string;
  image: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export const places: Place[] = [
  { slug: "havan", name: "Havan", tagline: "Espacio del Fuego Sagrado", href: "/espacios/havan/", image: "/map/buildings/cabana-alta.webp", x: 2236, y: 674, w: 173, h: 137 },
  { slug: "tryambakeshwar-y-dhuni", name: "Tryambakeshwar y Dhuni", tagline: "Punto panorámico", href: "/espacios/tryambakeshwar-y-dhuni/", image: "/map/buildings/refugio-bosque.webp", x: 3532, y: 698, w: 110, h: 77 },
  { slug: "devi-mandir", name: "Devi Mandir", tagline: "Templo de la Madre Divina", href: "/espacios/devi-mandir/", image: "/map/buildings/domo-naranja.webp", x: 3535, y: 852, w: 442, h: 292 },
  { slug: "casa-blanca", name: "Casa Blanca", tagline: "Hospedaje con vista a la montaña", image: "/map/buildings/casa-blanca.webp", x: 2882, y: 905, w: 333, h: 197 },
  { slug: "kiosco", name: "Kiosco", tagline: "Pausa entre caminos", image: "/map/buildings/kiosco.webp", x: 3347, y: 1023, w: 112, h: 72 },
  { slug: "comedor", name: "Comedor e Invernadero", tagline: "Alimento consciente, cultivado aquí", image: "/map/buildings/comedor.webp", x: 1891, y: 1054, w: 405, h: 114 },
  { slug: "piramide", name: "Pirámide", tagline: "Silencio y contemplación", image: "/map/buildings/piramide.webp", x: 2160, y: 1148, w: 174, h: 98 },
  { slug: "shiva-kunda", name: "Shiva Kunda", tagline: "La laguna del Ashram", href: "/espacios/shiva-kunda/", image: "/map/buildings/kiosco-lago.webp", x: 2352, y: 1219, w: 362, h: 166 },
  { slug: "cabana-del-jardin", name: "Cabaña del Jardín", tagline: "Entre flores y senderos", image: "/map/buildings/cabana-jardin.webp", x: 3204, y: 1277, w: 146, h: 132 },
  { slug: "maha-mrityunjaya-mandir", name: "Maha Mrityunjaya Mandir", tagline: "Templo principal", href: "/espacios/maha-mrityunjaya-mandir/", image: "/map/buildings/domo-negro.webp", x: 2830, y: 1571, w: 536, h: 356 },
  { slug: "casa-del-mirador", name: "Casa del Mirador", tagline: "Amaneceres sobre las nubes", image: "/map/buildings/casa-mirador.webp", x: 1734, y: 1979, w: 280, h: 320 },
  { slug: "yoga-shala", name: "Yoga Shala", tagline: "Salón de práctica", href: "/espacios/yoga-shala/", image: "/map/buildings/casa-techo-verde.webp", x: 2037, y: 1963, w: 590, h: 506 },
];

export const getPlace = (slug: string) => places.find((p) => p.slug === slug);
