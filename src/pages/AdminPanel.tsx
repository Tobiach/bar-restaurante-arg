import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Check, Clock, Trash2, Users, Calendar, XCircle, CheckCircle, BarChart2, RefreshCcw } from 'lucide-react';
import { getConfig } from '../config/active';
import { supabase, supabaseEnabled } from '../lib/supabase';

type ReservaEstado = 'pendiente' | 'confirmada' | 'cancelada';
type DateFilter = 'hoy' | 'semana' | 'mes' | 'todo';

interface Reserva {
  id: number;
  fecha: string;
  hora: string;
  tipo: string;
  nombre: string;
  telefono?: string;
  personas: number;
  obs?: string;
  observaciones?: string;
  estado: ReservaEstado;
  timestamp: string;
  pack?: string;
  show_nombre?: string;
}

const estadoStyles: Record<ReservaEstado, string> = {
  pendiente: 'bg-amarillo-alerta/10 text-amarillo-alerta border-amarillo-alerta/30',
  confirmada: 'bg-verde-ok/10 text-verde-ok border-verde-ok/30',
  cancelada: 'bg-rojo-error/10 text-rojo-error border-rojo-error/30',
};

const EstadoIcon = ({ estado }: { estado: ReservaEstado }) => {
  if (estado === 'pendiente') return <Clock size={12} />;
  if (estado === 'confirmada') return <CheckCircle size={12} />;
  return <XCircle size={12} />;
};

const ESTADO_LABELS: Record<ReservaEstado, string> = {
  pendiente: 'PENDIENTE',
  confirmada: 'CONFIRMADA',
  cancelada: 'CANCELADA',
};

function getDateRange(filter: DateFilter): { from: Date; to: Date } {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (filter === 'hoy') return { from: today, to: today };
  if (filter === 'semana') {
    const mon = new Date(today); mon.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
    const sun = new Date(mon); sun.setDate(mon.getDate() + 6);
    return { from: mon, to: sun };
  }
  if (filter === 'mes') {
    return { from: new Date(today.getFullYear(), today.getMonth(), 1), to: new Date(today.getFullYear(), today.getMonth() + 1, 0) };
  }
  return { from: new Date('2000-01-01'), to: new Date('2099-12-31') };
}

function parseFecha(fechaStr: string): Date | null {
  // handles "DD/MM/YYYY" and ISO formats
  if (!fechaStr) return null;
  if (fechaStr.includes('/')) {
    const [d, m, y] = fechaStr.split('/').map(Number);
    if (!d || !m || !y) return null;
    return new Date(y, m - 1, d);
  }
  const d = new Date(fechaStr);
  return isNaN(d.getTime()) ? null : d;
}

