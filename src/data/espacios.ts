// "Espacios de Luz" — texts verbatim from /espacios/ on the previous site.
// Images are referenced by their original upload path (see src/lib/img.ts).

export type Espacio = {
  slug: string;
  name: string;
  /** Short line for cards. */
  kind: string;
  text: string;
  images: string[];
};

export const espaciosIntro =
  "El Ashram cuenta con hermosos espacios destinados a la práctica de Shiva Kriya Yoga, Hatha Yoga, meditación y contemplación, los cuales diariamente son activados con los códigos milenarios de los mantras y las formas rituales védicas. Su diseño arquitectónico bajo los principios de la geometría sagrada y en armonía con el ecosistema, crean la atmósfera más adecuada para una experiencia única de paz y conexión interna.";

export const espacios: Espacio[] = [
  {
    slug: "maha-mrityunjaya-mandir",
    name: "Maha Mrityunjaya Mandir",
    kind: "Templo principal",
    text: "El templo principal del Ashram está consagrado a la fuerza cósmica regente: el Señor Shiva. Se trata de una obra arquitectónica basada en los principios de la geometría sagrada, donde se halla Mahamrityunjaya Mahadev, el generador de luz (Shiva Lingam) que irradia su potente vibración hacia todo el continente americano. A su vez, este templo alberga un Shiva Lingam de mercurio, construido bajo los más elevados preceptos de la alquimia védica.",
    images: ["2018/11/maham11.jpg", "2018/11/maham5-1.jpg", "2018/11/maham8-1.jpg"],
  },
  {
    slug: "devi-mandir",
    name: "Devi Mandir",
    kind: "Templo de la Madre Divina",
    text: "El Devi Mandir es el espacio de luz consagrado a la Fuerza Madre en el Ashram Caminantes del Amanecer. Este hermoso templo se ha realizado bajo las formas más precisas de la arquitectura y la geometría sagrada. Su diseño de dos pisos o chakras, basado en las manifestaciones de la Fuerza Shakti más poderosas, hacen a este espacio único en el mundo, por la concepción y distribución de los aspectos de la Madre Divina de acuerdo con sus más altas formas de conocimiento.",
    images: ["2018/11/devis15.jpg", "2024/01/Devi-Mandir-2.jpg", "2018/11/devi1-1.jpg", "2024/01/Devi-Mandir.jpg", "2024/01/Devi-Mandir-3.jpg"],
  },
  {
    slug: "tryambakeshwar-y-dhuni",
    name: "Tryambakeshwar y Dhuni",
    kind: "Punto panorámico",
    text: "En este espacio, que se encuentra en un punto panorámico del Ashram, habita el segundo Shiva Lingam del Ashram llamado Tryambakeshwar, siendo una réplica de su homónimo que se halla en la India, en uno de los 12 templos de los Jyotirlingam consagrados al Señor Shiva. Lo antecede un dhuni o espacio dispuesto para realizar Homa o fuego sagrados. En India, un dhuni es el lugar en donde habita un yogui, quien dedica su vida a su trabajo interno.",
    images: ["2018/11/dhuni10.jpg", "2018/11/dhuni.jpg", "2018/11/dhuni11.jpg", "2018/11/dhuni1.jpg"],
  },
  {
    slug: "hanuman-mandir",
    name: "Hanuman Mandir",
    kind: "Templo de la devoción",
    text: "Construido por los devotos de este aspecto divino, está ubicado en una elevación que permite maravillosas vistas de los atardeceres del Ashram. Hanuman, es el ejemplo de entrega y devoción hacia el Guru. Su valor y su arrojo están determinados por la fe y el amor, las más elevadas virtudes del Ser. Su emanación, protege a los seres de las energías negativas en los planos astrales y mentales. Todos los sábados por la tarde en este espacio se recita la Hanuman Chalisa junto con el arati de cierre.",
    images: ["2018/11/hanuman2.jpg", "2018/11/hanuman1.jpg", "2018/11/hanuman9.jpg", "2018/11/hanuman12.jpg"],
  },
  {
    slug: "ganesha-hanuman-mandir",
    name: "Ganesha & Hanuman Mandir",
    kind: "Templo de bienvenida",
    text: "Un pequeño templo que da la bienvenida a Caminantes del Amanecer, consagrado a la energía de Ganesha -el Dios-Elefante- conocido como “el que elimina los obstáculos”. Es también quien regula el trabajo de cada alma con sus contenidos negativos, según su capacidad y resolución, colocando ante la conciencia, los aspectos que cada ser está preparado para trabajar. A su vez, allí se encuentra una escultura de Hanuman -el Dios Mono-, símbolo de devoción y protección.",
    images: ["2018/11/ganeshanuman3.jpg", "2018/11/ganeshanuman2.jpg", "2018/11/ganeshanuman6.jpg", "2018/12/ganeshanuman14.jpg"],
  },
  {
    slug: "havan",
    name: "Havan",
    kind: "Espacio del Fuego Sagrado",
    text: "Este espacio destinado a la realización del Fuego Sagrado, es una de las primeras construcciones que formaron parte del Ashram. Posee un hermoso diseño con líneas geométricas, con una imponente vista a las montañas y a la laguna Shiva Kunda. En su interior residen las imágenes de Shiva Mahamrityunjaya y Devi Gayatri. Aquí el contacto con el elemento fuego es una experiencia de elevada comunión.",
    images: ["2018/11/havan2.jpg", "2018/11/havan4.jpg", "2018/11/havan8.jpg", "2018/11/havan3.jpg", "2018/11/havan.jpg"],
  },
  {
    slug: "yoga-shala",
    name: "Yoga Shala",
    kind: "Salón de práctica",
    text: "Imponentes vistas y un cautivador diseño, hacen de este espacio un lugar perfecto para la práctica de Shiva Hatha Yoga, Shiva Tandava Kundalini, meditación y sadhana (práctica personal). Además, es el espacio desde donde Mataji Shaktiananda imparten las enseñanzas de Shiva Kriya Yoga a cientos de Iniciados durante todo el año, junto con Satsang y otras actividades.",
    images: ["2018/11/yogashala4.jpg", "2024/01/yoga-shala.jpg", "2018/11/yogashala11.jpg"],
  },
  {
    slug: "babaji-guffa",
    name: "Babaji Guffa",
    kind: "Cueva de Babaji",
    text: "Construida bajo tierra, es un cueva para meditar en silencio y en total aislamiento en la frecuencia de la Conciencia Babaji. Es un espacio sutilmente consagrado con distintos manifiestos de este Ser Inmortal, por lo que la conexión interna que allí se logra es una experiencia única en América. Mantener los ojos abiertos o cerrados resulta lo mismo aquí, ya que nada se ve hacia afuera, sino solamente los contenidos internos que guarda cada meditador.",
    images: ["2018/11/babaji6.jpg", "2018/11/babaji19.jpg", "2018/11/babaji9.jpg", "2018/11/babaji17.jpg", "2018/11/babaji18.jpg", "2018/11/babaji16.jpg"],
  },
  {
    slug: "lahiri-guffa",
    name: "Lahiri Guffa",
    kind: "Cueva de Lahiri",
    text: "Desde el centro del Ashram, una caminata de 5 minutos entre colibríes y bromelias, lleva a un mágico lugar, con vistas imponentes de los Andes y con una cascada que se acopla armoniosamente al silencio reinante. Esta cueva natural que se aloja debajo de una roca gigante, está dedicada a la energía de Lahiri Mahasaya, un Maestro infinito, que vivió en India entre los años 1828 y 1895. Su ambientación es perfecta para retiros en solitario de meditación y práctica de Kriya Yoga.",
    images: ["2018/11/lahiri10.jpg", "2018/11/lahiri15.jpg", "2018/11/lahiri5.jpg", "2018/11/lahiri7.jpg", "2018/11/lahiri11.jpg", "2018/11/lahiri6.jpg"],
  },
  {
    slug: "amrita-shala",
    name: "Amrita Shala",
    kind: "Salón de los Maestros",
    text: "Es el salón de los Maestros Inmortales. Un cálido espacio construido en madera, para meditar en la presencia divina de Maestros que nos han inspirado con su ejemplo de vida y enseñanza.",
    images: ["2018/11/maestros8.jpg", "2018/11/maestros3.jpg", "2018/11/maestros16.jpg"],
  },
  {
    slug: "salon-saraswati",
    name: "Salón Saraswati",
    kind: "Biblioteca",
    text: "Es la biblioteca del Ashram. Además de textos sagrados, esotéricos, de espiritualidad en español e inglés, posee piezas de arte y objetos de todo el mundo, vinculados a diversos lugares de luz del planeta.",
    images: ["2024/01/Biblioteca-2.jpg", "2018/11/biblio3.jpg", "2018/11/biblio12.jpg", "2018/11/biblio11.jpg", "2024/01/Biblioteca.jpg"],
  },
  {
    slug: "shiva-kunda",
    name: "Shiva Kunda",
    kind: "Laguna",
    text: "Es el pequeño lago del Ashram. Su agua conducida naturalmente desde el manantial que brota de la cima de la montaña, baña en forma de pequeña cascada un lingam. En el centro se encuentra una estatua del Señor Shiva. Es un espacio perfecto para lectura, escritura, meditación y contemplación.",
    images: ["2018/11/shivakunda7.jpg", "2018/11/shivakunda2.jpg", "2018/11/shivakunda1.jpg", "2018/11/shivakunda3.jpg"],
  },
  {
    slug: "jardin-zen",
    name: "Jardín Zen",
    kind: "Jardín japonés",
    text: "Meditar en el dodecaedro de cobre, escribir, contemplar su cascada, realizar los saludos al Sol, practicar Shiva Hatha Yoga individual, son algunas de las experiencias únicas que te esperan en este diseño japonés, de simplicidad elegante.",
    images: ["2018/11/zen4.jpg", "2018/11/zen5.jpg", "2018/11/zen3.jpg", "2018/11/zen10.jpg"],
  },
  {
    slug: "cruz-celta",
    name: "Cruz Celta",
    kind: "Espacio al aire libre",
    text: "Es un espacio al aire libre, rodeado de drusas de amatista que generan un campo energético perfecto para la meditación y contemplación, en comunión con la energía del Sagrado Corazón de Jesús que se encuentra en su centro.",
    images: ["2018/11/cruz4.jpg", "2018/11/cruz6.jpg", "2018/11/cruz3.jpg", "2018/11/cruz9.jpg"],
  },
];

export const getEspacio = (slug: string) => espacios.find((e) => e.slug === slug);
