import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Plus, Minus, X, Send, Check } from 'lucide-react';
import { getConfig, getActiveData } from '../../config/active';
import { COMANDA_KEY } from '../../pages/admin/TabComandas';

function fmt(n: number) { return '$' + n.toLocaleString('es-AR'); }

export default function CarritoFlotante() {
  const tc = getConfig();
  const data = getActiveData();
  const [open, setOpen] = useState(false);
  const [carrito, setCarrito] = useState<Record<string, number>>({});
  const [mesa, setMesa] = useState('');
  const [clienteNombre, setClienteNombre] = useState('');
  const [enviado, setEnviado] = useState(false);

  const localRaw = (() => { try { return localStorage.getItem(`panel-carta-${tc.nombre}`); } catch { return null; } })();
  const items: any[] = localRaw
    ? (JSON.parse(localRaw) as any[]).filter((i: any) => i.activo !== false)
    : (data?.menu || []);

  let totalItems = 0;
  let totalMonto = 0;
  for (const id of Object.keys(carrito)) {
    const qty: number = carrito[id];
    totalItems += qty;
    const found = items.find((i: any) => i.id === id);
    if (found) totalMonto += Number((found as any).precio) * qty;
  }

  const ajustar = (id: string, delta: number) =>
    setCarrito(prev => {
      const q = (prev[id] || 0) + delta;
      if (q <= 0) { const { [id]: _, ...rest } = prev; return rest; }
      return { ...prev, [id]: q };
    });

  const enviar = () => {
    if (totalItems === 0) return;
    const comanda = {
      id: `cmd${Date.now()}`,
      mesa: mesa.trim() || 'Sin especificar',
      clienteNombre: clienteNombre.trim() || undefined,
      items: items.filter((i: any) => carrito[i.id]).map((i: any) => ({
        nombre: i.nombre, precio: i.precio, cantidad: carrito[i.id],
      })),
      estado: 'pendiente',
      timestamp: new Date().toISOString(),
      total: totalMonto,
    };
    try {
      const KEY = COMANDA_KEY(tc.nombre);
      const prev = JSON.parse(localStorage.getItem(KEY) || '[]');
      localStorage.setItem(KEY, JSON.stringify([comanda, ...prev]));
    } catch { /* skip */ }
    setEnviado(true);
    setTimeout(() => { setCarrito({}); setMesa(''); setClienteNombre(''); setEnviado(false); setOpen(false); }, 2200);
  };

  const cats = [...new Set(items.map((i: any) => i.cat))];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 md:bottom-8 left-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95"
        style={{ background: 'var(--color-naranja)' }}
        aria-label="Armar pedido"
      >
        <ShoppingCart size={22} style={{ color: 'var(--color-violeta)' }} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black bg-rojo-error text-white">
            {totalItems}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
            style={{ background: 'rgba(13,13,13,0.88)' }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="w-full md:max-w-lg max-h-[85vh] flex flex-col rounded-t-3xl md:rounded-2xl overflow-hidden"
              style={{ background: 'var(--color-violeta-card)', border: '1px solid var(--color-violeta-borde)' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-violeta-borde flex-shrink-0">
                <span className="font-display text-xs font-black tracking-[0.3em] uppercase" style={{ color: 'var(--color-naranja)' }}>
                  🛒 Armar pedido
                </span>
                <button onClick={() => setOpen(false)} className="p-1.5 text-blanco-muted hover:text-rojo-error transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                {enviado ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--color-verde-ok)20' }}>
                      <Check size={32} style={{ color: 'var(--color-verde-ok)' }} />
                    </div>
                    <p className="font-display text-sm font-black tracking-widest uppercase" style={{ color: 'var(--color-verde-ok)' }}>
                      ¡Pedido enviado!
                    </p>
                    <p className="text-[11px] text-blanco-muted">El mozo ya lo ve en pantalla</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-display tracking-widest uppercase text-blanco-muted block mb-1.5">Mesa / Lugar</label>
                        <input type="text" placeholder="Ej: 3, Barra…" value={mesa} onChange={e => setMesa(e.target.value)}
                          className="w-full bg-violeta border border-violeta-borde rounded-xl px-3 py-2.5 text-sm text-blanco-suave placeholder:text-blanco-muted/40 outline-none focus:border-naranja/50" />
                      </div>
                      <div>
                        <label className="text-[9px] font-display tracking-widest uppercase text-blanco-muted block mb-1.5">Tu nombre</label>
                        <input type="text" placeholder="Opcional" value={clienteNombre} onChange={e => setClienteNombre(e.target.value)}
                          className="w-full bg-violeta border border-violeta-borde rounded-xl px-3 py-2.5 text-sm text-blanco-suave placeholder:text-blanco-muted/40 outline-none focus:border-naranja/50" />
                      </div>
                    </div>

                    {cats.map(cat => (
                      <div key={cat}>
                        <div className="text-[9px] font-display font-black tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--color-naranja)' }}>{cat}</div>
                        <div className="space-y-2">
                          {items.filter((i: any) => i.cat === cat).map((item: any) => {
                            const q = carrito[item.id] || 0;
                            return (
                              <div key={item.id} className="flex items-center gap-3 py-2 border-b border-violeta-borde/40 last:border-0">
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-semibold text-blanco-suave truncate">{item.nombre}</div>
                                  <div className="text-[11px]" style={{ color: 'var(--color-naranja)' }}>{fmt(item.precio)}</div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  {q > 0 && (
                                    <>
                                      <button onClick={() => ajustar(item.id, -1)}
                                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                                        style={{ background: 'var(--color-violeta)', border: '1px solid var(--color-violeta-borde)' }}>
                                        <Minus size={12} style={{ color: 'var(--color-blanco-muted)' }} />
                                      </button>
                                      <span className="w-5 text-center text-sm font-bold text-blanco-suave tabular-nums">{q}</span>
                                    </>
                                  )}
                                  <button onClick={() => ajustar(item.id, 1)}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                                    style={{ background: q > 0 ? 'var(--color-naranja)' : 'var(--color-violeta)', border: q > 0 ? 'none' : '1px solid var(--color-violeta-borde)' }}>
                                    <Plus size={12} style={{ color: q > 0 ? 'var(--color-violeta)' : 'var(--color-blanco-muted)' }} />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {!enviado && totalItems > 0 && (
                <div className="flex-shrink-0 px-6 py-4 border-t border-violeta-borde">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-blanco-muted">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
                    <span className="text-lg font-bold" style={{ color: 'var(--color-verde-ok)' }}>{fmt(totalMonto)}</span>
                  </div>
                  <button onClick={enviar}
                    className="w-full py-4 rounded-2xl font-display text-xs font-black tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-2"
                    style={{ background: 'var(--color-naranja)', color: 'var(--color-violeta)' }}>
                    <Send size={15} /> Enviar pedido
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
