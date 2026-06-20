import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Edit2, Eye, EyeOff, Plus, X, Save } from 'lucide-react';
import { getConfig, getActiveData } from '../../config/active';

interface CartaItem {
  id: string;
  cat: string;
  nombre: string;
  desc?: string;
  precio: number;
  emoji?: string;
  badges?: string[];
  activo?: boolean;
}

const CARTA_KEY = (nombre: string) => `panel-carta-${nombre}`;

function loadCarta(nombre: string): CartaItem[] {
  try {
    const raw = localStorage.getItem(CARTA_KEY(nombre));
    if (raw) return JSON.parse(raw);
  } catch { /* skip */ }
  const data = getActiveData();
  return (data?.menu || []).map((i: any) => ({ ...i, activo: true }));
}

function saveCarta(nombre: string, items: CartaItem[]) {
  try { localStorage.setItem(CARTA_KEY(nombre), JSON.stringify(items)); } catch { /* skip */ }
}

const BADGES_OPTIONS = ['RECOMENDADO', 'MÁS PEDIDO', 'VEGANO', 'PICANTE', 'NUEVO'];

const EMPTY_ITEM = (cat: string): CartaItem => ({
  id: `item-${Date.now()}`,
  cat,
  nombre: '',
  desc: '',
  precio: 0,
  badges: [],
  activo: true,
});

