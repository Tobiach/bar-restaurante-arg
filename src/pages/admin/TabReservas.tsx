import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Check, X, TrendingUp, TrendingDown, RefreshCcw, Trash2 } from 'lucide-react';
import { getConfig } from '../../config/active';
import { supabase, supabaseEnabled } from '../../lib/supabase';
import { getMockData } from '../../data/mockIndex';
import { Reserva, ReservaEstado, DateFilter } from '../../types/admin.types';

const ESTADO_CONFIG: Record<ReservaEstado, { emoji: string; label: string; bg: string; text: string; border: string }> = {
  pendiente:  { emoji: '⏳', label: 'Pendiente',  bg: 'bg-amarillo-alerta/10', text: 'text-amarillo-alerta', border: 'border-amarillo-alerta/30' },
  confirmada: { emoji: '✅', label: 'Confirmada', bg: 'bg-verde-ok/10',         text: 'text-verde-ok',         border: 'border-verde-ok/30' },
  cancelada:  { emoji: '❌', label: 'Cancelada',  bg: 'bg-rojo-error/10',       text: 'text-rojo-error',       border: 'border-rojo-error/30' },
};

const ESTADO_STYLES: Record<ReservaEstado, string> = {
  pendiente:  'bg-amarillo-alerta/10 text-amarillo-alerta border-amarillo-alerta/30',
  confirmada: 'bg-verde-ok/10 text-verde-ok border-verde-ok/30',
  cancelada:  'bg-rojo-error/10 text-rojo-error border-rojo-error/30',
};

function getDateRange(f: DateFilter): { from: Date; to: Date } {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (f === 'hoy') return { from: today, to: today };
  if (f === 'semana') {
    const mon = new Date(today);
    mon.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
    const sun = new Date(mon); sun.setDate(mon.getDate() + 6);
    return { from: mon, to: sun };
  }
  if (f === 'mes') return {
    from: new Date(today.getFullYear(), today.getMonth(), 1),
    to:   new Date(today.getFullYear(), today.getMonth() + 1, 0),
  };
  return { from: new Date('2000-01-01'), to: new Date('2099-12-31') };
}

