// Inner pages built from reusable blocks. Texts verbatim from the previous
// site; `**x**` marks bold. Images are original upload paths (src/lib/img.ts).

export type Block =
  | { type: "intro"; eyebrow?: string; title?: string; text: string[] }
  | { type: "split"; eyebrow?: string; title: string; text: string[]; image: string; note?: string; reverse?: boolean }
  | { type: "infobox"; title: string; items: { title?: string; text: string }[] }
  | { type: "cards"; eyebrow?: string; title?: string; items: { title: string; text: string; image: string }[] }
  | { type: "faq"; items: { q: string; a: string[] }[] }
  | { type: "quote"; text: string; author?: string; image?: string }
  | { type: "details"; eyebrow?: string; title: string; groups: { title: string; lines: string[] }[] }
  | { type: "route"; from: string; to: string; title: string; text: string };

export type Page = {
  path: string;
  eyebrow: string;
  title: string;
  lead?: string;
  hero: string;
  blocks: Block[];
};

const experimentar: Page = {
  path: "/experimentar-el-ashram/",
  eyebrow: "Experimentar",
  title: "Experimentar el Ashram",
  hero: "2024/01/1_19-scaled-1.jpg",
  lead: "El Ashram tiene un **diseño de activación diario** en el que todos sus espacios de luz reciben las consagraciones más puras y exactas de la Tradición Védica y en las cuales todos los seres que participan reciben sus potentes emisiones de luz y fuerza.",
  blocks: [
    {
      type: "intro",
      text: [
        "Además de las actividades especiales programadas mensualmente, diariamente se contemplan clases de Shakti Yoga y Tandava Kundalini, junto con la realización opcional de Karma Yoga y espacios de tiempo libre para la introspección, la contemplación y el sadhana personal.",
        "**Al momento las estadías por fuera de las actividades mensuales están destinadas únicamente a Iniciados de la EVD.**",
      ],
    },
    {
      type: "split",
      eyebrow: "Homa Vidya",
      title: "Fuego Sagrado",
      image: "2024/01/Fuego-1.jpg",
      text: [
        "Dentro del Sanatam Dharma (Espiritualidad Universal) la realización del Fuego Sagrado es la ceremonia de conexión más importante y representativa de los Vedas, es la más elevada sabiduría de purificación y conexión con las Esferas de Luz regentes.",
        "Hace más de 13,000 años, el Fuego Sagrado fue entregado a la humanidad como parte de los Códigos de Ascensión. En el transcurso del tiempo, esta información ha sido reactivada, presentando una oportunidad para acelerar los procesos evolutivos tanto a nivel individual como colectivo. La realización del ritual del Fuego Sagrado implica la aplicación de una ciencia cósmica que va más allá de los logros de la ciencia contemporánea. Es aprender a crear campos electromagnéticos y resonar con las frecuencias más elevadas del Universo, proporcionando así a la alma un contacto profundo y significativo.",
      ],
      note: "En Caminantes del Amanecer, se enciende el Fuego Sagrado todos los días, en la forma en que el Mahavatar Babaji se lo reveló a la Madre Shaktiananda.",
    },
    {
      type: "split",
      eyebrow: "El disipador de oscuridad",
      title: "Arati",
      image: "2024/01/Arati-3.jpg",
      reverse: true,
      text: [
        "Arati, una palabra sánscrita que significa “no oscuridad”, es una ceremonia diaria que establece un profundo contacto con la divinidad. Su fundamento reside en la ofrenda de amor, devoción y gratitud. La esencia del arati reside en ofrendar luz a través de una lámpara en honor al aspecto divino a consagrar, simbolizando el anhelo consciente de que todo pueda ser percibido con claridad, especialmente la vía por la cual el amor y la luz del Creador se manifiestan en estos planos.",
      ],
      note: "En el Ashram, se llevan a cabo los aratis tanto en la mañana como en la tarde, celebrándose en cada uno de los Templos activos.",
    },
    {
      type: "split",
      eyebrow: "Abhishekam",
      title: "Rudri",
      image: "2024/01/Rudri.jpg",
      text: [
        "Todas las mañanas en el Ashram se realiza la activación y baño de los Shiva Lingams junto con la recitación del primer Anuvaka del Rudram.",
        "La palabra “Rudra” se asocia con Shiva en su forma más feroz y destructora, pero también como el sanador y el benefactor. “Abhishekam” se refiere al acto de verter o rociar líquidos sagrados sobre la deidad como una forma de ofrecimiento y purificación.",
      ],
    },
    {
      type: "split",
      eyebrow: "Asanas, mudras y bandhas",
      title: "Shakti Yoga",
      image: "2024/01/hatha.jpg",
      reverse: true,
      text: [
        "Este sistema aborda la activación, desbloqueo y sutilización del sistema físico/etérico para un desarrollo espiritual firme y definitivo hacia el Ser.",
        "Shakti Yoga, como práctica, incluye un conjunto de asanas (posturas), mudras (sellos) y bandhas (tensiones de activación) cuidadosamente seleccionados por la Madre Shaktiananda y el Mahavatar Babaji. Estos elementos han sido diseñados para lograr efectos óptimos, permitiendo que el cuerpo del practicante se convierta en un vehículo apto y perfecto para recibir el descenso de luz en frecuencias de activación.",
      ],
      note: "En el Ashram se imparten clases semanalmente y para participar no se requiere contar con experiencia previa.",
    },
    {
      type: "split",
      eyebrow: "Movimiento y danza",
      title: "Shiva Tandava",
      image: "2024/01/Tandava.jpg",
      text: [
        "Este sistema permite la reactivación de la energía vital Shakti-Kundalini y la captación de las energías cósmicas proyectadas por las Esferas de Luz mediante dinámicas de movimiento y danza. La habilidad para manejar el cuerpo, la actitud de conexión, la visualización de las corrientes energéticas, la aplicación de mudras y la música convergen para crear una disciplina fascinante que despliega la fuerza interna.",
        "Esta práctica permite la evocación y el descenso de poderosas corrientes de energía, las cuales están asociadas a diversos aspectos divinos que ofrecen su asistencia al danzar y evocar sus cualidades de luz.",
      ],
      note: "En el Ashram Caminantes del Amanecer, se ofrece instrucción en Shiva Tandava de manera semanal, brindando la oportunidad de explorar y profundizar en esta poderosa disciplina.",
    },
    {
      type: "split",
      eyebrow: "La ciencia del prana",
      title: "Shiva Kriya Yoga",
      image: "2024/01/SKY.jpg",
      reverse: true,
      text: [
        "La ciencia del Shiva Kriya Yoga, es un conocimiento integral, compuesto por técnicas de control y activación de las corrientes internas de prana, que propicia la captación de fotones a nivel celular y la reactivación del ADN dormido. Contempla especialmente la transmisión del conocimiento milenario del dominio del prana o fuerza fotónica, activado a través del sonido primordial, como la llave hacia la activación de la Shakti Kundalini y la construcción o reactivación del Vehículo de Luz.",
        "El propósito de esta ciencia es la Autorrealización, el alcance del Amor Cósmico y la Inmortalidad, aspectos que refieren al acceso del alma al Campo Unificado de Inteligencia fotónica que rige el Universo todo. El Shiva Kriya Yoga se proyecta como un sendero de Iluminación, no ofrece beneficios menores, sino que propone a cada alma el retomar su tarea primordial: alcanzar la Unidad Cósmica.",
      ],
      note: "En el Ashram recibirá instrucciones y técnicas para su práctica en sus niveles introductorios, los cuales le permitirán sostener una práctica libre e independiente.",
    },
    {
      type: "split",
      eyebrow: "Dhyana",
      title: "Meditación",
      image: "2024/01/Dhyana.jpg",
      text: [
        "La meditación es la experiencia interna del alma, el contacto con aspectos que conforman al Ser. A lo largo de los tránsitos de la vida y las constantes búsquedas, el ser humano ha palpitado en el recuerdo de estados de paz y plenitud que, en algún punto de su eternidad, fueron verdaderos y reales. Sin embargo, distraído en las dinámicas del mundo, ha dejado esos momentos en rincones olvidados de su conciencia.",
        "Las milenarias enseñanzas nos hablan de los recursos humanos para conectarnos con esta realidad que nos trasciende, con los estados de supraconciencia, la verdadera condición del ser humano, que anhelamos pero no sabemos cómo acceder a ellos.",
      ],
      note: "En Caminantes del Amanecer, existen innumerables espacios destinados y amorosamente preparados para alcanzar profundos estados meditativos. Contamos con salones especialmente diseñados para esta práctica, donde puedes optar por el silencio, escuchar audios con meditaciones guiadas o sonidos de frecuencias que actúan en nuestro campo vibratorio, propiciando la disolución de programas internos. Además, ofrecemos la oportunidad de meditar al aire libre, en silencio o guiado por los sonidos de la naturaleza.",
    },
    {
      type: "split",
      eyebrow: "El servicio desinteresado",
      title: "Karma Yoga",
      image: "2024/01/Karma-Yoga.jpg",
      reverse: true,
      text: [
        "El Karma Yoga desempeña un papel fundamental en la vida de un Ashram, representando uno de los senderos del Yoga. En el Bhagavad Gita, se le describe como la ejecución de acciones desinteresadas, sin apego a los resultados obtenidos. Este enfoque implica realizar acciones de servicio sin esperar recompensas, constituyendo así un camino hacia la liberación. En el Karma Yoga, las acciones se llevan a cabo con entrega y plena conciencia, reconociendo que todo servicio prestado es, en última instancia, una ofrenda al propio Ser.",
        "Dentro de las actividades diarias de Caminantes del Amanecer, se fomenta la práctica opcional de esta disciplina durante 2 horas al día. Se ofrecen diversas áreas, como la huerta, carpintería, jardinería, mantenimiento e infraestructura general, donde los participantes tienen la oportunidad de desarrollar habilidades y aprender nuevas competencias. En este contexto, el Karma Yoga se convierte en una herramienta valiosa para el crecimiento personal, permitiendo a los practicantes contribuir al bienestar común sin esperar reconocimiento o beneficio personal.",
      ],
    },
  ],
};

