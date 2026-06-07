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
      { id: "e1", nombre: "Tabla de quesos y fiambres (para 2)", precio: 3800, emoji: "🧀", descripcion: "Variedad premium", badges: ["⭐ Recomendado"] },
      { id: "e2", nombre: "Empanadas de carne (x6)", precio: 2400, emoji: "🥟", descripcion: "Salteñas caseras", badges: ["🔥 Más pedido"] },
      { id: "e3", nombre: "Bruschetta de tomate", precio: 1900, emoji: "🍅", descripcion: "Tomate y albahaca", badges: ["🌱 Vegano"] },
      { id: "e4", nombre: "Papas fritas con alioli", precio: 1600, emoji: "🍟", descripcion: "Crocantes al punto" },
      { id: "e5", nombre: "Provoleta al orégano", precio: 2200, emoji: "🧀", descripcion: "Fundida a la chapa", badges: ["⭐ Recomendado"] },
      { id: "e6", nombre: "Alitas BBQ (x8)", precio: 3200, emoji: "🍗", descripcion: "Ahumadas", badges: ["🌶️ Picante"] },
    ],
    PRINCIPALES: [
      { id: "p1", nombre: "Milanesa napolitana", precio: 4800, emoji: "🥩", descripcion: "Con papas fritas", badges: ["🔥 Más pedido"] },
      { id: "p2", nombre: "Hamburguesa Isla", precio: 4200, emoji: "🍔", descripcion: "Doble cheddar, bacon", badges: ["⭐ Recomendado"] },
      { id: "p3", nombre: "Pasta al pomodoro", precio: 3400, emoji: "🍝", descripcion: "Pasta seca premium", badges: ["🌱 Vegano"] },
      { id: "p4", nombre: "Bife de chorizo", precio: 6500, emoji: "🥩", descripcion: "Con ensalada fresca" },
      { id: "p5", nombre: "Pollo grillado", precio: 4100, emoji: "🍗", descripcion: "Con vegetales asados" },
      { id: "p6", nombre: "Wrap de hummus", precio: 3600, emoji: "🌯", descripcion: "Vegetales asados", badges: ["🌱 Vegano"] },
      { id: "p7", nombre: "Pizza muzarella", precio: 3800, emoji: "🍕", descripcion: "Mediana al horno de barro", badges: ["🔥 Más pedido"] },
      { id: "p8", nombre: "Pizza calabresa", precio: 4200, emoji: "🍕", descripcion: "Con jalapeños", badges: ["🌶️ Picante"] },
    ],
    POSTRES: [
      { id: "po1", nombre: "Brownie con helado", precio: 2200, emoji: "🍫", descripcion: "Nueces y vainilla", badges: ["⭐ Recomendado"] },
      { id: "po2", nombre: "Tiramisú", precio: 2400, emoji: "🍰", descripcion: "Receta italiana", badges: ["🔥 Más pedido"] },
      { id: "po3", nombre: "Panqueques con DDL", precio: 1900, emoji: "🥞", descripcion: "Caramelizados" },
      { id: "po4", nombre: "Mousse de maracuyá", precio: 1800, emoji: "🍮", descripcion: "Pulpa natural", badges: ["🌱 Vegano"] },
    ],
    TRAGOS: [
      { id: "t1", nombre: "Negroni Isla", precio: 2800, emoji: "🍸", descripcion: "Gin, campari, vermú", badges: ["⭐ Recomendado"] },
      { id: "t2", nombre: "Mojito clásico", precio: 2400, emoji: "🍹", descripcion: "Menta fresca y ron", badges: ["🔥 Más pedido"] },
      { id: "t3", nombre: "Fernet con Coca", precio: 2100, emoji: "🥃", descripcion: "El clásico argentino" },
      { id: "t4", nombre: "Aperol Spritz", precio: 2600, emoji: "🍊", descripcion: "Prosecco y naranja", badges: ["⭐ Recomendado"] },
      { id: "t5", nombre: "Old Fashioned", precio: 3200, emoji: "🥃", descripcion: "Bourbon y amargos" },
      { id: "t6", nombre: "Margarita Maracuyá", precio: 2800, emoji: "🍹", descripcion: "Tequila y fruta", badges: ["🌶️ Picante"] },
    ],
    CERVEZAS: [
      { id: "c1", nombre: "Quilmes pinta", precio: 1400, emoji: "🍺", descripcion: "Bien helada", badges: ["🔥 Más pedido"] },
      { id: "c2", nombre: "Heineken 330ml", precio: 1800, emoji: "🍺", descripcion: "Long neck" },
      { id: "c3", nombre: "IPA artesanal", precio: 2200, emoji: "🍺", descripcion: "Lupulada", badges: ["⭐ Recomendado"] },
      { id: "c4", nombre: "Stout artesanal", precio: 2400, emoji: "🍺", descripcion: "Notas café y chocolate" },
    ],
    SIN_ALCOHOL: [
      { id: "s1", nombre: "Limonada natural", precio: 1400, emoji: "🍋", descripcion: "Con menta", badges: ["🌱 Vegano"] },
      { id: "s2", nombre: "Agua mineral", precio: 800, emoji: "💧", descripcion: "Sin gas 500ml" },
      { id: "s3", nombre: "Gaseosa lata", precio: 900, emoji: "🥤", descripcion: "Línea Coca-Cola" },
      { id: "s4", nombre: "Jugo Naranja", precio: 1600, emoji: "🍊", descripcion: "Exprimido natural", badges: ["🌱 Vegano"] },
    ],
    SNACKS: [
      { id: "sn1", nombre: "Mix frutos secos", precio: 1200, emoji: "🥜", descripcion: "Tostados" },
      { id: "sn2", nombre: "Maní con especias", precio: 900, emoji: "🌶️", descripcion: "Un toque picante", badges: ["🌶️ Picante"] },
      { id: "sn3", nombre: "Palomitas con queso", precio: 1000, emoji: "🍿", descripcion: "Dulzura y sal", badges: ["🔥 Más pedido"] },
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
