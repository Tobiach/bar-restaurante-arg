export enum ShowBadge {
  DISPONIBLE = "DISPONIBLE",
  ULTIMOS_LUGARES = "ÚLTIMOS LUGARES",
  LLENO = "LLENO",
  HOY = "HOY"
}

export interface MenuItem {
  id: string;
  nombre: string;
  precio: number;
  emoji: string;
  descripcion: string;
  badges?: string[];
}

export interface Show {
  id: string;
  nombre: string;
  genero: string;
  fecha: Date;
  horario: string;
  entrada: number;
  lugaresDisponibles: number;
  descripcion: string;
  badge?: ShowBadge;
  emoji?: string;
  imagen?: string;
}

// Menu data — content stays in constants, identity/theme goes to tenant.config.ts
export const ISLA_DATA = {
  menu: {
    ENTRADAS: [
      { id: "e1", nombre: "Tabla de quesos y fiambres (para 2)", precio: 8500, emoji: "", descripcion: "Variedad premium", badges: ["RECOMENDADO"] },
      { id: "e2", nombre: "Empanadas de carne (x6)", precio: 5200, emoji: "", descripcion: "Salteñas caseras", badges: ["MÁS PEDIDO"] },
      { id: "e3", nombre: "Bruschetta de tomate", precio: 1900, emoji: "", descripcion: "Tomate y albahaca", badges: ["VEGANO"] },
      { id: "e4", nombre: "Papas fritas con alioli", precio: 1600, emoji: "", descripcion: "Crocantes al punto" },
      { id: "e5", nombre: "Provoleta al orégano", precio: 6800, emoji: "", descripcion: "Fundida a la chapa", badges: ["RECOMENDADO"] },
      { id: "e6", nombre: "Alitas BBQ (x8)", precio: 3200, emoji: "", descripcion: "Ahumadas", badges: ["PICANTE"] },
      { id: "e7", nombre: "Croquetas de pollo con alioli", precio: 5500, emoji: "", descripcion: "Crujientes por fuera, cremosas por dentro" },
    ],
    PRINCIPALES: [
      { id: "p1", nombre: "Milanesa napolitana", precio: 9800, emoji: "", descripcion: "Con papas fritas", badges: ["MÁS PEDIDO"] },
      { id: "p2", nombre: "Hamburguesa Isla", precio: 11500, emoji: "", descripcion: "Doble cheddar, bacon", badges: ["MÁS PEDIDO"] },
      { id: "p3", nombre: "Pasta al pomodoro", precio: 3400, emoji: "", descripcion: "Pasta seca premium", badges: ["VEGANO"] },
      { id: "p4", nombre: "Bife de chorizo", precio: 6500, emoji: "", descripcion: "Con ensalada fresca" },
      { id: "p5", nombre: "Pollo grillado", precio: 4100, emoji: "", descripcion: "Con vegetales asados" },
      { id: "p6", nombre: "Wrap de hummus", precio: 3600, emoji: "", descripcion: "Vegetales asados", badges: ["VEGANO"] },
      { id: "p7", nombre: "Pizza muzarella", precio: 3800, emoji: "", descripcion: "Mediana al horno de barro", badges: ["MÁS PEDIDO"] },
      { id: "p8", nombre: "Pizza calabresa", precio: 4200, emoji: "", descripcion: "Con jalapeños", badges: ["PICANTE"] },
      { id: "p9", nombre: "Sándwich de pulled pork", precio: 8900, emoji: "", descripcion: "Cerdo desmechado con BBQ y pickles" },
      { id: "p10", nombre: "Ensalada César con pollo grillado", precio: 7500, emoji: "", descripcion: "Lechuga romana, croutons y parmesano" },
    ],
    POSTRES: [
      { id: "po1", nombre: "Brownie con helado", precio: 2200, emoji: "", descripcion: "Nueces y vainilla", badges: ["RECOMENDADO"] },
      { id: "po2", nombre: "Tiramisú", precio: 2400, emoji: "", descripcion: "Receta italiana", badges: ["MÁS PEDIDO"] },
      { id: "po3", nombre: "Panqueques con DDL", precio: 1900, emoji: "", descripcion: "Caramelizados" },
      { id: "po4", nombre: "Mousse de maracuyá", precio: 1800, emoji: "", descripcion: "Pulpa natural", badges: ["VEGANO"] },
    ],
    TRAGOS: [
      { id: "t1", nombre: "Negroni Isla", precio: 10000, emoji: "", descripcion: "Gin, campari, vermú", badges: ["RECOMENDADO"] },
      { id: "t2", nombre: "Mojito clásico", precio: 2400, emoji: "", descripcion: "Menta fresca y ron", badges: ["MÁS PEDIDO"] },
      { id: "t3", nombre: "Fernet con Coca", precio: 2100, emoji: "", descripcion: "El clásico argentino" },
      { id: "t4", nombre: "Aperol Spritz", precio: 7800, emoji: "", descripcion: "Prosecco y naranja", badges: ["RECOMENDADO"] },
      { id: "t5", nombre: "Old Fashioned", precio: 3200, emoji: "", descripcion: "Bourbon y amargos" },
      { id: "t6", nombre: "Margarita Maracuyá", precio: 2800, emoji: "", descripcion: "Tequila y fruta", badges: ["PICANTE"] },
      { id: "t7", nombre: "Isla Sour", precio: 9500, emoji: "", descripcion: "Whisky, limón, clara de huevo y jengibre", badges: ["RECOMENDADO"] },
      { id: "t8", nombre: "Gin Tonic premium", precio: 8500, emoji: "", descripcion: "Gin premium con botánicas" },
      { id: "t9", nombre: "Mocktail Sin Isla", precio: 4800, emoji: "", descripcion: "Sin alcohol, lleno de sabor", badges: ["VEGANO"] },
    ],
    CERVEZAS: [
      { id: "c1", nombre: "Quilmes pinta", precio: 1400, emoji: "", descripcion: "Bien helada", badges: ["MÁS PEDIDO"] },
      { id: "c2", nombre: "Heineken 330ml", precio: 1800, emoji: "", descripcion: "Long neck" },
      { id: "c3", nombre: "IPA artesanal", precio: 6500, emoji: "", descripcion: "Lupulada", badges: ["CANILLA DEL DÍA"] },
      { id: "c4", nombre: "Stout artesanal", precio: 6800, emoji: "", descripcion: "Notas café y chocolate" },
      { id: "c5", nombre: "Golden Ale", precio: 5800, emoji: "", descripcion: "Suave, equilibrada, perfecta para el primero" },
    ],
    SIN_ALCOHOL: [
      { id: "s1", nombre: "Limonada natural", precio: 3200, emoji: "", descripcion: "Con menta", badges: ["VEGANO"] },
      { id: "s2", nombre: "Agua mineral", precio: 1800, emoji: "", descripcion: "Sin gas 500ml" },
      { id: "s3", nombre: "Gaseosa lata", precio: 2300, emoji: "", descripcion: "Línea Coca-Cola" },
      { id: "s4", nombre: "Jugo Naranja", precio: 1600, emoji: "", descripcion: "Exprimido natural", badges: ["VEGANO"] },
    ],
    SNACKS: [
      { id: "sn1", nombre: "Mix frutos secos", precio: 1200, emoji: "", descripcion: "Tostados" },
      { id: "sn2", nombre: "Maní con especias", precio: 900, emoji: "", descripcion: "Un toque picante", badges: ["PICANTE"] },
      { id: "sn3", nombre: "Palomitas con queso", precio: 1000, emoji: "", descripcion: "Dulzura y sal", badges: ["MÁS PEDIDO"] },
    ]
  }
};

