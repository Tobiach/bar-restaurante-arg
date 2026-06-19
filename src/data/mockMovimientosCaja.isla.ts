import { MovimientoCaja, ItemVendido } from '../types/admin.types';

function m(offset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const y  = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, '0');
  const d  = String(date.getDate()).padStart(2, '0');
  return `${y}-${mo}-${d}`;
}

// 2 semanas hacia atrás para comparación en insights (picos jue-sab por shows)
export const mockMovimientosCaja: MovimientoCaja[] = [
  // --- Semana anterior ---
  { id: 'im01', fecha: m(-14), tipo: 'ingreso', categoria: 'Shows/Entradas', descripcion: 'Show de Jazz — viernes — 48 entradas',    monto: 72000,  metodo: 'Efectivo' },
  { id: 'im02', fecha: m(-14), tipo: 'ingreso', categoria: 'Barra',          descripcion: 'Barra viernes noche — show',              monto: 54800,  metodo: 'Efectivo' },
  { id: 'im03', fecha: m(-14), tipo: 'ingreso', categoria: 'Cocina',         descripcion: 'Tablas y entrantes — viernes',            monto: 28400,  metodo: 'Tarjeta' },
  { id: 'im04', fecha: m(-13), tipo: 'ingreso', categoria: 'Shows/Entradas', descripcion: 'Show de Tango — sábado — 62 entradas',   monto: 93000,  metodo: 'Efectivo' },
  { id: 'im05', fecha: m(-13), tipo: 'ingreso', categoria: 'Barra',          descripcion: 'Barra sábado noche — show tango',        monto: 78500,  metodo: 'Efectivo' },
  { id: 'im06', fecha: m(-13), tipo: 'ingreso', categoria: 'Reservas',       descripcion: 'Mesas VIP sábado — 5 reservas',          monto: 45000,  metodo: 'Transferencia' },
  { id: 'im07', fecha: m(-13), tipo: 'egreso',  categoria: 'Proveedores',    descripcion: 'Pago banda Tango "El Arrabal"',          monto: 55000,  metodo: 'Transferencia' },
  { id: 'im08', fecha: m(-12), tipo: 'ingreso', categoria: 'Reservas',       descripcion: 'Mesas domingo — 4 reservas',             monto: 32000,  metodo: 'Transferencia' },
  { id: 'im09', fecha: m(-12), tipo: 'ingreso', categoria: 'Barra',          descripcion: 'Barra domingo tarde',                    monto: 21500,  metodo: 'Efectivo' },
  { id: 'im10', fecha: m(-10), tipo: 'egreso',  categoria: 'Proveedores',    descripcion: 'Insumos de barra — Distribuidora Sur',   monto: 42000,  metodo: 'Transferencia' },
  { id: 'im11', fecha: m(-9),  tipo: 'egreso',  categoria: 'Sueldos',        descripcion: 'Sueldos semana — equipo 5 personas',     monto: 85000,  metodo: 'Transferencia' },
  { id: 'im12', fecha: m(-8),  tipo: 'ingreso', categoria: 'Shows/Entradas', descripcion: 'Show Folclore — jueves — 35 entradas',   monto: 52500,  metodo: 'Efectivo' },
  { id: 'im13', fecha: m(-8),  tipo: 'ingreso', categoria: 'Barra',          descripcion: 'Barra jueves noche',                     monto: 38900,  metodo: 'Efectivo' },
  { id: 'im14', fecha: m(-8),  tipo: 'egreso',  categoria: 'Mantenimiento',  descripcion: 'Reparación iluminación escenario',       monto: 18000,  metodo: 'Efectivo' },
  // --- Semana actual ---
  { id: 'im15', fecha: m(-7),  tipo: 'ingreso', categoria: 'Reservas',       descripcion: 'Reservas viernes — 6 mesas',             monto: 54000,  metodo: 'Transferencia' },
  { id: 'im16', fecha: m(-7),  tipo: 'ingreso', categoria: 'Barra',          descripcion: 'Barra viernes tarde',                    monto: 31200,  metodo: 'Tarjeta' },
  { id: 'im17', fecha: m(-6),  tipo: 'ingreso', categoria: 'Shows/Entradas', descripcion: 'Show de Jazz — sábado — 71 entradas',    monto: 106500, metodo: 'Efectivo' },
  { id: 'im18', fecha: m(-6),  tipo: 'ingreso', categoria: 'Barra',          descripcion: 'Barra sábado noche — show jazz',         monto: 92000,  metodo: 'Efectivo' },
  { id: 'im19', fecha: m(-6),  tipo: 'ingreso', categoria: 'Reservas',       descripcion: 'Mesas VIP sábado — 7 reservas',          monto: 63000,  metodo: 'Transferencia' },
  { id: 'im20', fecha: m(-6),  tipo: 'egreso',  categoria: 'Proveedores',    descripcion: 'Pago trío de Jazz "Milonga Libre"',      monto: 65000,  metodo: 'Transferencia' },
  { id: 'im21', fecha: m(-5),  tipo: 'ingreso', categoria: 'Reservas',       descripcion: 'Cumpleaños exclusivo — mesa 8 personas', monto: 78000,  metodo: 'Transferencia' },
  { id: 'im22', fecha: m(-5),  tipo: 'ingreso', categoria: 'Barra',          descripcion: 'Barra domingo noche',                    monto: 34600,  metodo: 'Efectivo' },
  { id: 'im23', fecha: m(-4),  tipo: 'egreso',  categoria: 'Sueldos',        descripcion: 'Sueldos semana — equipo 5 personas',     monto: 85000,  metodo: 'Transferencia' },
  { id: 'im24', fecha: m(-4),  tipo: 'egreso',  categoria: 'Proveedores',    descripcion: 'Vinos y licores — Wine & Spirits',       monto: 58000,  metodo: 'Transferencia' },
  { id: 'im25', fecha: m(-2),  tipo: 'egreso',  categoria: 'Mantenimiento',  descripcion: 'Limpieza y lavandería semanal',          monto: 11000,  metodo: 'Efectivo' },
  { id: 'im26', fecha: m(-1),  tipo: 'ingreso', categoria: 'Shows/Entradas', descripcion: 'Show especial — jueves — 40 entradas',   monto: 60000,  metodo: 'Efectivo' },
  { id: 'im27', fecha: m(-1),  tipo: 'ingreso', categoria: 'Barra',          descripcion: 'Barra jueves noche',                     monto: 44300,  metodo: 'Efectivo' },
];

