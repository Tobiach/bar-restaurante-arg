export const tenantConfig = {
  // Identidad
  nombre: "Isla Bar Cultural",
  tagline: "El lugar donde la noche cobra vida",
  logo: "https://lh3.googleusercontent.com/d/1lnU5jbBog4lqleTtxfAL_mQepyhORyDE",

  // Admin
  adminPin: "1234",

  // Contacto
  telefono: "+54 9 11 6789-0123",
  whatsapp: "5491167890123",
  email: "islabarcultural@gmail.com",
  instagram: "islabarcultural",
  direccion: "Venezuela 3399, Almagro, Buenos Aires",
  googleMapsQuery: "Venezuela+3399,+Almagro",

  // Horarios
  horarios: {
    diasAbiertos: [0, 3, 4, 5, 6],
    slots: [
      { dias: [3, 4, 5], abre: 20, cierra: 26 },
      { dias: [6], abre: 19, cierra: 28 },
      { dias: [0], abre: 19, cierra: 25 },
    ],
    resumen: "Mié-Vie 20-02 | Sáb 19-04 | Dom 19-01",
    detalle: [
      "Mié-Vie: 20 a 02 hs",
      "Sábado: 19 a 04 hs",
      "Domingo: 19 a 01 hs",
    ],
  },

  // Tema visual
  tema: {
    primario: "#2A1559",
    primarioMedio: "#3D2070",
    primarioCard: "#4A2880",
    acento: "#FD5E53",
    acentoClaro: "#FF8078",
    acentoOscuro: "#D93F34",
    dorado: "#FFD166",
  },

  // Features habilitadas
  features: {
    shows: true,
    karaoke: true,
    cumpleanos: true,
    puntos: true,
    galeria: true,
    resenas: true,
    newsletter: true,
  },

  // Hero
  hero: {
    tagBadge: "🔥 PRÓXIMO SHOW",
    titulo1: "El lugar donde",
    titulo2: "la noche cobra vida",
    subtitulo: "Cocina, tragos, música en vivo y shows únicos en el corazón de Almagro.",
    cta1: "VER CARTA →",
    cta2: "PRÓXIMOS SHOWS",
    stats: [
      { valor: 3, sufijo: "+", label: "Shows semanales", emoji: "🎶" },
      { valor: 40, sufijo: "+", label: "Platos únicos", emoji: "🍽️" },
      { valor: 4, sufijo: ".8", label: "En Google", emoji: "⭐" },
    ],
  },

  // Ticker marquee
  ticker: [
    "🍕 Cocina Completa",
    "🎸 Bandas en Vivo",
    "🎤 Karaoke",
    "🎂 Cumpleaños",
    "🍹 Tragos Únicos",
    "🎧 DJ Sets",
    "🎭 Shows Especiales",
    "🌟 Reservas Online",
    "🏆 Puntos Club",
  ],

  // Club de puntos
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

  // Packs cumpleaños
  packs: [
    {
      title: "BÁSICO",
      items: [
        "Mesa reservada con anticipación",
        "Torta artesanal de la casa",
        "Decoración minimalista",
        "Brindis de cortesía",
      ],
      price: "$25.000",
      featured: false,
    },
    {
      title: "FESTIVO",
      items: [
        "Todo lo del plan Básico",
        "Decoración temática completa",
        "Selección de tapes a elección",
        "Sesión de fotos rápida",
      ],
      price: "$45.000",
      featured: true,
    },
    {
      title: "VIP",
      items: [
        "Todo lo del plan Festivo",
        "Zona VIP semi-reservada",
        "Menú degustación especial",
        "Barra libre (2 hs)",
      ],
      price: "$85.000",
      featured: false,
    },
  ],

  // Tipos de reserva
  tiposReserva: [
    { id: "Salida", icon: "🪑", title: "MESA NORMAL", desc: "Para cenar o tomar algo" },
    { id: "Show", icon: "🎭", title: "NOCHE DE SHOW", desc: "Mesa cerca del escenario" },
    { id: "Cumpleaños", icon: "🎂", title: "CUMPLEAÑOS", desc: "Paquetes y festejos" },
  ],

  // Horarios disponibles en stepper
  horariosReserva: ["20:00", "21:00", "22:00", "23:00"],

  // Mensaje de escasez en reservas
  reservas: {
    mensajeEscasez: "Solo 4 mesas disponibles para este sábado. ⚡",
  },

  // Karaoke
  karaoke: {
    titulo: "Karaoke Night",
    descripcion:
      "Todos los Miércoles y Jueves desde las 22:00 hs.\nEl escenario es tuyo, ¿te animás?",
    generos: ["Pop & Rock", "Cumbia Pop", "Reggaetón", "Folklore", "Tango", "Boleros"],
    consumicionMinima: "$2.000",
    puntosGanados: 50,
  },

  // Footer
  footer: {
    descripcion:
      "El epicentro cultural de Almagro. Shows, gastronomía y buen encuentro en un solo lugar.",
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
