import { Cliente } from '../types/admin.types';

function calcNivel(visitas: number, gastoTotal: number): Cliente['nivel'] {
  if (gastoTotal > 200000 || visitas > 10) return 'VIP';
  if (visitas >= 3) return 'Frecuente';
  return 'Nuevo';
}

const raw: Omit<Cliente, 'nivel'>[] = [
  { id: 'ci1',  nombre: 'Diego Cassini',     telefono: '+54 9 11 8234-5901', email: 'diego.cassini@cassinigroup.com', visitas: 22, ultimaVisita: '2026-06-17', gastoTotal: 660000, ticketPromedio: 30000, puntos: 3300, notas: 'Living 4, siempre. Membresía VIP anual. Empresario.' },
  { id: 'ci2',  nombre: 'Valeria Montoya',   telefono: '+54 9 11 5512-7840', email: 'vmont@outlook.com',             visitas: 18, ultimaVisita: '2026-06-15', gastoTotal: 540000, ticketPromedio: 30000, puntos: 2700, notas: 'Prefiere terraza. Viene con clientes corporativos.' },
  { id: 'ci3',  nombre: 'Rodrigo Salas',     telefono: '+54 9 11 4490-2233',                                          visitas: 15, ultimaVisita: '2026-06-14', gastoTotal: 420000, ticketPromedio: 28000, puntos: 2100 },
  { id: 'ci4',  nombre: 'Natalia Ibáñez',    telefono: '+54 9 11 3301-8876', email: 'natalia.i@gmail.com',           visitas: 12, ultimaVisita: '2026-06-13', gastoTotal: 360000, ticketPromedio: 30000, puntos: 1800, notas: 'Cumpleaños 12/09. Prefiere cocktails sin alcohol.' },
  { id: 'ci5',  nombre: 'Fernando Aguirre',  telefono: '+54 9 11 7723-4412', email: 'fernaguirre@icloud.com',        visitas: 11, ultimaVisita: '2026-06-18', gastoTotal: 330000, ticketPromedio: 30000, puntos: 1650 },
  { id: 'ci6',  nombre: 'Luciana Peralta',   telefono: '+54 9 11 2245-9980',                                          visitas: 8,  ultimaVisita: '2026-06-16', gastoTotal: 248000, ticketPromedio: 31000, puntos: 1240, notas: 'Interesada en reservar Evento Privado para fin de año.' },
  { id: 'ci7',  nombre: 'Gustavo Stein',     telefono: '+54 9 11 9001-4456', email: 'gstein@gmail.com',              visitas: 7,  ultimaVisita: '2026-04-20', gastoTotal: 217000, ticketPromedio: 31000, puntos: 1085 },
  { id: 'ci8',  nombre: 'Carolina Ruiz',     telefono: '+54 9 11 4512-3340', email: 'caro.ruiz@outlook.com',         visitas: 5,  ultimaVisita: '2026-04-10', gastoTotal: 155000, ticketPromedio: 31000, puntos: 775 },
  { id: 'ci9',  nombre: 'Emilio Bravo',      telefono: '+54 9 11 6690-1123',                                          visitas: 4,  ultimaVisita: '2026-06-17', gastoTotal: 120000, ticketPromedio: 30000, puntos: 600 },
  { id: 'ci10', nombre: 'Paula Campos',      telefono: '+54 9 11 3378-2291', email: 'paula.c@gmail.com',             visitas: 3,  ultimaVisita: '2026-06-07', gastoTotal: 90000,  ticketPromedio: 30000, puntos: 450 },
  { id: 'ci11', nombre: 'Tomás Villalba',    telefono: '+54 9 11 5567-8890',                                          visitas: 2,  ultimaVisita: '2026-06-18', gastoTotal: 62000,  ticketPromedio: 31000, puntos: 310 },
  { id: 'ci12', nombre: 'Inés Castillo',     telefono: '+54 9 11 8823-1100', email: 'ines.castillo@icloud.com',      visitas: 2,  ultimaVisita: '2026-06-15', gastoTotal: 58000,  ticketPromedio: 29000, puntos: 290 },
  { id: 'ci13', nombre: 'Marcos Oliveira',   telefono: '+54 9 11 4401-5567',                                          visitas: 1,  ultimaVisita: '2026-06-14', gastoTotal: 35000,  ticketPromedio: 35000, puntos: 175 },
  { id: 'ci14', nombre: 'Silvana Mora',      telefono: '+54 9 11 7789-3342', email: 'silvana.m@gmail.com',           visitas: 1,  ultimaVisita: '2026-06-17', gastoTotal: 29000,  ticketPromedio: 29000, puntos: 145 },
  { id: 'ci15', nombre: 'Roberto Funes',     telefono: '+54 9 11 2234-8870',                                          visitas: 1,  ultimaVisita: '2026-06-18', gastoTotal: 32000,  ticketPromedio: 32000, puntos: 160, notas: 'Primer evento privado. Excelente perfil de cliente.' },
];

export const mockClientes: Cliente[] = raw.map(c => ({ ...c, nivel: calcNivel(c.visitas, c.gastoTotal) }));