const hospedaje: Page = {
  path: "/estadias/hospedaje/",
  eyebrow: "Estadía",
  title: "Hospedaje",
  hero: "2019/01/19.jpg",
  lead: "Contamos con cinco cabañas, confortablemente equipadas, con habitaciones compartidas de dos y tres camas. Espacios separados para hombres y mujeres.",
  blocks: [
    {
      type: "split",
      title: "Las cabañas",
      image: "2019/01/22-1.jpg",
      text: [
        "Contamos con cinco cabañas, confortablemente equipadas, con habitaciones compartidas de dos y tres camas. Espacios separados para hombres y mujeres.",
        "Los baños y duchas (con agua caliente 24hs.) se encuentran fuera de las cabañas; son para compartir y también se separan entre mujeres y hombres.",
      ],
      note: "Es posible alojarse en habitación single abonando un costo extra, excepto en los eventos especiales anuales.",
    },
    {
      type: "split",
      eyebrow: "Tres comidas diarias",
      title: "Alimentación consciente",
      image: "2019/01/08-2.jpg",
      reverse: true,
      text: [
        "Disponemos de dos hermosos sectores para las comidas. El comedor principal y la fonda Lakshmi, ambos con vistas a las montañas.",
        "Se sirven 3 comidas diarias (desayuno, almuerzo y cena) siendo la alimentación estrictamente vegetariana.",
        "Para su elaboración utilizamos, en su mayoría, vegetales de nuestra huerta orgánica, leche ordeñada del día de nuestra vaca “Ganga”, quesos y probióticos elaborados también aquí y miel de las abejas que viven en el Ashram.",
      ],
      note: "La alimentación está incluida en el contribución de la estadía.",
    },
    {
      type: "infobox",
      title: "Qué tener en cuenta",
      items: [
        { text: "Los baños y duchas (con agua caliente 24hs.) se encuentran fuera de las cabañas; son para compartir y también se separan entre mujeres y hombres." },
        { text: "Es posible alojarse en habitación single abonando un costo extra, excepto en los eventos especiales anuales." },
        { text: "No está permitido consumir ningún tipo de carne ni derivados y no se pueden consumir alimentos en las habitaciones ni en los espacios sagrados." },
        { text: "Si usted necesita traer consigo alimentos específicos, por alguna consideración en su salud, (sin gluten, por ejemplo) por favor notifíquenos." },
        { text: "La alimentación está incluida en el contribución de la estadía." },
      ],
    },
  ],
};

