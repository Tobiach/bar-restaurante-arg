import { Reserva } from '../types/admin.types';

// Tipos: Mesa/Grupo/Cumpleaños — distribución más pareja, pico martes karaoke
export const mockReservas: Reserva[] = [
  { id: 1,  fecha: '19/06/2026', hora: '20:00', tipo: 'Grupo',      nombre: 'Lucas Romero',     telefono: '+5491145231234', personas: 6, obs: 'Grupo habitual del martes. IPA para todos.',  estado: 'confirmada', timestamp: '2026-06-18T12:00:00Z' },
  { id: 2,  fecha: '19/06/2026', hora: '20:30', tipo: 'Mesa',       nombre: 'Hernán Cáceres',   telefono: '+5491158345678', personas: 3,                                                         estado: 'confirmada', timestamp: '2026-06-18T15:00:00Z' },
  { id: 3,  fecha: '19/06/2026', hora: '21:00', tipo: 'Grupo',      nombre: 'Marcela Díaz',     telefono: '+5491167129876', personas: 8, obs: 'Martes karaoke fija con sus amigas',           estado: 'confirmada', timestamp: '2026-06-17T10:30:00Z' },
  { id: 4,  fecha: '20/06/2026', hora: '20:00', tipo: 'Mesa',       nombre: 'Paola Benítez',    telefono: '+5491139012345', personas: 2, obs: 'Pide picada + stout de entrada',               estado: 'confirmada', timestamp: '2026-06-18T09:00:00Z' },
  { id: 5,  fecha: '20/06/2026', hora: '21:00', tipo: 'Mesa',       nombre: 'Ricardo Navarro',  telefono: '+5491174236789', personas: 4,                                                         estado: 'pendiente',  timestamp: '2026-06-19T08:30:00Z' },
  { id: 6,  fecha: '21/06/2026', hora: '20:00', tipo: 'Mesa',       nombre: 'Graciela Muñoz',  telefono: '+5491122563456', personas: 3,                                                         estado: 'confirmada', timestamp: '2026-06-17T18:00:00Z' },
  { id: 7,  fecha: '21/06/2026', hora: '20:30', tipo: 'Grupo',      nombre: 'Esteban López',    telefono: '+5491180157890', personas: 7, obs: 'Asado posterior — avisan que llegan puntual', estado: 'confirmada', timestamp: '2026-06-15T14:00:00Z' },
  { id: 8,  fecha: '21/06/2026', hora: '21:30', tipo: 'Cumpleaños', nombre: 'Gabriela Soto',    telefono: '+5491146781234', personas: 10, obs: 'Torta propia + globos — coordinar lugar',   estado: 'confirmada', timestamp: '2026-06-12T11:00:00Z' },
  { id: 9,  fecha: '22/06/2026', hora: '20:00', tipo: 'Mesa',       nombre: 'Alberto Ríos',     telefono: '+5491192345678', personas: 4,                                                         estado: 'pendiente',  timestamp: '2026-06-18T20:00:00Z' },
  { id: 10, fecha: '24/06/2026', hora: '20:00', tipo: 'Mesa',       nombre: 'Beatriz Vargas',   telefono: '+5491133672345', personas: 3,                                                         estado: 'pendiente',  timestamp: '2026-06-19T09:45:00Z' },
  { id: 11, fecha: '24/06/2026', hora: '21:00', tipo: 'Grupo',      nombre: 'Carlos Medina',    telefono: '+5491168916789', personas: 6, obs: 'Karaoke — van a pedir canciones de los 80s', estado: 'pendiente',  timestamp: '2026-06-18T16:30:00Z' },
  { id: 12, fecha: '26/06/2026', hora: '21:00', tipo: 'Cumpleaños', nombre: 'Gustavo Ibarra',   telefono: '+5491122348901', personas: 12, obs: 'Evento trabajo. Karaoke reservado',            estado: 'pendiente',  timestamp: '2026-06-19T11:00:00Z' },
  { id: 13, fecha: '27/06/2026', hora: '20:30', tipo: 'Mesa',       nombre: 'Eduardo Quiroga',  telefono: '+5491178907890', personas: 2,                                                         estado: 'pendiente',  timestamp: '2026-06-19T09:15:00Z' },
  { id: 14, fecha: '27/06/2026', hora: '21:00', tipo: 'Grupo',      nombre: 'Fiorella Castro',  telefono: '+5491144011234', personas: 5,                                                         estado: 'pendiente',  timestamp: '2026-06-19T10:00:00Z' },
];
