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

const TIPO_EMOJI: Record<InsightIA['tipo'], string> = {
  alerta: '🚨', oportunidad: '💡', patron: '📈', recomendacion: '🎯',
};

function InsightCard({ insight }: { insight: InsightIA }) {
  const cfg = TIPO_CONFIG[insight.tipo];
  const { Icon } = cfg;
  return (
    <div className="rounded-2xl p-5 flex items-start gap-4 relative overflow-hidden"
      style={{ background: 'var(--color-violeta-card)', border: '1px solid var(--color-violeta-borde)' }}>
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: `var(${cfg.border.includes('rojo') ? '--color-rojo-error' : cfg.border.includes('verde') ? '--color-verde-ok' : '--color-naranja'})` }} />

      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ml-2 text-xl`}>
        {TIPO_EMOJI[insight.tipo]}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 rounded-lg text-[9px] font-display font-black tracking-widest uppercase ${cfg.badgeBg} ${cfg.badgeText}`}>
            {AREA_LABEL[insight.area]}
          </span>
          {insight.impacto === 'alto' && (
            <span className="px-2 py-0.5 rounded-lg text-[9px] font-display font-black tracking-widest uppercase bg-amarillo-alerta/10 text-amarillo-alerta">
              ⚡ ALTO IMPACTO
            </span>
          )}
        </div>
        <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-blanco-suave)' }}>{insight.titulo}</p>
        <p className="text-[12px] leading-relaxed" style={{ color: 'var(--color-blanco-muted)' }}>{insight.detalle}</p>
        {insight.accionSugerida && (
          <div className="mt-3 flex items-start gap-2 rounded-xl p-3"
            style={{ background: 'var(--color-violeta-medio)' }}>
            <CheckCircle size={13} className="text-verde-ok flex-shrink-0 mt-0.5" />
            <span className="text-[11px]" style={{ color: 'var(--color-blanco-suave)' }}>{insight.accionSugerida}</span>
          </div>
        )}
      </div>
      <Icon size={0} className="hidden" />
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
      <div className="mb-8 rounded-2xl p-6 relative overflow-hidden" style={{ background: 'var(--color-violeta-card)', border: '1px solid var(--color-naranja)20' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top right, var(--color-naranja)08 0%, transparent 60%)' }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🧠</span>
            <span className="px-2.5 py-1 rounded-full text-[9px] font-display font-black tracking-[0.4em] uppercase"
              style={{ background: 'var(--color-naranja)15', color: 'var(--color-naranja)', border: '1px solid var(--color-naranja)30' }}>
              CONTROL.EVO BRAIN
            </span>
          </div>
          <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--color-blanco-suave)' }}>
            Semana del {resumen.semanaDel}
          </h1>
          <p className="text-[12px]" style={{ color: 'var(--color-blanco-muted)' }}>
            Analizando reservas, clientes y caja — generado automáticamente ✨
          </p>
        </div>
      </div>

      {/* 4 KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-2xl p-5" style={{ background: 'var(--color-violeta-card)', border: '1px solid var(--color-violeta-borde)' }}>
          <div className="flex items-start justify-between mb-3">
            <span className="text-[9px] font-display tracking-[0.3em] text-blanco-muted uppercase">Ticket prom.</span>
            <span className="text-base">🎫</span>
          </div>
          <div className="text-2xl font-bold tabular-nums mb-1" style={{ color: 'var(--color-blanco-suave)' }}>{fmt(resumen.ticketPromedio)}</div>
          {resumen.ticketPromedioVariacion !== 0 && (
            <div className={`flex items-center gap-1 text-[11px] font-semibold ${variPos ? 'text-verde-ok' : 'text-rojo-error'}`}>
              {variPos ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {variPos ? '+' : ''}{resumen.ticketPromedioVariacion}% vs ant.
            </div>
          )}
        </div>

        <div className="rounded-2xl p-5" style={{ background: 'var(--color-violeta-card)', border: '1px solid var(--color-violeta-borde)' }}>
          <div className="flex items-start justify-between mb-3">
            <span className="text-[9px] font-display tracking-[0.3em] text-blanco-muted uppercase">Pico</span>
            <span className="text-base">🕐</span>
          </div>
          <div className="text-sm font-bold" style={{ color: 'var(--color-naranja)' }}>{resumen.horarioPico}</div>
          {resumen.horarioValle !== resumen.horarioPico && (
            <div className="text-[10px] mt-1" style={{ color: 'var(--color-blanco-muted)' }}>Valle: {resumen.horarioValle}</div>
          )}
        </div>

        <div className="rounded-2xl p-5" style={{ background: 'var(--color-violeta-card)', border: '1px solid var(--color-violeta-borde)' }}>
          <div className="flex items-start justify-between mb-3">
            <span className="text-[9px] font-display tracking-[0.3em] text-blanco-muted uppercase">⭐ Estrella</span>
          </div>
          <div className="text-sm font-bold leading-tight" style={{ color: 'var(--color-verde-ok)' }}>{resumen.productoEstrella}</div>
          {resumen.productoEnRiesgo && (
            <div className="text-[10px] mt-2 flex items-center gap-1" style={{ color: 'var(--color-rojo-error)' }}>
              ⚠️ En riesgo: {resumen.productoEnRiesgo}
            </div>
          )}
        </div>

        <div className="rounded-2xl p-5" style={{ background: 'var(--color-violeta-card)', border: '1px solid var(--color-naranja)20' }}>
          <div className="flex items-start justify-between mb-3">
            <span className="text-[9px] font-display tracking-[0.3em] text-blanco-muted uppercase">Insights</span>
            <span className="text-base">💡</span>
          </div>
          <div className="text-3xl font-black" style={{ color: 'var(--color-naranja)' }}>{resumen.insights.length}</div>
          <div className="text-[10px] mt-1" style={{ color: 'var(--color-blanco-muted)' }}>
            {resumen.insights.filter(i => i.tipo === 'alerta').length} alertas · {resumen.insights.filter(i => i.tipo === 'oportunidad').length} oport.
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