const refugio: Page = {
  path: "/refugio-natural/",
  eyebrow: "Naturaleza",
  title: "Un refugio natural",
  hero: "2024/03/banner-eco-ashram-2.jpg",
  lead: "En un mundo lleno de distracciones y estrés, el Ashram es un refugio natural, donde las fuerzas cósmicas se anclan en este plano a partir de una conexión pura con prakriti, la manifestación de la conciencia divina en la materia.",
  blocks: [
    {
      type: "intro",
      text: [
        "En el Ashram, te invitamos a dejar atrás la agitación de la vida cotidiana y sumergirte en la belleza y la serenidad de la naturaleza. La experiencia de respirar aire puro, el estar en contacto con la tierra y la alimentación consciente te ayudarán a desintoxicar tu cuerpo, mientras que la tranquilidad del entorno te permitirá despejar tu mente y renovar tu energía vital.",
      ],
    },
    {
      type: "split",
      eyebrow: "Alimentos de la tierra",
      title: "Huerta orgánica",
      image: "2024/03/Huerta.jpg",
      text: [
        "Estamos constantemente sometiendo nuestros sistemas a la impregnación de sustancias y alimentos tóxicos que van degenerando nuestra salud, generando una intoxicación que marca el inicio de muchas enfermedades. por ende, resulta indispensable realizar periódicamente procesos de desintoxicación que nos permitan purificar y rejuvenecer nuestros tejidos, nuestros sentidos y así también despejar nuestra mente y sutilizar el sistema todo.",
        "En Caminantes del Amanecer la alimentación en vegetariana y contamos con una huerta orgánica en la que usted podrá colaborar, si así lo desea, y aprender los cuidados y procedimientos que se requieren para obtener alimentos de la tierra, totalmente libres de químicos.",
      ],
    },
    {
      type: "split",
      eyebrow: "Vacas, burros, llamas y alpacas",
      title: "Granja Pashupati",
      image: "2024/03/llamas-2.jpg",
      reverse: true,
      text: [
        "En nuestro Ashram, compartimos el espacio con vacas, burros, llamas y alpacas, quienes no solo enriquecen nuestro entorno, sino que también ofrecen una oportunidad única para conectarnos con la naturaleza de una manera más íntima.",
        "Alimentar y cuidar de estos animales es una experiencia enriquecedora que te dejará con una profunda sensación de paz y conexión.",
      ],
    },
    {
      type: "split",
      eyebrow: "Bosque primario andino",
      title: "Senderismo",
      image: "2024/03/Senderismo.jpg",
      text: [
        "Sumérgete en la majestuosidad del bosque primario andino a través de nuestras rutas de senderismo guiadas. Este ecosistema único es hogar de una increíble diversidad de flora y fauna endémicas, algunas de las cuales son especies en peligro de extinción. Descubre cascadas cristalinas, observa aves exóticas y maravíllate con la flora única de la región.",
        "Este bosque alberga una gran variedad de orquídeas y bromelias que adornan el paisaje con sus colores y formas únicas. Además, tendrás la oportunidad de avistar aves como el colibrí, el tucán andino y el águila crestada, entre muchas otras especies.",
      ],
      note: "Nuestros guías expertos te acompañarán en esta aventura, brindándote información detallada sobre la vida silvestre que encuentres en el camino.",
    },
  ],
};

