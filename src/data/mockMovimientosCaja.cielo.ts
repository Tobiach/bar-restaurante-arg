import { MovimientoCaja, ItemVendido } from '../types/admin.types';

// Jun 5-18: 2 semanas (picos vie-sab-dom, 1 evento privado grande)
export const mockMovimientosCaja: MovimientoCaja[] = [
  // --- Semana 1: Jun 5-11 ---
  { id: 'cm01', fecha: '2026-06-06', tipo: 'ingreso', categoria: 'Reservas',         descripcion: 'Livings VIP sábado — 6 reservas',         monto: 186000, metodo: 'Transferencia' },
  { id: 'cm02', fecha: '2026-06-06', tipo: 'ingreso', categoria: 'Cocktails',        descripcion: 'Barra premium sábado noche',               monto: 112000, metodo: 'Efectivo' },
  { id: 'cm03', fecha: '2026-06-06', tipo: 'ingreso', categoria: 'Tapas',            descripcion: 'Menú degustación — sábado',                monto: 64000,  metodo: 'Tarjeta' },
  { id: 'cm04', fecha: '2026-06-06', tipo: 'egreso',  categoria: 'Proveedores Premium', descripcion: 'Champagne y espumantes — lote sábado', monto: 78000,  metodo: 'Transferencia' },
  { id: 'cm05', fecha: '2026-06-07', tipo: 'ingreso', categoria: 'Reservas',         descripcion: 'Livings domingo tarde — 4 reservas',      monto: 124000, metodo: 'Transferencia' },
  { id: 'cm06', fecha: '2026-06-07', tipo: 'ingreso', categoria: 'Cocktails',        descripcion: 'Barra domingo sunset',                    monto: 68000,  metodo: 'Efectivo' },
  { id: 'cm07', fecha: '2026-06-09', tipo: 'egreso',  categoria: 'Sueldos',          descripcion: 'Sueldos semana — equipo 6 personas',     monto: 115000, metodo: 'Transferencia' },
  { id: 'cm08', fecha: '2026-06-09', tipo: 'egreso',  categoria: 'Marketing',        descripcion: 'Pauta Instagram + influencer collab',    monto: 35000,  metodo: 'Transferencia' },
  { id: 'cm09', fecha: '2026-06-10', tipo: 'egreso',  categoria: 'Proveedores Premium', descripcion: 'Licores premium — importados',         monto: 95000,  metodo: 'Transferencia' },
  // --- Semana 2: Jun 12-18 (con evento privado grande) ---
  { id: 'cm10', fecha: '2026-06-13', tipo: 'ingreso', categoria: 'Reservas',         descripcion: 'Livings VIP sábado — 8 reservas',         monto: 248000, metodo: 'Transferencia' },
  { id: 'cm11', fecha: '2026-06-13', tipo: 'ingreso', categoria: 'Cocktails',        descripcion: 'Barra premium sábado noche',               monto: 138000, metodo: 'Efectivo' },
  { id: 'cm12', fecha: '2026-06-13', tipo: 'ingreso', categoria: 'Tapas',            descripcion: 'Menú degustación — sábado',                monto: 72000,  metodo: 'Tarjeta' },
  { id: 'cm13', fecha: '2026-06-13', tipo: 'egreso',  categoria: 'Proveedores Premium', descripcion: 'Champagne Moët & Chandon — lote VIP', monto: 98000,  metodo: 'Transferencia' },
  { id: 'cm14', fecha: '2026-06-14', tipo: 'ingreso', categoria: 'Eventos Privados', descripcion: 'Evento privado corporativo — 80 personas', monto: 480000, metodo: 'Transferencia' },
  { id: 'cm15', fecha: '2026-06-14', tipo: 'ingreso', categoria: 'Cocktails',        descripcion: 'Open bar evento privado',                 monto: 144000, metodo: 'Transferencia' },
  { id: 'cm16', fecha: '2026-06-14', tipo: 'egreso',  categoria: 'Proveedores Premium', descripcion: 'Catering premium evento corporativo',   monto: 185000, metodo: 'Transferencia' },
  { id: 'cm17', fecha: '2026-06-15', tipo: 'egreso',  categoria: 'Sueldos',          descripcion: 'Sueldos semana + extra evento',           monto: 145000, metodo: 'Transferencia' },
  { id: 'cm18', fecha: '2026-06-15', tipo: 'egreso',  categoria: 'Marketing',        descripcion: 'Sesión fotográfica rooftop — redes',     monto: 42000,  metodo: 'Transferencia' },
  { id: 'cm19', fecha: '2026-06-17', tipo: 'egreso',  categoria: 'Proveedores Premium', descripcion: 'Reposición licores premium',            monto: 88000,  metodo: 'Transferencia' },
  { id: 'cm20', fecha: '2026-06-18', tipo: 'ingreso', categoria: 'Reservas',         descripcion: 'Reservas jueves noche — 5 livings',       monto: 155000, metodo: 'Transferencia' },
  { id: 'cm21', fecha: '2026-06-18', tipo: 'ingreso', categoria: 'Cocktails',        descripcion: 'Barra jueves premium',                    monto: 84000,  metodo: 'Efectivo' },
];

export const mockItemsVendidos: ItemVendido[] = [
  { nombre: 'Living VIP (4 pers)',  categoria: 'Reservas',   cantidadSemana: 28,  ingresoSemana: 280000, margenEstimado: 78, tendencia: 'subiendo' },
  { nombre: 'Espumante Chandon',    categoria: 'Bebidas',    cantidadSemana: 112, ingresoSemana: 156800, margenEstimado: 62, tendencia: 'subiendo' },
  { nombre: 'Evento privado',       categoria: 'Eventos',    cantidadSemana: 1,   ingresoSemana: 480000, margenEstimado: 60, tendencia: 'estable' },
  { nombre: 'Negroni Cielo',        categoria: 'Cocktails',  cantidadSemana: 94,  ingresoSemana: 103400, margenEstimado: 70, tendencia: 'estable' },
  { nombre: 'Tabla premium',        categoria: 'Tapas',      cantidadSemana: 38,  ingresoSemana: 76000,  margenEstimado: 55, tendencia: 'estable' },
  { nombre: 'Gin Tonic artesanal',  categoria: 'Cocktails',  cantidadSemana: 67,  ingresoSemana: 73700,  margenEstimado: 65, tendencia: 'estable' },
  { nombre: 'Whisky premium copa',  categoria: 'Bebidas',    cantidadSemana: 45,  ingresoSemana: 67500,  margenEstimado: 45, tendencia: 'estable' },
  { nombre: 'Sangría Cielo',        categoria: 'Cocktails',  cantidadSemana: 21,  ingresoSemana: 18900,  margenEstimado: 12, tendencia: 'bajando' },
];
