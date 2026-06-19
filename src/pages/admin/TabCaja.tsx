import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import {
  Wine, Calendar, Package, Users, Plus, X, TrendingUp, TrendingDown,
  CreditCard, Banknote, ArrowUpRight,
} from 'lucide-react';
import { mockMovimientosCaja } from '../../data/mockMovimientosCaja';
import { MovimientoCaja, TipoMovimiento, MetodoPago } from '../../types/admin.types';

type Periodo = 'hoy' | 'semana' | 'mes';

const CATEGORIAS_INGRESO = ['Reservas', 'Barra', 'Eventos', 'Otro'];
const CATEGORIAS_EGRESO  = ['Proveedores', 'Sueldos', 'Mantenimiento', 'Otro'];
const METODOS: MetodoPago[] = ['Efectivo', 'Transferencia', 'Tarjeta'];

type IconEl = (props: { size?: number; className?: string }) => React.ReactElement | null;

const CAT_ICON: Record<string, IconEl> = {
  Reservas:     Calendar,
  Barra:        Wine,
  Eventos:      Users,
  Proveedores:  Package,
  Sueldos:      Users,
  Mantenimiento: Package,
  Otro:         ArrowUpRight,
};

const METODO_ICON: Record<MetodoPago, IconEl> = {
  Efectivo:      Banknote,
  Transferencia: ArrowUpRight,
  Tarjeta:       CreditCard,
};

function fmt(n: number) {
  return '$' + n.toLocaleString('es-AR');
}

function filtrarPorPeriodo(movs: MovimientoCaja[], periodo: Periodo): MovimientoCaja[] {
  const hoy = new Date();
  const todayStr = hoy.toISOString().slice(0, 10);
  if (periodo === 'hoy') return movs.filter(m => m.fecha === todayStr);
  if (periodo === 'semana') {
    const semana: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(hoy); d.setDate(hoy.getDate() - i);
      semana.push(d.toISOString().slice(0, 10));
    }
    return movs.filter(m => semana.includes(m.fecha));
  }
  const mes = hoy.toISOString().slice(0, 7);
  return movs.filter(m => m.fecha.startsWith(mes));
}