const chikitsa: Page = {
  path: "/sala-chikitsa/",
  eyebrow: "Terapias",
  title: "Sala Chikitsa",
  hero: "2019/06/header-sala-shikitsa.jpg",
  lead: "Suspendida en medio de la vegetación natural y con una hermosa vista al valle y las montañas, este espacio brinda la posibilidad de recibir terapias fundamentadas en las antiguas sabidurías orientales, preparando el cuerpo y llevándolo a condiciones perfectas para el encuentro con el alma.",
  blocks: [
    {
      type: "cards",
      eyebrow: "Terapias",
      title: "Sabiduría oriental para el cuerpo",
      items: [
        { title: "Shirodhara", image: "2019/06/shirodhara-desktop-2.jpg", text: "Es el tratamiento ayurvédico por excelencia para calmar la mente y rejuvenecer todos los sentidos. Consiste en la aplicación de de aceite tibio de forma continua en la frente. Esta terapia incluye masaje de cuello y cabeza." },
        { title: "Abhyanga (Masaje Ayurvédico)", image: "2025/12/masaje-ayurvedico-desktop-scaled.jpg", text: "Es la unción de todo el cuerpo en aceite tibio, a través de una serie de movimientos que siguen las líneas energéticas principales de nuestro sistema. Promueve la liberación de toxinas, el rejuvenecimiento de los tejidos y reducción de estrés." },
        { title: "Desintoxicación Iónica (Pediluvio)", image: "2019/06/desintoxicacion-ionica.jpg", text: "Es una terapia para depurar y desintoxicar el organismo de manera no invasiva e indolora. Se aplica directamente en los pies y permite limpiar las toxinas del organismo como mucosidades, metales pesados, químicos y grasas." },
        { title: "Termomasaje (Camilla de Jade)", image: "2019/06/cama-de-jade.jpg", text: "Es un tratamiento que combina cinco terapias en su funcionamiento, haciendo uso de la tecnología, con algunos principios de la medicina oriental, como: masaje, acupuntura, acupresión, quiropraxia y el calor infrarrojo. Su función es aliviar el dolor muscular, depurar y relajar el organismo." },
      ],
    },
  ],
};

const amenidades: Page = {
  path: "/amenidades/",
  eyebrow: "Estadía",
  title: "Amenidades",
  hero: "2019/01/amenidades.jpg",
  lead: "El Ashram cuenta con los servicios necesarios para su comodidad y tranquilidad. Comunicación, movilidad y todo lo necesario para su estadía, está contemplado y dispuesto para su bienestar.",
  blocks: [
    {
      type: "cards",
      items: [
        { title: "Fonda Lakshmi", image: "2019/01/01-4.jpg", text: "Es una pequeña tienda en donde podrá encontrar artículos de primera necesidad, snacks y bebidas, y disfrutar de ellos con un acojedor paisaje. Además, nuestra huerta orgánica puede facilitarle hortalizas y vegetales sin ningún tipo de contaminantes, a precios accesibles." },
        { title: "Transporte", image: "2019/01/02-3.jpg", text: "El Ashram está ubicado en Sustag, una zona rural a 30 minutos en las afueras de la ciudad de Cuenca. El transporte urbano es escaso, por ello contamos con servicio de transporte diario, desde y hasta el Ashram urbano Morada del Colibrí. El costo del servicio ida y vuelta es de $5." },
        { title: "Telefonía e internet", image: "2019/01/03-3.jpg", text: "Caminantes del Amanecer tiene servicio, con costo extra, de teléfono -dependiendo del destino y duración de llamada- e internet -$2 dólares por día-. No hay cobertura de telefonía celular." },
        { title: "Objetos personales", image: "2019/01/04-2.jpg", text: "Tenga en cuenta que no poseemos caja de seguridad, por tanto usted será responsable por sus pertenencias." },
      ],
    },
  ],
};

