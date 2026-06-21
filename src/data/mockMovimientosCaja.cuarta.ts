import { MovimientoCaja, ItemVendido } from '../types/admin.types';

function m(offset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const y  = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, '0');
  const d  = String(date.getDate()).padStart(2, '0');
  return `${y}-${mo}-${d}`;
}

// 2 semanas hacia atrás — pico martes karaoke + vie-sab. Precios actualizados 2026.
export const mockMovimientosCaja: MovimientoCaja[] = [
  // --- Semana anterior ---
  { id: 'qm01', fecha: m(-14), tipo: 'ingreso', categoria: 'Canillas',            descripcion: 'Canillas viernes tarde-noche',               monto: 138000, metodo: 'Efectivo' },
  { id: 'qm02', fecha: m(-14), tipo: 'ingreso', categoria: 'Picadas',             descripcion: 'Picadas y entradas — viernes',               monto: 52000,  metodo: 'Efectivo' },
  { id: 'qm03', fecha: m(-13), tipo: 'ingreso', categoria: 'Canillas',            descripcion: 'Canillas sábado noche',                      monto: 168000, metodo: 'Efectivo' },
  { id: 'qm04', fecha: m(-13), tipo: 'ingreso', categoria: 'Picadas',             descripcion: 'Picadas sábado',                             monto: 59000,  metodo: 'Efectivo' },
  { id: 'qm05', fecha: m(-13), tipo: 'egreso',  categoria: 'Proveedores Cerveza', descripcion: 'Reposición barriles — Cervecería Norte',     monto: 96000,  metodo: 'Transferencia' },
  { id: 'qm06', fecha: m(-10), tipo: 'ingreso', categoria: 'Canillas',            descripcion: 'Canillas lunes tarde',                       monto: 58000,  metodo: 'Efectivo' },
  { id: 'qm07', fecha: m(-9),  tipo: 'ingreso', categoria: 'Karaoke',             descripcion: 'Martes karaoke — entrada + consumición',     monto: 78000,  metodo: 'Efectivo' },
  { id: 'qm08', fecha: m(-9),  tipo: 'ingreso', categoria: 'Canillas',            descripcion: 'Canillas martes noche',                      monto: 94000,  metodo: 'Efectivo' },
  { id: 'qm09', fecha: m(-9),  tipo: 'ingreso', categoria: 'Picadas',             descripcion: 'Picadas martes karaoke',                     monto: 39000,  metodo: 'Efectivo' },
  { id: 'qm10', fecha: m(-8),  tipo: 'egreso',  categoria: 'Sueldos',             descripcion: 'Sueldos semana — equipo 3 personas',         monto: 105000, metodo: 'Transferencia' },
  { id: 'qm11', fecha: m(-8),  tipo: 'egreso',  categoria: 'Mantenimiento',       descripcion: 'Reparación grifo canilla nro 3',             monto: 13000,  metodo: 'Efectivo' },
  // --- Semana actual ---
  { id: 'qm12', fecha: m(-7),  tipo: 'ingreso', categoria: 'Canillas',            descripcion: 'Canillas viernes tarde-noche',               monto: 158000, metodo: 'Efectivo' },
  { id: 'qm13', fecha: m(-7),  tipo: 'ingreso', categoria: 'Picadas',             descripcion: 'Picadas viernes',                            monto: 62000,  metodo: 'Efectivo' },
  { id: 'qm14', fecha: m(-6),  tipo: 'ingreso', categoria: 'Canillas',            descripcion: 'Canillas sábado noche — lleno total',        monto: 190000, metodo: 'Efectivo' },
  { id: 'qm15', fecha: m(-6),  tipo: 'ingreso', categoria: 'Picadas',             descripcion: 'Picadas sábado',                             monto: 69000,  metodo: 'Efectivo' },
  { id: 'qm16', fecha: m(-6),  tipo: 'egreso',  categoria: 'Proveedores Cerveza', descripcion: 'Reposición barriles + hop especial',         monto: 112000, metodo: 'Transferencia' },
  { id: 'qm17', fecha: m(-4),  tipo: 'ingreso', categoria: 'Canillas',            descripcion: 'Canillas lunes tarde',                       monto: 50000,  metodo: 'Efectivo' },
  { id: 'qm18', fecha: m(-2),  tipo: 'ingreso', categoria: 'Karaoke',             descripcion: 'Martes karaoke — entrada + consumición',     monto: 94000,  metodo: 'Efectivo' },
  { id: 'qm19', fecha: m(-2),  tipo: 'ingreso', categoria: 'Canillas',            descripcion: 'Canillas martes noche karaoke',              monto: 119000, metodo: 'Efectivo' },
  { id: 'qm20', fecha: m(-2),  tipo: 'ingreso', categoria: 'Picadas',             descripcion: 'Picadas martes karaoke',                     monto: 48000,  metodo: 'Efectivo' },
  { id: 'qm21', fecha: m(-1),  tipo: 'egreso',  categoria: 'Sueldos',             descripcion: 'Sueldos semana — equipo 3 personas',         monto: 105000, metodo: 'Transferencia' },
  { id: 'qm22', fecha: m(-1),  tipo: 'egreso',  categoria: 'Mantenimiento',       descripcion: 'Limpieza y lavandería semanal',              monto: 14000,  metodo: 'Efectivo' },
  { id: 'qm23', fecha: m(-1),  tipo: 'egreso',  categoria: 'Proveedores Cerveza', descripcion: 'Ingredientes picadas — Mercado local',       monto: 56000,  metodo: 'Efectivo' },
];

export const mockItemsVendidos: ItemVendido[] = [
  { nombre: 'IPA del Sur',            categoria: 'Canillas', cantidadSemana: 110, ingresoSemana: 638000, margenEstimado: 58, tendencia: 'subiendo' },
  { nombre: 'Golden Porteña',         categoria: 'Canillas', cantidadSemana: 88,  ingresoSemana: 457600, margenEstimado: 55, tendencia: 'estable' },
  { nombre: 'Stout Oscura',           categoria: 'Canillas', cantidadSemana: 72,  ingresoSemana: 446400, margenEstimado: 52, tendencia: 'estable' },
  { nombre: 'Karaoke + consumición',  categoria: 'Karaoke',  cantidadSemana: 58,  ingresoSemana: 162400, margenEstimado: 62, tendencia: 'subiendo' },
  { nombre: 'Hamburguesa La Tercera', categoria: 'Cocina',   cantidadSemana: 30,  ingresoSemana: 294000, margenEstimado: 40, tendencia: 'subiendo' },
  { nombre: 'Picada Básica',          categoria: 'Picadas',  cantidadSemana: 55,  ingresoSemana: 264000, margenEstimado: 45, tendencia: 'estable' },
  { nombre: 'Red Ale Pampera',        categoria: 'Canillas', cantidadSemana: 48,  ingresoSemana: 288000, margenEstimado: 48, tendencia: 'estable' },
  { nombre: 'Gaseosas',               categoria: 'Bebidas',  cantidadSemana: 38,  ingresoSemana: 83600,  margenEstimado: 10, tendencia: 'bajando' },
];
