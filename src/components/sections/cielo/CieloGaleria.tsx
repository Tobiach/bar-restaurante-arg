import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { getActiveData } from '../../../config/active';

export default function CieloGaleria() {
  const data = getActiveData();
  const galeria: any[] = data?.galeria || [];
  const cats = ['TODOS', ...new Set(galeria.map((g: any) => g.cat as string))];
  const [activeCat, setActiveCat] = useState('TODOS');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const items = activeCat === 'TODOS' ? galeria : galeria.filter((g: any) => g.cat === activeCat);

  return (
    <section className="py-32" style={{ background: '#161310' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="font-display text-[10px] tracking-[0.5em] uppercase" style={{ color: '#B8966E' }}>◇ GALERÍA</span>
          <h2 className="font-titulo font-light mt-4" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: '#EDE0CC', fontStyle: 'italic' }}>
            El ambiente.
          </h2>
        </motion.div>

        {/* Filtros */}
        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          {cats.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className="font-display text-[10px] tracking-[0.3em] uppercase py-2 px-1 transition-all duration-300 border-b"
              style={{
                color: activeCat === cat ? '#B8966E' : '#9E8E7A',
                borderColor: activeCat === cat ? '#B8966E' : 'transparent',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid masonry */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          {items.map((g: any, i: number) => (
            <motion.div
              key={g.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative overflow-hidden cursor-pointer break-inside-avoid"
              style={{ border: '1px solid rgba(184,150,110,0.08)' }}
              onClick={() => setLightbox(g.src || g.img)}
            >
              <img
                src={g.src || g.img}
                alt={g.alt || g.title || ''}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                style={{ filter: 'brightness(0.85) saturate(0.85)', aspectRatio: i % 3 === 0 ? '4/3' : i % 5 === 0 ? '3/4' : '1/1' }}
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5"
                style={{ background: 'linear-gradient(to top, rgba(184,150,110,0.5) 0%, transparent 60%)' }}
              >
                <span className="font-display text-[9px] tracking-[0.4em] uppercase text-white">{g.cat}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6"
              style={{ background: 'rgba(14,12,9,0.97)' }}
              onClick={() => setLightbox(null)}
            >
              <button
                className="absolute top-6 right-6 p-3 transition-colors"
                style={{ color: '#9E8E7A', border: '1px solid rgba(184,150,110,0.2)' }}
                onClick={() => setLightbox(null)}
              >
                <X size={20} />
              </button>
              <motion.img
                initial={{ scale: 0.92 }}
                animate={{ scale: 1 }}
                src={lightbox}
                className="max-w-full max-h-[90vh] object-contain"
                onClick={e => e.stopPropagation()}
                style={{ border: '1px solid rgba(184,150,110,0.15)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