const lineamientos: Page = {
  path: "/lineamientos/",
  eyebrow: "Estadía",
  title: "Lineamientos",
  hero: "2019/01/headerlineamientos.jpg",
  lead: "Se recomienda seguir los Lineamientos de Amor para alcanzar una conducta armónica que beneficie al espacio y a todos los seres que aquí habitan.",
  blocks: [
    {
      type: "infobox",
      title: "Para alojarse en el Ashram",
      items: [
        { text: "Se debe contar con un seguro médico que cubra toda la estadía y que contratará directamente el huésped. Además es un requisito migratorio para ingresar a Ecuador." },
        { text: "Se recomienda disponerse en actitud introspectiva, practicar divino silencio, para propiciarse el contacto interno y obtener así el máximo beneficio que brinda este espacio." },
        { text: "Se respeta el celibato durante la estadía." },
        { text: "Se debe respetar el silencio en los espacios destinados a las prácticas personales y grupales de meditación, kriya y hatha yoga." },
        { text: "Los desechos se dividen en reciclables (plásticos, vidrio, papel, etc) y orgánicos (que se utilizan para la fabricación de abonos)." },
        { text: "En función de alinearse con las formas y atmósfera del Ashram, es necesario atender las actividades diarias que se proponen." },
        { text: "El horario de silencio para garantizar el buen descanso es de 9 pm a 6 am." },
        { text: "No está permitido tomar fotos en los interiores de los espacios." },
        { text: "El material de lectura es para ser utilizado sólo en la biblioteca Saraswati. No está permitido su uso fuera de este espacio." },
        { text: "No se permite el consumo de alcohol, tabaco, sustancias estimulantes, ni drogas de ningún tipo." },
        { text: "Los visitantes no están autorizados a manipular los elementos de ceremonial de los espacios de meditación, templos, etc." },
        { text: "No está permitido darle de comer a los animales. En el Ashram viven burros, alpacas y dos vacas." },
      ],
    },
  ],
};

const comoLlegar: Page = {
  path: "/estadias/ubicacion-y-como-llegar/",
  eyebrow: "Estadía",
  title: "Ubicación y cómo llegar",
  hero: "2018/12/header-ubicacion2.jpg",
  lead: "**Ubicado a tan sólo 30min. de la Ciudad de Cuenca-Ecuador**, Caminantes del Amanecer está localizado en 50 hectáreas montañosas de bosque primario andino, que brindan una experiencia única de paz y conexión interna.",
  blocks: [
    {
      type: "intro",
      text: [
        "Su belleza natural y su diseño arquitectónico en armonía con el ecosistema es un factor muy especial. Las verdes montañas, la innumerable variedad de flores, las bellas cascadas, el cantar de los pájaros, amaneceres imponentes y atardeceres inolvidables, hacen de Caminantes del Amanecer el lugar perfecto para aquellas personas que buscan un encuentro con su Ser.",
      ],
    },
    {
      type: "route",
      from: "Cuenca",
      to: "Ashram",
      title: "30 minutos",
      text: "Sustag, zona rural en las afueras de Cuenca. A 3.100 m s.n.m., muy cerca del Parque Nacional El Cajas.",
    },
    {
      type: "details",
      eyebrow: "Cómo llegar por vía aérea",
      title: "Aeropuertos",
      groups: [
        {
          title: "Aeropuerto Mariscal Lamar, Cuenca",
          lines: [
            "Es un aeropuerto nacional, con vuelos domésticos diarios desde y hacia los aeropuertos internacionales de Quito y Guayaquil (escalas obligatorias para quienes viajen desde el exterior).",
            "Se encuentra a 15 minutos en taxi del centro de la ciudad y del Ashram urbano Morada del Colibrí. El viaje tiene un costo de $3 aproximadamente.",
            "**Código IATA:** CUE · **Web:** aeropuertocuenca.ec · **Teléfonos:** (+593) 7 2867120 / 2862095",
          ],
        },
        {
          title: "Aeropuerto Internacional José Joaquín de Olmedo, Guayaquil",
          lines: [
            "Es el aeropuerto internacional más cercano. Opera con vuelos diarios a toda América y también a algunas ciudades de Europa.",
            "Hay servicios de van hacia Cuenca durante todo el día. El viaje es de 2.30 horas y el costo es de $15",
            "**Código IATA:** GYE · **Web:** tagsa.aero · **Teléfono:** (+593) 4 2169000",
          ],
        },
        {
          title: "Aeropuerto Internacional Mariscal Sucre, Quito",
          lines: [
            "Es el principal aeropuerto del país. Opera con vuelos diarios a todo América y Europa.",
            "Está alejado de la ciudad y el viaje puede durar 1 hora en taxi (costo aproximado $30) y 2 horas en bus local ($2). También hay servicios de van al centro de Quito ($25) y buses express ($8) con amplia frecuencia entre las 5.30 am y 10 pm.",
            "**Código IATA:** UIO · **Web:** aeropuertoquito.aero · **Teléfono:** (+593) 2 3954200",
          ],
        },
      ],
    },
    {
      type: "details",
      eyebrow: "Cómo llegar por vía terrestre",
      title: "Terminal Terrestre, Cuenca",
      groups: [
        {
          title: "Terminal Terrestre",
          lines: [
            "Se encuentra a 15 minutos del centro de la ciudad y del Ashram urbano Morada del Colibrí. Tiene servicios de buses diarios hacia y desde todo el país, incluyendo los trayectos desde los pasos fronterizos de Perú y Colombia (éste último, vía Quito)",
            "El costo del viaje en taxi desde la Terminal hacia el centro de Cuenca es aproximadamente $3",
            "**Dirección:** Avenida España y Sebastián Benalcázar · **Teléfono:** (+593) 7 2842107 / 2835535",
          ],
        },
      ],
    },
  ],
};

