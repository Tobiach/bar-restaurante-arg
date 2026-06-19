import { MovimientoCaja, ItemVendido } from '../types/admin.types';

function m(offset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const y  = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, '0');
  const d  = String(date.getDate()).padStart(2, '0');
  return `${y}-${mo}-${d}`;
}

// 2 semanas hacia atrás (distribución pareja, pico martes karaoke + vie-sab)
export const mockMovimientosCaja: MovimientoCaja[] = [
  // --- Semana anterior ---
  { id: 'qm01', fecha: m(-14), tipo: 'ingreso', categoria: 'Canillas',           descripcion: 'Canillas viernes noche',                   monto: 42000, metodo: 'Efectivo' },
  { id: 'qm02', fecha: m(-14), tipo: 'ingreso', categoria: 'Picadas',            descripcion: 'Picadas y entradas — viernes',              monto: 28500, metodo: 'Efectivo' },
  { id: 'qm03', fecha: m(-13), tipo: 'ingreso', categoria: 'Canillas',           descripcion: 'Canillas sábado noche',                    monto: 51000, metodo: 'Efectivo' },
  { id: 'qm04', fecha: m(-13), tipo: 'ingreso', categoria: 'Picadas',            descripcion: 'Picadas sábado',                           monto: 32000, metodo: 'Efectivo' },
  { id: 'qm05', fecha: m(-13), tipo: 'egreso',  categoria: 'Proveedores Cerveza', descripcion: 'Reposición barriles — Cervecería Norte',  monto: 38000, metodo: 'Transferencia' },
  { id: 'qm06', fecha: m(-10), tipo: 'ingreso', categoria: 'Canillas',           descripcion: 'Canillas lunes tarde',                     monto: 18000, metodo: 'Efectivo' },
  { id: 'qm07', fecha: m(-9),  tipo: 'ingreso', categoria: 'Karaoke',            descripcion: 'Martes karaoke — entrada + consumición',   monto: 38500, metodo: 'Efectivo' },
  { id: 'qm08', fecha: m(-9),  tipo: 'ingreso', categoria: 'Canillas',           descripcion: 'Canillas martes noche',                    monto: 29000, metodo: 'Efectivo' },
  { id: 'qm09', fecha: m(-9),  tipo: 'ingreso', categoria: 'Picadas',            descripcion: 'Picadas martes karaoke',                   monto: 21500, metodo: 'Efectivo' },
  { id: 'qm10', fecha: m(-8),  tipo: 'egreso',  categoria: 'Sueldos',            descripcion: 'Sueldos semana — equipo 3 personas',       monto: 65000, metodo: 'Transferencia' },
  { id: 'qm11', fecha: m(-8),  tipo: 'egreso',  categoria: 'Mantenimiento',      descripcion: 'Reparación grifo canilla nro 3',           monto: 8500,  metodo: 'Efectivo' },
  // --- Semana actual ---
  { id: 'qm12', fecha: m(-7),  tipo: 'ingreso', categoria: 'Canillas',           descripcion: 'Canillas viernes tarde-noche',             monto: 48000, metodo: 'Efectivo' },
  { id: 'qm13', fecha: m(-7),  tipo: 'ingreso', categoria: 'Picadas',            descripcion: 'Picadas viernes',                          monto: 33500, metodo: 'Efectivo' },
  { id: 'qm14', fecha: m(-6),  tipo: 'ingreso', categoria: 'Canillas',           descripcion: 'Canillas sábado noche — lleno',            monto: 58000, metodo: 'Efectivo' },
  { id: 'qm15', fecha: m(-6),  tipo: 'ingreso', categoria: 'Picadas',            descripcion: 'Picadas sábado',                           monto: 37500, metodo: 'Efectivo' },
  { id: 'qm16', fecha: m(-6),  tipo: 'egreso',  categoria: 'Proveedores Cerveza', descripcion: 'Reposición barriles + hop especial',      monto: 44000, metodo: 'Transferencia' },
  { id: 'qm17', fecha: m(-4),  tipo: 'ingreso', categoria: 'Canillas',           descripcion: 'Canillas lunes tarde',                     monto: 15000, metodo: 'Efectivo' },
  { id: 'qm18', fecha: m(-2),  tipo: 'ingreso', categoria: 'Karaoke',            descripcion: 'Martes karaoke — entrada + consumición',   monto: 45000, metodo: 'Efectivo' },
  { id: 'qm19', fecha: m(-2),  tipo: 'ingreso', categoria: 'Canillas',           descripcion: 'Canillas martes noche karaoke',            monto: 36000, metodo: 'Efectivo' },
  { id: 'qm20', fecha: m(-2),  tipo: 'ingreso', categoria: 'Picadas',            descripcion: 'Picadas martes karaoke',                   monto: 26000, metodo: 'Efectivo' },
  { id: 'qm21', fecha: m(-1),  tipo: 'egreso',  categoria: 'Sueldos',            descripcion: 'Sueldos semana — equipo 3 personas',       monto: 65000, metodo: 'Transferencia' },
  { id: 'qm22', fecha: m(-1),  tipo: 'egreso',  categoria: 'Mantenimiento',      descripcion: 'Limpieza y lavandería semanal',            monto: 9000,  metodo: 'Efectivo' },
  { id: 'qm23', fecha: m(-1),  tipo: 'egreso',  categoria: 'Proveedores Cerveza', descripcion: 'Ingredientes picadas — Mercado local',    monto: 22000, metodo: 'Efectivo' },
];

export const mockItemsVendidos: ItemVendido[] = [
  { nombre: 'IPA artesanal',         categoria: 'Canillas', cantidadSemana: 198, ingresoSemana: 99000,  margenEstimado: 58, tendencia: 'subiendo' },
  { nombre: 'Karaoke + consumición', categoria: 'Karaoke',  cantidadSemana: 76,  ingresoSemana: 68400,  margenEstimado: 62, tendencia: 'subiendo' },
  { nombre: 'Picada clásica',        categoria: 'Picadas',  cantidadSemana: 84,  ingresoSemana: 58800,  margenEstimado: 45, tendencia: 'estable' },
  { nombre: 'Stout negra',           categoria: 'Canillas', cantidadSemana: 112, ingresoSemana: 50400,  margenEstimado: 52, tendencia: 'estable' },
  { nombre: 'Rubia lager',           categoria: 'Canillas', cantidadSemana: 143, ingresoSemana: 50050,  margenEstimado: 55, tendencia: 'estable' },
  { nombre: 'Picada mixta grande',   categoria: 'Picadas',  cantidadSemana: 38,  ingresoSemana: 38000,  margenEstimado: 40, tendencia: 'estable' },
  { nombre: 'Red ale especial',      categoria: 'Canillas', cantidadSemana: 67,  ingresoSemana: 33500,  margenEstimado: 48, tendencia: 'estable' },
  { nombre: 'Gaseosas',              categoria: 'Bebidas',  cantidadSemana: 89,  ingresoSemana: 13350,  margenEstimado: 10, tendencia: 'bajando' },
];
