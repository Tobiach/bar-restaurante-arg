import { Cliente } from '../types/admin.types';

function calcNivel(visitas: number, gastoTotal: number): Cliente['nivel'] {
  if (gastoTotal > 200000 || visitas > 10) return 'VIP';
  if (visitas >= 3) return 'Frecuente';
  return 'Nuevo';
}

const raw: Omit<Cliente, 'nivel'>[] = [
  { id: 'i1',  nombre: 'Valentina Rodríguez', telefono: '+54 9 11 4523-7891', email: 'vale.rodriguez@gmail.com', visitas: 18, ultimaVisita: '2026-06-17', gastoTotal: 315000, ticketPromedio: 17500, puntos: 1575, notas: 'Viene siempre que hay show de jazz. Mesa cerca del escenario.' },
  { id: 'i2',  nombre: 'Matías Fernández',     telefono: '+54 9 11 6712-3045', email: 'mati.f@outlook.com',      visitas: 14, ultimaVisita: '2026-06-14', gastoTotal: 238000, ticketPromedio: 17000, puntos: 1190, notas: 'Fan del tango en vivo. Pide malbec siempre.' },
  { id: 'i3',  nombre: 'Lucía Gómez',          telefono: '+54 9 11 5834-2210',                                   visitas: 11, ultimaVisita: '2026-06-15', gastoTotal: 187000, ticketPromedio: 17000, puntos: 935 },
  { id: 'i4',  nombre: 'Sebastián Torres',     telefono: '+54 9 11 3901-6677', email: 'sebas.torres@gmail.com', visitas: 9,  ultimaVisita: '2026-06-13', gastoTotal: 153000, ticketPromedio: 17000, puntos: 765,  notas: 'Reserva los sábados con su grupo de amigos.' },
  { id: 'i5',  nombre: 'Camila Benítez',       telefono: '+54 9 11 7423-5512',                                   visitas: 7,  ultimaVisita: '2026-06-07', gastoTotal: 119000, ticketPromedio: 17000, puntos: 595 },
  { id: 'i6',  nombre: 'Andrés Molina',        telefono: '+54 9 11 2256-8830',                                   visitas: 6,  ultimaVisita: '2026-06-14', gastoTotal: 102000, ticketPromedio: 17000, puntos: 510,  notas: 'Le gusta el folclore en vivo. Viene con su pareja.' },
  { id: 'i7',  nombre: 'Florencia Kessler',    telefono: '+54 9 11 8015-4490', email: 'flo.kessler@gmail.com',  visitas: 5,  ultimaVisita: '2026-06-12', gastoTotal: 85000,  ticketPromedio: 17000, puntos: 425 },
  { id: 'i8',  nombre: 'Tomás Pereyra',        telefono: '+54 9 11 4678-2231',                                   visitas: 4,  ultimaVisita: '2026-06-08', gastoTotal: 68000,  ticketPromedio: 17000, puntos: 340 },
  { id: 'i9',  nombre: 'Julieta Acosta',       telefono: '+54 9 11 9234-1108', email: 'juli.acosta@gmail.com',  visitas: 3,  ultimaVisita: '2026-05-20', gastoTotal: 51000,  ticketPromedio: 17000, puntos: 255 },
  { id: 'i10', nombre: 'Nicolás Herrera',      telefono: '+54 9 11 3367-8854',                                   visitas: 2,  ultimaVisita: '2026-06-16', gastoTotal: 34000,  ticketPromedio: 17000, puntos: 170 },
  { id: 'i11', nombre: 'Agustina Paz',         telefono: '+54 9 11 6891-3320', email: 'agus.paz@outlook.com',   visitas: 2,  ultimaVisita: '2026-06-13', gastoTotal: 32000,  ticketPromedio: 16000, puntos: 160 },
  { id: 'i12', nombre: 'Ignacio Ríos',         telefono: '+54 9 11 5123-7744',                                   visitas: 1,  ultimaVisita: '2026-06-19', gastoTotal: 18000,  ticketPromedio: 18000, puntos: 90 },
  { id: 'i13', nombre: 'Sofía Delgado',        telefono: '+54 9 11 7890-4412', email: 'sofi.d@gmail.com',       visitas: 1,  ultimaVisita: '2026-06-14', gastoTotal: 15500,  ticketPromedio: 15500, puntos: 77 },
  { id: 'i14', nombre: 'Martín Suárez',        telefono: '+54 9 11 4401-9987',                                   visitas: 1,  ultimaVisita: '2026-06-12', gastoTotal: 16000,  ticketPromedio: 16000, puntos: 80 },
  { id: 'i15', nombre: 'Emilia Vega',          telefono: '+54 9 11 2234-5560', email: 'emi.vega@icloud.com',    visitas: 1,  ultimaVisita: '2026-05-10', gastoTotal: 20000,  ticketPromedio: 20000, puntos: 100, notas: 'Primera visita hace tiempo. Sin reactivación todavía.' },
];

export const mockClientes: Cliente[] = raw.map(c => ({ ...c, nivel: calcNivel(c.visitas, c.gastoTotal) }));