const queVisitar: Page = {
  path: "/que-visitar/",
  eyebrow: "Alrededores",
  title: "Qué visitar",
  hero: "2019/01/headerquevisitar.jpg",
  lead: "Ecuador es un país reconocido por su magnífica biodiversidad, además de su rico patrimonio cultural e histórico. Tierra de montañas, selva, volcanes, playas, ríos, ruinas incas, gastronomía típica y mucho más, hacen que éste lugar, en la mitad del planeta, ofrezca una muy amplia gama de posibilidades a la hora de planificar su viaje.",
  blocks: [
    {
      type: "split",
      eyebrow: "A 15 minutos del Ashram",
      title: "Termas Pumamaqui",
      image: "2019/01/01-5.jpg",
      text: [
        "Desde el Ashram, a 15 minutos de camino entre montañas, ríos, formaciones rocosas llamadas “los soldados” por la población local, se encuentra este oasis natural, con piscinas naturales de agua termal, rica en minerales muy beneficiosos para la salud. Estas termas de altura, se encuentran a 3.100 mts s.n.m rodeadas de un paisaje único.",
      ],
    },
    {
      type: "cards",
      eyebrow: "Cultura andina",
      title: "Legado inca",
      items: [
        { title: "Parque Arqueológico Pumapungo", image: "2019/01/02-4.jpg", text: "La ciudad de Cuenca, junto con Quito, fue una de las capitales importantes del desarrollo de la civilización Inca, en lo que hoy es Ecuador. Por este motivo, el legado incaico aún se preserva en sus cercanías. En el centro histórico de la ciudad, se halla este parque arqueológico, cuyas ruinas formaban parte de una de las urbes más imponentes del antiguo imperio en la región. Estos vestigios, son los de mayor importancia, luego de Ingapirca." },
        { title: "Ingapirca", image: "2019/01/03-4.jpg", text: "Es el sitio arqueológico más importante y mejor conservado de Ecuador. Fue un centro ceremonial, político, científico, militar y administrativo. Este complejo forma parte del Camino del Inca (antiguo sistema vial incaico) y todas sus construcciones están alineadas solarmente. La más importante e imponente, es el Templo del Sol, que puede recorrerse totalmente. A 1 hora 30 minutos de Cuenca, es fácilmente accesible diariamente." },
      ],
    },
    {
      type: "cards",
      eyebrow: "Lugares de interés",
      title: "Ecuador cerca",
      items: [
        { title: "Ciudad de Cuenca", image: "2019/01/04-3.jpg", text: "Considerada una de las ciudades más bellas de Ecuador, esta ciudad, que se encuentra a 2.500 mts de altura, es ideal para el turismo cultural y de descanso. Dada su riqueza arquitectónica, monumentos históricos, plazas, parques y casas tradicionales, es uno de los sitios más visitados por los turistas que llegan al país. Su casco histórico ha sido declarado por la UNESCO como Patrimonio Mundial de la Humanidad. La ciudad también ofrece una amplia oferta gastronómica, artesanías y variadas modalidades para recórrela y conocerla. Un destino que combina armoniosamente cultura, naturaleza y tradición." },
        { title: "Parque Nacional Cajas", image: "2019/01/05-2.jpg", text: "A sólo 30 minutos de Cuenca, el Parque Nacional Cajas es un paraíso para los observadores de aves y excursionistas, y una de las aventuras destacadas en un viaje por Ecuador. Constituye un escenario de gran belleza, dada su diversidad de cuerpos lacustres, combinada con una gran biodiversidad. Existen varios senderos de distinta duración, en los que podrá apreciar el bosque nuboso, flora autóctona y algunas de las más de 200 lagunas que conforman esta área protegida." },
        { title: "Pueblos artesanales", image: "2019/01/06-2.jpg", text: "La ciudad de Cuenca está rodeada por pueblitos pintorescos, en los que artesanos elaboran diversos productos como instrumentos musicales, joyería en filigrana, tejidos en telar, sombreros, piezas de alfarería y mucho más que usted puede descubrir en un recorrido de 1 día." },
        { title: "Avenida de los Volcanes", image: "2019/01/07-2.jpg", text: "Es una ruta escénica de más de 300 kilómetros a lo largo de la cordillera andina. Su nombre se debe a que alberga 84 volcanes que van desde los 4.300 mts hasta los 6.300 mts de altura sobre el nivel del mar. En su recorrido, se pueden observar volcanes como el Chimborazo (la montaña más alta de Ecuador), el Tungurahua (actualmente en actividad) y el Cotopaxi, entre muchos otros. Existen tours de 1 hasta 5 días." },
        { title: "Islas Galápagos", image: "2019/01/08-1.jpg", text: "Son un conjunto de 14 islas y una serie de islotes ubicados a 972 kilómetros de la costa continental ecuatoriana. De origen volcánico, conocidas como Las Islas Encantadas, son un museo y exhibición viviente de la evolución. Ofrecen una experiencia inigualable con la naturaleza, dado que acogen a especies únicas como iguanas, tortugas Galápagos, albatros, tiburones, manta rayas, piqueros y leones marinos, entre muchas otras. Son Patrimonio Mundial de la Humanidad y Reserva de la Biosfera." },
        { title: "Cueva de los Tayos", image: "2019/01/09-1.jpg", text: "Túneles que parecen hechos por el hombre, historias de expediciones especiales de estudio, contacto con la tribu aborigen Shuar, caminatas por la selva amazónica ecuatoriana y leyendas de civilizaciones antiguas avanzadas que habitaron el lugar, son algunos de los condimentos que encierran la visita a estas enigmáticas cuevas, que albergan grandes salas, cavernas, galerías estrechas y espacios llenos de estalactitas y estalagmitas." },
      ],
    },
  ],
};

