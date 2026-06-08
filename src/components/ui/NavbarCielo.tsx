import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Diamond, Instagram, Phone } from 'lucide-react';
import { getConfig } from '../../config/active';

const LINKS = [
  { name: 'Livings',   href: '#cielo-servicios' },
  { name: 'Cocktails', href: '#cielo-carta' },
  { name: 'Eventos',   href: '#cielo-eventos' },
  { name: 'Membresía', href: '#cielo-club' },
];

export default function NavbarCielo() {
  const tc = getConfig();
  const WA_URL = `https://wa.me/${tc.whatsapp}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(14,12,9,0.97)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(184,150,110,0.2)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <Diamond size={16} className="text-naranja" />
          <span className="font-display tracking-[0.3em] text-sm text-white">CIELO ROOFTOP</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-xs tracking-[0.25em] text-blanco-muted hover:text-naranja transition-colors duration-200 uppercase"
            >
              {l.name}
            </a>
          ))}
          <a
            href="#cielo-reservas"
            className="font-display text-xs tracking-[0.25em] uppercase px-6 py-2.5 border border-naranja text-naranja hover:bg-naranja hover:text-[#0E0C09] transition-all duration-300"
          >
            RESERVAR →
          </a>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden text-white p-2" onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col p-8"
            style={{ background: '#0E0C09' }}
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-display tracking-[0.3em] text-sm">CIELO ROOFTOP</span>
              <button onClick={() => setOpen(false)} className="p-2 border border-naranja/30 text-naranja">
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col gap-8 items-center flex-1 justify-center">
              {LINKS.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-titulo text-3xl font-light tracking-wide text-white hover:text-naranja transition-colors"
                >
                  {l.name}
                </a>
              ))}
              <a
                href="#cielo-reservas"
                onClick={() => setOpen(false)}
                className="mt-8 px-10 py-4 border border-naranja text-naranja font-display tracking-[0.3em] text-sm hover:bg-naranja hover:text-[#0E0C09] transition-all"
              >
                RESERVAR
              </a>
            </div>

            <div className="flex justify-center gap-10 pt-8 border-t border-naranja/10">
              <a href={`https://instagram.com/${tc.instagram}`} target="_blank" className="text-blanco-muted hover:text-naranja transition-colors flex flex-col items-center gap-1">
                <Instagram size={20} />
                <span className="text-[8px] font-display tracking-widest">INSTAGRAM</span>
              </a>
              <a href={`tel:${tc.telefono}`} className="text-blanco-muted hover:text-naranja transition-colors flex flex-col items-center gap-1">
                <Phone size={20} />
                <span className="text-[8px] font-display tracking-widest">LLAMAR</span>
              </a>
              <a href={WA_URL} target="_blank" className="text-blanco-muted hover:text-naranja transition-colors flex flex-col items-center gap-1">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                <span className="text-[8px] font-display tracking-widest">WHATSAPP</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
