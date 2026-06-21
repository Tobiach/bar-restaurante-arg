import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Diamond } from 'lucide-react';
import { getActiveData, getConfig } from '../../../config/active';

export default function CieloMenu() {
  const data = getActiveData();
  const tc = getConfig();
  const localRaw = localStorage.getItem(`panel-carta-${tc.nombre}`);
  const allItems: any[] = localRaw
    ? (JSON.parse(localRaw) as any[]).filter((i: any) => i.activo !== false)
    : (data?.menu || []);
  const categories = [...new Set(allItems.map((i: any) => i.cat as string))];
  const [activeTab, setActiveTab] = useState(categories[0] || '');

  const items = allItems.filter((i: any) => i.cat === activeTab);

  return (
    <section id="cielo-carta" className="py-32" style={{ background: '#0E0C09' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-display text-[10px] tracking-[0.5em] uppercase" style={{ color: '#B8966E' }}>
            ◇ LA CARTA
          </span>
          <h2 className="font-titulo font-light mt-4" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: '#EDE0CC', fontStyle: 'italic' }}>
            Cocktails & Tapas.
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-0 mb-14 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="font-display text-[10px] tracking-[0.35em] uppercase px-8 py-4 transition-all duration-300 border-b-2"
              style={{
                color: activeTab === cat ? '#B8966E' : '#9E8E7A',
                borderColor: activeTab === cat ? '#B8966E' : 'transparent',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-0"
          >
            {items.map((item: any, i: number) => (
              <div
                key={item.id}
                className="group py-8 px-6 flex justify-between items-start gap-6 transition-colors cursor-default"
                style={{
                  borderBottom: '1px solid rgba(184,150,110,0.1)',
                  borderRight: i % 2 === 0 ? '1px solid rgba(184,150,110,0.1)' : 'none',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(184,150,110,0.04)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-titulo text-base" style={{ color: '#EDE0CC' }}>{item.nombre}</h4>
                    {item.badges?.map((b: string) => (
                      <span key={b} className="font-display text-[8px] tracking-widest px-2 py-0.5" style={{ background: 'rgba(184,150,110,0.15)', color: '#B8966E' }}>
                        {b}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#9E8E7A' }}>
                    {item.desc || item.descripcion || ''}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-titulo text-base font-light" style={{ color: '#B8966E' }}>
                    {item.precio ? `$${item.precio.toLocaleString()}` : '—'}
                  </div>
                  {item.precio > 0 && (
                    <div className="font-display text-[9px] tracking-widest mt-0.5" style={{ color: 'rgba(184,150,110,0.55)' }}>
                      🌟 {Math.floor(item.precio / 500)} pts
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