const faq: Page = {
  path: "/preguntas-frecuentes/",
  eyebrow: "Estadía",
  title: "Preguntas frecuentes",
  hero: "2019/01/HEADERPREGUNTASFRECUENTES.jpg",
  blocks: [
    {
      type: "faq",
      items: [
        {
          q: "¿Qué es un Ashram?",
          a: [
            "Un Ashram es un centro espiritual en el que se está inmerso en una forma de vida ascética, al que se recurre para el refugio espiritual y el crecimiento interior.",
            "En un Ashram se observan lineamientos que sostienen la elevada vibración del lugar, favoreciendo un real avance interno, por ejemplo: alimentación y hábitos sátvicos -las fuerzas del mundo relativas a la Luz y armonía-. Durante la estadía se respeta el celibato, también se recomienda la lectura de textos sagrados, el silencio, la limpieza interna y externa, como así también humildad, apertura y la participación en las actividades diarias. Un Ashram es visitado por estudiantes de Yoga, meditación y personas de diferentes culturas y creencias. Es también el hogar del Gurú – palabra sánscrita que significa “quien quita la oscuridad”- que es el Maestro Iluminado cuyas enseñanzas sigue una escuela determinada.",
            "Existen miles de Ashram en India, sin embargo, ya no es necesario viajar hasta allí para experimentar un lugar así. En Caminantes del Amanecer puedes vivir tu experiencia-Ashram, de elevados ideales espirituales, en un pacífico y confortable ambiente, dotado de todo lo necesario para una provechosa estadía, en un marco natural paradisíaco.",
          ],
        },
        {
          q: "¿Cómo es el clima? ¿Qué ropa debo llevar?",
          a: [
            "El clima en esta zona de montañas de Ecuador, es templado durante el día y frío por la tarde y noche.",
            "Las temperaturas oscilan entre los 25º C en días soleados y 7º C durante la noche. Es muy variable durante todo el día. La presencia de cortas lluvias es frecuente.",
            "Es recomendable traer ropas cómodas, ropas de abrigo, ropa para lluvias, zapatos de caminata, paraguas, bloqueador solar, linterna.",
          ],
        },
        {
          q: "¿Cómo es la política acerca del tabaco, alcohol y drogas?",
          a: ["En el Ashram no se permite fumar, ni consumir alcohol ni drogas de ningún tipo. Tampoco el consumo de carnes. La alimentación es vegetariana."],
        },
        {
          q: "¿Debo contar con una asistencia médica?",
          a: [
            "Sí. Ecuador solicita como requisito para ingresar, cobertura médica para toda la estadía. Ud deberá presentarlo a su llegada al país.",
            "En caso de necesitar asistencia, en la ciudad de Cuenca existen muchas clínicas privadas y hospitales. Las condiciones de uso de su asistencia, deberá consultarlas con el prestador de la misma.",
          ],
        },
        {
          q: "Si necesito visitar un médico o hacer compras, ¿existe transporte hacia Cuenca?",
          a: [
            "Caminantes del Amanecer cuenta con transporte propio, con el que usted podrá contar si así lo necesita.",
            "El costo ida y vuelta a la ciudad es de $5. También existe servicio de taxis, con un costo de $10 por tramo. El sevicio de buses es muy acotado, habiendo 1 servicio diario en la mañana y otro por la tarde, a 500 mts de la entrada al Ashram.",
            "Asimismo, en el Ashram contamos con una fonda en donde podrá encontrar artículos de primera necesidad, snacks y refrescos. Si necesita algún artículo específico, lo podrá solicitar y nos encargaremos de entregárselo.",
          ],
        },
        {
          q: "¿Qué debo tener en cuenta si tengo problemas de salud?",
          a: [
            "El Ashram se encuentra a 3.100 mts sobre el nivel del mar, es recomendable tener al menos dos días de adaptación a la altura en la ciudad de Cuenca, que está a 2.500 mts s.n.m",
            "Los baños son compartidos y se encuentran fuera de las habitaciones. Para llegar a los templos y espacios de actividades es posible que tenga que subir y bajar escalones. Asimismo, existen caminerías estilo rampa a través de las cuales se puede acceder a la mayoría de los lugares.",
          ],
        },
        {
          q: "¿Hay servicio de internet y telefonía?",
          a: ["Sí. El Ashram cuenta con ambos servicios. Usted puede recibir llamadas telefónicas y podrá hacerlas, abonando un costo por la misma. El acceso a internet tiene costo extra, según su estadía. Funciona de manera óptima y podrá utilizar Whatsapp, Skype, Google, etc."],
        },
        {
          q: "¿Es posible hacer excursiones durante mi estadía en el Ashram?",
          a: [
            "Sí. Recomendamos que planee sus días para dedicarle principalmente el tiempo de su estadía a su trabajo interno, para que el propósito de su visita sea cumplido.",
            "Si su tiempo lo permite, desde aquí podremos reservarle con antelación a su viaje o durante su estadía, las excursiones que se ofrecen desde la ciudad de Cuenca a las ruinas Incas, aguas termales, Parque Nacional Cajas, etc, como así también otros programas por Ecuador.",
          ],
        },
      ],
    },
  ],
};