export const mockItemsVendidos: ItemVendido[] = [
  { nombre: 'Negroni',           categoria: 'Coctelería', cantidadSemana: 87,  ingresoSemana: 78300,  margenEstimado: 68, tendencia: 'subiendo' },
  { nombre: 'Tabla de fiambres', categoria: 'Cocina',     cantidadSemana: 42,  ingresoSemana: 58800,  margenEstimado: 55, tendencia: 'subiendo' },
  { nombre: 'Entrada show jazz', categoria: 'Shows',      cantidadSemana: 94,  ingresoSemana: 141000, margenEstimado: 72, tendencia: 'estable' },
  { nombre: 'Malbec copa',       categoria: 'Vinos',      cantidadSemana: 63,  ingresoSemana: 50400,  margenEstimado: 45, tendencia: 'estable' },
  { nombre: 'Empanadas x3',      categoria: 'Cocina',     cantidadSemana: 78,  ingresoSemana: 31200,  margenEstimado: 48, tendencia: 'estable' },
  { nombre: 'Aperol Spritz',     categoria: 'Coctelería', cantidadSemana: 34,  ingresoSemana: 27200,  margenEstimado: 52, tendencia: 'estable' },
  { nombre: 'Cerveza artesanal', categoria: 'Bebidas',    cantidadSemana: 51,  ingresoSemana: 25500,  margenEstimado: 38, tendencia: 'estable' },
  { nombre: 'Vino de la casa',   categoria: 'Vinos',      cantidadSemana: 19,  ingresoSemana: 11400,  margenEstimado: 11, tendencia: 'bajando' },
];
