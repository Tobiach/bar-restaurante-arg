import { Cliente } from '../types/admin.types';

function calcNivel(visitas: number, gastoTotal: number): Cliente['nivel'] {
  if (gastoTotal > 400000 || visitas > 10) return 'VIP';
  if (visitas >= 3) return 'Frecuente';
  return 'Nuevo';
}

// Ticket promedio actualizado 2026: 2-3 personas, tragos $9.500-$10.000 + comida = $32.000-$42.000/visita
const raw: Omit<Cliente, 'nivel'>[] = [
  { id: 'i1',  nombre: 'Valentina Rodríguez', telefono: '+54 9 11 4523-7891', email: 'vale.rodriguez@gmail.com', visitas: 18, ultimaVisita: '2026-06-17', gastoTotal: 630000, ticketPromedio: 35000, puntos: 3150, notas: 'Viene siempre que hay show de jazz. Mesa cerca del escenario.' },
  { id: 'i2',  nombre: 'Matías Fernández',     telefono: '+54 9 11 6712-3045', email: 'mati.f@outlook.com',      visitas: 14, ultimaVisita: '2026-06-14', gastoTotal: 476000, ticketPromedio: 34000, puntos: 2380, notas: 'Fan del tango en vivo. Pide Negroni siempre.' },
  { id: 'i3',  nombre: 'Lucía Gómez',          telefono: '+54 9 11 5834-2210',                                   visitas: 11, ultimaVisita: '2026-06-15', gastoTotal: 363000, ticketPromedio: 33000, puntos: 1815 },
  { id: 'i4',  nombre: 'Sebastián Torres',     telefono: '+54 9 11 3901-6677', email: 'sebas.torres@gmail.com', visitas: 9,  ultimaVisita: '2026-06-13', gastoTotal: 297000, ticketPromedio: 33000, puntos: 1485, notas: 'Reserva los sábados con su grupo de amigos.' },
  { id: 'i5',  nombre: 'Camila Benítez',       telefono: '+54 9 11 7423-5512',                                   visitas: 7,  ultimaVisita: '2026-06-07', gastoTotal: 231000, ticketPromedio: 33000, puntos: 1155 },
  { id: 'i6',  nombre: 'Andrés Molina',        telefono: '+54 9 11 2256-8830',                                   visitas: 6,  ultimaVisita: '2026-06-14', gastoTotal: 198000, ticketPromedio: 33000, puntos: 990,  notas: 'Le gusta el folclore en vivo. Viene con su pareja.' },
  { id: 'i7',  nombre: 'Florencia Kessler',    telefono: '+54 9 11 8015-4490', email: 'flo.kessler@gmail.com',  visitas: 5,  ultimaVisita: '2026-06-12', gastoTotal: 165000, ticketPromedio: 33000, puntos: 825 },
  { id: 'i8',  nombre: 'Tomás Pereyra',        telefono: '+54 9 11 4678-2231',                                   visitas: 4,  ultimaVisita: '2026-06-08', gastoTotal: 132000, ticketPromedio: 33000, puntos: 660 },
  { id: 'i9',  nombre: 'Julieta Acosta',       telefono: '+54 9 11 9234-1108', email: 'juli.acosta@gmail.com',  visitas: 3,  ultimaVisita: '2026-05-20', gastoTotal: 99000,  ticketPromedio: 33000, puntos: 495 },
  { id: 'i10', nombre: 'Nicolás Herrera',      telefono: '+54 9 11 3367-8854',                                   visitas: 2,  ultimaVisita: '2026-06-16', gastoTotal: 68000,  ticketPromedio: 34000, puntos: 340 },
  { id: 'i11', nombre: 'Agustina Paz',         telefono: '+54 9 11 6891-3320', email: 'agus.paz@outlook.com',   visitas: 2,  ultimaVisita: '2026-06-13', gastoTotal: 64000,  ticketPromedio: 32000, puntos: 320 },
  { id: 'i12', nombre: 'Ignacio Ríos',         telefono: '+54 9 11 5123-7744',                                   visitas: 1,  ultimaVisita: '2026-06-19', gastoTotal: 38000,  ticketPromedio: 38000, puntos: 190 },
  { id: 'i13', nombre: 'Sofía Delgado',        telefono: '+54 9 11 7890-4412', email: 'sofi.d@gmail.com',       visitas: 1,  ultimaVisita: '2026-06-14', gastoTotal: 32000,  ticketPromedio: 32000, puntos: 160 },
  { id: 'i14', nombre: 'Martín Suárez',        telefono: '+54 9 11 4401-9987',                                   visitas: 1,  ultimaVisita: '2026-06-12', gastoTotal: 35000,  ticketPromedio: 35000, puntos: 175 },
  { id: 'i15', nombre: 'Emilia Vega',          telefono: '+54 9 11 2234-5560', email: 'emi.vega@icloud.com',    visitas: 1,  ultimaVisita: '2026-05-10', gastoTotal: 42000,  ticketPromedio: 42000, puntos: 210, notas: 'Primera visita hace tiempo. Sin reactivación todavía.' },
];

export const mockClientes: Cliente[] = raw.map(c => ({ ...c, nivel: calcNivel(c.visitas, c.gastoTotal) }));
