import { Reserva } from '../types/admin.types';

// Tipos: Mesa/Show/Cumpleaños — picos jue-sab-dom
export const mockReservas: Reserva[] = [
  { id: 1,  fecha: '19/06/2026', hora: '20:30', tipo: 'Show',       nombre: 'Valentina Rodríguez', telefono: '+5491145237891', personas: 2, obs: 'Mesa cerca del escenario porfavor', estado: 'confirmada', timestamp: '2026-06-17T14:22:00Z' },
  { id: 2,  fecha: '19/06/2026', hora: '21:00', tipo: 'Mesa',       nombre: 'Matías Fernández',    telefono: '+5491167123045', personas: 4,                                              estado: 'pendiente',  timestamp: '2026-06-18T10:05:00Z' },
  { id: 3,  fecha: '19/06/2026', hora: '21:30', tipo: 'Show',       nombre: 'Nicolás Herrera',     telefono: '+5491133678854', personas: 3, obs: 'Primera vez que vienen a show',      estado: 'confirmada', timestamp: '2026-06-18T11:30:00Z' },
  { id: 4,  fecha: '20/06/2026', hora: '20:00', tipo: 'Mesa',       nombre: 'Lucía Gómez',         telefono: '+5491158342210', personas: 2,                                              estado: 'confirmada', timestamp: '2026-06-17T16:00:00Z' },
  { id: 5,  fecha: '20/06/2026', hora: '21:00', tipo: 'Show',       nombre: 'Camila Benítez',      telefono: '+5491174235512', personas: 5, obs: 'Quieren mesa larga si es posible',   estado: 'pendiente',  timestamp: '2026-06-18T09:15:00Z' },
  { id: 6,  fecha: '21/06/2026', hora: '21:00', tipo: 'Show',       nombre: 'Sebastián Torres',    telefono: '+5491139016677', personas: 6, obs: 'Grupo fijo de sábados',               estado: 'confirmada', timestamp: '2026-06-16T20:00:00Z' },
  { id: 7,  fecha: '21/06/2026', hora: '22:00', tipo: 'Mesa',       nombre: 'Andrés Molina',       telefono: '+5491122568830', personas: 2,                                              estado: 'confirmada', timestamp: '2026-06-17T18:30:00Z' },
  { id: 8,  fecha: '21/06/2026', hora: '20:30', tipo: 'Cumpleaños', nombre: 'Sofía Delgado',       telefono: '+5491178904412', personas: 8, obs: 'Torta propia — avisar cocina',       estado: 'confirmada', timestamp: '2026-06-15T12:00:00Z' },
  { id: 9,  fecha: '22/06/2026', hora: '20:00', tipo: 'Mesa',       nombre: 'Florencia Kessler',   telefono: '+5491180154490', personas: 3,                                              estado: 'pendiente',  timestamp: '2026-06-18T15:45:00Z' },
  { id: 10, fecha: '22/06/2026', hora: '21:30', tipo: 'Show',       nombre: 'Tomás Pereyra',       telefono: '+5491146782231', personas: 4, obs: 'Show de tango preferentemente',      estado: 'pendiente',  timestamp: '2026-06-19T08:00:00Z' },
  { id: 11, fecha: '26/06/2026', hora: '21:00', tipo: 'Show',       nombre: 'Ignacio Ríos',        telefono: '+5491151237744', personas: 2,                                              estado: 'pendiente',  timestamp: '2026-06-19T10:30:00Z' },
  { id: 12, fecha: '26/06/2026', hora: '22:00', tipo: 'Cumpleaños', nombre: 'Emilia Vega',         telefono: '+5491122345560', personas: 10, obs: 'Sorpresa — coordinar con cocina',   estado: 'pendiente',  timestamp: '2026-06-18T19:00:00Z' },
];