export default function AdminPanel() {
  const tenantConfig = getConfig();
  const [pin, setPin] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState(false);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [dateFilter, setDateFilter] = useState<DateFilter>('hoy');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const today = new Date().toLocaleDateString();

  const LOCAL_KEY = `panel-reservas-${tenantConfig.nombre}`;

  const loadReservas = async () => {
    if (supabaseEnabled && supabase) {
      const { data } = await supabase
        .from('reservas')
        .select('*')
        .eq('tenant', tenantConfig.nombre)
        .order('hora', { ascending: true });
      if (data) { setReservas(data as Reserva[]); return; }
    }
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      setReservas(raw ? JSON.parse(raw) : []);
    } catch { setReservas([]); }
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

  const clearAll = () => {
    localStorage.removeItem(LOCAL_KEY);
    setReservas([]);
  };

  // Supabase realtime
  useEffect(() => {
    if (!authed) return;
    loadReservas();
    if (!supabaseEnabled || !supabase) return;
    const channel = supabase
      .channel('reservas-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservas', filter: `tenant=eq.${tenantConfig.nombre}` },
        () => loadReservas())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [authed]);

  // Filter by date range
  const { from, to } = getDateRange(dateFilter);
  const filteredReservas = reservas.filter(r => {
    const d = parseFecha(r.fecha);
    if (!d) return dateFilter === 'todo';
    const dNorm = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const fromNorm = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const toNorm = new Date(to.getFullYear(), to.getMonth(), to.getDate());
    return dNorm >= fromNorm && dNorm <= toNorm;
  });

  const totalPersonas = filteredReservas.reduce((s, r) => s + (r.personas || 0), 0);
  const pendientes = filteredReservas.filter(r => r.estado === 'pendiente').length;
  const confirmadas = filteredReservas.filter(r => r.estado === 'confirmada').length;

  // Analytics
  const tiposCount = filteredReservas.reduce<Record<string, number>>((acc, r) => { acc[r.tipo] = (acc[r.tipo] || 0) + 1; return acc; }, {});
  const horasCount = filteredReservas.reduce<Record<string, number>>((acc, r) => { if (r.hora) acc[r.hora] = (acc[r.hora] || 0) + 1; return acc; }, {});
  const maxTipo = Math.max(1, ...(Object.values(tiposCount) as number[]));
  const maxHora = Math.max(1, ...(Object.values(horasCount) as number[]));

  const handlePinInput = (digit: string) => {
    const next = pin + digit;
    if (next.length === 4) {
      if (next === tenantConfig.adminPin) {
        setAuthed(true);
      } else {
        setError(true);
        setTimeout(() => { setPin(''); setError(false); }, 800);
      }
    } else {
      setPin(next);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-violeta flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <img src={tenantConfig.logo} alt="Logo" className="h-14 w-auto mx-auto mb-4 opacity-80" />
            <h1 className="font-titulo text-3xl font-black text-white mb-1">PANEL ADMIN</h1>
            <p className="text-blanco-muted text-xs font-display tracking-widest">INGRESÁ TU PIN DE ACCESO</p>
          </div>
          <div className="bg-violeta-card p-8 rounded-3xl border border-naranja-borde/20 shadow-2xl">
            <div className={`flex justify-center gap-4 mb-8 transition-all duration-300 ${error ? 'shake' : ''}`}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl font-black transition-all ${
                  i < pin.length
                    ? error ? 'bg-rojo-error/20 border-rojo-error text-rojo-error' : 'bg-naranja/20 border-naranja text-naranja'
                    : 'bg-violeta border-violeta-borde'
                }`}>
                  {i < pin.length ? '●' : ''}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                <button key={n} onClick={() => handlePinInput(String(n))}
                  className="h-14 bg-violeta-medio rounded-xl font-display text-2xl font-black hover:bg-naranja/20 hover:text-naranja transition-all active:scale-95">
                  {n}
                </button>
              ))}
              <div />
              <button onClick={() => handlePinInput('0')} className="h-14 bg-violeta-medio rounded-xl font-display text-2xl font-black hover:bg-naranja/20 hover:text-naranja transition-all active:scale-95">0</button>
              <button onClick={() => setPin(pin.slice(0, -1))} className="h-14 bg-violeta-medio rounded-xl flex items-center justify-center hover:bg-rojo-error/20 hover:text-rojo-error transition-all active:scale-95">
                <X size={20} />
              </button>
            </div>
            {error && <p className="text-rojo-error text-center text-xs font-display tracking-widest mt-4 uppercase">PIN incorrecto</p>}
          </div>
          <p className="text-center text-blanco-muted/40 text-[10px] mt-6 font-display">
            <a href="/" className="hover:text-blanco-muted transition-colors">← Volver al sitio</a>
          </p>
        </div>
        <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-8px)} 80%{transform:translateX(8px)} } .shake{animation:shake 0.4s ease}`}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violeta">
      {/* Header */}
      <div className="bg-violeta-medio border-b border-naranja-borde/20 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <img src={tenantConfig.logo} alt="Logo" className="h-10 w-auto opacity-80" />
            <div>
              <h1 className="font-display text-lg font-black tracking-widest text-naranja">PANEL DE RESERVAS</h1>
              <p className="text-blanco-muted text-[10px] font-display uppercase tracking-widest">
                {tenantConfig.nombre} · {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadReservas} className="p-2 text-blanco-muted hover:text-naranja transition-colors" title="Recargar">
              <RefreshCcw size={16} />
            </button>
            <button onClick={() => setShowAnalytics(!showAnalytics)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-display font-black tracking-widest transition-all ${showAnalytics ? 'bg-naranja text-white' : 'bg-violeta-card text-blanco-muted hover:text-naranja'}`}>
              <BarChart2 size={14} /> ANALYTICS
            </button>
            <a href="/" className="btn-secondary py-2 px-4 text-sm">← Sitio</a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Date filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['hoy', 'semana', 'mes', 'todo'] as DateFilter[]).map(f => (
            <button key={f} onClick={() => setDateFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-display font-black tracking-widest uppercase transition-all ${
                dateFilter === f ? 'bg-naranja text-white' : 'bg-violeta-card border border-violeta-borde text-blanco-muted hover:border-naranja/30'
              }`}>
              {f === 'hoy' ? 'HOY' : f === 'semana' ? 'ESTA SEMANA' : f === 'mes' ? 'ESTE MES' : 'TODAS'}
            </button>
          ))}
          <span className="ml-auto text-[10px] text-blanco-muted font-display self-center uppercase tracking-widest">
            {filteredReservas.length} reservas
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Reservas', value: filteredReservas.length, color: 'text-naranja', Icon: Calendar },
            { label: 'Personas', value: totalPersonas, color: 'text-verde-ok', Icon: Users },
            { label: 'Pendientes', value: pendientes, color: 'text-amarillo-alerta', Icon: Clock },
            { label: 'Confirmadas', value: confirmadas, color: 'text-verde-ok', Icon: Check },
          ].map(({ label, value, color, Icon }) => (
            <div key={label} className="bg-violeta-card p-5 rounded-2xl border border-violeta-borde text-center">
              <Icon className={`${color} mx-auto mb-2`} size={24} />
              <div className={`text-3xl font-black font-display ${color}`}>{value}</div>
              <div className="text-[10px] text-blanco-muted uppercase tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Analytics expandible */}
        {showAnalytics && filteredReservas.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-violeta-card rounded-2xl border border-naranja-borde/20 p-6 mb-6">
            <h3 className="font-display text-xs font-black tracking-widest uppercase text-naranja mb-5">Analytics del período</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Por tipo */}
              <div>
                <p className="text-[10px] text-blanco-muted uppercase tracking-widest mb-3 font-display">Por tipo de visita</p>
                <div className="space-y-3">
                  {(Object.entries(tiposCount) as [string, number][]).sort((a, b) => b[1] - a[1]).map(([tipo, count]) => (
                    <div key={tipo}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold">{tipo}</span>
                        <span className="text-naranja font-black">{count}</span>
                      </div>
                      <div className="h-2 bg-violeta rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(count / maxTipo) * 100}%` }}
                          transition={{ duration: 0.7 }} className="h-full bg-naranja rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Por horario */}
              <div>
                <p className="text-[10px] text-blanco-muted uppercase tracking-widest mb-3 font-display">Horarios más pedidos</p>
                <div className="space-y-3">
                  {(Object.entries(horasCount) as [string, number][]).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([hora, count]) => (
                    <div key={hora}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold">{hora} hs</span>
                        <span className="text-naranja font-black">{count}</span>
                      </div>
                      <div className="h-2 bg-violeta rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(count / maxHora) * 100}%` }}
                          transition={{ duration: 0.7 }} className="h-full bg-dorado rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Lista de reservas */}
        <div className="bg-violeta-card rounded-2xl border border-naranja-borde/20 overflow-hidden">
          <div className="p-6 border-b border-violeta-borde flex items-center justify-between">
            <h2 className="font-display text-sm font-black tracking-widest uppercase text-naranja">
              Reservas — {dateFilter === 'hoy' ? today : dateFilter === 'semana' ? 'Esta semana' : dateFilter === 'mes' ? 'Este mes' : 'Todas'}
            </h2>
            <button onClick={clearAll}
              className="flex items-center gap-2 text-rojo-error/60 hover:text-rojo-error transition-colors text-xs font-display tracking-widest">
              <Trash2 size={14} /> LIMPIAR
            </button>
          </div>

          {filteredReservas.length === 0 ? (
            <div className="text-center py-16 text-blanco-muted">
              <Calendar size={40} className="mx-auto mb-4 opacity-20" />
              <p className="font-display tracking-widest text-sm uppercase">Sin reservas en este período</p>
            </div>
          ) : (
            <div className="divide-y divide-violeta-borde">
              {filteredReservas
                .sort((a, b) => {
                  const dateA = parseFecha(a.fecha);
                  const dateB = parseFecha(b.fecha);
                  if (dateA && dateB && dateA.getTime() !== dateB.getTime()) return dateA.getTime() - dateB.getTime();
                  return (a.hora || '').localeCompare(b.hora || '');
                })
                .map(r => (
                  <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="p-6 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className="text-blanco-muted/60 font-display text-xs">{r.fecha}</span>
                        <span className="text-naranja font-display font-black">{r.hora} hs</span>
                        <span className="bg-violeta-medio px-2 py-0.5 rounded text-[10px] font-display font-bold tracking-widest text-blanco-muted uppercase">{r.tipo}</span>
                        <span className="font-bold">{r.nombre}</span>
                        {r.telefono && <span className="text-xs text-blanco-muted/60 font-mono">{r.telefono}</span>}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-blanco-muted flex-wrap">
                        <span className="flex items-center gap-1"><Users size={12} /> {r.personas} personas</span>
                        {r.pack && <span className="bg-naranja/10 text-naranja px-2 py-0.5 rounded text-[10px] font-black">Pack {r.pack}</span>}
                        {r.show_nombre && <span className="text-blanco-muted/60 italic">{r.show_nombre}</span>}
                        {(r.obs || r.observaciones) && <span className="italic truncate max-w-xs">"{r.obs || r.observaciones}"</span>}
                      </div>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      {(['pendiente', 'confirmada', 'cancelada'] as ReservaEstado[]).map(estado => (
                        <button key={estado} onClick={() => updateEstado(r.id, estado)} title={ESTADO_LABELS[estado]}
                          className={`flex items-center gap-1 px-2 py-1.5 sm:px-3 rounded-lg border text-[10px] font-display font-black tracking-widest uppercase transition-all ${
                            r.estado === estado
                              ? estadoStyles[estado]
                              : 'bg-transparent border-violeta-borde text-blanco-muted/40 hover:border-blanco-muted/20 hover:text-blanco-muted/60'
                          }`}>
                          <EstadoIcon estado={estado} />
                          <span className="hidden sm:inline">{ESTADO_LABELS[estado]}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