function parseFecha(s: string): Date | null {
  if (!s) return null;
  if (s.includes('/')) {
    const [d, m, y] = s.split('/').map(Number);
    if (!d || !m || !y) return null;
    return new Date(y, m - 1, d);
  }
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function KpiCard({ label, value, sub, trend, emoji }: { label: string; value: string | number; sub?: string; trend?: 'up' | 'down' | null; emoji?: string }) {
  return (
    <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: 'var(--color-violeta-card)', border: '1px solid var(--color-violeta-borde)' }}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-[9px] font-display tracking-[0.3em] text-blanco-muted uppercase">{label}</span>
        {emoji && <span className="text-lg leading-none opacity-60">{emoji}</span>}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold tabular-nums text-blanco-suave">{value}</span>
        {trend && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold mb-1 ${trend === 'up' ? 'text-verde-ok' : 'text-rojo-error'}`}>
            {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          </span>
        )}
      </div>
      {sub && <div className="text-[11px] text-blanco-muted mt-1.5">{sub}</div>}
    </div>
  );
}

export default function TabReservas() {
  const tc = getConfig();
  const [reservas, setReservas] = useState<Reserva[]>(() => getMockData().reservas);
  const [dateFilter, setDateFilter] = useState<DateFilter>('hoy');
  const LOCAL_KEY = `panel-reservas-${tc.nombre}`;

  const load = async () => {
    if (supabaseEnabled && supabase) {
      const { data } = await supabase.from('reservas').select('*')
        .eq('tenant', tc.nombre).order('hora', { ascending: true });
      if (data) { setReservas(data as Reserva[]); return; }
    }
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      const local: Reserva[] = raw ? JSON.parse(raw) : [];
      setReservas(local.length > 0 ? local : getMockData().reservas);
    } catch { setReservas(getMockData().reservas); }
  };

  const updateEstado = async (id: number, estado: ReservaEstado) => {
    const updated = reservas.map(r => r.id === id ? { ...r, estado } : r);
    setReservas(updated);
    if (supabaseEnabled && supabase) {
      await supabase.from('reservas').update({ estado }).eq('id', id);
    } else {
      try { localStorage.setItem(LOCAL_KEY, JSON.stringify(updated)); } catch { /* skip */ }
    }
  };

  useEffect(() => {
    load();
    if (!supabaseEnabled || !supabase) return;
    const ch = supabase.channel('reservas-tab')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservas', filter: `tenant=eq.${tc.nombre}` }, load)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const { from, to } = getDateRange(dateFilter);
  const filtered = reservas.filter(r => {
    const d = parseFecha(r.fecha);
    if (!d) return dateFilter === 'todo';
    const dn = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return dn >= from && dn <= to;
  }).sort((a, b) => {
    const da = parseFecha(a.fecha), db = parseFecha(b.fecha);
    if (da && db && da.getTime() !== db.getTime()) return da.getTime() - db.getTime();
    return (a.hora || '').localeCompare(b.hora || '');
  });

  const confirmadas = filtered.filter(r => r.estado === 'confirmada').length;
  const personas    = filtered.reduce((s, r) => s + (r.personas || 0), 0);
  const pctConfirm  = filtered.length > 0 ? Math.round((confirmadas / filtered.length) * 100) : 0;

  const FILTERS: { id: DateFilter; label: string }[] = [
    { id: 'hoy', label: 'Hoy' }, { id: 'semana', label: 'Semana' },
    { id: 'mes', label: 'Mes' }, { id: 'todo', label: 'Todo' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <KpiCard label="Reservas"    value={filtered.length}  sub="en el período" trend={filtered.length > 0 ? 'up' : null} emoji="📋" />
        <KpiCard label="Personas"    value={personas}          sub="esperadas"                                                emoji="👥" />
        <KpiCard label="Confirmadas" value={`${confirmadas} de ${filtered.length}`} sub={`${pctConfirm}% confirmado`} trend={pctConfirm >= 50 ? 'up' : 'down'} emoji="✅" />
      </div>

      {/* Filtros + acciones */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div className="flex gap-1 bg-violeta-card border border-violeta-borde rounded-lg p-1">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setDateFilter(f.id)}
              className={`px-4 py-1.5 rounded text-[11px] font-display font-black tracking-widest uppercase transition-all ${
                dateFilter === f.id ? 'bg-naranja text-violeta' : 'text-blanco-muted hover:text-blanco-suave'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 text-blanco-muted hover:text-naranja transition-colors rounded-lg hover:bg-naranja/10">
            <RefreshCcw size={15} />
          </button>
          <button
            onClick={() => { localStorage.removeItem(LOCAL_KEY); setReservas([]); }}
            className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-display tracking-widest text-rojo-error/60 hover:text-rojo-error hover:bg-rojo-error/10 rounded-lg transition-all"
          >
            <Trash2 size={13} /> LIMPIAR
          </button>
        </div>
      </div>

      {/* Tabla de reservas */}
      <div className="bg-violeta-card border border-violeta-borde rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-violeta-borde">
          <h2 className="font-display text-xs font-black tracking-[0.3em] text-naranja uppercase">
            Reservas · {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-blanco-muted">
            <Calendar size={36} className="mx-auto mb-3 opacity-20" />
            <p className="font-display text-xs tracking-widest uppercase">Sin reservas en este período</p>
          </div>
        ) : (
          <div className="divide-y divide-violeta-borde">
            {filtered.map(r => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-violeta-medio/30 transition-colors"
              >
                {/* Hora */}
                <div className="text-naranja font-bold text-lg tabular-nums w-16 flex-shrink-0">{r.hora}</div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-blanco-suave text-sm">{r.nombre}</span>
                    <span className="flex items-center gap-1 text-[10px] text-blanco-muted">
                      <Users size={11} /> {r.personas} pers.
                    </span>
                    <span className="px-2 py-0.5 bg-violeta-medio rounded text-[9px] font-display font-black tracking-widest text-blanco-muted uppercase">
                      {r.tipo}
                    </span>
                  </div>
                  <div className="text-[11px] text-blanco-muted/60 flex flex-wrap gap-3">
                    {r.telefono && <span className="font-mono">{r.telefono}</span>}
                    {r.fecha && <span>{r.fecha}</span>}
                    {r.observaciones && <span className="italic truncate max-w-xs">"{r.observaciones}"</span>}
                  </div>
                </div>

                {/* Estado + acciones */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[10px] font-display font-black tracking-wider uppercase ${ESTADO_STYLES[r.estado]}`}>
                    {ESTADO_CONFIG[r.estado].emoji} {ESTADO_CONFIG[r.estado].label}
                  </span>
                  <button
                    onClick={() => updateEstado(r.id, 'confirmada')}
                    className="p-1.5 rounded hover:bg-verde-ok/20 hover:text-verde-ok text-blanco-muted/40 transition-all"
                    title="Confirmar"
                  >
                    <Check size={15} />
                  </button>
                  <button
                    onClick={() => updateEstado(r.id, 'cancelada')}
                    className="p-1.5 rounded hover:bg-rojo-error/20 hover:text-rojo-error text-blanco-muted/40 transition-all"
                    title="Cancelar"
                  >
                    <X size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
