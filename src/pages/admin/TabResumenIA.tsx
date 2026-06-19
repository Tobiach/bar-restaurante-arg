import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Target, CheckCircle, Clock, Zap } from 'lucide-react';
import { getMockData } from '../../data/mockIndex';
import { generarResumenSemanal } from '../../lib/insightsEngine';
import { InsightIA, ResumenSemanal } from '../../types/admin.types';

type IconEl = (props: { size?: number; className?: string }) => React.ReactElement | null;

function fmt(n: number) {
  return '$' + n.toLocaleString('es-AR');
}

const TIPO_CONFIG: Record<InsightIA['tipo'], {
  Icon: IconEl;
  border: string;
  bg: string;
  badgeText: string;
  badgeBg: string;
}> = {
  alerta:         { Icon: AlertTriangle, border: 'border-rojo-error/30',      bg: 'bg-rojo-error/5',      badgeText: 'text-rojo-error',    badgeBg: 'bg-rojo-error/10' },
  oportunidad:    { Icon: Lightbulb,     border: 'border-naranja/30',          bg: 'bg-naranja/5',          badgeText: 'text-naranja',       badgeBg: 'bg-naranja/10' },
  patron:         { Icon: TrendingUp,    border: 'border-verde-ok/30',         bg: 'bg-verde-ok/5',         badgeText: 'text-verde-ok',      badgeBg: 'bg-verde-ok/10' },
  recomendacion:  { Icon: Target,        border: 'border-naranja/20',          bg: 'bg-naranja/3',          badgeText: 'text-naranja',       badgeBg: 'bg-naranja/10' },
};

const AREA_LABEL: Record<InsightIA['area'], string> = {
  ventas:    'Ventas',
  clientes:  'Clientes',
  horarios:  'Horarios',
  productos: 'Productos',
  caja:      'Caja',
};

function InsightCard({ insight }: { insight: InsightIA }) {
  const cfg = TIPO_CONFIG[insight.tipo];
  const { Icon } = cfg;
  return (
    <div className={`rounded-xl border p-5 ${cfg.border} ${cfg.bg}`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.badgeBg}`}>
          <Icon size={18} className={cfg.badgeText} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded text-[9px] font-display font-black tracking-widest uppercase ${cfg.badgeBg} ${cfg.badgeText}`}>
              {AREA_LABEL[insight.area]}
            </span>
            {insight.impacto === 'alto' && (
              <span className="px-2 py-0.5 rounded text-[9px] font-display font-black tracking-widest uppercase bg-amarillo-alerta/10 text-amarillo-alerta">
                ALTO IMPACTO
              </span>
            )}
          </div>
          <p className="font-semibold text-blanco-suave text-sm mb-1">{insight.titulo}</p>
          <p className="text-[12px] text-blanco-muted leading-relaxed">{insight.detalle}</p>
          {insight.accionSugerida && (
            <div className="mt-3 flex items-start gap-2 bg-violeta-medio/50 rounded-lg p-3">
              <CheckCircle size={13} className="text-verde-ok flex-shrink-0 mt-0.5" />
              <span className="text-[11px] text-blanco-suave">{insight.accionSugerida}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TabResumenIA() {
  const { clientes, movimientos, reservas, items } = getMockData();

  const resumen: ResumenSemanal = useMemo(
    () => generarResumenSemanal(reservas, clientes, movimientos, items),
    [clientes, movimientos, reservas, items],
  );

  const variPos = resumen.ticketPromedioVariacion >= 0;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Zap size={16} className="text-naranja" />
          <span className="font-display text-xs font-black tracking-[0.3em] text-naranja uppercase">Resumen IA</span>
        </div>
        <h1 className="text-xl font-bold text-blanco-suave">
          Semana del {resumen.semanaDel}
        </h1>
        <p className="text-[12px] text-blanco-muted mt-1">
          Generado automáticamente en base a tus datos
        </p>
      </div>

      {/* 4 KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Ticket promedio */}
        <div className="bg-violeta-card border border-violeta-borde rounded-xl p-5">
          <div className="text-[9px] font-display tracking-[0.3em] text-blanco-muted uppercase mb-3">Ticket prom.</div>
          <div className="text-2xl font-bold tabular-nums text-blanco-suave mb-1">{fmt(resumen.ticketPromedio)}</div>
          {resumen.ticketPromedioVariacion !== 0 && (
            <div className={`flex items-center gap-1 text-xs font-semibold ${variPos ? 'text-verde-ok' : 'text-rojo-error'}`}>
              {variPos ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {variPos ? '+' : ''}{resumen.ticketPromedioVariacion}% vs sem. ant.
            </div>
          )}
        </div>

        {/* Horario pico */}
        <div className="bg-violeta-card border border-violeta-borde rounded-xl p-5">
          <div className="text-[9px] font-display tracking-[0.3em] text-blanco-muted uppercase mb-3">Horario pico</div>
          <div className="text-lg font-bold text-naranja">{resumen.horarioPico}</div>
          {resumen.horarioValle !== resumen.horarioPico && (
            <div className="text-[11px] text-blanco-muted mt-1">Valle: {resumen.horarioValle}</div>
          )}
        </div>

        {/* Producto estrella */}
        <div className="bg-violeta-card border border-violeta-borde rounded-xl p-5">
          <div className="text-[9px] font-display tracking-[0.3em] text-blanco-muted uppercase mb-3">Producto estrella</div>
          <div className="text-sm font-bold text-verde-ok leading-tight">{resumen.productoEstrella}</div>
          {resumen.productoEnRiesgo && (
            <div className="text-[10px] text-rojo-error mt-2 flex items-center gap-1">
              <AlertTriangle size={11} /> En riesgo: {resumen.productoEnRiesgo}
            </div>
          )}
        </div>

        {/* Insights count */}
        <div className="bg-violeta-card border border-violeta-borde rounded-xl p-5">
          <div className="text-[9px] font-display tracking-[0.3em] text-blanco-muted uppercase mb-3">Insights</div>
          <div className="text-2xl font-bold text-blanco-suave">{resumen.insights.length}</div>
          <div className="text-[11px] text-blanco-muted mt-1">
            {resumen.insights.filter(i => i.tipo === 'alerta').length} alertas activas
          </div>
        </div>
      </div>

      {/* Cards de insight */}
      {resumen.insights.length > 0 ? (
        <div className="space-y-4 mb-8">
          {resumen.insights.map(i => (
            <React.Fragment key={i.id}><InsightCard insight={i} /></React.Fragment>
          ))}
        </div>
      ) : (
        <div className="bg-violeta-card border border-violeta-borde rounded-xl p-12 text-center mb-8">
          <Clock size={36} className="mx-auto mb-3 text-blanco-muted opacity-30" />
          <p className="font-display text-xs tracking-widest uppercase text-blanco-muted">Sin datos suficientes esta semana</p>
        </div>
      )}

      {/* Footer */}
      <p className="text-center text-[11px] text-blanco-muted/50">
        Estos insights se actualizan automáticamente cada semana.
        Cuantos más datos cargues, más precisos serán.
      </p>
    </div>
  );
}
