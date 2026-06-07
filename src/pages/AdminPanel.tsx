import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Check, Clock, Trash2, Users, Calendar, XCircle, CheckCircle } from 'lucide-react';
import { tenantConfig } from '../config/tenant.config';

type ReservaEstado = 'pendiente' | 'confirmada' | 'cancelada';

interface Reserva {
  id: number;
  fecha: string;
  hora: string;
  tipo: string;
  nombre: string;
  personas: number;
  obs: string;
  estado: ReservaEstado;
  timestamp: string;
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

export default function AdminPanel() {
  const [pin, setPin] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState(false);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const today = new Date().toLocaleDateString();

  const handlePinInput = (digit: string) => {
    const next = pin + digit;
    if (next.length === 4) {
      if (next === tenantConfig.adminPin) {
        setAuthed(true);
        loadReservas();
      } else {
        setError(true);
        setTimeout(() => { setPin(''); setError(false); }, 800);
      }
    } else {
      setPin(next);
    }
  };

  const loadReservas = () => {
    try {
      const raw = sessionStorage.getItem('panel-reservas');
      setReservas(raw ? JSON.parse(raw) : []);
    } catch { setReservas([]); }
  };

  const updateEstado = (id: number, estado: ReservaEstado) => {
    const updated = reservas.map(r => r.id === id ? { ...r, estado } : r);
    setReservas(updated);
    sessionStorage.setItem('panel-reservas', JSON.stringify(updated));
  };

  const clearDay = () => {
    sessionStorage.removeItem('panel-reservas');
    setReservas([]);
  };

  const todayReservas = reservas.filter(r => r.fecha === today);
  const totalPersonas = todayReservas.reduce((sum, r) => sum + (r.personas || 0), 0);

  useEffect(() => {
    if (authed) loadReservas();
  }, [authed]);

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
            {/* PIN display */}
            <div className={`flex justify-center gap-4 mb-8 transition-all duration-300 ${error ? 'shake' : ''}`}>
              {[0, 1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl font-black transition-all ${
                    i < pin.length
                      ? error
                        ? 'bg-rojo-error/20 border-rojo-error text-rojo-error'
                        : 'bg-naranja/20 border-naranja text-naranja'
                      : 'bg-violeta border-violeta-borde'
                  }`}
                >
                  {i < pin.length ? '●' : ''}
                </div>
              ))}
            </div>

            {/* Numpad */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                <button
                  key={n}
                  onClick={() => handlePinInput(String(n))}
                  className="h-14 bg-violeta-medio rounded-xl font-display text-2xl font-black hover:bg-naranja/20 hover:text-naranja transition-all active:scale-95"
                >
                  {n}
                </button>
              ))}
              <div></div>
              <button
                onClick={() => handlePinInput('0')}
                className="h-14 bg-violeta-medio rounded-xl font-display text-2xl font-black hover:bg-naranja/20 hover:text-naranja transition-all active:scale-95"
              >
                0
              </button>
              <button
                onClick={() => setPin(pin.slice(0, -1))}
                className="h-14 bg-violeta-medio rounded-xl flex items-center justify-center hover:bg-rojo-error/20 hover:text-rojo-error transition-all active:scale-95"
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <p className="text-rojo-error text-center text-xs font-display tracking-widest mt-4 uppercase">
                PIN incorrecto
              </p>
            )}
          </div>

          <p className="text-center text-blanco-muted/40 text-[10px] mt-6 font-display">
            <a href="/" className="hover:text-blanco-muted transition-colors">← Volver al sitio</a>
          </p>
        </div>

        <style>{`
          @keyframes shake {
            0%,100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-8px); }
            80% { transform: translateX(8px); }
          }
          .shake { animation: shake 0.4s ease; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violeta">
      {/* Header */}
      <div className="bg-violeta-medio border-b border-naranja-borde/20 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={tenantConfig.logo} alt="Logo" className="h-10 w-auto opacity-80" />
            <div>
              <h1 className="font-display text-lg font-black tracking-widest text-naranja">PANEL DE RESERVAS</h1>
              <p className="text-blanco-muted text-[10px] font-display uppercase tracking-widest">
                {new Date().toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          <a href="/" className="btn-secondary py-2 px-4 text-sm">← Sitio</a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-violeta-card p-6 rounded-2xl border border-violeta-borde text-center">
            <Calendar className="text-naranja mx-auto mb-2" size={28} />
            <div className="text-3xl font-black text-naranja font-display">{todayReservas.length}</div>
            <div className="text-[10px] text-blanco-muted uppercase tracking-widest mt-1">Reservas hoy</div>
          </div>
          <div className="bg-violeta-card p-6 rounded-2xl border border-violeta-borde text-center">
            <Users className="text-verde-ok mx-auto mb-2" size={28} />
            <div className="text-3xl font-black text-verde-ok font-display">{totalPersonas}</div>
            <div className="text-[10px] text-blanco-muted uppercase tracking-widest mt-1">Personas totales</div>
          </div>
          <div className="bg-violeta-card p-6 rounded-2xl border border-violeta-borde text-center">
            <Check className="text-amarillo-alerta mx-auto mb-2" size={28} />
            <div className="text-3xl font-black text-amarillo-alerta font-display">
              {todayReservas.filter(r => r.estado === 'pendiente').length}
            </div>
            <div className="text-[10px] text-blanco-muted uppercase tracking-widest mt-1">Pendientes</div>
          </div>
        </div>

        {/* Lista */}
        <div className="bg-violeta-card rounded-2xl border border-naranja-borde/20 overflow-hidden">
          <div className="p-6 border-b border-violeta-borde flex items-center justify-between">
            <h2 className="font-display text-sm font-black tracking-widest uppercase text-naranja">
              Reservas del día — {today}
            </h2>
            <button
              onClick={clearDay}
              className="flex items-center gap-2 text-rojo-error/60 hover:text-rojo-error transition-colors text-xs font-display tracking-widest"
            >
              <Trash2 size={14} /> LIMPIAR DÍA
            </button>
          </div>

          {todayReservas.length === 0 ? (
            <div className="text-center py-16 text-blanco-muted">
              <Calendar size={40} className="mx-auto mb-4 opacity-20" />
              <p className="font-display tracking-widest text-sm uppercase">Sin reservas para hoy</p>
            </div>
          ) : (
            <div className="divide-y divide-violeta-borde">
              {todayReservas
                .sort((a, b) => a.hora.localeCompare(b.hora))
                .map(r => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 flex flex-col md:flex-row md:items-center gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-naranja font-display font-black">{r.hora} hs</span>
                        <span className="bg-violeta-medio px-2 py-0.5 rounded text-[10px] font-display font-bold tracking-widest text-blanco-muted uppercase">{r.tipo}</span>
                        <span className="font-bold">{r.nombre}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-blanco-muted">
                        <span className="flex items-center gap-1"><Users size={12} /> {r.personas} personas</span>
                        {r.obs && <span className="italic truncate max-w-xs">"{r.obs}"</span>}
                      </div>
                    </div>

                    {/* Estado toggle */}
                    <div className="flex gap-1.5 flex-shrink-0">
                      {(['pendiente', 'confirmada', 'cancelada'] as ReservaEstado[]).map(estado => (
                        <button
                          key={estado}
                          onClick={() => updateEstado(r.id, estado)}
                          title={ESTADO_LABELS[estado]}
                          className={`flex items-center gap-1 px-2 py-1.5 sm:px-3 rounded-lg border text-[10px] font-display font-black tracking-widest uppercase transition-all ${
                            r.estado === estado
                              ? estadoStyles[estado]
                              : 'bg-transparent border-violeta-borde text-blanco-muted/40 hover:border-blanco-muted/20 hover:text-blanco-muted/60'
                          }`}
                        >
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

        {/* All reservas (non-today) */}
        {reservas.filter(r => r.fecha !== today).length > 0 && (
          <div className="mt-6 bg-violeta-card rounded-2xl border border-violeta-borde overflow-hidden">
            <div className="p-4 border-b border-violeta-borde">
              <h3 className="font-display text-xs font-black tracking-widest uppercase text-blanco-muted">Otras fechas</h3>
            </div>
            {reservas
              .filter(r => r.fecha !== today)
              .map(r => (
                <div key={r.id} className="p-4 border-b border-violeta-borde/50 last:border-0 flex items-center gap-4 text-sm">
                  <span className="text-blanco-muted font-display w-24">{r.fecha}</span>
                  <span className="text-naranja font-display font-black w-16">{r.hora}</span>
                  <span className="text-blanco-muted w-24 uppercase text-[10px] tracking-widest">{r.tipo}</span>
                  <span className="font-bold flex-1">{r.nombre}</span>
                  <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-display font-black tracking-widest uppercase flex-shrink-0 ${estadoStyles[r.estado]}`}>
                    <EstadoIcon estado={r.estado} />
                    <span className="hidden xs:inline">{ESTADO_LABELS[r.estado]}</span>
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