export const getNextDay = (dayIndex: number) => {
  const today = new Date();
  const resultDate = new Date(today);
  resultDate.setDate(today.getDate() + (dayIndex + 7 - today.getDay()) % 7);
  return resultDate;
};

export const SHOWS: Show[] = [
  {
    id: "sh1",
    nombre: "La venganza de la guitarra acústica",
    genero: "Acústico / Música en vivo",
    fecha: getNextDay(4),
    horario: "21:00",
    entrada: 3500,
    lugaresDisponibles: 15,
    descripcion: "~TONGA por 1ra vez (@tongaislade) | ~LUIS ABRAHAM por 1ra vez (@luisabrahamvill) | ~NACHO FUNES por 3ra vez (@nus_tremendu @funes.el.memorioso). 21 hs Puntual.",
    badge: ShowBadge.DISPONIBLE,
    emoji: "🎸",
    imagen: "https://lh3.googleusercontent.com/d/1OsM3C44jQLoTxQKLHvsdcQRm75KGiORx"
  },
  {
    id: "sh2",
    nombre: "Amigos de la casa!",
    genero: "Varieté / DJ Set",
    fecha: new Date(2026, 4, 17),
    horario: "20:00",
    entrada: 4500,
    lugaresDisponibles: 20,
    descripcion: "Domingo 17/5. ~ GUS FERNANDEZ (@gusfernandez_ok) | ~ MASFE (@soymasfe) | ~ FER HENRY (UY) (@fer.henry.veins) | 👑 TAROT (@zoelirios). Birra, tragos, comida casera y platos calentitos para el frio!",
    badge: ShowBadge.DISPONIBLE,
    emoji: "🎧",
    imagen: "https://lh3.googleusercontent.com/d/1zN8BwEHvoG2-EWOEZ4lM2cOYG_4JJHw3"
  },
  {
    id: "sh3",
    nombre: "Tango en vivo",
    genero: "Tango",
    fecha: getNextDay(6),
    horario: "21:00",
    entrada: 4200,
    lugaresDisponibles: 0,
    descripcion: "Coordina Cecilia Carballo (@la_campesina_carballo). Pareja de bailarines profesionales + bandoneón. Birra, tragos, comida casera y platos calentitos.",
    badge: ShowBadge.LLENO,
    emoji: "💃",
    imagen: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "sh4",
    nombre: "La Bicicleta con Alas",
    genero: "Poesía + Música",
    fecha: new Date(2026, 4, 15),
    horario: "20:00",
    entrada: 3000,
    lugaresDisponibles: 0,
    descripcion: "2da Edición 📖 Viernes 15 de Mayo. Poesía + Música. Una noche mágica que ya es parte de nuestra historia. A partir de las 20 hs.",
    badge: ShowBadge.LLENO,
    emoji: "📖",
    imagen: "https://lh3.googleusercontent.com/d/1g-T-9rd6lmVqoFhDuYRNZ1KWX4CHA-F0"
  },
  {
    id: "sh5",
    nombre: "Martina V. Acoustic",
    genero: "Folk / Pop Acústico",
    fecha: new Date(getNextDay(3).getTime() + 7 * 24 * 60 * 60 * 1000),
    horario: "21:30",
    entrada: 2500,
    lugaresDisponibles: 12,
    descripcion: "Una voz y una guitarra que llenan el alma. Noche íntima y especial.",
    badge: ShowBadge.DISPONIBLE
  },
  {
    id: "sh6",
    nombre: "Noche de Stand-Up",
    genero: "Humor / Stand-Up",
    fecha: new Date(getNextDay(4).getTime() + 7 * 24 * 60 * 60 * 1000),
    horario: "22:00",
    entrada: 4000,
    lugaresDisponibles: 8,
    descripcion: "3 comediantes, 90 minutos de risa garantizada. Consumición incluida.",
    badge: ShowBadge.ULTIMOS_LUGARES
  }
];

