import { Reserva } from '../types/admin.types';

function d(offset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${String(date.getDate()).padStart(2,'0')}/${String(date.getMonth()+1).padStart(2,'0')}/${date.getFullYear()}`;
}

// Tipos: Living/Barra/Evento — picos vie-sab-dom
export const mockReservas: Reserva[] = [
  { id: 1,  fecha: d(0), hora: '21:00', tipo: 'Living',  nombre: 'Diego Cassini',    telefono: '+5491182345901', personas: 4, obs: 'Living 4 como siempre. Champagne de bienvenida.',  estado: 'confirmada', timestamp: '2026-06-16T14:00:00Z' },
  { id: 2,  fecha: d(0), hora: '22:00', tipo: 'Barra',   nombre: 'Natalia Ibáñez',   telefono: '+5491133018876', personas: 3,                                                            estado: 'confirmada', timestamp: '2026-06-18T11:00:00Z' },
  { id: 3,  fecha: d(1), hora: '20:30', tipo: 'Living',  nombre: 'Fernando Aguirre', telefono: '+5491177234412', personas: 6, obs: 'Reunión de negocios. Privacidad importante.',      estado: 'confirmada', timestamp: '2026-06-17T09:00:00Z' },
  { id: 4,  fecha: d(1), hora: '21:30', tipo: 'Barra',   nombre: 'Valeria Montoya',  telefono: '+5491155127840', personas: 4, obs: 'Con clientes corporativos de Brasil',              estado: 'pendiente',  timestamp: '2026-06-18T17:30:00Z' },
  { id: 5,  fecha: d(1), hora: '22:00', tipo: 'Living',  nombre: 'Rodrigo Salas',    telefono: '+5491144902233', personas: 5,                                                            estado: 'confirmada', timestamp: '2026-06-16T20:00:00Z' },
  { id: 6,  fecha: d(2), hora: '21:00', tipo: 'Living',  nombre: 'Luciana Peralta',  telefono: '+5491122459980', personas: 8, obs: 'Living grande — aniversario de empresa',          estado: 'confirmada', timestamp: '2026-06-14T10:00:00Z' },
  { id: 7,  fecha: d(2), hora: '22:30', tipo: 'Barra',   nombre: 'Emilio Bravo',     telefono: '+5491166901123', personas: 2,                                                            estado: 'confirmada', timestamp: '2026-06-18T14:00:00Z' },
  { id: 8,  fecha: d(3), hora: '20:00', tipo: 'Evento',  nombre: 'Gustavo Stein',    telefono: '+5491190014456', personas: 30, obs: 'Cumpleaños 50 — confirmar menú degustación',    estado: 'confirmada', timestamp: '2026-06-10T11:00:00Z' },
  { id: 9,  fecha: d(3), hora: '21:00', tipo: 'Living',  nombre: 'Tomás Villalba',   telefono: '+5491155678890', personas: 4,                                                            estado: 'pendiente',  timestamp: '2026-06-19T09:00:00Z' },
  { id: 10, fecha: d(7), hora: '21:00', tipo: 'Living',  nombre: 'Carolina Ruiz',    telefono: '+5491145123340', personas: 5, obs: 'Reserva anticipada — Living terraza',              estado: 'pendiente',  timestamp: '2026-06-19T10:00:00Z' },
  { id: 11, fecha: d(8), hora: '19:00', tipo: 'Evento',  nombre: 'Roberto Funes',    telefono: '+5491122348870', personas: 50, obs: 'Evento corporativo — confirmar catering',         estado: 'pendiente',  timestamp: '2026-06-18T16:00:00Z' },
];
