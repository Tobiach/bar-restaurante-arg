import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, ChevronUp, Phone, Mail, X, Star } from 'lucide-react';
import { getMockData } from '../../data/mockIndex';
import { getConfig } from '../../config/active';
import { Cliente } from '../../types/admin.types';

const NIVEL_STYLES: Record<Cliente['nivel'], { bg: string; text: string; border: string; emoji: string }> = {
  VIP:       { bg: 'bg-verde-ok/10',     text: 'text-verde-ok',      border: 'border-verde-ok/30',      emoji: '👑' },
  Frecuente: { bg: 'bg-naranja/10',      text: 'text-naranja',        border: 'border-naranja/30',       emoji: '⭐' },
  Nuevo:     { bg: 'bg-blanco-muted/10', text: 'text-blanco-muted',   border: 'border-blanco-muted/20',  emoji: '🆕' },
};

function formatMonto(n: number) {
  return '$' + n.toLocaleString('es-AR');
}

function diasDesde(iso: string) {
  const d = new Date(iso);
  const hoy = new Date();
  const diff = Math.floor((hoy.getTime() - d.getTime()) / 86400000);
  if (diff === 0) return 'hoy';
  if (diff === 1) return 'ayer';
  return `hace ${diff} días`;
}

function ClienteModal({ c, onClose }: { c: Cliente; onClose: () => void }) {
  const s = NIVEL_STYLES[c.nivel];
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(13,13,13,0.92)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
        className="bg-violeta-card border border-violeta-borde rounded-2xl p-8 w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="font-bold text-blanco-suave text-lg mb-1">{c.nombre}</div>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[10px] font-display font-black tracking-widest uppercase ${s.bg} ${s.text} ${s.border}`}>
              {s.emoji} {c.nivel}
            </span>
          </div>
          <button onClick={onClose} className="p-2 rounded text-blanco-muted hover:text-rojo-error hover:bg-rojo-error/10 transition-all">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-blanco-muted">
            <Phone size={14} className="text-naranja flex-shrink-0" /> {c.telefono}
          </div>
          {c.email && (
            <div className="flex items-center gap-2 text-sm text-blanco-muted">
              <Mail size={14} className="text-naranja flex-shrink-0" /> {c.email}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Visitas', value: c.visitas },
            { label: 'Gasto total', value: formatMonto(c.gastoTotal) },
            { label: 'Ticket prom.', value: formatMonto(c.ticketPromedio) },
          ].map(({ label, value }) => (
            <div key={label} className="bg-violeta rounded-xl p-3 text-center">
              <div className="text-[9px] text-blanco-muted font-display tracking-widest uppercase mb-1">{label}</div>
              <div className="text-sm font-bold text-verde-ok">{value}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-[11px] text-blanco-muted mb-2">
          <span>Puntos acumulados</span>
          <span className="text-naranja font-bold">{c.puntos} pts</span>
        </div>
        <div className="h-2 bg-violeta rounded-full overflow-hidden mb-6">
          <div className="h-full bg-naranja rounded-full" style={{ width: `${Math.min((c.puntos / 2000) * 100, 100)}%` }} />
        </div>

        {c.notas && (
          <div className="bg-violeta rounded-xl p-4">
            <div className="text-[10px] text-blanco-muted font-display tracking-widest uppercase mb-1">Notas</div>
            <p className="text-sm text-blanco-suave">{c.notas}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

const PUNTOS_KEY = (nombre: string) => `panel-puntos-${nombre}`;

export default function TabClientes() {
  const tc = getConfig();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Cliente | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [addingPuntos, setAddingPuntos] = useState<string | null>(null);
  const [puntosInput, setPuntosInput] = useState('');
  const [extraPuntos, setExtraPuntos] = useState<Record<string, number>>(() => {
    try { return JSON.parse(localStorage.getItem(PUNTOS_KEY(tc.nombre)) || '{}'); } catch { return {}; }
  });

  const clientes = getMockData().clientes;

  const totalPuntos = (c: Cliente) => c.puntos + (extraPuntos[c.id] || 0);

  const agregarPuntos = (id: string) => {
    const pts = parseInt(puntosInput);
    if (!pts || pts <= 0) return;
    const updated = { ...extraPuntos, [id]: (extraPuntos[id] || 0) + pts };
    setExtraPuntos(updated);
    try { localStorage.setItem(PUNTOS_KEY(tc.nombre), JSON.stringify(updated)); } catch { /* skip */ }
    setPuntosInput('');
    setAddingPuntos(null);
  };

  const filtered = clientes.filter(c =>
    c.nombre.toLowerCase().includes(query.toLowerCase()) ||
    c.telefono.includes(query)
  );

  const totales = clientes.length;
  const vips     = clientes.filter(c => c.nivel === 'VIP').length;
  const ticketProm = Math.round(
    clientes.reduce((s, c) => s + c.ticketPromedio, 0) / clientes.length
  );

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Clientes',     value: totales,               color: 'var(--color-blanco-suave)', emoji: '👥' },
          { label: 'VIP',          value: vips,                  color: 'var(--color-verde-ok)',      emoji: '👑' },
          { label: 'Ticket prom.', value: formatMonto(ticketProm), color: 'var(--color-naranja)',    emoji: '💳' },
        ].map(({ label, value, color, emoji }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: 'var(--color-violeta-card)', border: '1px solid var(--color-violeta-borde)' }}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-[9px] font-display tracking-[0.3em] text-blanco-muted uppercase">{label}</span>
              <span className="text-lg leading-none opacity-60">{emoji}</span>
            </div>
            <div className="text-2xl font-bold tabular-nums" style={{ color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Buscador */}
      <div className="relative mb-6">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-blanco-muted" />
        <input
          type="text"
          placeholder="Buscar por nombre o teléfono..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full bg-violeta-card border border-violeta-borde rounded-xl pl-10 pr-4 py-3 text-sm text-blanco-suave placeholder:text-blanco-muted/40 outline-none focus:border-naranja/50 transition-colors"
        />
      </div>

      {/* Lista */}
      <div className="bg-violeta-card border border-violeta-borde rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-violeta-borde">
          <span className="font-display text-xs font-black tracking-[0.3em] text-naranja uppercase">
            Clientes · {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Header tabla desktop */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-[9px] font-display font-black tracking-[0.3em] text-blanco-muted uppercase border-b border-violeta-borde">
          <div className="col-span-4">Cliente</div>
          <div className="col-span-2">Nivel</div>
          <div className="col-span-1 text-center">Visitas</div>
          <div className="col-span-2">Última visita</div>
          <div className="col-span-3 text-right">Gasto total</div>
        </div>

        <div className="divide-y divide-violeta-borde">
          {filtered.map(c => {
            const s = NIVEL_STYLES[c.nivel];
            const isExp = expanded === c.id;
            return (
              <div key={c.id}>
                {/* Fila */}
                <div
                  className="px-6 py-4 cursor-pointer hover:bg-violeta-medio/30 transition-colors"
                  onClick={() => setExpanded(isExp ? null : c.id)}
                >
                  {/* Mobile */}
                  <div className="md:hidden flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-blanco-suave text-sm mb-1">{c.nombre}</div>
                      <div className="text-[11px] text-blanco-muted font-mono">{c.telefono}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`flex items-center gap-1 px-2 py-0.5 rounded border text-[9px] font-display font-black ${s.bg} ${s.text} ${s.border}`}>
                        {s.emoji} {c.nivel}
                      </span>
                      <span className="text-sm font-bold text-verde-ok">{formatMonto(c.gastoTotal)}</span>
                      {isExp ? <ChevronUp size={15} className="text-blanco-muted" /> : <ChevronDown size={15} className="text-blanco-muted" />}
                    </div>
                  </div>

                  {/* Desktop */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4">
                      <div className="font-semibold text-blanco-suave text-sm">{c.nombre}</div>
                      <div className="text-[11px] text-blanco-muted font-mono mt-0.5">{c.telefono}</div>
                    </div>
                    <div className="col-span-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[9px] font-display font-black ${s.bg} ${s.text} ${s.border}`}>
                        {s.emoji} {c.nivel}
                      </span>
                    </div>
                    <div className="col-span-1 text-center text-sm font-bold text-blanco-suave tabular-nums">{c.visitas}</div>
                    <div className="col-span-2 text-[11px] text-blanco-muted">{diasDesde(c.ultimaVisita)}</div>
                    <div className="col-span-2 text-right font-bold text-verde-ok tabular-nums">{formatMonto(c.gastoTotal)}</div>
                    <div className="col-span-1 text-right">
                      {isExp ? <ChevronUp size={14} className="ml-auto text-blanco-muted" /> : <ChevronDown size={14} className="ml-auto text-blanco-muted" />}
                    </div>
                  </div>
                </div>

                {/* Fila expandida */}
                <AnimatePresence>
                  {isExp && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 pt-1 bg-violeta-medio/20 flex flex-wrap gap-6 items-start">
                        <div className="flex gap-4 text-[11px]">
                          {[
                            { label: 'Ticket prom.', value: formatMonto(c.ticketPromedio) },
                            { label: 'Email', value: c.email || '—' },
                          ].map(({ label, value }) => (
                            <div key={label}>
                              <div className="text-[9px] text-blanco-muted font-display tracking-widest uppercase mb-1">{label}</div>
                              <div className="text-blanco-suave font-semibold">{value}</div>
                            </div>
                          ))}
                          <div>
                            <div className="text-[9px] text-blanco-muted font-display tracking-widest uppercase mb-1">Puntos</div>
                            <div className="text-naranja font-bold">{totalPuntos(c)} pts</div>
                          </div>
                        </div>
                        {c.notas && (
                          <div className="text-[11px]">
                            <div className="text-[9px] text-blanco-muted font-display tracking-widest uppercase mb-1">Notas</div>
                            <div className="text-blanco-suave">{c.notas}</div>
                          </div>
                        )}

                        {/* Agregar puntos inline */}
                        {addingPuntos === c.id ? (
                          <div className="flex items-center gap-2 ml-auto" onClick={e => e.stopPropagation()}>
                            <input
                              type="number"
                              placeholder="Puntos"
                              value={puntosInput}
                              onChange={e => setPuntosInput(e.target.value)}
                              onKeyDown={e => { if (e.key === 'Enter') agregarPuntos(c.id); if (e.key === 'Escape') setAddingPuntos(null); }}
                              autoFocus
                              className="w-24 bg-violeta border border-naranja/40 rounded-lg px-3 py-1.5 text-sm text-blanco-suave outline-none focus:border-naranja/70"
                            />
                            <button onClick={() => agregarPuntos(c.id)}
                              className="px-3 py-1.5 bg-naranja text-violeta text-[10px] font-display font-black tracking-widest uppercase rounded-lg transition-all">
                              OK
                            </button>
                            <button onClick={() => { setAddingPuntos(null); setPuntosInput(''); }}
                              className="p-1.5 text-blanco-muted hover:text-rojo-error transition-colors">
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="ml-auto flex gap-2">
                            <button
                              onClick={e => { e.stopPropagation(); setAddingPuntos(c.id); }}
                              className="px-4 py-2 text-[10px] font-display font-black tracking-widest uppercase rounded-lg transition-all flex items-center gap-1.5"
                              style={{ background: 'var(--color-naranja)18', color: 'var(--color-naranja)', border: '1px solid var(--color-naranja)35' }}
                            >
                              <Star size={11} /> + Puntos
                            </button>
                            <button
                              onClick={e => { e.stopPropagation(); setSelected(c); }}
                              className="px-4 py-2 bg-naranja text-violeta text-[10px] font-display font-black tracking-widest uppercase rounded-lg hover:bg-naranja-claro transition-all"
                            >
                              VER PERFIL
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ClienteModal c={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