export default function TabCarta() {
  const tc = getConfig();
  const [items, setItems] = useState<CartaItem[]>(() => loadCarta(tc.nombre));
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    const data = getActiveData();
    const raw = localStorage.getItem(CARTA_KEY(tc.nombre));
    const list: CartaItem[] = raw ? JSON.parse(raw) : (data?.menu || []);
    return list[0]?.cat || '';
  });
  const [editItem, setEditItem] = useState<CartaItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  const categories = [...new Set(items.map(i => i.cat))];
  const visible = items.filter(i => i.cat === activeCategory);

  const update = (updated: CartaItem[]) => {
    setItems(updated);
    saveCarta(tc.nombre, updated);
  };

  const toggleActivo = (id: string) => {
    update(items.map(i => i.id === id ? { ...i, activo: !i.activo } : i));
  };

  const openEdit = (item: CartaItem) => {
    setEditItem({ ...item });
    setIsNew(false);
  };

  const openNew = () => {
    setEditItem(EMPTY_ITEM(activeCategory));
    setIsNew(true);
  };

  const saveEdit = () => {
    if (!editItem || !editItem.nombre || editItem.precio <= 0) return;
    if (isNew) {
      update([...items, editItem]);
    } else {
      update(items.map(i => i.id === editItem.id ? editItem : i));
    }
    setEditItem(null);
  };

  const deleteItem = (id: string) => {
    update(items.filter(i => i.id !== id));
  };

  const resetToDefault = () => {
    const data = getActiveData();
    const defaults = (data?.menu || []).map((i: any) => ({ ...i, activo: true }));
    update(defaults);
  };

  const toggleBadge = (badge: string) => {
    if (!editItem) return;
    const badges = editItem.badges || [];
    setEditItem({
      ...editItem,
      badges: badges.includes(badge) ? badges.filter(b => b !== badge) : [...badges, badge],
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xs font-black tracking-[0.3em] text-naranja uppercase">Gestión de Carta</h2>
          <p className="text-[11px] text-blanco-muted mt-0.5">Los cambios se aplican al sitio público al instante.</p>
        </div>
        <button
          onClick={resetToDefault}
          className="text-[10px] font-display tracking-widest text-blanco-muted/40 hover:text-blanco-muted transition-colors uppercase"
        >
          Restaurar original
        </button>
      </div>

      {/* Categorías */}
      <div className="flex gap-1 flex-wrap bg-violeta-card border border-violeta-borde rounded-lg p-1 mb-6 w-fit">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded text-[11px] font-display font-black tracking-widest uppercase transition-all ${
              activeCategory === cat ? 'bg-naranja text-violeta' : 'text-blanco-muted hover:text-blanco-suave'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="bg-violeta-card border border-violeta-borde rounded-xl overflow-hidden mb-4">
        <div className="divide-y divide-violeta-borde">
          {visible.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`px-6 py-4 flex items-center gap-4 transition-colors ${!item.activo ? 'opacity-40' : 'hover:bg-violeta-medio/20'}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-blanco-suave text-sm">{item.nombre}</span>
                  {item.badges?.map(b => (
                    <span key={b} className="px-1.5 py-0.5 rounded text-[8px] font-display font-black tracking-widest uppercase"
                      style={{ background: 'var(--color-naranja)18', color: 'var(--color-naranja)', border: '1px solid var(--color-naranja)30' }}>
                      {b}
                    </span>
                  ))}
                </div>
                {item.desc && <p className="text-[11px] text-blanco-muted/60 mt-0.5 truncate max-w-xs">{item.desc}</p>}
              </div>
              <div className="font-bold tabular-nums text-sm" style={{ color: 'var(--color-naranja)' }}>
                ${(item.precio || 0).toLocaleString('es-AR')}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => toggleActivo(item.id)}
                  className="p-1.5 rounded hover:bg-violeta transition-colors text-blanco-muted/40 hover:text-blanco-suave"
                  title={item.activo !== false ? 'Ocultar del sitio' : 'Mostrar en el sitio'}>
                  {item.activo !== false ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button onClick={() => openEdit(item)}
                  className="p-1.5 rounded hover:bg-naranja/10 hover:text-naranja text-blanco-muted/40 transition-colors">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => deleteItem(item.id)}
                  className="p-1.5 rounded hover:bg-rojo-error/10 hover:text-rojo-error text-blanco-muted/40 transition-colors">
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <button onClick={openNew}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-display font-black tracking-widest uppercase transition-all"
        style={{ background: 'var(--color-naranja)12', color: 'var(--color-naranja)', border: '1px solid var(--color-naranja)25' }}>
        <Plus size={14} /> Agregar ítem en {activeCategory}
      </button>

      {/* Modal edición */}
      <AnimatePresence>
        {editItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
            style={{ background: 'rgba(13,13,13,0.92)' }}
            onClick={() => setEditItem(null)}
          >
            <motion.div
              initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }}
              transition={{ duration: 0.2 }}
              className="bg-violeta-card border border-violeta-borde rounded-2xl p-6 w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-xs font-black tracking-[0.3em] text-naranja uppercase">
                  {isNew ? 'Nuevo ítem' : 'Editar ítem'}
                </span>
                <button onClick={() => setEditItem(null)} className="p-1 text-blanco-muted hover:text-rojo-error">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nombre del ítem *"
                  value={editItem.nombre}
                  onChange={e => setEditItem({ ...editItem, nombre: e.target.value })}
                  className="w-full bg-violeta border border-violeta-borde rounded-xl px-4 py-3 text-sm text-blanco-suave placeholder:text-blanco-muted/40 outline-none focus:border-naranja/50"
                />
                <input
                  type="text"
                  placeholder="Descripción"
                  value={editItem.desc || ''}
                  onChange={e => setEditItem({ ...editItem, desc: e.target.value })}
                  className="w-full bg-violeta border border-violeta-borde rounded-xl px-4 py-3 text-sm text-blanco-suave placeholder:text-blanco-muted/40 outline-none focus:border-naranja/50"
                />
                <input
                  type="number"
                  placeholder="Precio *"
                  value={editItem.precio || ''}
                  onChange={e => setEditItem({ ...editItem, precio: Number(e.target.value) })}
                  className="w-full bg-violeta border border-violeta-borde rounded-xl px-4 py-3 text-sm text-blanco-suave placeholder:text-blanco-muted/40 outline-none focus:border-naranja/50"
                />

                <div>
                  <p className="text-[9px] font-display tracking-widest uppercase text-blanco-muted mb-2">Badges</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {BADGES_OPTIONS.map(b => (
                      <button
                        key={b}
                        onClick={() => toggleBadge(b)}
                        className="px-2.5 py-1 rounded text-[9px] font-display font-black tracking-widest uppercase transition-all"
                        style={
                          editItem.badges?.includes(b)
                            ? { background: 'var(--color-naranja)', color: 'var(--color-violeta)' }
                            : { background: 'var(--color-violeta)', color: 'var(--color-blanco-muted)', border: '1px solid var(--color-violeta-borde)' }
                        }
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={saveEdit}
                disabled={!editItem.nombre || editItem.precio <= 0}
                className="w-full mt-6 py-4 bg-naranja hover:bg-naranja-claro disabled:opacity-40 disabled:cursor-not-allowed text-violeta text-xs font-display font-black tracking-[0.3em] uppercase rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Save size={15} /> GUARDAR
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
