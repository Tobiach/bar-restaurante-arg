import { MovimientoCaja, ItemVendido } from '../types/admin.types';

function m(offset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const y  = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, '0');
  const d  = String(date.getDate()).padStart(2, '0');
  return `${y}-${mo}-${d}`;
}

// 2 semanas hacia atrás — pico vie-sab-dom + 1 evento privado grande. Precios actualizados 2026.
export const mockMovimientosCaja: MovimientoCaja[] = [
  // --- Semana anterior ---
  { id: 'cm01', fecha: m(-13), tipo: 'ingreso', categoria: 'Reservas',            descripcion: 'Livings VIP sábado — 6 reservas',          monto: 280000, metodo: 'Transferencia' },
  { id: 'cm02', fecha: m(-13), tipo: 'ingreso', categoria: 'Cocktails',           descripcion: 'Barra premium sábado noche',                monto: 258000, metodo: 'Efectivo' },
  { id: 'cm03', fecha: m(-13), tipo: 'ingreso', categoria: 'Tapas',               descripcion: 'Menú degustación — sábado',                 monto: 98000,  metodo: 'Tarjeta' },
  { id: 'cm04', fecha: m(-13), tipo: 'egreso',  categoria: 'Proveedores Premium', descripcion: 'Champagne y espumantes — lote sábado',      monto: 148000, metodo: 'Transferencia' },
  { id: 'cm05', fecha: m(-12), tipo: 'ingreso', categoria: 'Reservas',            descripcion: 'Livings domingo tarde — 4 reservas',        monto: 188000, metodo: 'Transferencia' },
  { id: 'cm06', fecha: m(-12), tipo: 'ingreso', categoria: 'Cocktails',           descripcion: 'Barra domingo sunset',                      monto: 158000, metodo: 'Efectivo' },
  { id: 'cm07', fecha: m(-10), tipo: 'egreso',  categoria: 'Sueldos',             descripcion: 'Sueldos semana — equipo 6 personas',        monto: 178000, metodo: 'Transferencia' },
  { id: 'cm08', fecha: m(-10), tipo: 'egreso',  categoria: 'Marketing',           descripcion: 'Pauta Instagram + influencer collab',       monto: 52000,  metodo: 'Transferencia' },
  { id: 'cm09', fecha: m(-9),  tipo: 'egreso',  categoria: 'Proveedores Premium', descripcion: 'Licores premium — importados',              monto: 175000, metodo: 'Transferencia' },
  // --- Semana actual (con evento privado grande) ---
  { id: 'cm10', fecha: m(-6),  tipo: 'ingreso', categoria: 'Reservas',            descripcion: 'Livings VIP sábado — 8 reservas',           monto: 380000, metodo: 'Transferencia' },
  { id: 'cm11', fecha: m(-6),  tipo: 'ingreso', categoria: 'Cocktails',           descripcion: 'Barra premium sábado noche',                monto: 320000, metodo: 'Efectivo' },
  { id: 'cm12', fecha: m(-6),  tipo: 'ingreso', categoria: 'Tapas',               descripcion: 'Menú degustación — sábado',                 monto: 112000, metodo: 'Tarjeta' },
  { id: 'cm13', fecha: m(-6),  tipo: 'egreso',  categoria: 'Proveedores Premium', descripcion: 'Champagne Moët & Chandon — lote VIP',      monto: 182000, metodo: 'Transferencia' },
  { id: 'cm14', fecha: m(-5),  tipo: 'ingreso', categoria: 'Eventos',             descripcion: 'Evento privado corporativo — 80 personas',  monto: 720000, metodo: 'Transferencia' },
  { id: 'cm15', fecha: m(-5),  tipo: 'ingreso', categoria: 'Cocktails',           descripcion: 'Open bar evento privado',                   monto: 264000, metodo: 'Transferencia' },
  { id: 'cm16', fecha: m(-5),  tipo: 'egreso',  categoria: 'Proveedores Premium', descripcion: 'Catering premium evento corporativo',       monto: 280000, metodo: 'Transferencia' },
  { id: 'cm17', fecha: m(-4),  tipo: 'egreso',  categoria: 'Sueldos',             descripcion: 'Sueldos semana + extra evento',             monto: 222000, metodo: 'Transferencia' },
  { id: 'cm18', fecha: m(-4),  tipo: 'egreso',  categoria: 'Marketing',           descripcion: 'Sesión fotográfica rooftop — redes',        monto: 62000,  metodo: 'Transferencia' },
  { id: 'cm19', fecha: m(-2),  tipo: 'egreso',  categoria: 'Proveedores Premium', descripcion: 'Reposición licores premium',                monto: 168000, metodo: 'Transferencia' },
  { id: 'cm20', fecha: m(-1),  tipo: 'ingreso', categoria: 'Reservas',            descripcion: 'Reservas jueves noche — 5 livings',         monto: 238000, metodo: 'Transferencia' },
  { id: 'cm21', fecha: m(-1),  tipo: 'ingreso', categoria: 'Cocktails',           descripcion: 'Barra jueves premium',                      monto: 196000, metodo: 'Efectivo' },
];

export const mockItemsVendidos: ItemVendido[] = [
  { nombre: 'Living VIP (4 pers)',   categoria: 'Reservas',  cantidadSemana: 20,  ingresoSemana: 1900000, margenEstimado: 78, tendencia: 'subiendo' },
  { nombre: 'Negroni Cielo',         categoria: 'Cocktails', cantidadSemana: 72,  ingresoSemana: 1080000, margenEstimado: 70, tendencia: 'estable' },
  { nombre: 'Evento privado',        categoria: 'Eventos',   cantidadSemana: 1,   ingresoSemana: 720000,  margenEstimado: 60, tendencia: 'estable' },
  { nombre: 'Buenos Aires Sour',     categoria: 'Cocktails', cantidadSemana: 58,  ingresoSemana: 841000,  margenEstimado: 70, tendencia: 'subiendo' },
  { nombre: 'Champagne Brut Rosé',   categoria: 'Bebidas',   cantidadSemana: 88,  ingresoSemana: 836000,  margenEstimado: 62, tendencia: 'subiendo' },
  { nombre: 'Rooftop Mule',          categoria: 'Cocktails', cantidadSemana: 52,  ingresoSemana: 717600,  margenEstimado: 65, tendencia: 'estable' },
  { nombre: 'Tabla Ibérica',         categoria: 'Tapas',     cantidadSemana: 26,  ingresoSemana: 481000,  margenEstimado: 55, tendencia: 'estable' },
  { nombre: 'Sangría Cielo',         categoria: 'Cocktails', cantidadSemana: 15,  ingresoSemana: 165000,  margenEstimado: 12, tendencia: 'bajando' },
];
