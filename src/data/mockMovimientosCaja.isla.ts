import { MovimientoCaja, ItemVendido } from '../types/admin.types';

function m(offset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const y  = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, '0');
  const d  = String(date.getDate()).padStart(2, '0');
  return `${y}-${mo}-${d}`;
}

// 2 semanas hacia atrás — picos jue-sab por shows. Precios actualizados 2026.
export const mockMovimientosCaja: MovimientoCaja[] = [
  // --- Semana anterior ---
  { id: 'im01', fecha: m(-14), tipo: 'ingreso', categoria: 'Shows/Entradas', descripcion: 'Show de Jazz — viernes — 48 entradas',    monto: 168000,  metodo: 'Efectivo' },
  { id: 'im02', fecha: m(-14), tipo: 'ingreso', categoria: 'Barra',          descripcion: 'Barra viernes noche — show',              monto: 175000,  metodo: 'Efectivo' },
  { id: 'im03', fecha: m(-14), tipo: 'ingreso', categoria: 'Cocina',         descripcion: 'Tablas y entrantes — viernes',            monto: 52000,   metodo: 'Tarjeta' },
  { id: 'im04', fecha: m(-13), tipo: 'ingreso', categoria: 'Shows/Entradas', descripcion: 'Show de Tango — sábado — 62 entradas',   monto: 279000,  metodo: 'Efectivo' },
  { id: 'im05', fecha: m(-13), tipo: 'ingreso', categoria: 'Barra',          descripcion: 'Barra sábado noche — show tango',        monto: 252000,  metodo: 'Efectivo' },
  { id: 'im06', fecha: m(-13), tipo: 'ingreso', categoria: 'Reservas',       descripcion: 'Mesas VIP sábado — 5 reservas',          monto: 175000,  metodo: 'Transferencia' },
  { id: 'im07', fecha: m(-13), tipo: 'egreso',  categoria: 'Proveedores',    descripcion: 'Pago banda Tango "El Arrabal"',          monto: 140000,  metodo: 'Transferencia' },
  { id: 'im08', fecha: m(-12), tipo: 'ingreso', categoria: 'Reservas',       descripcion: 'Mesas domingo — 4 reservas',             monto: 95000,   metodo: 'Transferencia' },
  { id: 'im09', fecha: m(-12), tipo: 'ingreso', categoria: 'Barra',          descripcion: 'Barra domingo tarde',                    monto: 72000,   metodo: 'Efectivo' },
  { id: 'im10', fecha: m(-10), tipo: 'egreso',  categoria: 'Proveedores',    descripcion: 'Insumos de barra — Distribuidora Sur',   monto: 108000,  metodo: 'Transferencia' },
  { id: 'im11', fecha: m(-9),  tipo: 'egreso',  categoria: 'Sueldos',        descripcion: 'Sueldos semana — equipo 5 personas',     monto: 145000,  metodo: 'Transferencia' },
  { id: 'im12', fecha: m(-8),  tipo: 'ingreso', categoria: 'Shows/Entradas', descripcion: 'Show Folclore — jueves — 35 entradas',   monto: 105000,  metodo: 'Efectivo' },
  { id: 'im13', fecha: m(-8),  tipo: 'ingreso', categoria: 'Barra',          descripcion: 'Barra jueves noche',                     monto: 128000,  metodo: 'Efectivo' },
  { id: 'im14', fecha: m(-8),  tipo: 'egreso',  categoria: 'Mantenimiento',  descripcion: 'Reparación iluminación escenario',       monto: 24000,   metodo: 'Efectivo' },
  // --- Semana actual ---
  { id: 'im15', fecha: m(-7),  tipo: 'ingreso', categoria: 'Reservas',       descripcion: 'Reservas viernes — 6 mesas',             monto: 148000,  metodo: 'Transferencia' },
  { id: 'im16', fecha: m(-7),  tipo: 'ingreso', categoria: 'Barra',          descripcion: 'Barra viernes tarde',                    monto: 98000,   metodo: 'Tarjeta' },
  { id: 'im17', fecha: m(-6),  tipo: 'ingreso', categoria: 'Shows/Entradas', descripcion: 'Show de Jazz — sábado — 71 entradas',    monto: 320000,  metodo: 'Efectivo' },
  { id: 'im18', fecha: m(-6),  tipo: 'ingreso', categoria: 'Barra',          descripcion: 'Barra sábado noche — show jazz',         monto: 295000,  metodo: 'Efectivo' },
  { id: 'im19', fecha: m(-6),  tipo: 'ingreso', categoria: 'Reservas',       descripcion: 'Mesas VIP sábado — 7 reservas',          monto: 196000,  metodo: 'Transferencia' },
  { id: 'im20', fecha: m(-6),  tipo: 'egreso',  categoria: 'Proveedores',    descripcion: 'Pago trío de Jazz "Milonga Libre"',      monto: 165000,  metodo: 'Transferencia' },
  { id: 'im21', fecha: m(-5),  tipo: 'ingreso', categoria: 'Reservas',       descripcion: 'Cumpleaños exclusivo — mesa 8 personas', monto: 248000,  metodo: 'Transferencia' },
  { id: 'im22', fecha: m(-5),  tipo: 'ingreso', categoria: 'Barra',          descripcion: 'Barra domingo noche',                    monto: 112000,  metodo: 'Efectivo' },
  { id: 'im23', fecha: m(-4),  tipo: 'egreso',  categoria: 'Sueldos',        descripcion: 'Sueldos semana — equipo 5 personas',     monto: 145000,  metodo: 'Transferencia' },
  { id: 'im24', fecha: m(-4),  tipo: 'egreso',  categoria: 'Proveedores',    descripcion: 'Vinos y licores — Wine & Spirits',       monto: 148000,  metodo: 'Transferencia' },
  { id: 'im25', fecha: m(-2),  tipo: 'egreso',  categoria: 'Mantenimiento',  descripcion: 'Limpieza y lavandería semanal',          monto: 15000,   metodo: 'Efectivo' },
  { id: 'im26', fecha: m(-1),  tipo: 'ingreso', categoria: 'Shows/Entradas', descripcion: 'Show especial — jueves — 40 entradas',   monto: 140000,  metodo: 'Efectivo' },
  { id: 'im27', fecha: m(-1),  tipo: 'ingreso', categoria: 'Barra',          descripcion: 'Barra jueves noche',                     monto: 142000,  metodo: 'Efectivo' },
];

