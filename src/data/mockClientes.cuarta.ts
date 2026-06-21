import { Cliente } from '../types/admin.types';

function calcNivel(visitas: number, gastoTotal: number): Cliente['nivel'] {
  if (gastoTotal > 500000 || visitas > 12) return 'VIP';
  if (visitas >= 3) return 'Frecuente';
  return 'Nuevo';
}

// Ticket promedio actualizado 2026: 2-3 personas, 3-4 cervezas artesanales + picada = $28.000-$38.000/visita
const raw: Omit<Cliente, 'nivel'>[] = [
  { id: 'q1',  nombre: 'Lucas Romero',    telefono: '+54 9 11 4523-1234', email: 'lucas.romero@gmail.com', visitas: 24, ultimaVisita: '2026-06-17', gastoTotal: 720000, ticketPromedio: 30000, puntos: 3600, notas: 'Viene todos los martes al karaoke. Pide IPA siempre.' },
  { id: 'q2',  nombre: 'Marcela Díaz',    telefono: '+54 9 11 6712-9876',                                   visitas: 19, ultimaVisita: '2026-06-17', gastoTotal: 551000, ticketPromedio: 29000, puntos: 2755, notas: 'Martes karaoke fija. Trae siempre 4-5 amigos.' },
  { id: 'q3',  nombre: 'Hernán Cáceres',  telefono: '+54 9 11 5834-5678', email: 'hernan.c@outlook.com',   visitas: 8,  ultimaVisita: '2026-06-18', gastoTotal: 256000, ticketPromedio: 32000, puntos: 1280 },
  { id: 'q4',  nombre: 'Paola Benítez',   telefono: '+54 9 11 3901-2345',                                   visitas: 7,  ultimaVisita: '2026-06-15', gastoTotal: 217000, ticketPromedio: 31000, puntos: 1085, notas: 'Picadas y canillas. Siempre pide stout.' },
  { id: 'q5',  nombre: 'Ricardo Navarro', telefono: '+54 9 11 7423-6789', email: 'ricky.n@gmail.com',       visitas: 6,  ultimaVisita: '2026-06-13', gastoTotal: 180000, ticketPromedio: 30000, puntos: 900 },
  { id: 'q6',  nombre: 'Graciela Muñoz',  telefono: '+54 9 11 2256-3456',                                   visitas: 5,  ultimaVisita: '2026-06-12', gastoTotal: 145000, ticketPromedio: 29000, puntos: 725 },
  { id: 'q7',  nombre: 'Esteban López',   telefono: '+54 9 11 8015-7890', email: 'esteban.l@gmail.com',     visitas: 5,  ultimaVisita: '2026-05-20', gastoTotal: 155000, ticketPromedio: 31000, puntos: 775 },
  { id: 'q8',  nombre: 'Gabriela Soto',   telefono: '+54 9 11 4678-1234',                                   visitas: 4,  ultimaVisita: '2026-06-11', gastoTotal: 120000, ticketPromedio: 30000, puntos: 600 },
  { id: 'q9',  nombre: 'Alberto Ríos',    telefono: '+54 9 11 9234-5678', email: 'alberto.r@gmail.com',     visitas: 3,  ultimaVisita: '2026-06-17', gastoTotal: 87000,  ticketPromedio: 29000, puntos: 435 },
  { id: 'q10', nombre: 'Beatriz Vargas',  telefono: '+54 9 11 3367-2345',                                   visitas: 3,  ultimaVisita: '2026-04-25', gastoTotal: 93000,  ticketPromedio: 31000, puntos: 465 },
  { id: 'q11', nombre: 'Carlos Medina',   telefono: '+54 9 11 6891-6789', email: 'carlosm@outlook.com',     visitas: 2,  ultimaVisita: '2026-06-18', gastoTotal: 68000,  ticketPromedio: 34000, puntos: 340 },
  { id: 'q12', nombre: 'Diana Ponce',     telefono: '+54 9 11 5123-3456',                                   visitas: 2,  ultimaVisita: '2026-06-16', gastoTotal: 58000,  ticketPromedio: 29000, puntos: 290 },
  { id: 'q13', nombre: 'Eduardo Quiroga', telefono: '+54 9 11 7890-7890', email: 'edu.q@gmail.com',         visitas: 1,  ultimaVisita: '2026-06-17', gastoTotal: 35000,  ticketPromedio: 35000, puntos: 175 },
  { id: 'q14', nombre: 'Fiorella Castro', telefono: '+54 9 11 4401-1234',                                   visitas: 1,  ultimaVisita: '2026-06-15', gastoTotal: 28000,  ticketPromedio: 28000, puntos: 140 },
  { id: 'q15', nombre: 'Gustavo Ibarra',  telefono: '+54 9 11 2234-8901', email: 'gusta.i@gmail.com',       visitas: 1,  ultimaVisita: '2026-06-13', gastoTotal: 32000,  ticketPromedio: 32000, puntos: 160,  notas: 'Primera visita. Karaoke con grupo del trabajo.' },
];

export const mockClientes: Cliente[] = raw.map(c => ({ ...c, nivel: calcNivel(c.visitas, c.gastoTotal) }));
