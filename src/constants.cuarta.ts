import { ShowBadge } from './constants';

export const cuartaData = {
  menu: [
    { id: "c1", cat: "CANILLAS", nombre: "IPA del Sur", desc: "Lupulada, refrescante, seca. La reina de la barra.", precio: 1800, badges: ["CANILLA DEL DÍA"] },
    { id: "c2", cat: "CANILLAS", nombre: "Golden Porteña", desc: "Suave, equilibrada, perfecta para el primero.", precio: 1600 },
    { id: "c3", cat: "CANILLAS", nombre: "Stout Oscura", desc: "Tostada, cremosa, con notas a café y chocolate.", precio: 1900 },
    { id: "c4", cat: "CANILLAS", nombre: "Honey Ale", desc: "Dulce, floral, con miel real del sur.", precio: 1750 },
    { id: "c5", cat: "CANILLAS", nombre: "Red Ale Pampera", desc: "Caramelo, cuerpo medio, muy balanceada.", precio: 1850 },
    { id: "p1", cat: "PICADAS", nombre: "Picada Básica", desc: "Salame, queso, aceitunas y pan artesanal.", precio: 4500, badges: ["MÁS PEDIDO"] },
    { id: "p2", cat: "PICADAS", nombre: "Tabla Completa", desc: "Jamón crudo, queso port salut, pepinillos, tomates cherry y pan de masa madre.", precio: 8500 },
    { id: "p3", cat: "PICADAS", nombre: "Bondiola Ahumada", desc: "300g de bondiola ahumada con chimichurri casero.", precio: 6500, badges: ["RECOMENDADO"] },
    { id: "k1", cat: "DE LA COCINA", nombre: "Hamburguesa La Cuarta", desc: "200g de carne, cheddar, bacon, cebolla caramelizada y salsa secreta.", precio: 5800, badges: ["MÁS PEDIDO"] },
    { id: "k2", cat: "DE LA COCINA", nombre: "Papas con Cheddar", desc: "Papas fritas caseras bañadas en salsa de cheddar.", precio: 3200 },
    { id: "k3", cat: "DE LA COCINA", nombre: "Milanesa al Pan", desc: "Milanesa de ternera, lechuga, tomate y mayo de la casa.", precio: 4800 },
    { id: "s1", cat: "SIN ALCOHOL", nombre: "Limonada Artesanal", desc: "Limón natural, menta y jengibre.", precio: 1200 },
    { id: "s2", cat: "SIN ALCOHOL", nombre: "Agua con Gas", desc: "500ml.", precio: 800 },
  ],
  shows: [] as typeof ShowBadge[],
  resenas: [
    { id: "r1", nombre: "Matías G.", rating: 5, texto: "La IPA más rica que tomé en Buenos Aires. Y la picada está de terror.", fecha: "hace 2 días" },
    { id: "r2", nombre: "Lucía F.", rating: 5, texto: "Ambiente increíble, los precios son razonables y la atención es excelente.", fecha: "hace 1 semana" },
    { id: "r3", nombre: "Sebastián M.", rating: 4, texto: "El karaoke del martes es un must. Ya fui 3 veces este mes.", fecha: "hace 2 semanas" },
    { id: "r4", nombre: "Carolina V.", rating: 5, texto: "La hamburguesa es top. El lugar tiene onda, la pinta perfecta para estar horas.", fecha: "hace 3 semanas" },
    { id: "r5", nombre: "Diego R.", rating: 5, texto: "La Stout Oscura me cambió la vida. Voy todos los jueves.", fecha: "hace 1 mes" },
  ],
  galeria: [
    { id: "g1", cat: "Ambiente", src: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=800", alt: "Interior cervecería" },
    { id: "g2", cat: "Cervezas", src: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800", alt: "Canillas artesanales" },
    { id: "g3", cat: "Cervezas", src: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800", alt: "Vasos de cerveza" },
    { id: "g4", cat: "Comida", src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800", alt: "Hamburguesa La Cuarta" },
    { id: "g5", cat: "Comida", src: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=800", alt: "Picada completa" },
    { id: "g6", cat: "Karaoke", src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800", alt: "Noche de karaoke" },
    { id: "g7", cat: "Ambiente", src: "https://images.unsplash.com/photo-1574096079513-d8259312b785?w=800", alt: "Barra de la cervecería" },
    { id: "g8", cat: "Ambiente", src: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800", alt: "Mesas grupales" },
  ],
  usuario: {
    nombre: "Rodrigo M.",
    puntos: 310,
    nivel: "CUARTERA",
    proximoNivel: "BARRICERA",
    faltanPuntos: 190,
    historial: [
      { fecha: "03/06/2025", desc: "Karaoke + jarra", puntos: 80 },
      { fecha: "27/05/2025", desc: "Mesa grupal + picada", puntos: 120 },
      { fecha: "20/05/2025", desc: "Cumpleaños La Cuarta", puntos: 110 },
    ],
  },
};
