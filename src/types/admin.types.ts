export type ReservaEstado = 'pendiente' | 'confirmada' | 'cancelada';
export type DateFilter = 'hoy' | 'semana' | 'mes' | 'todo';
export type AdminRol = 'dueno' | 'empleado';
export type NivelCliente = 'Nuevo' | 'Frecuente' | 'VIP';
export type MetodoPago = 'Efectivo' | 'Transferencia' | 'Tarjeta';
export type TipoMovimiento = 'ingreso' | 'egreso';

export interface AdminUser {
  rol: AdminRol;
  pin: string;
  nombre: string;
}

export interface Reserva {
  id: number;
  fecha: string;
  hora: string;
  tipo: string;
  nombre: string;
  telefono?: string;
  personas: number;
  obs?: string;
  observaciones?: string;
  estado: ReservaEstado;
  timestamp: string;
  pack?: string;
  show_nombre?: string;
}

export interface Cliente {
  id: string;
  nombre: string;
  telefono: string;
  email?: string;
  visitas: number;
  ultimaVisita: string;
  gastoTotal: number;
  ticketPromedio: number;
  puntos: number;
  nivel: NivelCliente;
  notas?: string;
}

export interface MovimientoCaja {
  id: string;
  fecha: string;
  tipo: TipoMovimiento;
  categoria: string;
  descripcion: string;
  monto: number;
  metodo: MetodoPago;
}