const quienesSomos: Page = {
  path: "/quienes-somos/",
  eyebrow: "Sobre el Ashram",
  title: "La Conciencia Babaji en América",
  hero: "2022/04/portada.jpg",
  lead: "El **Ashram Caminantes del Amanecer** es la estación de la **Conciencia Babaji en América**, el centro mundial de la enseñanza de **Shiva Kriya Yoga**, la sabiduría de realización de **Mataji Shaktiananda** y el **Mahavatar Babaji**. Es un refugio de luz y espiritualidad profunda, destinado a la activación más plena del potencial evolutivo del ser humano consciente.",
  blocks: [
    {
      type: "intro",
      text: [
        "Situado en los andes ecuatorianos, nace a razón de una nueva aventura divina para continuar el plan trazado por los Maestros Inmortales para América, lugar de nacimiento de la nueva conciencia, donde hoy se sitúa la Shakti-Kundalini del planeta.",
        "El Ashram está especialmente consagrado a las formas espirituales más elevadas. La práctica del milenario Shiva Kriya Yoga y sus diferentes áreas de sabiduría es su propósito fundamental. Se trata de un foco energético activo, que propicia la conexión cósmica de todas aquellas almas que se propongan un avance real en su sendero interno.",
        "Cualquier persona con sincera intención de autoconocimiento puede beneficiarse con la experiencia de visitar y experimentar el Ashram, participando de las diversas propuestas y actividades que ofrece, sin necesidad de contar con conocimientos previos en Kriya Yoga, meditación y otras prácticas de ascensión.",
      ],
    },
    {
      type: "split",
      eyebrow: "50 hectáreas de bosque andino",
      title: "La atmósfera para el encuentro",
      image: "2024/01/Entrada.jpg",
      text: [
        "El Ashram se ubica a 30 minutos de la ciudad de Cuenca-Ecuador, en un área de 50 hectáreas montañosas de bosque primario andino, muy cercana al parque nacional “El Cajas”. Su belleza natural, custodiada por ríos y cascadas, junto con una exuberante fauna y flora local, permiten un profundo contacto con la naturaleza.",
        "Caminantes del Amanecer cuenta con hermosos espacios destinados a la práctica de Shiva Kriya Yoga, Hatha Yoga, meditación y contemplación que diariamente son activados con los códigos milenarios de los mantras y las formas rituales védicas.",
        "Su diseño arquitectónico bajo los principios de la geometría sagrada y en armonía con el ecosistema, crean la atmósfera más adecuada para una experiencia única de paz y conexión interna. Además, el Ashram ofrece una cuidada infraestructura de habitaciones y amenidades para garantizar una estadía confortable a todos sus huéspedes.",
      ],
    },
    {
      type: "split",
      eyebrow: "EVD",
      title: "Escuela Valores Divinos",
      image: "2018/12/proximosevents1.jpg",
      reverse: true,
      text: [
        "La EVD es una escuela de desarrollo de conciencia, un espacio donde es posible aprender a activar al Ser en su forma más plena a través de las enseñanzas ofrendadas por la Madre Shaktiananda y el Mahavatar Babaji.",
        "La EVD es la estructura de proyección del Shiva Kriya Yoga, la enseñanza primordial de los Maestros Inmortales. Es un camino interno de luz, un foco renovado y adaptado para estos tiempos, que ofrece una síntesis de los códigos de sabiduría y las técnicas milenarias que fueron entregadas a la humanidad para el alcance de la Realización del Ser.",
      ],
    },
  ],
};

export const pages: Page[] = [experimentar, hospedaje, refugio, chikitsa, amenidades, lineamientos, comoLlegar, queVisitar, faq, quienesSomos];

export const getPage = (path: string) => pages.find((p) => p.path === path);
