import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Minus, Utensils, X, ShoppingCart, Salad, Cake, Wine, Beer, Coffee, Cookie, Flame, Star, Leaf, Zap, type LucideIcon } from 'lucide-react';
import { getConfig, getActiveData } from '../../config/active';
import { useToast } from '../Toast';

const formatPrice = (price: number) => `$${price.toLocaleString('es-AR')}`;

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  ENTRADAS: Salad,
  PRINCIPALES: Utensils,
  POSTRES: Cake,
  TRAGOS: Wine,
  CERVEZAS: Beer,
  SIN_ALCOHOL: Coffee,
  SNACKS: Cookie,
  CANILLAS: Beer,
  PICADAS: Salad,
  'DE LA COCINA': Utensils,
  COCKTAILS: Wine,
  VINOS: Wine,
  TAPAS: Salad,
};

const BADGE_ICONS: Record<string, LucideIcon> = {
  'MÁS PEDIDO': Flame,
  'RECOMENDADO': Star,
  'VEGANO': Leaf,
  'PICANTE': Zap,
  'CANILLA DEL DÍA': Star,
};

interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cat?: string;
}

export default function MenuSection() {
  const tenantConfig = getConfig();
  const data = getActiveData();
  const { showToast } = useToast();

  const allItems: any[] = data?.menu || [];
  const categories = [...new Set(allItems.map((i: any) => i.cat as string))];

  const [activeTab, setActiveTab] = useState(categories[0] || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = sessionStorage.getItem('carta-carrito');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('carta-carrito', JSON.stringify(cart));
  }, [cart]);

  const items = allItems.filter((i: any) =>
    i.cat === activeTab && i.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
    showToast(`Agregado: ${item.nombre}`, 'exito');
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.precio, 0);
  const CategoryIcon = CATEGORY_ICONS[activeTab] ?? Utensils;
  const labels = tenantConfig.labels || {};

  return (
    <section id="sec-carta" className="py-20 bg-violeta-medio/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-header">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">{labels.menu || 'Nuestra Carta'}</h2>
          <p className="text-blanco-muted">Cocina completa, tragos artesanales y más</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map(cat => {
              const CatIcon = CATEGORY_ICONS[cat] ?? Utensils;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`flex-shrink-0 flex items-center gap-2 px-6 py-2 rounded-full font-display text-sm tracking-widest transition-all ${activeTab === cat ? 'bg-naranja text-white' : 'bg-violeta-card/50 text-blanco-muted hover:text-white'}`}
                >
                  <CatIcon size={14} />
                  {cat.replace(/_/g, ' ')}
                </button>
              );
            })}
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blanco-muted" size={18} />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-violeta-card border border-violeta-borde rounded-full pl-12 pr-6 py-2 text-sm w-full md:w-64 focus:border-naranja outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((item: any) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="card-premium p-6 flex items-start gap-4"
              >
                <div className="text-naranja/70 flex-shrink-0 mt-1">
                  <CategoryIcon size={32} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-titulo text-lg font-bold">{item.nombre}</h3>
                    <span className="text-naranja font-display font-bold">{formatPrice(item.precio)}</span>
                  </div>
                  <p className="text-sm text-blanco-muted mb-3 h-10 overflow-hidden line-clamp-2">{item.desc || item.descripcion || ''}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.badges?.map((b: string) => {
                      const BadgeIcon = BADGE_ICONS[b] ?? Star;
                      return (
                        <span key={b} className="flex items-center gap-1 text-[10px] uppercase tracking-tighter bg-violeta-medio px-2 py-0.5 rounded text-naranja border border-naranja/20">
                          <BadgeIcon size={10} />
                          {b}
                        </span>
                      );
                    })}
                  </div>
                  <button onClick={() => addToCart(item)} className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-violeta-medio hover:bg-naranja hover:text-white transition-all text-sm font-bold">
                    <Plus size={16} /> AGREGAR
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Floating Cart Button Mobile */}
        <div className="md:hidden fixed bottom-20 right-4 z-40">
          <button onClick={() => setCartOpen(true)} className="relative bg-naranja p-6 rounded-full shadow-2xl shadow-naranja/40">
            <Utensils size={28} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-white text-naranja text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-naranja animate-bounce">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Cart Sidebar */}
        <AnimatePresence>
          {cartOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setCartOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="fixed top-0 right-0 h-full w-full max-w-sm bg-violeta-medio border-l border-naranja-borde z-[80] shadow-2xl flex flex-col"
              >
                <div className="p-6 border-b border-violeta-borde flex items-center justify-between">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Utensils size={24} className="text-naranja" /> Tu Pedido
                  </h3>
                  <button onClick={() => setCartOpen(false)}><X size={28} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-20">
                      <ShoppingCart size={48} className="mx-auto mb-4 opacity-20" />
                      <p className="text-blanco-muted italic">El carrito está vacío</p>
                    </div>
                  ) : (
                    cart.map((item, idx) => {
                      const ItemCatIcon = CATEGORY_ICONS[item.cat || ''] ?? Utensils;
                      return (
                        <div key={idx} className="flex items-center gap-4 bg-violeta-card p-3 rounded-lg border border-violeta-borde">
                          <div className="text-naranja/60"><ItemCatIcon size={22} strokeWidth={1.5} /></div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold">{item.nombre}</h4>
                            <p className="text-xs text-naranja">{formatPrice(item.precio)}</p>
                          </div>
                          <button onClick={() => removeFromCart(idx)} className="text-rojo-error opacity-60 hover:opacity-100 p-1">
                            <Minus size={16} />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="p-6 bg-violeta border-t border-naranja-borde">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-blanco-muted">Subtotal estimado</span>
                    <span className="text-2xl font-bold text-naranja">{formatPrice(subtotal)}</span>
                  </div>
                  <button
                    disabled={cart.length === 0}
                    onClick={() => {
                      showToast("¡Listo! Mostrá esto al llegar", "info");
                      setCartOpen(false);
                    }}
                    className="btn-primary w-full disabled:opacity-50 disabled:grayscale"
                  >
                    PRESENTAR AL MOZO
                  </button>
                  <p className="text-[10px] text-center text-blanco-muted mt-4 uppercase tracking-widest">
                    Presentá tu selección al llegar para agilizar el pedido.
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
