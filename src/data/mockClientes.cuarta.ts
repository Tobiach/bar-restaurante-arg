import { Cliente } from '../types/admin.types';

function calcNivel(visitas: number, gastoTotal: number): Cliente['nivel'] {
  if (gastoTotal > 200000 || visitas > 10) return 'VIP';
  if (visitas >= 3) return 'Frecuente';
  return 'Nuevo';
}

const raw: Omit<Cliente, 'nivel'>[] = [
  { id: 'q1',  nombre: 'Lucas Romero',    telefono: '+54 9 11 4523-1234', email: 'lucas.romero@gmail.com', visitas: 24, ultimaVisita: '2026-06-17', gastoTotal: 216000, ticketPromedio: 9000,  puntos: 1080, notas: 'Viene todos los martes al karaoke. Pide IPA siempre.' },
  { id: 'q2',  nombre: 'Marcela Díaz',    telefono: '+54 9 11 6712-9876',                                   visitas: 19, ultimaVisita: '2026-06-17', gastoTotal: 171000, ticketPromedio: 9000,  puntos: 855,  notas: 'Martes karaoke fija. Trae siempre 4-5 amigos.' },
  { id: 'q3',  nombre: 'Hernán Cáceres',  telefono: '+54 9 11 5834-5678', email: 'hernan.c@outlook.com',   visitas: 8,  ultimaVisita: '2026-06-18', gastoTotal: 80000,  ticketPromedio: 10000, puntos: 400 },
  { id: 'q4',  nombre: 'Paola Benítez',   telefono: '+54 9 11 3901-2345',                                   visitas: 7,  ultimaVisita: '2026-06-15', gastoTotal: 70000,  ticketPromedio: 10000, puntos: 350,  notas: 'Picadas y canillas. Siempre pide stout.' },
  { id: 'q5',  nombre: 'Ricardo Navarro', telefono: '+54 9 11 7423-6789', email: 'ricky.n@gmail.com',       visitas: 6,  ultimaVisita: '2026-06-13', gastoTotal: 60000,  ticketPromedio: 10000, puntos: 300 },
  { id: 'q6',  nombre: 'Graciela Muñoz', telefono: '+54 9 11 2256-3456',                                   visitas: 5,  ultimaVisita: '2026-06-12', gastoTotal: 45000,  ticketPromedio: 9000,  puntos: 225 },
  { id: 'q7',  nombre: 'Esteban López',   telefono: '+54 9 11 8015-7890', email: 'esteban.l@gmail.com',     visitas: 5,  ultimaVisita: '2026-05-20', gastoTotal: 50000,  ticketPromedio: 10000, puntos: 250 },
  { id: 'q8',  nombre: 'Gabriela Soto',   telefono: '+54 9 11 4678-1234',                                   visitas: 4,  ultimaVisita: '2026-06-11', gastoTotal: 40000,  ticketPromedio: 10000, puntos: 200 },
  { id: 'q9',  nombre: 'Alberto Ríos',    telefono: '+54 9 11 9234-5678', email: 'alberto.r@gmail.com',     visitas: 3,  ultimaVisita: '2026-06-17', gastoTotal: 27000,  ticketPromedio: 9000,  puntos: 135 },
  { id: 'q10', nombre: 'Beatriz Vargas',  telefono: '+54 9 11 3367-2345',                                   visitas: 3,  ultimaVisita: '2026-04-25', gastoTotal: 30000,  ticketPromedio: 10000, puntos: 150 },
  { id: 'q11', nombre: 'Carlos Medina',   telefono: '+54 9 11 6891-6789', email: 'carlosm@outlook.com',     visitas: 2,  ultimaVisita: '2026-06-18', gastoTotal: 22000,  ticketPromedio: 11000, puntos: 110 },
  { id: 'q12', nombre: 'Diana Ponce',     telefono: '+54 9 11 5123-3456',                                   visitas: 2,  ultimaVisita: '2026-06-16', gastoTotal: 18000,  ticketPromedio: 9000,  puntos: 90 },
  { id: 'q13', nombre: 'Eduardo Quiroga', telefono: '+54 9 11 7890-7890', email: 'edu.q@gmail.com',         visitas: 1,  ultimaVisita: '2026-06-17', gastoTotal: 12000,  ticketPromedio: 12000, puntos: 60 },
  { id: 'q14', nombre: 'Fiorella Castro', telefono: '+54 9 11 4401-1234',                                   visitas: 1,  ultimaVisita: '2026-06-15', gastoTotal: 8500,   ticketPromedio: 8500,  puntos: 42 },
  { id: 'q15', nombre: 'Gustavo Ibarra',  telefono: '+54 9 11 2234-8901', email: 'gusta.i@gmail.com',       visitas: 1,  ultimaVisita: '2026-06-13', gastoTotal: 11000,  ticketPromedio: 11000, puntos: 55,  notas: 'Primera visita. Karaoke con grupo del trabajo.' },
];

export const mockClientes: Cliente[] = raw.map(c => ({ ...c, nivel: calcNivel(c.visitas, c.gastoTotal) }));
