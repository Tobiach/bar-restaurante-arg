import { Reserva, Cliente, MovimientoCaja, ItemVendido, InsightIA, ResumenSemanal } from '../types/admin.types';

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function parseDate(s: string): Date | null {
  if (!s) return null;
  if (s.includes('/')) {
    const [d, m, y] = s.split('/').map(Number);
    if (!d || !m || !y) return null;
    return new Date(y, m - 1, d);
  }
  const parsed = new Date(s + 'T12:00:00');
  return isNaN(parsed.getTime()) ? null : parsed;
}

function rangeStrings(start: Date, end: Date): string[] {
  const dates: string[] = [];
  const cur = new Date(start);
  while (cur <= end) { dates.push(isoDate(cur)); cur.setDate(cur.getDate() + 1); }
  return dates;
}

function getWeekRanges() {
  const today = new Date();
  const todayStr = isoDate(today);
  const semActualEnd = new Date(todayStr + 'T12:00:00');
  const semActualStart = new Date(semActualEnd);
  semActualStart.setDate(semActualEnd.getDate() - 6);

  const semAnteriorEnd = new Date(semActualStart);
  semAnteriorEnd.setDate(semAnteriorEnd.getDate() - 1);
  const semAnteriorStart = new Date(semAnteriorEnd);
  semAnteriorStart.setDate(semAnteriorEnd.getDate() - 6);

  return {
    actualDates:   rangeStrings(semActualStart, semActualEnd),
    anteriorDates: rangeStrings(semAnteriorStart, semAnteriorEnd),
    semActualStart,
    semActualEnd,
    semAnteriorStart,
    semAnteriorEnd,
  };
}

const DIA_LABELS: Record<number, string> = { 0: 'Dom', 1: 'Lun', 2: 'Mar', 3: 'Mié', 4: 'Jue', 5: 'Vie', 6: 'Sáb' };
const IMPACTO_ORDER: Record<string, number> = { alto: 0, medio: 1, bajo: 2 };
const TIPO_ORDER: Record<string, number> = { alerta: 0, oportunidad: 1, patron: 2, recomendacion: 3 };