function buildChartData(movs: MovimientoCaja[]) {
  const map: Record<string, { fecha: string; ingresos: number; egresos: number }> = {};
  movs.forEach(m => {
    if (!map[m.fecha]) map[m.fecha] = { fecha: m.fecha, ingresos: 0, egresos: 0 };
    if (m.tipo === 'ingreso') map[m.fecha].ingresos += m.monto;
    else                      map[m.fecha].egresos  += m.monto;
  });
  return Object.values(map)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .map(d => ({
      ...d,
      label: new Date(d.fecha + 'T12:00:00').toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric' }),
    }));
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-violeta-card border border-violeta-borde rounded-lg p-3 text-xs">
      <div className="text-blanco-muted mb-2 font-display tracking-widest uppercase">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex justify-between gap-4" style={{ color: p.color }}>
          <span className="capitalize">{p.name}</span>
          <span className="font-bold">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

interface FormNuevo {
  tipo: TipoMovimiento; categoria: string; descripcion: string;
  monto: string; metodo: MetodoPago;
}

const FORM_INIT: FormNuevo = { tipo: 'ingreso', categoria: 'Reservas', descripcion: '', monto: '', metodo: 'Efectivo' };

export default function TabCaja() {
  const [periodo, setPeriodo] = useState<Periodo>('semana');
  const [movimientos, setMovimientos] = useState<MovimientoCaja[]>(mockMovimientosCaja);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormNuevo>(FORM_INIT);

  const filtrados = useMemo(() => filtrarPorPeriodo(movimientos, periodo), [movimientos, periodo]);
  const ingresos  = filtrados.filter(m => m.tipo === 'ingreso').reduce((s, m) => s + m.monto, 0);
  const egresos   = filtrados.filter(m => m.tipo === 'egreso' ).reduce((s, m) => s + m.monto, 0);
  const profit    = ingresos - egresos;
  const margen    = ingresos > 0 ? Math.round((profit / ingresos) * 100) : 0;
  const chartData = useMemo(() => buildChartData(filtrados), [filtrados]);

  const guardarMovimiento = () => {
    if (!form.descripcion || !form.monto) return;
    const nuevo: MovimientoCaja = {
      id:          `m${Date.now()}`,
      fecha:       new Date().toISOString().slice(0, 10),
      tipo:        form.tipo,
      categoria:   form.categoria,
      descripcion: form.descripcion,
      monto:       Number(form.monto),
      metodo:      form.metodo,
    };
    // TODO: reemplazar por insert a Supabase cuando se conecte
    setMovimientos(prev => [nuevo, ...prev]);
    setForm(FORM_INIT);
    setShowForm(false);
  };

  const PERIODOS: { id: Periodo; label: string }[] = [
    { id: 'hoy', label: 'Hoy' }, { id: 'semana', label: 'Semana' }, { id: 'mes', label: 'Mes' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 relative">
      {/* Selector de período */}
      <div className="flex gap-1 bg-violeta-card border border-violeta-borde rounded-lg p-1 w-fit mb-8">
        {PERIODOS.map(p => (
          <button
            key={p.id}
            onClick={() => setPeriodo(p.id)}
            className={`px-5 py-1.5 rounded text-[11px] font-display font-black tracking-widest uppercase transition-all ${
              periodo === p.id ? 'bg-naranja text-violeta' : 'text-blanco-muted hover:text-blanco-suave'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-violeta-card border border-violeta-borde rounded-xl p-5">
          <div className="text-[10px] font-display tracking-[0.3em] text-blanco-muted uppercase mb-3">Ingresos</div>
          <div className="flex items-center gap-1.5">
            <TrendingUp size={16} className="text-verde-ok flex-shrink-0" />
            <span className="text-2xl font-bold tabular-nums text-verde-ok">{fmt(ingresos)}</span>
          </div>
        </div>
        <div className="bg-violeta-card border border-violeta-borde rounded-xl p-5">
          <div className="text-[10px] font-display tracking-[0.3em] text-blanco-muted uppercase mb-3">Egresos</div>
          <div className="flex items-center gap-1.5">
            <TrendingDown size={16} className="text-rojo-error flex-shrink-0" />
            <span className="text-2xl font-bold tabular-nums text-rojo-error">{fmt(egresos)}</span>
          </div>
        </div>
        <div className="bg-violeta-card border border-violeta-borde rounded-xl p-5 md:col-span-1">
          <div className="text-[10px] font-display tracking-[0.3em] text-blanco-muted uppercase mb-3">Profit neto</div>
          <span className={`text-2xl font-bold tabular-nums ${profit >= 0 ? 'text-verde-ok' : 'text-rojo-error'}`}>
            {profit >= 0 ? '' : '−'}{fmt(Math.abs(profit))}
          </span>
        </div>
        <div className="bg-violeta-card border border-violeta-borde rounded-xl p-5">
          <div className="text-[10px] font-display tracking-[0.3em] text-blanco-muted uppercase mb-3">Margen</div>
          <span className={`text-2xl font-bold tabular-nums ${margen >= 50 ? 'text-verde-ok' : 'text-amarillo-alerta'}`}>
            {margen}%
          </span>
        </div>
      </div>

      {/* Gráfico */}
      {chartData.length > 0 && (
        <div className="bg-violeta-card border border-violeta-borde rounded-xl p-6 mb-8">
          <div className="text-[10px] font-display tracking-[0.3em] text-blanco-muted uppercase mb-5">
            Ingresos vs Egresos — {periodo === 'hoy' ? 'hoy' : periodo === 'semana' ? 'últimos 7 días' : 'este mes'}
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barCategoryGap="30%" barGap={2}>
              <XAxis
                dataKey="label"
                tick={{ fill: '#A89880', fontSize: 10, fontFamily: 'Inter' }}
                axisLine={false} tickLine={false}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(201,151,58,0.05)' }} />
              <Bar dataKey="ingresos" radius={[4, 4, 0, 0]}>
                {chartData.map((_, i) => <Cell key={i} fill="#4CAF88" />)}
              </Bar>
              <Bar dataKey="egresos" radius={[4, 4, 0, 0]}>
                {chartData.map((_, i) => <Cell key={i} fill="#EF4444" />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-6 justify-center mt-4">
            <div className="flex items-center gap-2 text-[11px] text-blanco-muted">
              <div className="w-3 h-3 rounded-sm bg-verde-ok" /> Ingresos
            </div>
            <div className="flex items-center gap-2 text-[11px] text-blanco-muted">
              <div className="w-3 h-3 rounded-sm bg-rojo-error" /> Egresos
            </div>
          </div>
        </div>
      )}

      {/* Lista de movimientos */}
      <div className="bg-violeta-card border border-violeta-borde rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-violeta-borde">
          <span className="font-display text-xs font-black tracking-[0.3em] text-naranja uppercase">
            Movimientos · {filtrados.length}
          </span>
        </div>

        {filtrados.length === 0 ? (
          <div className="text-center py-12 text-blanco-muted">
            <p className="font-display text-xs tracking-widest uppercase">Sin movimientos en este período</p>
          </div>
        ) : (
          <div className="divide-y divide-violeta-borde">
            {filtrados
              .sort((a, b) => b.fecha.localeCompare(a.fecha) || b.id.localeCompare(a.id))
              .map(m => {
                const Icon = CAT_ICON[m.categoria] ?? ArrowUpRight;
                const MIcon = METODO_ICON[m.metodo];
                return (
                  <div key={m.id} className="px-6 py-4 flex items-center gap-4 hover:bg-violeta-medio/20 transition-colors">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      m.tipo === 'ingreso' ? 'bg-verde-ok/10' : 'bg-rojo-error/10'
                    }`}>
                      <Icon size={16} className={m.tipo === 'ingreso' ? 'text-verde-ok' : 'text-rojo-error'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-blanco-suave truncate">{m.descripcion}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] font-display tracking-widest text-blanco-muted uppercase">{m.categoria}</span>
                        <span className="text-blanco-muted/30">·</span>
                        <span className="text-[10px] text-blanco-muted">{new Date(m.fecha + 'T12:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex items-center gap-1 text-[10px] text-blanco-muted/60">
                        <MIcon size={11} /> {m.metodo}
                      </div>
                      <span className={`font-bold tabular-nums text-sm ${m.tipo === 'ingreso' ? 'text-verde-ok' : 'text-rojo-error'}`}>
                        {m.tipo === 'ingreso' ? '+' : '−'}{fmt(m.monto)}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-24 md:bottom-8 right-6 w-14 h-14 bg-naranja hover:bg-naranja-claro rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 z-40"
        title="Nuevo movimiento"
      >
        <Plus size={24} className="text-violeta" />
      </button>

      {/* Form nuevo movimiento */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
            style={{ background: 'rgba(13,13,13,0.92)' }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }}
              transition={{ duration: 0.2 }}
              className="bg-violeta-card border border-violeta-borde rounded-2xl p-6 w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-xs font-black tracking-[0.3em] text-naranja uppercase">Nuevo movimiento</span>
                <button onClick={() => setShowForm(false)} className="p-1 text-blanco-muted hover:text-rojo-error transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Tipo toggle */}
              <div className="flex gap-2 mb-5">
                {(['ingreso', 'egreso'] as TipoMovimiento[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setForm(f => ({ ...f, tipo: t, categoria: t === 'ingreso' ? 'Reservas' : 'Proveedores' }))}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-display font-black tracking-widest uppercase transition-all ${
                      form.tipo === t
                        ? t === 'ingreso' ? 'bg-verde-ok text-violeta' : 'bg-rojo-error text-white'
                        : 'bg-violeta text-blanco-muted hover:text-blanco-suave'
                    }`}
                  >
                    {t === 'ingreso' ? '+ Ingreso' : '− Egreso'}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <select
                  value={form.categoria}
                  onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))}
                  className="w-full bg-violeta border border-violeta-borde rounded-xl px-4 py-3 text-sm text-blanco-suave outline-none focus:border-naranja/50"
                >
                  {(form.tipo === 'ingreso' ? CATEGORIAS_INGRESO : CATEGORIAS_EGRESO).map(c => (
                    <option key={c} value={c} style={{ background: '#1A1A1A' }}>{c}</option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Descripción *"
                  value={form.descripcion}
                  onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                  className="w-full bg-violeta border border-violeta-borde rounded-xl px-4 py-3 text-sm text-blanco-suave placeholder:text-blanco-muted/40 outline-none focus:border-naranja/50"
                />

                <input
                  type="number"
                  placeholder="Monto *"
                  value={form.monto}
                  onChange={e => setForm(f => ({ ...f, monto: e.target.value }))}
                  className="w-full bg-violeta border border-violeta-borde rounded-xl px-4 py-3 text-sm text-blanco-suave placeholder:text-blanco-muted/40 outline-none focus:border-naranja/50"
                />

                <select
                  value={form.metodo}
                  onChange={e => setForm(f => ({ ...f, metodo: e.target.value as MetodoPago }))}
                  className="w-full bg-violeta border border-violeta-borde rounded-xl px-4 py-3 text-sm text-blanco-suave outline-none focus:border-naranja/50"
                >
                  {METODOS.map(m => (
                    <option key={m} value={m} style={{ background: '#1A1A1A' }}>{m}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={guardarMovimiento}
                disabled={!form.descripcion || !form.monto}
                className="w-full mt-6 py-4 bg-naranja hover:bg-naranja-claro disabled:opacity-40 disabled:cursor-not-allowed text-violeta text-xs font-display font-black tracking-[0.3em] uppercase rounded-xl transition-all"
              >
                GUARDAR MOVIMIENTO
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
