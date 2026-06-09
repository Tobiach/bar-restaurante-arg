import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Beer, Utensils, Salad, Coffee, ShoppingCart, X, Plus, Minus, Star, Flame } from 'lucide-react';
import { getConfig, getActiveData } from '../../../config/active';
import { useToast } from '../../Toast';

const formatPrice = (p: number) => `$${p.toLocaleString('es-AR')}`;

const CAT_ICONS: Record<string, any> = {
  CANILLAS: Beer,
  PICADAS: Salad,
  'DE LA COCINA': Utensils,
  'SIN ALCOHOL': Coffee,
};

const CAT_LABELS: Record<string, string> = {
  CANILLAS: '🍺 Canillas',
  PICADAS: '🧀 Picadas',
  'DE LA COCINA': '🍔 Cocina',
  'SIN ALCOHOL': '🥤 Sin Alcohol',
};

interface CartItem { id: string; nombre: string; precio: number; cat?: string; }

export default function CuartaMenu() {
  const tc = getConfig();
  const data = getActiveData();
  const { showToast } = useToast();
  const all: any[] = data?.menu || [];
  const cats = [...new Set(all.map((i: any) => i.cat as string))];
  const [tab, setTab] = useState(cats[0] || '');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(sessionStorage.getItem('cuarta-carrito') || '[]'); } catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => { sessionStorage.setItem('cuarta-carrito', JSON.stringify(cart)); }, [cart]);

  const items = all.filter((i: any) => i.cat === tab);
  const subtotal = cart.reduce((s: number, i: CartItem) => s + i.precio, 0);
  const CatIcon = CAT_ICONS[tab] || Utensils;

  return (
    <section id="cuarta-menu" style={{ background: '#1C1508', padding: '96px 0 80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '48px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '1px', background: '#C8921C' }} />
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.5em', color: '#C8921C', textTransform: 'uppercase' }}>
                {tc.labels?.menu || 'CANILLAS & COCINA'}
              </span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(48px, 6vw, 88px)', letterSpacing: '0.02em', color: '#F0E2BF', lineHeight: 0.9, margin: 0 }}>
              NUESTRA CARTA
            </h2>
          </div>

          {/* Cart trigger */}
          <button
            onClick={() => setCartOpen(true)}
            style={{
              position: 'relative', background: '#221A08', border: '1px solid rgba(200,146,28,0.2)',
              color: '#F0E2BF', padding: '12px 20px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C8921C'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,146,28,0.2)'; }}
          >
            <ShoppingCart size={16} style={{ color: '#C8921C' }} />
            MI PEDIDO
            {cart.length > 0 && (
              <span style={{ background: '#C8921C', color: '#080507', fontSize: '10px', fontWeight: 700, width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '-6px', right: '-6px' }}>
                {cart.length}
              </span>
            )}
          </button>
        </motion.div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '4px' }}>
          {cats.map(cat => {
            const Icon = CAT_ICONS[cat] || Utensils;
            const active = tab === cat;
            return (
              <button
                key={cat}
                onClick={() => setTab(cat)}
                style={{
                  flexShrink: 0,
                  padding: '10px 20px',
                  background: active ? '#C8921C' : 'rgba(42,30,0,0.6)',
                  color: active ? '#080507' : '#9E8050',
                  border: `1px solid ${active ? '#C8921C' : 'rgba(200,146,28,0.12)'}`,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontWeight: active ? 700 : 400,
                }}
              >
                <Icon size={13} />
                {CAT_LABELS[cat] || cat}
              </button>
            );
          })}
        </div>

        {/* Items grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          <AnimatePresence mode="popLayout">
            {items.map((item: any) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: '#221A08',
                  border: '1px solid rgba(200,146,28,0.08)',
                  padding: '24px',
                  transition: 'border-color 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,146,28,0.25)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,146,28,0.08)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                    <CatIcon size={18} style={{ color: 'rgba(200,146,28,0.4)', flexShrink: 0 }} strokeWidth={1.5} />
                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '19px', letterSpacing: '0.03em', color: '#F0E2BF', margin: 0, fontWeight: 600 }}>
                      {item.nombre}
                    </h3>
                  </div>
                  <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '20px', color: '#C8921C', letterSpacing: '0.04em', flexShrink: 0, marginLeft: '12px' }}>
                    {formatPrice(item.precio)}
                  </span>
                </div>

                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '15px', color: '#9E8050', marginBottom: '16px', lineHeight: 1.5, minHeight: '42px' }}>
                  {item.desc || item.descripcion || ''}
                </p>

                {/* Badges */}
                {item.badges?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                    {item.badges.map((b: string) => (
                      <span key={b} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', background: 'rgba(200,146,28,0.12)', color: '#C8921C', padding: '3px 8px', border: '1px solid rgba(200,146,28,0.2)' }}>
                        {b === 'MÁS PEDIDO' ? <Flame size={9} /> : <Star size={9} />}
                        {b}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => { setCart(c => [...c, item]); showToast(`Agregado: ${item.nombre}`, 'exito'); }}
                  style={{
                    width: '100%', padding: '10px', background: 'transparent',
                    border: '1px solid rgba(200,146,28,0.2)', color: '#C8921C',
                    fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', letterSpacing: '0.25em', fontWeight: 700, textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#C8921C'; (e.currentTarget as HTMLElement).style.color = '#080507'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#C8921C'; }}
                >
                  <Plus size={13} /> AGREGAR
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile floating cart */}
      <div className="md:hidden" style={{ position: 'fixed', bottom: '76px', right: '20px', zIndex: 50 }}>
        <button
          onClick={() => setCartOpen(true)}
          style={{
            background: '#C8921C', color: '#080507',
            width: '56px', height: '56px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', border: 'none', position: 'relative',
            boxShadow: '0 8px 30px rgba(200,146,28,0.35)',
          }}
        >
          <ShoppingCart size={22} />
          {cart.length > 0 && (
            <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#080507', color: '#C8921C', fontSize: '10px', fontWeight: 700, width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #C8921C' }}>
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Cart sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, backdropFilter: 'blur(4px)' }}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              style={{
                position: 'fixed', top: 0, right: 0, height: '100%', width: '100%', maxWidth: '380px',
                background: '#1C1508', borderLeft: '1px solid rgba(200,146,28,0.15)', zIndex: 201,
                display: 'flex', flexDirection: 'column',
              }}
            >
              <div style={{ padding: '24px', borderBottom: '1px solid rgba(200,146,28,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShoppingCart size={20} style={{ color: '#C8921C' }} />
                  <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '24px', color: '#F0E2BF', letterSpacing: '0.06em' }}>TU PEDIDO</span>
                </div>
                <button onClick={() => setCartOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#9E8050' }}>
                  <X size={22} />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                {cart.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 0' }}>
                    <ShoppingCart size={40} style={{ color: 'rgba(200,146,28,0.15)', margin: '0 auto 12px' }} />
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#9E8050', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '13px' }}>El pedido está vacío</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {cart.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#221A08', padding: '12px', border: '1px solid rgba(200,146,28,0.08)' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '15px', color: '#F0E2BF', fontWeight: 600 }}>{item.nombre}</div>
                          <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '16px', color: '#C8921C' }}>{formatPrice(item.precio)}</div>
                        </div>
                        <button
                          onClick={() => setCart(c => { const n = [...c]; n.splice(idx, 1); return n; })}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#9E8050', padding: '4px' }}
                        >
                          <Minus size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ padding: '24px', borderTop: '1px solid rgba(200,146,28,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', color: '#9E8050', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Subtotal</span>
                  <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '24px', color: '#C8921C' }}>{formatPrice(subtotal)}</span>
                </div>
                <button
                  disabled={cart.length === 0}
                  onClick={() => { showToast('¡Mostrá esto al mozo!', 'info'); setCartOpen(false); }}
                  style={{
                    width: '100%', padding: '14px',
                    background: cart.length > 0 ? '#C8921C' : 'rgba(200,146,28,0.2)',
                    color: cart.length > 0 ? '#080507' : '#9E8050',
                    border: 'none', cursor: cart.length > 0 ? 'pointer' : 'not-allowed',
                    fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', letterSpacing: '0.25em', fontWeight: 700, textTransform: 'uppercase',
                  }}
                >
                  PRESENTAR AL MOZO
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
