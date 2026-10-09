// Roads and footpaths drawn over the aerial photo in the visitor app's map,
// in photo pixels (5494×3090). Traced by eye from the photo: adjust freely.

export type Camino = { tipo: "camino" | "sendero"; puntos: [number, number][] };

export const caminos: Camino[] = [
  // Service road past Fonda Lakshmi to the parking
  { tipo: "camino", puntos: [[1730, 1100], [1800, 1050], [1920, 1024], [2160, 1024], [2340, 1030], [2520, 1050], [2680, 1070]] },
  // Driveway down from the parking
  { tipo: "camino", puntos: [[2680, 1070], [2730, 1140], [2760, 1240], [2756, 1340], [2770, 1440]] },
  // Walk from the parking towards Casa Swamis and the east
  { tipo: "sendero", puntos: [[2690, 1090], [2860, 1120], [2960, 1200], [3060, 1270], [3110, 1305]] },
  // Path down from Yagna Shala
  { tipo: "sendero", puntos: [[2420, 800], [2390, 880], [2340, 960], [2310, 1020]] },
  // Steps beside Devi Mandir
  { tipo: "sendero", puntos: [[3490, 910], [3500, 1000], [3520, 1100]] },
  // From the Biblioteca down to Maha Mrityunjaya Mandir
  { tipo: "sendero", puntos: [[3110, 1305], [3270, 1330], [3270, 1440], [3210, 1540], [3160, 1590]] },
  // Driveway end to the temple
  { tipo: "sendero", puntos: [[2770, 1440], [2820, 1540], [2880, 1650], [2920, 1700]] },
  // Walkway south of the temple, towards Yoga Shala
  { tipo: "sendero", puntos: [[3140, 1920], [3000, 1950], [2900, 1975], [2780, 2040], [2640, 2090]] },
];
