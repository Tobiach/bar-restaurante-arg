export const islaConfig = {
  nombre: "Isla Bar Cultural",
  tagline: "El lugar donde la noche cobra vida",
  logo: "https://lh3.googleusercontent.com/d/1lnU5jbBog4lqleTtxfAL_mQepyhORyDE",
  adminPin: "1234",

  telefono: "+54 9 11 6789-0123",
  whatsapp: "5491167890123",
  email: "islabarcultural@gmail.com",
  instagram: "islabarcultural",
  direccion: "Venezuela 3399, Almagro, Buenos Aires",
  googleMapsQuery: "Venezuela+3399,+Almagro",

  horarios: {
    diasAbiertos: [0, 3, 4, 5, 6],
    slots: [
      { dias: [3, 4, 5], abre: 20, cierra: 26 },
      { dias: [6], abre: 19, cierra: 28 },
      { dias: [0], abre: 19, cierra: 25 },
    ],
    resumen: "Mié-Vie 20-02 | Sáb 19-04 | Dom 19-01",
    detalle: ["Mié-Vie: 20 a 02 hs", "Sábado: 19 a 04 hs", "Domingo: 19 a 01 hs"],
  },

  tema: {
    primario:      "#0D0D0D",
    primarioMedio: "#1A1A1A",
    primarioCard:  "#242424",
    acento:        "#C9973A",
    acentoClaro:   "#E5B860",
    acentoOscuro:  "#9E7220",
    dorado:        "#F0D080",
  },

  fontTitulo: "'Inter', sans-serif",
  fontDisplay: "'Inter', sans-serif",

  features: {
    shows: true,
    karaoke: true,
    cumpleanos: true,
    puntos: true,
    galeria: true,
    resenas: true,
    newsletter: true,
  },

  hero: {
    tagBadge: "PRÓXIMO SHOW",
    titulo1: "El lugar donde",
    titulo2: "la noche cobra vida",
    subtitulo: "Cocina, tragos, música en vivo y shows únicos en el corazón de Almagro.",
    cta1: "VER CARTA →",
    cta1Href: "#sec-carta",
    cta2: "PRÓXIMOS SHOWS",
    cta2Href: "#sec-shows",
  },

  stats: [
    { valor: 3, sufijo: "+", label: "Shows semanales", iconName: "Music" },
    { valor: 40, sufijo: "+", label: "Platos únicos", iconName: "UtensilsCrossed" },
    { valor: 4, sufijo: ".8", label: "En Google", iconName: "Star" },
  ],

  ticker: [
    "COCINA COMPLETA",
    "BANDAS EN VIVO",
    "KARAOKE",
    "CUMPLEAÑOS",
    "TRAGOS ÚNICOS",
    "DJ SETS",
    "SHOWS ESPECIALES",
    "RESERVAS ONLINE",
    "PUNTOS CLUB",
  ],

  club: {
    nombre: "Isla Club",
    descripcion: "Tu fidelidad tiene premio. Acumulá y canjeá.",
    recompensas: [
      { pts: 100, gift: "10% OFF en tu cena" },
      { pts: 300, gift: "Entrada gratis a show" },
      { pts: 500, gift: "Mesa prioritaria sábado" },
      { pts: 1000, gift: "1h Open Bar para 4" },
    ],
    demoUser: {
      nombre: "Valentina R.",
      puntos: 820,
      nivel: "CULTURAL",
      proximoNivel: "VIP",
      faltanPuntos: 680,
      meta: 1500,
    },
  },

  packs: [
    {
      title: "BÁSICO",
      items: ["Mesa reservada con anticipación", "Torta artesanal de la casa", "Decoración minimalista", "Brindis de cortesía"],
      price: "$25.000",
      featured: false,
    },
    {
      title: "FESTIVO",
      items: ["Todo lo del plan Básico", "Decoración temática completa", "Selección de tapes a elección", "Sesión de fotos rápida"],
      price: "$45.000",
      featured: true,
    },
    {
      title: "VIP",
      items: ["Todo lo del plan Festivo", "Zona VIP semi-reservada", "Menú degustación especial", "Barra libre (2 hs)"],
      price: "$85.000",
      featured: false,
    },
  ],

  tiposReserva: [
    { id: "Salida",     iconName: "Sofa",   title: "MESA NORMAL",   desc: "Para cenar o tomar algo" },
    { id: "Show",       iconName: "Music2", title: "NOCHE DE SHOW", desc: "Mesa cerca del escenario" },
    { id: "Cumpleaños", iconName: "Gift",   title: "CUMPLEAÑOS",    desc: "Paquetes y festejos" },
  ],

  horariosReserva: ["20:00", "21:00", "22:00", "23:00"],

  reservas: {
    mensajeEscasez: "Solo 4 mesas disponibles para este sábado.",
  },

  karaoke: {
    titulo: "Karaoke Night",
    descripcion: "Todos los Miércoles y Jueves desde las 22:00 hs.\nEl escenario es tuyo, ¿te animás?",
    generos: ["Pop & Rock", "Cumbia Pop", "Reggaetón", "Folklore", "Tango", "Boleros"],
    consumicionMinima: "$2.000",
    puntosGanados: 50,
  },

  labels: {
    shows:     "PRÓXIMOS SHOWS",
    menu:      "LA CARTA",
    reservas:  "RESERVAR MESA",
    cumpleanos:"FESTEJOS",
    puntos:    "ISLA CLUB",
    karaoke:   "KARAOKE",
    galeria:   "GALERÍA",
    resenas:   "LO QUE DICEN",
    contacto:  "CÓMO LLEGAR",
  },

  footer: {
    descripcion: "El epicentro cultural de Almagro. Shows, gastronomía y buen encuentro en un solo lugar.",
    copyright: "© 2025 Isla Bar Cultural — Venezuela 3399, Almagro",
    links: {
      explorar: [
        { label: "La Carta", href: "#sec-carta" },
        { label: "Shows en Vivo", href: "#sec-shows" },
        { label: "Mesas de Karaoke", href: "#sec-karaoke" },
        { label: "Isla Club", href: "#sec-puntos" },
      ],
      festejos: [
        { label: "Cumpleaños", href: "#sec-cumple" },
        { label: "Eventos Privados", href: "#sec-cumple" },
        { label: "Reservas de Grupos", href: "#sec-reservas" },
      ],
    },
  },
};
