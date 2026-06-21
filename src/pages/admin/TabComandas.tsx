import { useState } from 'react';
import { motion } from 'motion/react';
import { X, ChefHat, Check } from 'lucide-react';
import { getConfig } from '../../config/active';

interface ItemComanda { nombre: string; precio: number; cantidad: number; }
export interface Comanda {
  id: string; mesa: string; clienteNombre?: string;
  items: ItemComanda[]; total: number; timestamp: string;
  estado: 'pendiente' | 'en_preparacion' | 'listo' | 'cancelado';
}

export const COMANDA_KEY = (nombre: string) => `panel-comandas-${nombre}`;

const EST = {
  pendiente:      { label: 'Pendiente',      color: 'var(--color-amarillo-alerta)', emoji: '🕐' },
  en_preparacion: { label: 'En preparación', color: 'var(--color-naranja)',          emoji: '👨‍🍳' },
  listo:          { label: 'Listo',           color: 'var(--color-verde-ok)',         emoji: '✅' },
  cancelado:      { label: 'Cancelado',       color: 'var(--color-rojo-error)',       emoji: '❌' },
} as const;

function fmt(n: number) { return '$' + n.toLocaleString('es-AR'); }
function ago(iso: string) {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return 'ahora';
  if (m < 60) return `hace ${m} min`;
  return `hace ${Math.floor(m / 60)}h`;
}

export default function TabComandas() {
  const tc = getConfig();
  const KEY = COMANDA_KEY(tc.nombre);
  const [comandas, setComandas] = useState<Comanda[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
  });
  const [filtro, setFiltro] = useState<Comanda['estado'] | 'todas'>('todas');

  const save = (u: Comanda[]) => {
    setComandas(u);
    try { localStorage.setItem(KEY, JSON.stringify(u)); } catch { /* skip */ }
  };

  const cambiar = (id: string, estado: Comanda['estado']) =>
    save(comandas.map(c => c.id === id ? { ...c, estado } : c));

  const eliminar = (id: string) => save(comandas.filter(c => c.id !== id));

  const filtradas = filtro === 'todas' ? comandas : comandas.filter(c => c.estado === filtro);
  const pendientes = comandas.filter(c => c.estado === 'pendiente').length;
  const enPrep = comandas.filter(c => c.estado === 'en_preparacion').length;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total',     value: comandas.length, color: 'var(--color-blanco-suave)' },
          { label: 'Pendiente', value: pendientes,       color: 'var(--color-amarillo-alerta)' },
          { label: 'En prep.',  value: enPrep,           color: 'var(--color-naranja)' },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: 'var(--color-violeta-card)', border: '1px solid var(--color-violeta-borde)' }}>
            <div className="text-[9px] font-display tracking-[0.3em] text-blanco-muted uppercase mb-3">{label}</div>
            <div className="text-2xl font-bold tabular-nums" style={{ color }}>{value}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {(['todas', 'pendiente', 'en_preparacion', 'listo'] as const).map(f => (
          <button key={f} onClick={() => setFiltro(f)}
            className={`px-4 py-1.5 rounded-xl text-[10px] font-display font-black tracking-widest uppercase transition-all ${
              filtro === f ? 'bg-naranja text-violeta' : 'bg-violeta-card border border-violeta-borde text-blanco-muted hover:text-blanco-suave'
            }`}>
            {f === 'todas' ? 'Todas' : EST[f].label}
            {f === 'pendiente' && pendientes > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 bg-rojo-error text-white text-[9px] rounded-full">{pendientes}</span>
            )}
          </button>
        ))}
      </div>

      {filtradas.length === 0 ? (
        <div className="text-center py-16 text-blanco-muted">
          <div className="text-4xl mb-4">🧾</div>
          <p className="font-display text-xs tracking-widest uppercase">Sin comandas{filtro !== 'todas' ? ' en este estado' : ''}</p>
          <p className="text-[11px] mt-2">Los pedidos del sitio web aparecen acá</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtradas
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map(c => {
              const e = EST[c.estado];
              return (
                <motion.div key={c.id} layout className="rounded-2xl p-5"
                  style={{ background: 'var(--color-violeta-card)', border: `1px solid ${e.color}35` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-display text-sm font-black tracking-wider" style={{ color: 'var(--color-blanco-suave)' }}>
                        {e.emoji} Mesa {c.mesa}
                      </div>
                      {c.clienteNombre && <div className="text-[11px] text-blanco-muted mt-0.5">{c.clienteNombre}</div>}
                      <div className="text-[10px] text-blanco-muted mt-1">{ago(c.timestamp)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-display font-black tracking-widest uppercase px-2 py-1 rounded-lg"
                        style={{ background: `${e.color}18`, color: e.color, border: `1px solid ${e.color}30` }}>
                        {e.label}
                      </span>
                      <button onClick={() => eliminar(c.id)} className="p-1 text-blanco-muted hover:text-rojo-error transition-colors">
                        <X size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-4">
                    {c.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-blanco-muted"><span className="text-blanco-suave font-semibold">{item.cantidad}×</span> {item.nombre}</span>
                        <span className="text-blanco-muted tabular-nums">{fmt(item.precio * item.cantidad)}</span>
                      </div>
                    ))}
                    <div className="border-t border-violeta-borde pt-2 flex justify-between font-bold text-sm">
                      <span className="text-blanco-muted">Total</span>
                      <span style={{ color: 'var(--color-verde-ok)' }}>{fmt(c.total)}</span>
                    </div>
                  </div>

                  {c.estado !== 'listo' && c.estado !== 'cancelado' && (
                    <div className="flex gap-2">
                      {c.estado === 'pendiente' && (
                        <button onClick={() => cambiar(c.id, 'en_preparacion')}
                          className="flex-1 py-2 rounded-xl text-[10px] font-display font-black tracking-widest uppercase transition-all flex items-center justify-center gap-1"
                          style={{ background: 'var(--color-naranja)18', color: 'var(--color-naranja)', border: '1px solid var(--color-naranja)35' }}>
                          <ChefHat size={12} /> En preparación
                        </button>
                      )}
                      <button onClick={() => cambiar(c.id, 'listo')}
                        className="flex-1 py-2 rounded-xl text-[10px] font-display font-black tracking-widest uppercase transition-all flex items-center justify-center gap-1"
                        style={{ background: 'var(--color-verde-ok)18', color: 'var(--color-verde-ok)', border: '1px solid var(--color-verde-ok)35' }}>
                        <Check size={12} /> Listo
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
        </div>
      )}
    </div>
  );
}
