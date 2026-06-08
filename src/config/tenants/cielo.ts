export const cieloConfig = {
  nombre: "Cielo Rooftop",
  tagline: "Buenos Aires desde arriba. Cocktails de autor.",
  logo: "",
  adminPin: "9999",

  telefono: "+54 9 11 9999-8888",
  whatsapp: "5491199998888",
  email: "reservas@cielorooftop.com.ar",
  instagram: "cielorooftop",
  direccion: "Av. del Libertador 1200, Piso 18, Palermo, Buenos Aires",
  googleMapsQuery: "Av.+del+Libertador+1200,+Palermo,+Buenos+Aires",

  horarios: {
    diasAbiertos: [3, 4, 5, 6],
    slots: [
      { dias: [3, 4], abre: 19, cierra: 25 },
      { dias: [5, 6], abre: 18, cierra: 29 },
    ],
    resumen: "Jue-Vie 19-01 | Sáb 18-05",
    detalle: ["Jueves: 19 a 01 hs", "Viernes: 19 a 01 hs", "Sábado: 18 a 05 hs"],
  },

  tema: {
    primario:      "#0E0C09",
    primarioMedio: "#161310",
    primarioCard:  "#1E1A14",
    acento:        "#B8966E",
    acentoClaro:   "#D4B896",
    acentoOscuro:  "#8B6E4E",
    dorado:        "#EDE0CC",
    blancoSuave:   "#EDE0CC",
    blancoMuted:   "#9E8E7A",
  },

  fontTitulo: "'Cormorant Garamond', serif",
  fontDisplay: "'Barlow Condensed', sans-serif",

  features: {
    shows: true,
    karaoke: false,
    cumpleanos: true,
    puntos: true,
    galeria: true,
    resenas: true,
    newsletter: true,
  },

  hero: {
    tagBadge: "ROOFTOP EXCLUSIVO",
    titulo1: "Buenos Aires",
    titulo2: "desde arriba",
    subtitulo: "Cocktails de autor, vistas únicas y una noche que no vas a olvidar. Reservá tu lugar.",
    cta1: "VER MENÚ →",
    cta1Href: "#sec-carta",
    cta2: "RESERVAR LIVING",
    cta2Href: "#sec-reservas",
  },

  stats: [
    { valor: 18, sufijo: "°", label: "Piso con vista 360°", iconName: "Building2" },
    { valor: 40, sufijo: "+", label: "Cocktails de autor", iconName: "GlassWater" },
    { valor: 5, sufijo: "★", label: "Experiencia premium", iconName: "Crown" },
  ],

  ticker: [
    "ROOFTOP PALERMO",
    "COCKTAILS DE AUTOR",
    "VISTA 360° BUENOS AIRES",
    "DJ SETS JUEVES A SÁBADO",
    "LIVINGS VIP RESERVABLES",
    "MEMBRESÍA CIELO CLUB",
    "EVENTOS PRIVADOS",
    "RESERVAS ONLINE",
  ],

  club: {
    nombre: "Cielo Club",
    descripcion: "Membresía exclusiva. Acceso prioritario. Beneficios reales.",
    recompensas: [
      { pts: 200,  gift: "Cocktail de bienvenida" },
      { pts: 500,  gift: "Botella de champagne" },
      { pts: 1000, gift: "Living VIP una noche" },
      { pts: 2000, gift: "Evento privado 2 horas" },
    ],
    demoUser: {
      nombre: "Valentina R.",
      puntos: 1200,
      nivel: "CIELO VIP",
      proximoNivel: "CIELO BLACK",
      faltanPuntos: 800,
      meta: 2000,
    },
  },

  packs: [
    {
      title: "ACCESO CIELO",
      items: ["Reserva de living para 2", "Bienvenida con champagne", "Menú degustación de cocktails"],
      price: "$45.000",
      featured: false,
    },
    {
      title: "NOCHE VIP",
      items: ["Living premium con vista 360°", "Botella de champagne", "Tabla gourmet de autor", "Foto profesional de recuerdo"],
      price: "$95.000",
      featured: true,
    },
    {
      title: "EVENTO EXCLUSIVO",
      items: ["Sección privada completa", "Barra libre premium 3hs", "Menú cocina de autor", "DJ o música en vivo"],
      price: "A consultar",
      featured: false,
    },
  ],

  tiposReserva: [
    { id: "Living",   iconName: "Sofa",        title: "LIVING VIP",      desc: "Mesa baja con vista a la ciudad" },
    { id: "Barra",    iconName: "GlassWater",  title: "BARRA ALTA",      desc: "Experiencia en la barra con el bartender" },
    { id: "Evento",   iconName: "PartyPopper", title: "EVENTO PRIVADO",  desc: "Celebraciones exclusivas" },
  ],

  horariosReserva: ["19:00", "20:00", "21:00", "22:00", "23:00"],

  reservas: {
    mensajeEscasez: "Livings con disponibilidad limitada. Reservá con anticipación.",
  },

  karaoke: {
    titulo: "",
    descripcion: "",
    generos: [],
    consumicionMinima: "",
    puntosGanados: 0,
  },

  labels: {
    shows:     "DJ SETS & EVENTOS",
    menu:      "COCKTAILS & TAPAS",
    reservas:  "RESERVAR LIVING",
    cumpleanos:"CELEBRACIONES EXCLUSIVAS",
    puntos:    "CIELO CLUB",
    karaoke:   "KARAOKE",
    galeria:   "GALERÍA",
    resenas:   "LO QUE DICEN",
    contacto:  "CÓMO LLEGAR",
  },

  footer: {
    descripcion: "El rooftop más exclusivo de Palermo. Cocktails de autor y vistas únicas de Buenos Aires.",
    copyright: "© 2025 Cielo Rooftop — Av. del Libertador 1200, Piso 18, Palermo",
    links: {
      explorar: [
        { label: "Menú de Cocktails", href: "#sec-carta" },
        { label: "DJ Sets & Shows", href: "#sec-shows" },
        { label: "Cielo Club", href: "#sec-puntos" },
        { label: "Reservar Living", href: "#sec-reservas" },
      ],
      festejos: [
        { label: "Cumpleaños Exclusivos", href: "#sec-cumple" },
        { label: "Eventos Privados", href: "#sec-cumple" },
        { label: "Propuestas Corporativas", href: "#sec-reservas" },
      ],
    },
  },
};
