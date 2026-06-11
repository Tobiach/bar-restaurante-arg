export const cuartaConfig = {
  nombre: "Nos Trajo la Cuarta",
  tagline: "Cerveza artesanal. Buena charla. Sin apuro.",
  logo: "",
  adminPin: "4444",

  telefono: "+54 9 11 5555-4444",
  whatsapp: "5491155554444",
  email: "hola@nostrajolacuarta.com.ar",
  instagram: "nostrajolacuarta",
  direccion: "Av. Corrientes 3800, Buenos Aires",
  googleMapsQuery: "Av.+Corrientes+3800,+Buenos+Aires",

  horarios: {
    diasAbiertos: [2, 3, 4, 5, 6],
    slots: [
      { dias: [2, 3, 4], abre: 18, cierra: 25 },
      { dias: [5, 6], abre: 17, cierra: 28 },
    ],
    resumen: "Mar-Jue 18-01 | Vie-Sáb 17-04",
    detalle: ["Mar-Jue: 18 a 01 hs", "Vie-Sáb: 17 a 04 hs"],
  },

  tema: {
    primario:      "#0D1A0D",
    primarioMedio: "#152B15",
    primarioCard:  "#1A3A1A",
    acento:        "#C8A96E",
    acentoClaro:   "#DFC28A",
    acentoOscuro:  "#9A7A45",
    dorado:        "#E8DCC8",
    blancoSuave:   "#E8DCC8",
    blancoMuted:   "#9E8E7A",
  },

  fontTitulo: "'Libre Baskerville', serif",
  fontDisplay: "'Oswald', sans-serif",

  features: {
    shows: false,
    karaoke: true,
    cumpleanos: true,
    puntos: true,
    galeria: true,
    resenas: true,
    newsletter: false,
  },

  hero: {
    tagBadge: "CANILLAS ABIERTAS",
    titulo1: "La cerveza que",
    titulo2: "nos trajo la cuarta",
    subtitulo: "Artesanal, de autor, tirada. Con picada, sin pretensiones y con todas las ganas.",
    cta1: "VER CANILLAS →",
    cta1Href: "#sec-carta",
    cta2: "RESERVAR MESA",
    cta2Href: "#sec-reservas",
  },

  stats: [
    { valor: 12, sufijo: "+", label: "Canillas rotativas", iconName: "Beer" },
    { valor: 8, sufijo: "+", label: "Variedades propias", iconName: "FlaskConical" },
    { valor: 4, sufijo: ".9", label: "Calificación", iconName: "Star" },
  ],

  ticker: [
    "CANILLAS EN VIVO",
    "IPA · GOLDEN · STOUT",
    "PICADAS CASERAS",
    "KARAOKE LOS MARTES",
    "FUTBOL EN PANTALLA",
    "CUMPLEAÑOS GRUPALES",
    "RESERVAS ONLINE",
    "PUNTOS POR CONSUMO",
  ],

  club: {
    nombre: "Club La Cuarta",
    descripcion: "Cada jarra suma. Acumulá y tomá gratis.",
    recompensas: [
      { pts: 50,  gift: "Porción de papas gratis" },
      { pts: 150, gift: "Pinta de autor gratis" },
      { pts: 300, gift: "Jarra 1L gratis" },
      { pts: 500, gift: "Picada completa gratis" },
    ],
    demoUser: {
      nombre: "Rodrigo M.",
      puntos: 310,
      nivel: "CUARTERA",
      proximoNivel: "BARRICERA",
      faltanPuntos: 190,
      meta: 500,
    },
  },

  packs: [
    {
      title: "MESA COMPARTIDA",
      items: ["Mesa reservada para 4-6 personas", "Jarra 1L de bienvenida", "Picada básica de cortesía"],
      price: "$18.000",
      featured: false,
    },
    {
      title: "CUMPLE EN LA CUARTA",
      items: ["Mesa para hasta 12 personas", "2 jarras de autor", "Picada completa", "Torta de la casa"],
      price: "$38.000",
      featured: true,
    },
    {
      title: "NOCHE TOTAL",
      items: ["Mesa VIP en zona alta", "Balde 6 cervezas de autor", "Tabla de fiambres gourmet", "Foto grupal impresa"],
      price: "$65.000",
      featured: false,
    },
  ],

  tiposReserva: [
    { id: "Mesa",       iconName: "Sofa",  title: "MESA NORMAL",  desc: "Para tomar algo tranquilo" },
    { id: "Grupo",      iconName: "Users", title: "MESA GRUPAL",  desc: "Para grupos de 6 o más" },
    { id: "Cumpleaños", iconName: "Gift",  title: "CUMPLEAÑOS",   desc: "Paquetes para festejar" },
  ],

  horariosReserva: ["18:00", "19:00", "20:00", "21:00", "22:00"],

  reservas: {
    mensajeEscasez: "Mesas grupales con reserva anticipada. Asegurate el lugar.",
  },

  karaoke: {
    titulo: "Karaoke Los Martes",
    descripcion: "Todos los martes desde las 21:00 hs.\n¿Quién se anima primero?",
    generos: ["Rock Nacional", "Cumbia", "Pop Argentino", "Reggaetón", "80s & 90s", "Clásicos"],
    consumicionMinima: "$3.000",
    puntosGanados: 30,
  },

  labels: {
    shows:     "SHOWS",
    menu:      "CANILLAS & COCINA",
    reservas:  "RESERVAR MESA",
    cumpleanos:"FESTEJOS",
    puntos:    "CLUB LA CUARTA",
    karaoke:   "KARAOKE",
    galeria:   "GALERÍA",
    resenas:   "LO QUE DICEN",
    contacto:  "CÓMO LLEGAR",
  },

  footer: {
    descripcion: "Cervecería artesanal en el corazón de Buenos Aires. Canillas rotativas, picadas caseras y todo el ambiente que necesitás.",
    copyright: "© 2025 Nos Trajo la Cuarta — Av. Corrientes 3800, CABA",
    links: {
      explorar: [
        { label: "Canillas de Hoy", href: "#sec-carta" },
        { label: "Karaoke Martes", href: "#sec-karaoke" },
        { label: "Club La Cuarta", href: "#sec-puntos" },
        { label: "Reservas", href: "#sec-reservas" },
      ],
      festejos: [
        { label: "Cumpleaños Grupales", href: "#sec-cumple" },
        { label: "Eventos Privados", href: "#sec-cumple" },
        { label: "Mesas para Grupos", href: "#sec-reservas" },
      ],
    },
  },
};