export const RESENAS = [
  { nombre: "Sofía A.", rating: 5, texto: "El lugar tiene una onda increíble. Fui al show de rock y no me quería ir. Los tragos son muy buenos.", servicio: "Show en vivo" },
  { nombre: "Tomás R.", rating: 5, texto: "Festejé mi cumple con el paquete festivo y superó todas las expectativas. El equipo se ocupó de todo.", servicio: "Cumpleaños" },
  { nombre: "Valentina L.", rating: 4, texto: "El karaoke de los miércoles es muy divertido. Buena comida, tragos ricos. Le saco una estrella porque tardó el pedido.", servicio: "Karaoke" },
  { nombre: "Matías G.", rating: 5, texto: "La mejor pista de Almagro. Ambiente increíble, gente buena onda.", servicio: "DJ Set" },
  { nombre: "Camila F.", rating: 5, texto: "Lugar hermoso, se nota que hay cuidado en cada detalle. El tango en vivo fue un espectáculo.", servicio: "Show Especial" },
];

export const USUARIO_DEMO = {
  nombre: "Valentina R.",
  puntos: 820,
  nivel: "CULTURAL",
  proximoNivel: "VIP",
  faltanPuntos: 680,
  historial: [
    { fecha: "14/03/2025", desc: "Noche de Show (Amigos de la Casa)", puntos: 150 },
    { fecha: "01/03/2025", desc: "Cena + Tragos", puntos: 120 },
    { fecha: "22/02/2025", desc: "Karaoke + consumición", puntos: 80 },
    { fecha: "08/02/2025", desc: "Festejo cumpleaños (Paquete Festivo)", puntos: 300 }
  ]
};

