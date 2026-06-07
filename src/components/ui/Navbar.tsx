import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight, Calendar, Phone, MapPin, Instagram } from 'lucide-react';
import { tenantConfig } from '../../config/tenant.config';
import StatusIndicator from './StatusIndicator';

const IconWA = () => (
  <svg className="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

const WA_URL = `https://wa.me/${tenantConfig.whatsapp}`;

const ALL_LINKS = [
  { name: 'Carta', href: '#sec-carta', always: true },
  { name: 'Shows', href: '#sec-shows', feature: 'shows' as const },
  { name: 'Karaoke', href: '#sec-karaoke', feature: 'karaoke' as const },
  { name: 'Cumpleaños', href: '#sec-cumple', feature: 'cumpleanos' as const },
  { name: 'Reservas', href: '#sec-reservas', always: true },
  { name: 'Puntos', href: '#sec-puntos', feature: 'puntos' as const },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const isMobile = useIsMobile();

  const links = ALL_LINKS.filter(
    l => l.always || tenantConfig.features[l.feature!]
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (const link of links) {
        const section = document.querySelector(link.href);
        if (section) {
          const top = (section as HTMLElement).offsetTop;
          const bottom = top + (section as HTMLElement).offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(link.href);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  return (
    <nav className="sticky top-0 z-50 bg-violeta/95 backdrop-blur-md border-b border-naranja-borde">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img src={tenantConfig.logo} alt={tenantConfig.nombre} className="h-12 w-auto object-contain" />
          <div className="flex flex-col leading-none">
            <span className="font-titulo text-xl font-black tracking-tighter text-white">ISLA</span>
            <span className="font-display text-[8px] tracking-[0.2em] text-naranja">BAR CULTURAL</span>
          </div>
        </a>

        {!isMobile && (
          <div className="flex items-center gap-8">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`font-display text-sm tracking-widest transition-colors ${activeSection === link.href ? 'text-naranja' : 'hover:text-naranja'}`}
              >
                {link.name.toUpperCase()}
              </a>
            ))}
            <a href="#sec-reservas" className="btn-primary py-2 px-6">RESERVAR MESA →</a>
          </div>
        )}

        {isMobile && (
          <button onClick={() => setIsOpen(true)} className="text-white p-2">
            <Menu size={28} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-violeta z-[60] flex flex-col p-6 h-screen"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3 leading-none">
                <img src={tenantConfig.logo} alt="Logo" className="h-10 w-auto" />
                <div className="flex flex-col">
                  <span className="font-titulo text-lg font-black text-white">ISLA</span>
                  <span className="font-display text-[8px] tracking-widest text-naranja">BAR CULTURAL</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white p-2 bg-violeta-card rounded-full border border-white/10">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-4 items-center flex-1">
              <div className="w-full bg-violeta-medio/50 p-4 rounded-2xl border border-naranja/20 mb-4">
                <StatusIndicator />
                <p className="text-[10px] text-blanco-muted mt-2 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={10} className="text-naranja" /> {tenantConfig.direccion}
                </p>
              </div>

              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-titulo text-2xl font-bold hover:text-naranja transition-colors w-full flex items-center justify-between p-2 border-b border-white/5"
                >
                  {link.name}
                  <ChevronRight size={20} className="text-naranja" />
                </a>
              ))}

              <div className="mt-8 w-full space-y-3">
                <a
                  href="#sec-reservas"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full text-center py-4 flex items-center justify-center gap-2"
                >
                  <Calendar size={20} /> RESERVAR MESA
                </a>
                <a
                  href={WA_URL}
                  target="_blank"
                  className="btn-secondary w-full text-center py-4 flex items-center justify-center gap-2 border-verde-ok/30 text-verde-ok"
                >
                  <IconWA /> WHATSAPP
                </a>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5 flex justify-center gap-8">
              <a href={`https://instagram.com/${tenantConfig.instagram}`} target="_blank" className="text-blanco-muted hover:text-naranja transition-colors flex flex-col items-center gap-1">
                <Instagram size={24} />
                <span className="text-[8px] font-display">INSTAGRAM</span>
              </a>
              <a href={`tel:${tenantConfig.telefono}`} className="text-blanco-muted hover:text-naranja transition-colors flex flex-col items-center gap-1">
                <Phone size={24} />
                <span className="text-[8px] font-display">LLAMAR</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