export const mockItemsVendidos: ItemVendido[] = [
  { nombre: 'Negroni Isla',       categoria: 'Coctelería', cantidadSemana: 65,  ingresoSemana: 650000,  margenEstimado: 68, tendencia: 'subiendo' },
  { nombre: 'Hamburguesa Isla',   categoria: 'Cocina',     cantidadSemana: 28,  ingresoSemana: 322000,  margenEstimado: 45, tendencia: 'subiendo' },
  { nombre: 'Isla Sour',          categoria: 'Coctelería', cantidadSemana: 35,  ingresoSemana: 332500,  margenEstimado: 68, tendencia: 'subiendo' },
  { nombre: 'Entrada shows',      categoria: 'Shows',      cantidadSemana: 95,  ingresoSemana: 361000,  margenEstimado: 72, tendencia: 'estable' },
  { nombre: 'Aperol Spritz',      categoria: 'Coctelería', cantidadSemana: 42,  ingresoSemana: 327600,  margenEstimado: 52, tendencia: 'estable' },
  { nombre: 'IPA artesanal',      categoria: 'Cervezas',   cantidadSemana: 48,  ingresoSemana: 312000,  margenEstimado: 42, tendencia: 'estable' },
  { nombre: 'Tabla de fiambres',  categoria: 'Cocina',     cantidadSemana: 25,  ingresoSemana: 212500,  margenEstimado: 55, tendencia: 'estable' },
  { nombre: 'Provoleta',          categoria: 'Cocina',     cantidadSemana: 22,  ingresoSemana: 149600,  margenEstimado: 11, tendencia: 'bajando' },
];