// Flat-array format for multi-tenant data switching
export const islaData = {
  menu: Object.entries(ISLA_DATA.menu).flatMap(([cat, items]) =>
    items.map(item => ({ ...item, cat, desc: item.descripcion }))
  ),
  shows: SHOWS,
  resenas: RESENAS,
  galeria: [
    { id: "g1",  cat: "SHOWS",     src: "https://lh3.googleusercontent.com/d/1LtW01EH0wUQ4VYrY_nR6oa8O1ugBj4XB", alt: "Energía en Vivo",                title: "Energía en Vivo" },
    { id: "g2",  cat: "AMBIENTE",  src: "https://lh3.googleusercontent.com/d/1KnOZWJi34Ht1POToYlkTjkqtjzDiLMud", alt: "Rincón Isla",                    title: "Rincón Isla" },
    { id: "g3",  cat: "SHOWS",     src: "https://lh3.googleusercontent.com/d/1OsM3C44jQLoTxQKLHvsdcQRm75KGiORx", alt: "La Venganza de la Guitarra",     title: "La Venganza de la Guitarra" },
    { id: "g4",  cat: "AMBIENTE",  src: "https://lh3.googleusercontent.com/d/1NaGwJ9P0xwMZnLZmvojs1itVIc5ZfxZe", alt: "Barra Especial",                 title: "Barra Especial" },
    { id: "g5",  cat: "SHOWS",     src: "https://lh3.googleusercontent.com/d/1DauAVjVawQ_B_xREDuzZCHV0og0kqXai", alt: "Momento Show",                   title: "Momento Show" },
    { id: "g6",  cat: "AMBIENTE",  src: "https://lh3.googleusercontent.com/d/1_6Uyr016Rvz1r-o9yT5qI3wuAbjDSFx6", alt: "Luces de Noche",                 title: "Luces de Noche" },
    { id: "g7",  cat: "SHOWS",     src: "https://lh3.googleusercontent.com/d/1fJSlevbs0gAn3YvOH2gCXYr649N6QiOO", alt: "Pasión en Escena",               title: "Pasión en Escena" },
    { id: "g8",  cat: "AMBIENTE",  src: "https://lh3.googleusercontent.com/d/1HOdELTJLn5FRrgjnbuoeK6ONfJucqDNQ", alt: "Detalles que Suman",             title: "Detalles que Suman" },
    { id: "g9",  cat: "AMBIENTE",  src: "https://lh3.googleusercontent.com/d/1TyVRj_0N5QSbK4dJzdNf0EyQ2bXc0IUn", alt: "Nuestra Esencia",               title: "Nuestra Esencia" },
    { id: "g10", cat: "SHOWS",     src: "https://lh3.googleusercontent.com/d/1bkogJSouxVfvwRtLyTQuVpHz8MJxtMF-", alt: "Bandas Invitadas",              title: "Bandas Invitadas" },
    { id: "g11", cat: "AMBIENTE",  src: "https://lh3.googleusercontent.com/d/1g-T-9rd6lmVqoFhDuYRNZ1KWX4CHA-F0", alt: "La Bicicleta con Alas",        title: "La Bicicleta con Alas" },
    { id: "g12", cat: "SHOWS",     src: "https://lh3.googleusercontent.com/d/1khMynTX9CT3KQYmFyHwnXS1u1fGp2hHl", alt: "Escenario Abierto",            title: "Escenario Abierto" },
    { id: "g13", cat: "SHOWS",     src: "https://lh3.googleusercontent.com/d/1yVu0xwdi1GDqpxnsFUwLXbfGJwWqWfh_", alt: "Shows Inolvidables",          title: "Shows Inolvidables" },
    { id: "g14", cat: "SHOWS",     src: "https://lh3.googleusercontent.com/d/1RYv_G9J-VgMmaXtiYFK42kxi3UJ3M_2f", alt: "Noches de Ritmo",             title: "Noches de Ritmo" },
    { id: "g15", cat: "SHOWS",     src: "https://lh3.googleusercontent.com/d/16vFERwmM2S0Xuud5RJ2HmyfLp7hhDflk", alt: "Cultura en Almagro",         title: "Cultura en Almagro" },
  ],
  usuario: USUARIO_DEMO,
};