export function generarResumenSemanal(
  reservas: Reserva[],
  clientes: Cliente[],
  movimientos: MovimientoCaja[],
  items: ItemVendido[],
): ResumenSemanal {
  const { actualDates, anteriorDates, semActualStart } = getWeekRanges();

  const movsActual   = movimientos.filter(m => actualDates.includes(m.fecha));
  const movsAnterior = movimientos.filter(m => anteriorDates.includes(m.fecha));

  const ingActual   = movsActual.filter(m => m.tipo === 'ingreso').reduce((s, m) => s + m.monto, 0);
  const egActual    = movsActual.filter(m => m.tipo === 'egreso').reduce((s, m) => s + m.monto, 0);
  const ingAnterior = movsAnterior.filter(m => m.tipo === 'ingreso').reduce((s, m) => s + m.monto, 0);

  const resvActual   = reservas.filter(r => { const d = parseDate(r.fecha); return d ? actualDates.includes(isoDate(d)) : false; });
  const resvAnterior = reservas.filter(r => { const d = parseDate(r.fecha); return d ? anteriorDates.includes(isoDate(d)) : false; });

  const ticketActual   = resvActual.length   > 0 ? Math.round(ingActual   / resvActual.length)   : Math.round(ingActual / Math.max(1, movsActual.filter(m => m.tipo === 'ingreso').length));
  const ticketAnterior = resvAnterior.length > 0 ? Math.round(ingAnterior / resvAnterior.length)  : Math.round(ingAnterior / Math.max(1, movsAnterior.filter(m => m.tipo === 'ingreso').length));
  const ticketVariacion = ticketAnterior > 0 ? Math.round(((ticketActual - ticketAnterior) / ticketAnterior) * 100) : 0;

  // Horario pico/valle: agrupar reservas por día+hora
  const horaBuckets: Record<string, number> = {};
  resvActual.forEach(r => {
    const d = parseDate(r.fecha);
    if (!d || !r.hora) return;
    const diaLabel = DIA_LABELS[d.getDay()] ?? '';
    const hora = parseInt(r.hora.split(':')[0], 10);
    const key = `${diaLabel} ${hora}:00`;
    horaBuckets[key] = (horaBuckets[key] ?? 0) + 1;
  });

  let horarioPico = 'Sin datos';
  let horarioValle = 'Sin datos';
  const bucketEntries = Object.entries(horaBuckets).sort((a, b) => b[1] - a[1]);
  if (bucketEntries.length > 0) {
    horarioPico = `${bucketEntries[0][0]}h`;
    horarioValle = bucketEntries.length > 1 ? `${bucketEntries[bucketEntries.length - 1][0]}h` : horarioPico;
  }

  // Producto estrella y en riesgo
  const itemsSubiendo = items.filter(i => i.tendencia === 'subiendo').sort((a, b) => b.ingresoSemana - a.ingresoSemana);
  const productoEstrella = itemsSubiendo[0]?.nombre ?? items.sort((a, b) => b.ingresoSemana - a.ingresoSemana)[0]?.nombre ?? '—';

  const itemBajando = items.find(i => i.tendencia === 'bajando' && i.margenEstimado < 15);
  const productoEnRiesgo = itemBajando?.nombre ?? null;

  // Margen general (semana actual)
  const margen = ingActual > 0 ? Math.round(((ingActual - egActual) / ingActual) * 100) : 0;

  // Generar insights (8 reglas)
  const insights: InsightIA[] = [];

  // 1. Ticket promedio
  if (Math.abs(ticketVariacion) > 10) {
    insights.push({
      id: 'ticket-var',
      tipo: 'patron',
      area: 'ventas',
      titulo: ticketVariacion > 0
        ? `Ticket promedio subió ${ticketVariacion}% esta semana`
        : `Ticket promedio bajó ${Math.abs(ticketVariacion)}% esta semana`,
      detalle: `Esta semana: $${ticketActual.toLocaleString('es-AR')} vs semana anterior: $${ticketAnterior.toLocaleString('es-AR')}`,
      impacto: Math.abs(ticketVariacion) > 20 ? 'alto' : 'medio',
    });
  }

  // 2. Horario pico y valle
  if (bucketEntries.length > 0 && bucketEntries[bucketEntries.length - 1][1] < bucketEntries[0][1] * 0.3) {
    insights.push({
      id: 'horario-valle',
      tipo: 'oportunidad',
      area: 'horarios',
      titulo: `Horario muerto: ${horarioValle}`,
      detalle: `Solo ${bucketEntries[bucketEntries.length - 1][1]} reserva(s) en ese horario vs ${bucketEntries[0][1]} en pico (${horarioPico}).`,
      impacto: 'medio',
      accionSugerida: 'Considerá una promo especial o happy hour en ese horario para atraer más clientes.',
    });
  }

  // 3. Producto en riesgo
  if (itemBajando) {
    insights.push({
      id: 'producto-riesgo',
      tipo: 'alerta',
      area: 'productos',
      titulo: `"${itemBajando.nombre}" tiene margen crítico (${itemBajando.margenEstimado}%)`,
      detalle: `Tendencia bajando y margen por debajo del 15%. Ingresos esta semana: $${itemBajando.ingresoSemana.toLocaleString('es-AR')}.`,
      impacto: 'alto',
      accionSugerida: 'Considerá eliminar, reformular el precio o reemplazarlo.',
    });
  }

  // 4. Producto estrella
  if (itemsSubiendo[0]) {
    insights.push({
      id: 'producto-estrella',
      tipo: 'oportunidad',
      area: 'productos',
      titulo: `"${itemsSubiendo[0].nombre}" está en su mejor momento`,
      detalle: `Tendencia subiendo · $${itemsSubiendo[0].ingresoSemana.toLocaleString('es-AR')} esta semana · margen ${itemsSubiendo[0].margenEstimado}%.`,
      impacto: 'alto',
      accionSugerida: 'Destacalo en carta, redes o como recomendación del staff.',
    });
  }

  // 5. Clientes en riesgo de churn
  const hoy = new Date();
  const churnClientes = clientes.filter(c => {
    if (c.nivel !== 'VIP' && c.nivel !== 'Frecuente') return false;
    const ultima = parseDate(c.ultimaVisita);
    if (!ultima) return false;
    return (hoy.getTime() - ultima.getTime()) / 86400000 > 21;
  });
  if (churnClientes.length > 0) {
    const nombres = churnClientes.slice(0, 3).map(c => c.nombre.split(' ')[0]).join(', ');
    insights.push({
      id: 'churn-clientes',
      tipo: 'alerta',
      area: 'clientes',
      titulo: `${churnClientes.length} cliente(s) frecuente(s) sin visitar hace +21 días`,
      detalle: `${nombres}${churnClientes.length > 3 ? ` y ${churnClientes.length - 3} más` : ''} no vinieron en más de 3 semanas.`,
      impacto: churnClientes.length >= 3 ? 'alto' : 'medio',
      accionSugerida: 'Mandales un mensaje personalizado o una promo de reactivación.',
    });
  }

  // 6. Nuevos clientes semana actual
  const nuevosActual = clientes.filter(c => {
    const ultima = parseDate(c.ultimaVisita);
    return ultima ? actualDates.includes(isoDate(ultima)) && c.visitas === 1 : false;
  });
  if (nuevosActual.length > 0) {
    insights.push({
      id: 'nuevos-clientes',
      tipo: 'patron',
      area: 'clientes',
      titulo: `${nuevosActual.length} cliente(s) nuevo(s) esta semana`,
      detalle: `${nuevosActual.map(c => c.nombre.split(' ')[0]).join(', ')} visitaron el local por primera vez.`,
      impacto: 'medio',
    });
  }

  // 7. Margen general
  if (margen < 50 && ingActual > 0) {
    const topEgreso = movsActual
      .filter(m => m.tipo === 'egreso')
      .reduce<Record<string, number>>((acc, m) => { acc[m.categoria] = (acc[m.categoria] ?? 0) + m.monto; return acc; }, {});
    const topCat = Object.entries(topEgreso).sort((a, b) => b[1] - a[1])[0];
    insights.push({
      id: 'margen-bajo',
      tipo: 'alerta',
      area: 'caja',
      titulo: `Margen semanal bajo: ${margen}%`,
      detalle: `Los ingresos ($${ingActual.toLocaleString('es-AR')}) apenas superan los egresos ($${egActual.toLocaleString('es-AR')}).`,
      impacto: 'alto',
      accionSugerida: topCat ? `Revisá los costos de "${topCat[0]}" ($${topCat[1].toLocaleString('es-AR')} esta semana).` : 'Revisá los costos principales.',
    });
  }

  // 8. Día más rentable
  const rentabilidadPorDia: Record<string, number> = {};
  movsActual.forEach(m => {
    const delta = m.tipo === 'ingreso' ? m.monto : -m.monto;
    rentabilidadPorDia[m.fecha] = (rentabilidadPorDia[m.fecha] ?? 0) + delta;
  });
  const mejorDia = Object.entries(rentabilidadPorDia).sort((a, b) => b[1] - a[1])[0];
  if (mejorDia) {
    const d = new Date(mejorDia[0] + 'T12:00:00');
    const diaStr = d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
    insights.push({
      id: 'dia-rentable',
      tipo: 'patron',
      area: 'caja',
      titulo: `Día más rentable: ${diaStr}`,
      detalle: `Profit neto: $${mejorDia[1].toLocaleString('es-AR')} (ingresos menos egresos del día).`,
      impacto: 'bajo',
    });
  }

  // Ordenar: alertas primero, luego oportunidades, patrones, recomendaciones; dentro de cada tipo por impacto
  insights.sort((a, b) => {
    const tipoA = TIPO_ORDER[a.tipo] ?? 99;
    const tipoB = TIPO_ORDER[b.tipo] ?? 99;
    if (tipoA !== tipoB) return tipoA - tipoB;
    return (IMPACTO_ORDER[a.impacto] ?? 99) - (IMPACTO_ORDER[b.impacto] ?? 99);
  });

  // Fecha de inicio de semana actual
  const lunStr = semActualStart.toLocaleDateString('es-AR', { day: 'numeric', month: 'long' });

  return {
    semanaDel: lunStr,
    ticketPromedio: ticketActual,
    ticketPromedioVariacion: ticketVariacion,
    horarioPico,
    horarioValle,
    productoEstrella,
    productoEnRiesgo,
    insights: insights.slice(0, 8),
  };
}
