import { MovimientoCaja } from '../types/admin.types';

export const mockMovimientosCaja: MovimientoCaja[] = [
  // --- 18 Jun (hoy) ---
  { id: 'm1',  fecha: '2026-06-18', tipo: 'ingreso', categoria: 'Reservas',    descripcion: 'Reservas Living VIP — 4 mesas',       monto: 72000,  metodo: 'Transferencia' },
  { id: 'm2',  fecha: '2026-06-18', tipo: 'ingreso', categoria: 'Barra',       descripcion: 'Cierre de barra — jueves noche',       monto: 58400,  metodo: 'Efectivo' },
  { id: 'm3',  fecha: '2026-06-18', tipo: 'ingreso', categoria: 'Barra',       descripcion: 'Tarjeta — barra tarde',                monto: 31200,  metodo: 'Tarjeta' },
  { id: 'm4',  fecha: '2026-06-18', tipo: 'egreso',  categoria: 'Proveedores', descripcion: 'Compra de bebidas — Distribuidora Sur', monto: 38000,  metodo: 'Transferencia' },
  { id: 'm5',  fecha: '2026-06-18', tipo: 'egreso',  categoria: 'Mantenimiento', descripcion: 'Reparación sistema de sonido',       monto: 12000,  metodo: 'Efectivo' },
  // --- 17 Jun ---
  { id: 'm6',  fecha: '2026-06-17', tipo: 'ingreso', categoria: 'Reservas',    descripcion: 'Pack Noche VIP — 2 grupos',           monto: 95000,  metodo: 'Transferencia' },
  { id: 'm7',  fecha: '2026-06-17', tipo: 'ingreso', categoria: 'Barra',       descripcion: 'Recaudación barra — miércoles',       monto: 44800,  metodo: 'Efectivo' },
  { id: 'm8',  fecha: '2026-06-17', tipo: 'egreso',  categoria: 'Sueldos',     descripcion: 'Adelanto sueldo — Juan (bartender)',   monto: 25000,  metodo: 'Efectivo' },
  // --- 16 Jun ---
  { id: 'm9',  fecha: '2026-06-16', tipo: 'ingreso', categoria: 'Eventos',     descripcion: 'Cumpleaños exclusivo — Sofía V.',     monto: 140000, metodo: 'Transferencia' },
  { id: 'm10', fecha: '2026-06-16', tipo: 'ingreso', categoria: 'Barra',       descripcion: 'Cierre barra — martes',               monto: 28900,  metodo: 'Efectivo' },
  { id: 'm11', fecha: '2026-06-16', tipo: 'egreso',  categoria: 'Proveedores', descripcion: 'Frutas y hierbas — Mercado Central',  monto: 8500,   metodo: 'Efectivo' },
  // --- 15 Jun ---
  { id: 'm12', fecha: '2026-06-15', tipo: 'ingreso', categoria: 'Reservas',    descripcion: 'Reservas lunes — 6 mesas',           monto: 54000,  metodo: 'Transferencia' },
  { id: 'm13', fecha: '2026-06-15', tipo: 'ingreso', categoria: 'Barra',       descripcion: 'Barra lunes noche',                  monto: 19200,  metodo: 'Tarjeta' },
  { id: 'm14', fecha: '2026-06-15', tipo: 'egreso',  categoria: 'Sueldos',     descripcion: 'Sueldos semana — equipo 4 personas', monto: 72000,  metodo: 'Transferencia' },
  { id: 'm15', fecha: '2026-06-15', tipo: 'egreso',  categoria: 'Proveedores', descripcion: 'Licores importados — Wine & Spirits', monto: 52000,  metodo: 'Transferencia' },
  // --- 14 Jun ---
  { id: 'm16', fecha: '2026-06-14', tipo: 'ingreso', categoria: 'Eventos',     descripcion: 'DJ Set Sábado — cover + consumición', monto: 118000, metodo: 'Efectivo' },
  { id: 'm17', fecha: '2026-06-14', tipo: 'ingreso', categoria: 'Barra',       descripcion: 'Barra sábado noche',                 monto: 89500,  metodo: 'Efectivo' },
  { id: 'm18', fecha: '2026-06-14', tipo: 'egreso',  categoria: 'Proveedores', descripcion: 'Champagne y espumantes — lote DJ',    monto: 43000,  metodo: 'Transferencia' },
  // --- 13 Jun ---
  { id: 'm19', fecha: '2026-06-13', tipo: 'ingreso', categoria: 'Reservas',    descripcion: 'Reservas viernes — 8 mesas',         monto: 96000,  metodo: 'Transferencia' },
  { id: 'm20', fecha: '2026-06-13', tipo: 'ingreso', categoria: 'Barra',       descripcion: 'Barra viernes noche',                monto: 67300,  metodo: 'Efectivo' },
  { id: 'm21', fecha: '2026-06-13', tipo: 'egreso',  categoria: 'Mantenimiento', descripcion: 'Limpieza y lavandería semanal',      monto: 9500,   metodo: 'Efectivo' },
];
