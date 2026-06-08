import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Diamond } from 'lucide-react';
import { getConfig } from '../../../config/active';

export default function CieloHero() {
  const tc = getConfig();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background con parallax */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.35}px)` }}
      >
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=90"
          alt="Buenos Aires rooftop"
          className="w-full h-full object-cover scale-110"
        />
      </div>

      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(14,12,9,0.92) 50%, rgba(14,12,9,0.55) 100%)' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,12,9,0.9) 0%, transparent 60%)' }} />

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <Diamond size={12} className="text-naranja" />
            <span className="font-display tracking-[0.4em] text-[11px] text-naranja uppercase">
              Palermo · Piso 18 · Buenos Aires
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-titulo font-light leading-[0.95] mb-8"
            style={{ fontSize: 'clamp(72px, 10vw, 128px)', color: '#EDE0CC', letterSpacing: '-0.02em', fontStyle: 'italic' }}
          >
            Buenos Aires<br />
            <span style={{ color: '#B8966E', fontStyle: 'normal', fontWeight: 600 }}>desde arriba.</span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-lg leading-relaxed mb-12"
            style={{ color: '#9E8E7A', maxWidth: '480px' }}
          >
            Cocktails de autor. Livings con vista 360°.<br />
            Una noche que no se repite.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#cielo-reservas"
              className="font-display tracking-[0.25em] text-xs px-10 py-4 uppercase transition-all duration-300"
              style={{ background: '#B8966E', color: '#0E0C09' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = '#D4B896'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = '#B8966E'; }}
            >
              RESERVAR LIVING →
            </a>
            <a
              href="#cielo-carta"
              className="font-display tracking-[0.25em] text-xs px-10 py-4 uppercase border transition-all duration-300"
              style={{ borderColor: 'rgba(184,150,110,0.5)', color: '#EDE0CC' }}
              onMouseEnter={e => { const el = e.target as HTMLElement; el.style.borderColor = '#B8966E'; el.style.color = '#B8966E'; }}
              onMouseLeave={e => { const el = e.target as HTMLElement; el.style.borderColor = 'rgba(184,150,110,0.5)'; el.style.color = '#EDE0CC'; }}
            >
              VER CARTA DE COCKTAILS
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 right-8 hidden md:flex flex-col items-center gap-3"
      >
        <span className="font-display text-[9px] tracking-[0.4em] rotate-90 origin-center mb-6" style={{ color: '#9E8E7A' }}>SCROLL</span>
        <div className="w-px h-16 relative overflow-hidden" style={{ background: 'rgba(184,150,110,0.2)' }}>
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ background: '#B8966E' }}
            animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* Línea decorativa horizontal bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(184,150,110,0.3), transparent)' }} />
    </section>
  );
}
