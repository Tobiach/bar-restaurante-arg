import { Cliente } from '../types/admin.types';

// Nivel calculado: VIP = gastoTotal > 200000 O visitas > 10 | Frecuente = 3-10 visitas | Nuevo = < 3
function calcNivel(visitas: number, gastoTotal: number): Cliente['nivel'] {
  if (gastoTotal > 200000 || visitas > 10) return 'VIP';
  if (visitas >= 3) return 'Frecuente';
  return 'Nuevo';
}

const raw: Omit<Cliente, 'nivel'>[] = [
  { id: 'c1',  nombre: 'Valentina Rodríguez', telefono: '+54 9 11 4523-7891', email: 'vale.rodriguez@gmail.com', visitas: 18, ultimaVisita: '2026-06-17', gastoTotal: 342000, ticketPromedio: 19000, puntos: 1720, notas: 'Le gusta el living 3. Alérgica al maní.' },
  { id: 'c2',  nombre: 'Matías Fernández',     telefono: '+54 9 11 6712-3045', email: 'mati.f@outlook.com',      visitas: 14, ultimaVisita: '2026-06-15', gastoTotal: 267500, ticketPromedio: 19107, puntos: 1337, notas: 'Siempre pide Negroni doble.' },
  { id: 'c3',  nombre: 'Lucía Gómez',          telefono: '+54 9 11 5834-2210', email: undefined,                 visitas: 11, ultimaVisita: '2026-06-10', gastoTotal: 214000, ticketPromedio: 19454, puntos: 1070 },
  { id: 'c4',  nombre: 'Sebastián Torres',     telefono: '+54 9 11 3901-6677', email: 'sebas.torres@gmail.com', visitas: 9,  ultimaVisita: '2026-06-12', gastoTotal: 162000, ticketPromedio: 18000, puntos: 810 },
  { id: 'c5',  nombre: 'Camila Benítez',       telefono: '+54 9 11 7423-5512', email: 'cami.b@icloud.com',      visitas: 8,  ultimaVisita: '2026-06-14', gastoTotal: 144000, ticketPromedio: 18000, puntos: 720 },
  { id: 'c6',  nombre: 'Andrés Molina',        telefono: '+54 9 11 2256-8830', email: undefined,                 visitas: 7,  ultimaVisita: '2026-06-08', gastoTotal: 119000, ticketPromedio: 17000, puntos: 595, notas: 'Viene siempre los sábados con su pareja.' },
  { id: 'c7',  nombre: 'Florencia Kessler',    telefono: '+54 9 11 8015-4490', email: 'flo.kessler@gmail.com',  visitas: 6,  ultimaVisita: '2026-06-11', gastoTotal: 102000, ticketPromedio: 17000, puntos: 510 },
  { id: 'c8',  nombre: 'Tomás Pereyra',        telefono: '+54 9 11 4678-2231', email: undefined,                 visitas: 5,  ultimaVisita: '2026-06-06', gastoTotal: 87500,  ticketPromedio: 17500, puntos: 437 },
  { id: 'c9',  nombre: 'Julieta Acosta',       telefono: '+54 9 11 9234-1108', email: 'juli.acosta@gmail.com',  visitas: 4,  ultimaVisita: '2026-06-03', gastoTotal: 68000,  ticketPromedio: 17000, puntos: 340 },
  { id: 'c10', nombre: 'Nicolás Herrera',      telefono: '+54 9 11 3367-8854', email: undefined,                 visitas: 3,  ultimaVisita: '2026-05-28', gastoTotal: 51000,  ticketPromedio: 17000, puntos: 255 },
  { id: 'c11', nombre: 'Agustina Paz',         telefono: '+54 9 11 6891-3320', email: 'agus.paz@outlook.com',   visitas: 2,  ultimaVisita: '2026-06-16', gastoTotal: 34000,  ticketPromedio: 17000, puntos: 170 },
  { id: 'c12', nombre: 'Ignacio Ríos',         telefono: '+54 9 11 5123-7744', email: undefined,                 visitas: 2,  ultimaVisita: '2026-06-13', gastoTotal: 31000,  ticketPromedio: 15500, puntos: 155 },
  { id: 'c13', nombre: 'Sofía Delgado',        telefono: '+54 9 11 7890-4412', email: 'sofi.d@gmail.com',       visitas: 1,  ultimaVisita: '2026-06-17', gastoTotal: 16500,  ticketPromedio: 16500, puntos: 82 },
  { id: 'c14', nombre: 'Martín Suárez',        telefono: '+54 9 11 4401-9987', email: undefined,                 visitas: 1,  ultimaVisita: '2026-06-15', gastoTotal: 14000,  ticketPromedio: 14000, puntos: 70 },
  { id: 'c15', nombre: 'Emilia Vega',          telefono: '+54 9 11 2234-5560', email: 'emi.vega@icloud.com',    visitas: 1,  ultimaVisita: '2026-06-18', gastoTotal: 22000,  ticketPromedio: 22000, puntos: 110, notas: 'Primera visita. Cumpleaños el 25/07.' },
];

export const mockClientes: Cliente[] = raw.map(c => ({
  ...c,
  nivel: calcNivel(c.visitas, c.gastoTotal),
}));
