import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, X, Image, Save } from 'lucide-react';
import { getConfig, getActiveData } from '../../config/active';

interface GaleriaItem {
  id: string;
  cat: string;
  src: string;
  alt: string;
  title: string;
}

const GAL_KEY = (nombre: string) => `panel-galeria-${nombre}`;

function loadGaleria(nombre: string): GaleriaItem[] {
  try {
    const raw = localStorage.getItem(GAL_KEY(nombre));
    if (raw) return JSON.parse(raw);
  } catch { /* skip */ }
  return getActiveData()?.galeria || [];
}

function saveGaleria(nombre: string, items: GaleriaItem[]) {
  try { localStorage.setItem(GAL_KEY(nombre), JSON.stringify(items)); } catch { /* skip */ }
}

const EMPTY_FORM = { src: '', title: '', cat: '' };

export default function TabGaleria() {
  const tc = getConfig();
  const [items, setItems] = useState<GaleriaItem[]>(() => loadGaleria(tc.nombre));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [filterCat, setFilterCat] = useState('TODOS');
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());

  const categories = [...new Set(items.map(i => i.cat))].filter(Boolean);
  const allCats = ['TODOS', ...categories];
  const visible = filterCat === 'TODOS' ? items : items.filter(i => i.cat === filterCat);

  const update = (next: GaleriaItem[]) => {
    setItems(next);
    saveGaleria(tc.nombre, next);
  };

  const addPhoto = () => {
    if (!form.src || !form.title) return;
    const newItem: GaleriaItem = {
      id: `g-${Date.now()}`,
      cat: form.cat || 'GENERAL',
      src: form.src.trim(),
      alt: form.title,
      title: form.title,
    };
    update([...items, newItem]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const removePhoto = (id: string) => {
    update(items.filter(i => i.id !== id));
  };

  const resetToDefault = () => {
    const defaults = getActiveData()?.galeria || [];
    update(defaults);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xs font-black tracking-[0.3em] text-naranja uppercase">Gestión de Galería</h2>
          <p className="text-[11px] text-blanco-muted mt-0.5">Pegá la URL de cualquier imagen (Google Drive, Imgur, etc.) — aparece al instante en el sitio.</p>
        </div>
        <button
          onClick={resetToDefault}
          className="text-[10px] font-display tracking-widest text-blanco-muted/40 hover:text-blanco-muted transition-colors uppercase"
        >
          Restaurar original
        </button>
      </div>

      {/* Filtro categorías + agregar */}
      <div className="flex items-center gap-3 flex-wrap mb-6">
        <div className="flex gap-1 bg-violeta-card border border-violeta-borde rounded-lg p-1">
          {allCats.map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)}
              className={`px-4 py-1.5 rounded text-[11px] font-display font-black tracking-widest uppercase transition-all ${
                filterCat === cat ? 'bg-naranja text-violeta' : 'text-blanco-muted hover:text-blanco-suave'
              }`}>
              {cat}
            </button>
          ))}
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-display font-black tracking-widest uppercase transition-all"
          style={{ background: 'var(--color-naranja)12', color: 'var(--color-naranja)', border: '1px solid var(--color-naranja)25' }}>
          <Plus size={14} /> Agregar foto
        </button>
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <div className="text-center py-16 text-blanco-muted">
          <Image size={36} className="mx-auto mb-3 opacity-20" />
          <p className="font-display text-xs tracking-widest uppercase">Sin fotos en esta categoría</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {visible.map(item => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="relative group rounded-xl overflow-hidden border border-violeta-borde aspect-square bg-violeta-card">
                {item.src && !imgErrors.has(item.id) ? (
                  <img src={item.src} alt={item.alt} className="w-full h-full object-cover"
                    onError={() => setImgErrors(e => new Set([...e, item.id]))} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image size={32} className="text-blanco-muted/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-violeta/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                  <p className="text-xs font-semibold text-blanco-suave text-center truncate w-full">{item.title}</p>
                  <span className="text-[9px] font-display tracking-widest uppercase"
                    style={{ color: 'var(--color-naranja)' }}>{item.cat}</span>
                  <button onClick={() => removePhoto(item.id)}
                    className="mt-1 flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-display font-black tracking-widest uppercase"
                    style={{ background: 'var(--color-rojo-error)18', color: 'var(--color-rojo-error)', border: '1px solid var(--color-rojo-error)30' }}>
                    <Trash2 size={11} /> Eliminar
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal agregar */}
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
                <span className="font-display text-xs font-black tracking-[0.3em] text-naranja uppercase">Agregar foto</span>
                <button onClick={() => setShowForm(false)} className="p-1 text-blanco-muted hover:text-rojo-error">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <input
                  type="url"
                  placeholder="URL de la imagen *"
                  value={form.src}
                  onChange={e => setForm(f => ({ ...f, src: e.target.value }))}
                  className="w-full bg-violeta border border-violeta-borde rounded-xl px-4 py-3 text-sm text-blanco-suave placeholder:text-blanco-muted/40 outline-none focus:border-naranja/50"
                />
                <input
                  type="text"
                  placeholder="Título / descripción *"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full bg-violeta border border-violeta-borde rounded-xl px-4 py-3 text-sm text-blanco-suave placeholder:text-blanco-muted/40 outline-none focus:border-naranja/50"
                />
                <input
                  type="text"
                  placeholder="Categoría (ej: AMBIENTE, SHOWS)"
                  value={form.cat}
                  onChange={e => setForm(f => ({ ...f, cat: e.target.value.toUpperCase() }))}
                  className="w-full bg-violeta border border-violeta-borde rounded-xl px-4 py-3 text-sm text-blanco-suave placeholder:text-blanco-muted/40 outline-none focus:border-naranja/50"
                />
              </div>

              {form.src && (
                <div className="mt-4 rounded-xl overflow-hidden aspect-video bg-violeta border border-violeta-borde">
                  <img src={form.src} alt="preview" className="w-full h-full object-cover"
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                </div>
              )}

              <button
                onClick={addPhoto}
                disabled={!form.src || !form.title}
                className="w-full mt-6 py-4 bg-naranja hover:bg-naranja-claro disabled:opacity-40 disabled:cursor-not-allowed text-violeta text-xs font-display font-black tracking-[0.3em] uppercase rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Save size={15} /> AGREGAR FOTO
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
