import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { getActiveData } from '../../../config/active';

export default function CuartaGaleria() {
  const data = getActiveData();
  const galeria: any[] = data?.galeria || [];
  const cats = ['TODOS', ...new Set(galeria.map((g: any) => g.cat as string))];
  const [activeCat, setActiveCat] = useState('TODOS');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const items = activeCat === 'TODOS' ? galeria : galeria.filter((g: any) => g.cat === activeCat);

  return (
    <section id="cuarta-galeria" style={{ background: '#1A3A1A', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '1px', background: '#C8A96E' }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.5em', color: '#C8A96E', textTransform: 'uppercase' }}>GALERÍA</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(52px, 7vw, 96px)', letterSpacing: '0.02em', color: '#E8DCC8', lineHeight: 0.9, margin: 0 }}>
            EL AMBIENTE
          </h2>
        </motion.div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '36px', flexWrap: 'wrap' }}>
          {cats.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              style={{
                padding: '8px 18px',
                background: activeCat === cat ? '#C8A96E' : 'transparent',
                color: activeCat === cat ? '#0D1A0D' : '#9E8E7A',
                border: `1px solid ${activeCat === cat ? '#C8A96E' : 'rgba(200,169,110,0.2)'}`,
                cursor: 'pointer', transition: 'all 0.2s',
                fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: activeCat === cat ? 700 : 400,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <motion.div layout style={{ columns: '1', gap: '12px' }} className="sm:columns-2 lg:columns-3">
          {items.map((g: any, i: number) => (
            <motion.div
              key={g.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="break-inside-avoid mb-3"
              onClick={() => setLightbox(g.src || g.img)}
              onMouseEnter={() => setHoveredId(g.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(200,169,110,0.06)' }}
            >
              <img
                src={g.src || g.img}
                alt={g.alt || g.title || ''}
                style={{
                  width: '100%', objectFit: 'cover', display: 'block',
                  filter: 'brightness(0.85) saturate(1.1)',
                  transition: 'transform 0.6s ease',
                  transform: hoveredId === g.id ? 'scale(1.05)' : 'scale(1)',
                  aspectRatio: i % 3 === 0 ? '4/3' : i % 5 === 0 ? '3/4' : '1/1',
                }}
              />
              {/* Hover overlay */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(200,169,110,0.4) 0%, transparent 60%)',
                  transition: 'opacity 0.3s',
                  opacity: hoveredId === g.id ? 1 : 0,
                  display: 'flex', alignItems: 'flex-end', padding: '16px',
                }}
              >
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#0D1A0D', fontWeight: 700 }}>
                  {g.cat}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(13,26,13,0.97)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
          >
            <button
              onClick={() => setLightbox(null)}
              style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: '1px solid rgba(200,169,110,0.2)', color: '#9E8E7A', cursor: 'pointer', padding: '10px', zIndex: 310 }}
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              src={lightbox}
              style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', border: '1px solid rgba(200,169,110,0.12)' }}
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
