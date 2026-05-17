import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Music, Mic, Calendar, Users, MapPin, Clock, Instagram, Phone, MessageCircle, 
  Menu, X, ChevronRight, ChevronLeft, Plus, Minus, Search, Star, Award, 
  Image as ImageIcon, Coffee, Pizza, Wine, Zap, Info, Utensils, Gift, PartyPopper, Crown
} from 'lucide-react';
import { ISLA_DATA, SHOWS, RESENAS, USUARIO_DEMO, ShowBadge, MenuItem, Show } from './constants';
import { ToastProvider, useToast } from './components/Toast';

// --- Icons SVG Components ---
const IconMusic = () => (
  <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
  </svg>
);
const IconMic = () => (
  <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);
const IconCalendar = () => (
  <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);
const IconPin = () => (
  <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconClock = () => (
  <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconWA = () => (
  <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// --- Utils ---
const formatPrice = (price: number) => `$${price.toLocaleString('es-AR')}`;

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

const CountUp = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isInView.current) {
        isInView.current = true;
        let startTime: number;
        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// --- Components ---

const StatusIndicator = () => {
  const [status, setStatus] = useState({ open: false, message: '' });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const min = now.getMinutes();
      const currentTime = hour + min / 60;

      let isOpen = false;
      let nextMsg = '';

      if (day >= 3 && day <= 5) { // Mié-Vie
        if (currentTime >= 20 || currentTime < 2) isOpen = true;
        else nextMsg = "Abrimos hoy a las 20:00 hs";
      } else if (day === 6) { // Sáb
        if (currentTime >= 19 || currentTime < 4) isOpen = true;
        else nextMsg = "Abrimos hoy a las 19:00 hs";
      } else if (day === 0) { // Dom
        if (currentTime >= 19 || currentTime < 1) isOpen = true;
        else nextMsg = "Abrimos hoy a las 19:00 hs";
      } else {
        nextMsg = "Abrimos el miércoles a las 20:00 hs";
      }

      setStatus({ open: isOpen, message: isOpen ? 'ABIERTO AHORA' : nextMsg });
    };
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 font-display text-sm">
      <span className={`w-2 h-2 rounded-full ${status.open ? 'bg-verde-ok animate-pulse' : 'bg-rojo-error'}`}></span>
      <span className={status.open ? 'text-verde-ok' : 'text-blanco-muted'}>{status.message}</span>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const isMobile = useIsMobile();

  const links = [
    { name: 'Carta', href: '#sec-carta' },
    { name: 'Shows', href: '#sec-shows' },
    { name: 'Karaoke', href: '#sec-karaoke' },
    { name: 'Cumpleaños', href: '#sec-cumple' },
    { name: 'Reservas', href: '#sec-reservas' },
    { name: 'Puntos', href: '#sec-puntos' },
  ];

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
          <img src={ISLA_DATA.logo} alt="Isla Bar Cultural" className="h-12 w-auto object-contain" />
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
                <img src={ISLA_DATA.logo} alt="Logo" className="h-10 w-auto" />
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
                   <MapPin size={10} className="text-naranja" /> Venezuela 3399, Almagro
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
                  href="https://wa.me/5491167890123" 
                  target="_blank"
                  className="btn-secondary w-full text-center py-4 flex items-center justify-center gap-2 border-verde-ok/30 text-verde-ok"
                >
                  <IconWA /> WHATSAPP
                </a>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5 flex justify-center gap-8">
               <a href="https://instagram.com/islabarcultural" target="_blank" className="text-blanco-muted hover:text-naranja transition-colors flex flex-col items-center gap-1">
                 <Instagram size={24} />
                 <span className="text-[8px] font-display">INSTAGRAM</span>
               </a>
               <a href="tel:+541167890123" className="text-blanco-muted hover:text-naranja transition-colors flex flex-col items-center gap-1">
                 <Phone size={24} />
                 <span className="text-[8px] font-display">LLAMAR</span>
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const mainShow = SHOWS[0];
  
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      <div className="watermark">ISLA</div>
      
      {/* Background Main Show Image */}
      {mainShow.imagen && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-violeta via-violeta/90 to-transparent z-10"></div>
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 2 }}
            src={mainShow.imagen} 
            alt="Main Event" 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full animate-on-scroll">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-block px-4 py-1 rounded-full border border-naranja/40 bg-naranja/10 text-naranja font-display text-xs tracking-widest mb-6 uppercase">
            🔥 PRÓXIMO SHOW: {mainShow.nombre}
          </div>
          <h1 className="text-5xl md:text-8xl font-black leading-tight mb-6">
            El lugar donde <br />
            <span className="text-naranja italic">la noche cobra vida</span>
          </h1>
          <p className="text-lg md:text-xl text-blanco-suave mb-10 max-w-xl">
            Cocina, tragos, música en vivo y shows únicos en el corazón de Almagro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href="#sec-carta" className="btn-primary shimmer-hover text-center">VER CARTA →</a>
            <a href="#sec-shows" className="btn-secondary text-center">PRÓXIMOS SHOWS</a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8 border-t border-violeta-borde">
            <div>
              <div className="text-naranja font-display text-2xl font-bold mb-1">🎶 <CountUp end={3} suffix="+" /></div>
              <div className="text-xs text-blanco-muted uppercase tracking-widest">Shows semanales</div>
            </div>
            <div>
              <div className="text-naranja font-display text-2xl font-bold mb-1">🍽️ <CountUp end={40} suffix="+" /></div>
              <div className="text-xs text-blanco-muted uppercase tracking-widest">Platos únicos</div>
            </div>
            <div className="hidden sm:block">
              <div className="text-naranja font-display text-2xl font-bold mb-1"><CountUp end={4} suffix=".8" /></div>
              <div className="text-xs text-blanco-muted uppercase tracking-widest">En Google</div>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-naranja-oscuro hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-naranja-borde rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-naranja rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

const MenuSection = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('ENTRADAS');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const categories = Object.keys(ISLA_DATA.menu);
  const items = (ISLA_DATA.menu as any)[activeTab].filter((i: any) => 
    i.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item: MenuItem) => {
    setCart([...cart, item]);
    showToast(`Agregado: ${item.nombre}`, 'exito');
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.precio, 0);

  return (
    <section id="sec-carta" className="py-20 bg-violeta-medio/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-header">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">Nuestra Carta</h2>
          <p className="text-blanco-muted">Cocina completa, tragos artesanales y más</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`flex-shrink-0 px-6 py-2 rounded-full font-display text-sm tracking-widest transition-all ${activeTab === cat ? 'bg-naranja text-white' : 'bg-violeta-card/50 text-blanco-muted hover:text-white'}`}
              >
                {cat.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blanco-muted" size={18} />
            <input 
              type="text" 
              placeholder="Buscar platos..." 
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
                <div className="text-4xl">{item.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-titulo text-lg font-bold">{item.nombre}</h3>
                    <span className="text-naranja font-display font-bold">{formatPrice(item.precio)}</span>
                  </div>
                  <p className="text-sm text-blanco-muted mb-3 h-10 overflow-hidden line-clamp-2">{item.descripcion}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.badges?.map((b: string) => (
                      <span key={b} className="text-[10px] uppercase tracking-tighter bg-violeta-medio px-2 py-0.5 rounded text-naranja border border-naranja/20">
                        {b}
                      </span>
                    ))}
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

        {/* Cart Sidebar Desktop / Drawer Mobile */}
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
                      <div className="text-6xl mb-4 opacity-20">🛒</div>
                      <p className="text-blanco-muted italic">El carrito está vacío</p>
                    </div>
                  ) : (
                    cart.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-violeta-card p-3 rounded-lg border border-violeta-borde">
                        <span className="text-2xl">{item.emoji}</span>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold">{item.nombre}</h4>
                          <p className="text-xs text-naranja">{formatPrice(item.precio)}</p>
                        </div>
                        <button onClick={() => removeFromCart(idx)} className="text-rojo-error opacity-60 hover:opacity-100 p-1">
                          <Minus size={16} />
                        </button>
                      </div>
                    ))
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
};

const ShowSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleShows = showAll ? SHOWS : SHOWS.slice(0, 3);

  const getBadgeColor = (badge?: ShowBadge) => {
    switch(badge) {
      case ShowBadge.LLENO: return 'bg-rojo-error';
      case ShowBadge.ULTIMOS_LUGARES: return 'bg-amarillo-alerta text-violeta';
      case ShowBadge.HOY: return 'bg-naranja animate-pulse';
      default: return 'bg-verde-ok';
    }
  };

  return (
    <section id="sec-shows" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-header flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">Próximos Shows</h2>
            <div className="inline-block px-3 py-0.5 rounded bg-naranja text-white font-display text-[10px] tracking-widest uppercase">ESTA SEMANA</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleShows.map((show) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-premium overflow-hidden group"
            >
              <div className="h-56 bg-violeta-card relative flex items-center justify-center overflow-hidden">
                {show.imagen ? (
                  <img 
                    src={show.imagen} 
                    alt={show.nombre} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : show.emoji ? (
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-500">{show.emoji}</div>
                ) : (
                  <Music size={48} className="text-naranja/40 group-hover:scale-110 transition-transform duration-500" />
                )}
                
                {/* Overlay for better readability of badges if it's an image */}
                {show.imagen && <div className="absolute inset-0 bg-gradient-to-t from-violeta/60 to-transparent"></div>}

                <div className="absolute top-4 left-4 inline-block px-2 py-1 rounded bg-violeta/80 text-white font-display text-[10px] tracking-widest uppercase backdrop-blur-md z-10">
                  {show.genero}
                </div>
                {show.badge && (
                  <div className={`absolute top-4 right-4 inline-block px-2 py-1 rounded ${getBadgeColor(show.badge)} font-display text-[10px] font-bold tracking-widest uppercase z-10`}>
                    {show.badge}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-center bg-violeta-medio p-2 rounded-lg border border-naranja/20 min-w-[60px]">
                    <div className="text-naranja font-display text-xl font-black leading-none">{show.fecha.getDate()}</div>
                    <div className="text-[10px] uppercase text-blanco-muted">{show.fecha.toLocaleDateString('es-AR', { weekday: 'short' })}</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold leading-tight">{show.nombre}</h3>
                    <div className="flex gap-4 text-xs text-blanco-muted mt-1">
                      <span className="flex items-center gap-1"><Clock size={12} className="text-naranja" /> {show.horario} hs</span>
                      <span className="flex items-center gap-1"><Utensils size={12} className="text-naranja" /> {formatPrice(show.entrada)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-blanco-suave mb-6 leading-relaxed">{show.descripcion}</p>
                <div className="flex items-center justify-between">
                  {show.badge === ShowBadge.LLENO ? (
                    <button disabled className="btn-secondary w-full grayscale opacity-50">SOLD OUT</button>
                  ) : (
                    <a href="#sec-reservas" className="btn-primary w-full text-center py-2 text-sm">RESERVAR LUGAR →</a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-naranja font-display text-sm tracking-[0.2em] uppercase hover:text-naranja-claro transition-all flex items-center gap-2 mx-auto"
          >
            {showAll ? 'Ver menos -' : 'Ver todos los shows +'}
          </button>
        </div>
      </div>
    </section>
  );
};

const ReservationStepper = () => {
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tipo: '',
    fecha: '',
    hora: '',
    personas: 2,
    nombre: '',
    tel: '',
    email: '',
    obs: '',
    festejo: {
      agasajado: '',
      edad: '',
      torta: false
    }
  });

  const nextStep = () => {
    if (step === 1 && !formData.tipo) return showToast("Por favor selecciona un tipo de visita", "aviso");
    if (step === 2) {
      if (!formData.fecha) return showToast("Selecciona una fecha", "aviso");
      if (!formData.hora) return showToast("Selecciona un horario", "aviso");
    }
    setStep(step + 1);
    setTimeout(() => {
      const el = document.getElementById('sec-reservas');
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }, 100);
  };

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthNames = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

  const submitReservation = () => {
    if (!formData.nombre || !formData.tel) return showToast("Faltan tus datos de contacto", "aviso");
    
    const message = `Hola Isla Bar! Quiero reservar:
Tipo: ${formData.tipo}
Fecha: ${formData.fecha} | Hora: ${formData.hora} | Personas: ${formData.personas}
Nombre: ${formData.nombre} | Tel: ${formData.tel}
${formData.tipo === 'Cumpleaños' ? `Agasajado: ${formData.festejo.agasajado}, Edad: ${formData.festejo.edad}, Torta: ${formData.festejo.torta ? 'Sí' : 'No'}` : ''}
¡Muchas gracias!`;

    window.open(`https://wa.me/5491167890123?text=${encodeURIComponent(message)}`, '_blank');
    showToast("¡Solicitud enviada! Respondemos en minutos.", "exito");
  };

  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const openDays = [0, 3, 4, 5, 6];

  return (
    <section id="sec-reservas" className="py-20 bg-violeta-medio/20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="section-header text-center border-l-0 pl-0">
          <div className="inline-block px-3 py-1 bg-naranja/10 text-naranja text-[10px] tracking-[0.3em] font-display rounded-full mb-4">RESERVAS ONLINE</div>
          <h2 className="text-4xl md:text-5xl font-bold">Asegurá tu Lugar</h2>
          <p className="text-blanco-muted max-w-md mx-auto mt-4">Solo 4 mesas disponibles para este sábado.⚡</p>
        </div>

        <div className="mt-12 bg-violeta-card p-4 md:p-8 rounded-2xl border border-naranja-borde/20 shadow-2xl relative overflow-hidden">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-1 bg-naranja transition-all duration-500" style={{ width: `${(step/3)*100}%` }}></div>
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="step1" className="space-y-6">
                <h3 className="text-xl font-bold text-center mb-8">Paso 1: ¿Para qué querés venir?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'Salida', icon: '🪑', title: 'MESA NORMAL', desc: 'Para cenar o tomar algo' },
                    { id: 'Show', icon: '🎭', title: 'NOCHE DE SHOW', desc: 'Mesa cerca del escenario' },
                    { id: 'Cumpleaños', icon: '🎂', title: 'CUMPLEAÑOS', desc: 'Paquetes y festejos' },
                  ].map(tipo => (
                    <button
                      key={tipo.id}
                      onClick={() => setFormData({ ...formData, tipo: tipo.id })}
                      className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2 text-center ${formData.tipo === tipo.id ? 'bg-naranja/10 border-naranja' : 'bg-violeta border-transparent border-t-violeta-borde hover:border-naranja-borde'}`}
                    >
                      <span className="text-4xl mb-2">{tipo.icon}</span>
                      <span className="font-display font-bold tracking-widest">{tipo.title}</span>
                      <span className="text-[10px] text-blanco-muted uppercase">{tipo.desc}</span>
                    </button>
                  ))}
                </div>
                <button onClick={nextStep} className="btn-primary w-full py-4 text-lg">CONTINUAR →</button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="step2" className="space-y-8">
                <div className="flex items-center justify-between mb-4">
                   <button onClick={() => setStep(1)} className="text-blanco-muted flex items-center gap-2"><ChevronLeft size={16} /> VOLVER</button>
                   <h3 className="text-xl font-bold">Paso 2: Cuándo y cuántos</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-xs font-display tracking-widest text-naranja uppercase">{monthNames[currentMonth.getMonth()]}</label>
                      <div className="flex gap-2">
                         <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))} className="p-1 hover:text-naranja"><ChevronLeft size={16}/></button>
                         <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))} className="p-1 hover:text-naranja"><ChevronRight size={16}/></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => <div key={d} className="text-[10px] text-blanco-muted py-2">{d}</div>)}
                      {Array.from({ length: 28 }).map((_, i) => {
                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
                        const isOpen = openDays.includes(date.getDay());
                        const dateStr = date.toLocaleDateString();
                        const isSelected = formData.fecha === dateStr;
                        const isPast = date < new Date(new Date().setHours(0,0,0,0));
                        return (
                          <button
                            key={i}
                            disabled={!isOpen || isPast}
                            onClick={() => setFormData({...formData, fecha: dateStr})}
                            className={`
                              p-2 rounded-lg text-sm font-bold transition-all relative
                              ${(!isOpen || isPast) ? 'opacity-10 cursor-not-allowed' : 'hover:bg-naranja/20'}
                              ${isSelected ? 'bg-naranja text-white shadow-lg shadow-naranja/40' : ''}
                            `}
                          >
                            {date.getDate()}
                            {date.getDay() === 6 && isOpen && !isPast && <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-naranja rounded-full"></div>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-display tracking-widest text-naranja uppercase mb-3">Personas</label>
                      <div className="flex items-center gap-4 bg-violeta p-2 rounded-lg justify-center">
                        <button onClick={() => setFormData({...formData, personas: Math.max(1, formData.personas - 1)})} className="p-2 bg-violeta-medio rounded-md"><Minus size={20}/></button>
                        <span className="text-2xl font-display font-bold w-12 text-center">{formData.personas}</span>
                        <button onClick={() => setFormData({...formData, personas: Math.min(30, formData.personas + 1)})} className="p-2 bg-violeta-medio rounded-md"><Plus size={20}/></button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-display tracking-widest text-naranja uppercase mb-3">Horario</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['20:00', '21:00', '22:00', '23:00'].map(h => (
                          <button
                            key={h}
                            onClick={() => setFormData({...formData, hora: h})}
                            className={`py-2 rounded-md font-display text-sm border ${formData.hora === h ? 'bg-naranja border-naranja' : 'border-violeta-borde hover:border-naranja/30'}`}
                          >
                            {h} hs
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {formData.tipo === 'Cumpleaños' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-6 border-t border-violeta-borde grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      placeholder="Nombre del agasajado" 
                      className="bg-violeta p-3 rounded-lg outline-none focus:border-naranja border border-transparent transition-all"
                      value={formData.festejo.agasajado}
                      onChange={e => setFormData({...formData, festejo: {...formData.festejo, agasajado: e.target.value}})}
                    />
                    <input 
                      placeholder="Edad que cumple" 
                      className="bg-violeta p-3 rounded-lg outline-none focus:border-naranja border border-transparent transition-all"
                      value={formData.festejo.edad}
                      onChange={e => setFormData({...formData, festejo: {...formData.festejo, edad: e.target.value}})}
                    />
                  </motion.div>
                )}

                <button onClick={nextStep} className="btn-primary w-full py-4 text-lg">CONTINUAR →</button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="step3" className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                   <button onClick={() => setStep(2)} className="text-blanco-muted flex items-center gap-2"><ChevronLeft size={16} /> VOLVER</button>
                   <h3 className="text-xl font-bold">Paso 3: Tus datos</h3>
                </div>
                
                <div className="space-y-4">
                  <input 
                    placeholder="Nombre completo" 
                    className="w-full bg-violeta p-4 rounded-xl outline-none border border-transparent focus:border-naranja"
                    value={formData.nombre}
                    onChange={e => setFormData({...formData, nombre: e.target.value})}
                  />
                  <input 
                    placeholder="Teléfono (WhatsApp)" 
                    className="w-full bg-violeta p-4 rounded-xl outline-none border border-transparent focus:border-naranja"
                    value={formData.tel}
                    onChange={e => setFormData({...formData, tel: e.target.value})}
                  />
                  <textarea 
                    placeholder="Algún pedido especial o comentario..." 
                    className="w-full bg-violeta p-4 rounded-xl outline-none border border-transparent focus:border-naranja h-32 resize-none"
                    value={formData.obs}
                    onChange={e => setFormData({...formData, obs: e.target.value})}
                  />
                </div>

                <div className="bg-naranja/5 p-4 rounded-xl border border-naranja/20">
                  <h4 className="text-xs font-display tracking-widest text-naranja uppercase mb-2">Resumen de tu reserva</h4>
                  <p className="text-sm">
                    <strong>{formData.tipo}</strong> para <strong>{formData.personas} personas</strong><br />
                    El <strong>{formData.fecha}</strong> a las <strong>{formData.hora} hs</strong>
                  </p>
                </div>

                <button onClick={submitReservation} className="btn-primary w-full py-4 text-lg shimmer-hover flex items-center justify-center gap-2">
                  <MessageCircle size={24} /> CONFIRMAR POR WHATSAPP →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const PointsSection = () => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <section id="sec-puntos" className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-header">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">Isla Club</h2>
          <p className="text-blanco-muted">Tu fidelidad tiene premio. Acumulá y canjeá.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-violeta-card to-violeta-medio p-8 rounded-3xl border border-naranja-borde/20 shadow-2xl relative">
              <Award className="absolute top-8 right-8 text-naranja/20" size={80} />
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-naranja flex items-center justify-center text-3xl">👤</div>
                <div>
                  <h3 className="text-2xl font-bold">{USUARIO_DEMO.nombre}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-widest uppercase bg-naranja text-white px-2 py-0.5 rounded">NIVEL {USUARIO_DEMO.nivel}</span>
                    <span className="text-xs text-blanco-muted font-display">{USUARIO_DEMO.puntos} puntos</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between text-xs font-display tracking-widest mb-2 uppercase">
                  <span>Progreso Nivel {USUARIO_DEMO.proximoNivel}</span>
                  <span className="text-naranja">{USUARIO_DEMO.puntos} / 1500</span>
                </div>
                <div className="h-4 bg-violeta rounded-full overflow-hidden border border-violeta-borde">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(USUARIO_DEMO.puntos/1500)*100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-naranja to-dorado relative"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-shimmer scale-x-150"></div>
                  </motion.div>
                </div>
                <p className="text-[10px] text-blanco-muted mt-2 text-right uppercase tracking-widest italic">
                  ¡Faltan {USUARIO_DEMO.faltanPuntos} puntos para ser VIP!
                </p>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => setExpanded(!expanded)}
                  className="text-white text-sm font-bold flex items-center gap-2 hover:text-naranja transition-colors"
                >
                  {expanded ? 'Ocultar historial' : 'Ver historial de puntos'} <ChevronRight size={16} className={`transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {expanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="space-y-3 pt-4 font-mono text-[10px]">
                        {USUARIO_DEMO.historial.map((h, i) => (
                          <div key={i} className="flex justify-between items-center py-2 border-b border-violeta-borde last:border-0 border-dashed">
                            <span className="text-blanco-muted">{h.fecha}</span>
                            <span className="flex-1 px-4">{h.desc}</span>
                            <span className="text-verde-ok font-bold">+{h.puntos}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-display tracking-[0.2em] text-sm text-naranja uppercase mb-4">¿Cómo canjear?</h4>
            {[
              { pts: 100, gift: '10% OFF en tu cena' },
              { pts: 300, gift: 'Entrada gratis a show' },
              { pts: 500, gift: 'Mesa prioritaria sábado' },
              { pts: 1000, gift: '1h Open Bar para 4' },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-4 bg-violeta-medio/40 p-4 rounded-xl border border-transparent hover:border-naranja/20 transition-all">
                <div className="p-3 rounded-full bg-naranja/10 text-naranja font-black text-xs min-w-[60px] text-center">{p.pts} pts</div>
                <div className="text-sm font-bold">{p.gift}</div>
              </div>
            ))}
            <button 
              onClick={() => {
                const msg = `Hola Isla! Soy ${USUARIO_DEMO.nombre} y quiero canjear mis puntos.`;
                window.open(`https://wa.me/5491167890123?text=${encodeURIComponent(msg)}`, '_blank');
              }}
              className="btn-secondary w-full shimmer-hover"
            >
              QUIERO CANJEAR →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const KaraokeSection = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [song, setSong] = useState('');

  return (
    <section id="sec-karaoke" className="py-20 bg-violeta-medio/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
            <div className="inline-block px-3 py-1 bg-naranja text-white font-display text-[10px] tracking-widest uppercase rounded mb-6">DÍAS ESPECÍFICOS</div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6">Karaoke Night</h2>
            <p className="text-xl text-blanco-suave mb-8">Todos los Miércoles y Jueves desde las 22:00 hs. <br /> El escenario es tuyo, ¿te animás?</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {['Pop & Rock', 'Cumbia Pop', 'Reggaetón', 'Folklore', 'Tango', 'Boleros'].map(g => (
                <div key={g} className="flex items-center gap-3 text-sm text-blanco-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-naranja"></div> {g}
                </div>
              ))}
            </div>
            <div className="p-6 bg-violeta-card rounded-2xl border border-naranja/20 shadow-xl">
              <h4 className="font-bold mb-4 flex items-center gap-2"><Info size={18} className="text-naranja" /> ¿Cómo funciona?</h4>
              <ol className="space-y-3 text-sm text-blanco-muted">
                <li className="flex gap-3"><span className="text-naranja font-bold">01.</span> Te anotás con nuestro equipo o en el form de aquí al lado.</li>
                <li className="flex gap-3"><span className="text-naranja font-bold">02.</span> Te llamamos al escenario cuando llegue tu turno.</li>
                <li className="flex gap-3"><span className="text-naranja font-bold">03.</span> ¡Cantás, te divertís y sumás 50 puntos Isla Club!</li>
              </ol>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-violeta-card to-violeta p-8 rounded-3xl border border-naranja-borde shadow-2xl relative overflow-hidden"
          >
             <Mic className="absolute -bottom-10 -right-10 text-naranja/5 rotate-12" size={200} />
             <h3 className="text-2xl font-bold mb-8 text-center italic">Anotate para cantar</h3>
             <div className="space-y-4 relative z-10">
               <div>
                 <label className="block text-[10px] font-display tracking-widest text-naranja uppercase mb-2">Tu Nombre</label>
                 <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-violeta-medio/50 p-4 rounded-xl border border-violeta-borde outline-none focus:border-naranja transition-all" 
                  placeholder="Ej: Valentina" 
                 />
               </div>
               <div>
                 <label className="block text-[10px] font-display tracking-widest text-naranja uppercase mb-2">¿Qué canción vas a romper?</label>
                 <input 
                  type="text" 
                  value={song}
                  onChange={e => setSong(e.target.value)}
                  className="w-full bg-violeta-medio/50 p-4 rounded-xl border border-violeta-borde outline-none focus:border-naranja transition-all" 
                  placeholder="Ej: Total Eclipse of the Heart" 
                 />
               </div>
               <button 
                onClick={() => {
                  if(!name || !song) return showToast("Completá tu nombre y canción", "aviso");
                  showToast("¡Agendado! Nos vemos el miércoles.", "exito");
                  setName(''); setSong('');
                }}
                className="btn-primary w-full py-4 shimmer-hover"
               >
                ANOTARME AHORA
               </button>
               <p className="text-[10px] text-center text-blanco-muted uppercase tracking-widest mt-4">
                 Consumición mínima: $2.000 p/p
               </p>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const [filter, setFilter] = useState('TODOS');
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const categories = ['TODOS', 'SHOWS', 'AMBIENTE', 'KARAOKE', 'CUMPLEAÑOS'];
  const galleryItems = [
    { title: "Energía en Vivo", cat: "SHOWS", icon: "⚡", img: "https://lh3.googleusercontent.com/d/1LtW01EH0wUQ4VYrY_nR6oa8O1ugBj4XB", color: "from-violeta/80 to-naranja/20" },
    { title: "Rincón Isla", cat: "AMBIENTE", icon: "🌟", img: "https://lh3.googleusercontent.com/d/1KnOZWJi34Ht1POToYlkTjkqtjzDiLMud", color: "from-violeta/80 to-violeta-card" },
    { title: "La Venganza de la Guitarra", cat: "SHOWS", icon: "🎸", img: "https://lh3.googleusercontent.com/d/1OsM3C44jQLoTxQKLHvsdcQRm75KGiORx", color: "from-violeta/80 to-naranja/20" },
    { title: "Barra Especial", cat: "AMBIENTE", icon: "🍸", img: "https://lh3.googleusercontent.com/d/1NaGwJ9P0xwMZnLZmvojs1itVIc5ZfxZe", color: "from-violeta/80 to-blue-800/20" },
    { title: "Momento Show", cat: "SHOWS", icon: "🎤", img: "https://lh3.googleusercontent.com/d/1DauAVjVawQ_B_xREDuzZCHV0og0kqXai", color: "from-violeta/80 to-purple-800/20" },
    { title: "Luces de Noche", cat: "AMBIENTE", icon: "🏮", img: "https://lh3.googleusercontent.com/d/1_6Uyr016Rvz1r-o9yT5qI3wuAbjDSFx6", color: "from-violeta/80 to-yellow-800/20" },
    { title: "Pasión en Escena", cat: "SHOWS", icon: "🎻", img: "https://lh3.googleusercontent.com/d/1fJSlevbs0gAn3YvOH2gCXYr649N6QiOO", color: "from-violeta/80 to-red-900/20" },
    { title: "Detalles que Suman", cat: "AMBIENTE", icon: "✨", img: "https://lh3.googleusercontent.com/d/1HOdELTJLn5FRrgjnbuoeK6ONfJucqDNQ", color: "from-violeta/80 to-green-900/20" },
    { title: "Nuestra Escencia", cat: "AMBIENTE", icon: "🌊", img: "https://lh3.googleusercontent.com/d/1TyVRj_0N5QSbK4dJzdNf0EyQ2bXc0IUn", color: "from-violeta/80 to-emerald-900/20" },
    { title: "Bandas Invitadas", cat: "SHOWS", icon: "🥁", img: "https://lh3.googleusercontent.com/d/1bkogJSouxVfvwRtLyTQuVpHz8MJxtMF-", color: "from-violeta/80 to-cyan-900/20" },
    { title: "La Bicicleta con Alas", cat: "AMBIENTE", icon: "📖", img: "https://lh3.googleusercontent.com/d/1g-T-9rd6lmVqoFhDuYRNZ1KWX4CHA-F0", color: "from-violeta/80 to-amber-900/20" },
    { title: "Escenario Abierto", cat: "SHOWS", icon: "🎭", img: "https://lh3.googleusercontent.com/d/1khMynTX9CT3KQYmFyHwnXS1u1fGp2hHl", color: "from-violeta/80 to-indigo-900/20" },
    { title: "Shows Inolvidables", cat: "SHOWS", icon: "🎥", img: "https://lh3.googleusercontent.com/d/1yVu0xwdi1GDqpxnsFUwLXbfGJwWqWfh_", color: "from-violeta/80 to-rose-900/20" },
    { title: "Noches de Ritmo", cat: "SHOWS", icon: "🕺", img: "https://lh3.googleusercontent.com/d/1RYv_G9J-VgMmaXtiYFK42kxi3UJ3M_2f", color: "from-violeta/80 to-sky-900/20" },
    { title: "Cultura en Almagro", cat: "SHOWS", icon: "🌟", img: "https://lh3.googleusercontent.com/d/16vFERwmM2S0Xuud5RJ2HmyfLp7hhDflk", color: "from-violeta/80 to-violeta-card" },
  ];

  const filtered = filter === 'TODOS' ? galleryItems : galleryItems.filter(i => i.cat === filter);
  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="sec-galeria" className="py-20 bg-violeta">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-header">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">Así Son Nuestras Noches</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-6 py-2 rounded-full font-display text-xs tracking-widest transition-all ${filter === c ? 'bg-naranja text-white' : 'bg-violeta-card/50 text-blanco-muted hover:text-white'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((item, idx) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedImage(idx)}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-violeta-borde"
              >
                {item.img ? (
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} transition-transform duration-500 group-hover:scale-110`}></div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                {!item.img && (
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30 group-hover:opacity-60 transition-opacity">
                    {item.icon}
                  </div>
                )}
                <div className="absolute inset-0 bg-violeta/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                   <h3 className="font-titulo text-2xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                   <span className="bg-naranja px-3 py-1 rounded text-[10px] font-display font-bold tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.cat}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length > 6 && (
          <div className="mt-12 text-center">
            <button onClick={() => setShowAll(!showAll)} className="text-naranja font-display text-sm tracking-widest uppercase hover:underline">
              {showAll ? 'Ver menos' : 'Ver más noches →'}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setSelectedImage(null)}></div>
            <div className="relative max-w-4xl w-full aspect-video rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center bg-violeta-medio">
              <button 
                className="absolute top-6 right-6 z-10 p-2 bg-black/50 rounded-full hover:bg-naranja transition-colors" 
                onClick={() => setSelectedImage(null)}
              ><X /></button>
              
              {visible[selectedImage].img ? (
                <img 
                  src={visible[selectedImage].img} 
                  alt={visible[selectedImage].title} 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <div className="text-[120px] mb-8">{visible[selectedImage].icon}</div>
                  <h3 className="text-4xl font-bold mb-4">{visible[selectedImage].title}</h3>
                  <span className="text-naranja font-display tracking-[0.2em]">{visible[selectedImage].cat}</span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                  <h3 className="text-2xl font-bold">{visible[selectedImage].title}</h3>
                  <span className="text-naranja font-display text-xs tracking-widest">{visible[selectedImage].cat}</span>
              </div>

              <button 
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 rounded-full hover:bg-naranja transition-colors"
                onClick={(e) => { e.stopPropagation(); setSelectedImage((selectedImage - 1 + visible.length) % visible.length); }}
              ><ChevronLeft size={32} /></button>
              <button 
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 rounded-full hover:bg-naranja transition-colors"
                onClick={(e) => { e.stopPropagation(); setSelectedImage((selectedImage + 1) % visible.length); }}
              ><ChevronRight size={32} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ReviewSection = () => {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ nombre: '', texto: '', rating: 5 });
  
  return (
    <section id="sec-resenas" className="py-20 bg-violeta-medio/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">La Tribu Habla</h2>
          <div className="flex items-center justify-center gap-1 text-dorado mb-2">
            {[1, 2, 3, 4, 5].map(s => <Star key={s} fill="#FFD166" size={20} />)}
          </div>
          <p className="text-blanco-muted font-display tracking-widest uppercase text-xs">⭐ 4.8 / 5 — Basado en 243 opiniones reales</p>
        </div>

        <div className="relative mb-12">
          <div className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth" id="review-carrusel">
            {RESENAS.map((res, i) => (
              <div key={i} className="min-w-full md:min-w-[400px] snap-center">
                <div className="card-premium p-8 h-64 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold">{res.nombre}</span>
                      <span className="text-[10px] uppercase text-naranja bg-naranja/10 px-2 py-0.5 rounded">{res.servicio}</span>
                    </div>
                    <p className="text-blanco-suave italic text-sm leading-relaxed">"{res.texto}"</p>
                  </div>
                  <div className="flex gap-1 text-dorado opacity-60">
                    {Array.from({ length: res.rating }).map((_, j) => <Star key={j} fill="#FFD166" size={12} />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {RESENAS.map((_, i) => (
              <button 
                key={i} 
                onClick={() => {
                  const el = document.getElementById('review-carrusel');
                  if (el) el.scrollTo({ left: i * el.offsetWidth, behavior: 'smooth' });
                }}
                className="w-2 h-2 rounded-full bg-violeta-card hover:bg-naranja transition-all"
              ></button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button onClick={() => setModalOpen(true)} className="btn-secondary">DEJAR MI RESEÑA →</button>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
             <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="relative bg-violeta-card p-8 rounded-3xl border border-naranja-borde max-w-md w-full">
                <h3 className="text-2xl font-bold mb-6">Tu opinión nos importa</h3>
                <div className="space-y-4">
                  <input 
                    placeholder="Tu nombre" 
                    className="w-full bg-violeta p-3 rounded-xl border border-transparent focus:border-naranja outline-none"
                    value={newReview.nombre}
                    onChange={e => setNewReview({...newReview, nombre: e.target.value})}
                  />
                  <div className="flex justify-center gap-2">
                    {[1,2,3,4,5].map(r => (
                      <button key={r} onClick={() => setNewReview({...newReview, rating: r})}>
                        <Star fill={r <= newReview.rating ? "#FFD166" : "none"} className={r <= newReview.rating ? "text-dorado" : "text-blanco-muted"} />
                      </button>
                    ))}
                  </div>
                  <textarea 
                    placeholder="¿Qué tal fue tu experiencia?" 
                    className="w-full bg-violeta p-3 rounded-xl border border-transparent focus:border-naranja outline-none h-32 resize-none"
                    value={newReview.texto}
                    onChange={e => setNewReview({...newReview, texto: e.target.value})}
                  />
                  <button 
                    onClick={() => {
                      if(!newReview.nombre || !newReview.texto) return showToast("Por favor completa los campos", "aviso");
                      showToast("¡Gracias por tu reseña!", "exito");
                      setModalOpen(false);
                      setNewReview({ nombre: '', texto: '', rating: 5 });
                    }}
                    className="btn-primary w-full"
                  >
                    PUBLICAR
                  </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ContactSection = () => {
  const { showToast } = useToast();
  return (
    <section id="sec-contacto" className="py-20 bg-violeta">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="card-premium h-[400px] relative overflow-hidden flex flex-col">
            <div className="flex-1 bg-violeta-medio flex items-center justify-center p-8 text-center bg-[radial-gradient(var(--naranja-glow)_1px,transparent_1px)] bg-[size:20px_20px]">
              <div className="relative">
                <div className="w-12 h-12 bg-naranja rounded-full flex items-center justify-center animate-ping absolute -top-4 -left-4 opacity-40"></div>
                <div className="w-4 h-4 bg-naranja rounded-full relative z-10 border-2 border-white"></div>
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-2">Venezuela 3399</h3>
                  <p className="text-blanco-muted">Almagro, Buenos Aires</p>
                </div>
              </div>
            </div>
            <a 
              href="https://maps.google.com/?q=Venezuela+3399,+Almagro" 
              target="_blank"
              className="p-4 bg-naranja text-white font-display text-center font-bold tracking-widest hover:bg-naranja-claro transition-all"
            >
              VER EN GOOGLE MAPS →
            </a>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-6">Vení a Vivir la Isla</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Clock className="text-naranja mt-1" size={20} />
                    <div className="text-sm">
                      <h4 className="font-bold text-naranja uppercase text-[10px] tracking-widest mb-2">Horarios</h4>
                      <p className="text-blanco-muted">Mié-Vie: 20 a 02 hs</p>
                      <p className="text-blanco-muted">Sábado: 19 a 04 hs</p>
                      <p className="text-blanco-muted">Domingo: 19 a 01 hs</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Phone className="text-naranja mt-1" size={20} />
                    <div className="text-sm">
                      <h4 className="font-bold text-naranja uppercase text-[10px] tracking-widest mb-2">Contacto</h4>
                      <p className="text-blanco-muted">+54 9 11 6789-0123</p>
                      <p className="text-blanco-muted">islabarcultural@gmail.com</p>
                      <div className="flex gap-4 mt-2">
                        <a 
                          href="https://instagram.com/islabarcultural" 
                          target="_blank"
                          className="p-2 bg-violeta-card rounded-lg hover:text-naranja transition-colors"
                        >
                          <Instagram size={18} />
                        </a>
                        <a 
                          href="https://wa.me/5491167890123" 
                          target="_blank"
                          className="p-2 bg-violeta-card rounded-lg hover:text-naranja transition-colors"
                        >
                          <MessageCircle size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-violeta-card p-8 rounded-2xl border border-white/5">
              <h4 className="font-bold mb-6 italic">¿Tenés alguna consulta?</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#sec-reservas" className="btn-primary flex-1 text-center py-4">RESERVÁ YA</a>
                <button 
                  onClick={() => window.open(`https://wa.me/5491167890123`, '_blank')}
                  className="btn-secondary flex-1 flex items-center justify-center gap-2 py-4"
                >
                  <MessageCircle size={20} /> CHATEAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-violeta-medio py-20 border-t border-naranja-borde/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
             <a href="#" className="flex items-center gap-4 mb-6">
                <img src={ISLA_DATA.logo} alt="Isla Bar" className="h-14 w-auto" />
                <div className="flex flex-col leading-none">
                  <span className="font-titulo text-2xl font-black tracking-tighter text-white">ISLA</span>
                  <span className="font-display text-[10px] tracking-[0.2em] text-naranja">BAR CULTURAL</span>
                </div>
             </a>
             <p className="text-sm text-blanco-muted leading-relaxed">
               El epicentro cultural de Almagro. Shows, gastronomía y buen encuentro en un solo lugar.
             </p>
          </div>
          <div>
            <h4 className="font-display tracking-widest text-xs uppercase text-naranja mb-6">Explorá</h4>
            <div className="flex flex-col gap-3 text-sm text-blanco-muted">
              <a href="#sec-carta" className="hover:text-white transition-colors">La Carta</a>
              <a href="#sec-shows" className="hover:text-white transition-colors">Shows en Vivo</a>
              <a href="#sec-karaoke" className="hover:text-white transition-colors">Mesas de Karaoke</a>
              <a href="#sec-puntos" className="hover:text-white transition-colors">Isla Club</a>
            </div>
          </div>
          <div>
            <h4 className="font-display tracking-widest text-xs uppercase text-naranja mb-6">Festejos</h4>
            <div className="flex flex-col gap-3 text-sm text-blanco-muted">
              <a href="#sec-cumple" className="hover:text-white transition-colors">Cumpleaños</a>
              <a href="#sec-cumple" className="hover:text-white transition-colors">Eventos Privados</a>
              <a href="#sec-reservas" className="hover:text-white transition-colors">Reservas de Grupos</a>
              <button onClick={() => showToast("Muy pronto: Comprá online tu Gift Card", "info")} className="text-left hover:text-white transition-colors">Gift Cards</button>
            </div>
          </div>
          <div>
            <h4 className="font-display tracking-widest text-xs uppercase text-naranja mb-6">Isla News</h4>
            <p className="text-xs text-blanco-muted mb-4 leading-relaxed">Sumate para enterarte de los shows sorpresa.</p>
            <form 
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const email = (e.target as any).querySelector('input').value;
                if (email) {
                  showToast("¡Te sumaste a las noticias!", "exito");
                  (e.target as any).reset();
                }
              }}
            >
              <input 
                type="email"
                required
                placeholder="Tu email..."
                className="bg-violeta/50 border border-violeta-borde rounded-lg px-4 py-2 text-xs outline-none focus:border-naranja flex-1"
              />
              <button type="submit" className="bg-naranja p-3 rounded-lg hover:bg-naranja-claro transition-colors">
                <ChevronRight size={16}/>
              </button>
            </form>
          </div>
        </div>
        <div className="pt-8 border-t border-violeta-borde flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-blanco-muted uppercase tracking-[0.2em]">
          <span>© 2025 Isla Bar Cultural — Venezuela 3399, Almagro</span>
          <div className="flex gap-8">
            <button onClick={() => showToast("Sección en construcción", "info")} className="hover:text-white">Privacidad</button>
            <button onClick={() => showToast("Sección en construcción", "info")} className="hover:text-white">Términos</button>
            <button onClick={() => showToast("Mandanos tu CV a islabarcultural@gmail.com", "success")} className="hover:text-white">Trabajá con nosotros</button>
          </div>
        </div>
      </div>
      
      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden sticky bottom-0 left-0 w-full bg-violeta-medio border-t border-naranja-borde flex h-16 z-50">
        <a href="tel:+541167890123" className="flex-1 flex flex-col items-center justify-center gap-1 border-r border-violeta-borde">
          <Phone size={20} className="text-naranja" />
          <span className="text-[10px] font-display font-bold tracking-widest">LLAMAR</span>
        </a>
        <a href="https://wa.me/5491167890123" className="flex-1 flex flex-col items-center justify-center gap-1 border-r border-violeta-borde">
          <MessageCircle size={20} className="text-verde-ok" />
          <span className="text-[10px] font-display font-bold tracking-widest">WHATSAPP</span>
        </a>
        <a href="#sec-reservas" className="flex-1 flex flex-col items-center justify-center gap-1 bg-naranja text-white">
          <Calendar size={20} />
          <span className="text-[10px] font-display font-bold tracking-widest">RESERVAR</span>
        </a>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <div className="relative min-h-screen bg-violeta overflow-x-hidden">
        <div className="bg-violeta-medio py-2 border-b border-white/5 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] font-display tracking-[0.2em] text-blanco-muted uppercase">
            <div className="flex gap-6">
              <span className="flex items-center gap-1"><IconPin /> Venezuela 3399, Almagro</span>
              <span className="flex items-center gap-1"><IconClock /> Mié-Vie 20-02 | Sáb 19-04 | Dom 19-01</span>
            </div>
            <StatusIndicator />
            <div className="flex gap-4">
              <span className="flex items-center gap-1 text-blanco-suave"><IconWA /> +54 9 11 6789-0123</span>
            </div>
          </div>
        </div>
        <Navbar />
        <main>
          <Hero />
          
          {/* Highlights Scroll bar */}
          <div className="bg-naranja py-4 overflow-hidden relative border-y border-naranja-oscuro/20">
             <div className="flex gap-12 whitespace-nowrap animate-marquee px-4">
               {[
                 '🍕 Cocina Completa', '🎸 Bandas en Vivo', '🎤 Karaoke', '🎂 Cumpleaños',
                 '🍹 Tragos Únicos', '🎧 DJ Sets', '🎭 Shows Especiales', '🌟 Reservas Online', '🏆 Puntos Isla Club'
               ].map((text, i) => (
                 <span key={i} className="text-white font-display font-black tracking-widest text-sm italic">{text.toUpperCase()}</span>
               ))}
               {/* Duplicate for infinite loop */}
               {[
                 '🍕 Cocina Completa', '🎸 Bandas en Vivo', '🎤 Karaoke', '🎂 Cumpleaños',
                 '🍹 Tragos Únicos', '🎧 DJ Sets', '🎭 Shows Especiales', '🌟 Reservas Online', '🏆 Puntos Isla Club'
               ].map((text, i) => (
                 <span key={i+'dup'} className="text-white font-display font-black tracking-widest text-sm italic">{text.toUpperCase()}</span>
               ))}
             </div>
          </div>
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee { animation: marquee 30s linear infinite; }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          
          <ShowSection />
          <MenuSection />
          <ReservationStepper />
          <KaraokeSection />
          <GallerySection />
          
          {/* Cumpleaños Section Packets */}
          <section id="sec-cumple" className="py-20 bg-violeta-card/10">
            <div className="max-w-7xl mx-auto px-4">
               <div className="section-header text-center border-l-0 pl-0 mb-16">
                 <h2 className="text-4xl md:text-5xl font-bold mb-4 italic">Tu Festejo, Tu Manera</h2>
                 <p className="text-blanco-muted max-w-xl mx-auto">Diseñamos la noche perfecta para vos y tus amigos. Elegí el paquete que más te guste.</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { 
                      title: 'BÁSICO', 
                      icon: <Gift className="text-blanco-muted" />,
                      items: ['Mesa reservada con anticipación', 'Torta artesanal de la casa', 'Decoración minimalista', 'Brindis de cortesía'],
                      price: '$25.000',
                      color: 'border-white/5'
                    },
                    { 
                      title: 'FESTIVO', 
                      icon: <PartyPopper className="text-naranja" />,
                      items: ['Todo lo del plan Básico', 'Decoración temática completa', 'Selección de tapes a elección', 'Sesión de fotos rápida'],
                      price: '$45.000',
                      featured: true,
                      color: 'border-naranja/50'
                    },
                    { 
                      title: 'VIP', 
                      icon: <Crown className="text-dorado" />,
                      items: ['Todo lo del plan Festivo', 'Zona VIP semi-reservada', 'Menú degustación especial', 'Barra libre (2 hs)'],
                      price: '$85.000',
                      color: 'border-dorado/30'
                    }
                  ].map((p, i) => (
                    <div key={i} className={`relative card-premium p-8 flex flex-col transition-all duration-500 hover:translate-y-[-8px] ${p.featured ? 'border-naranja shadow-[0_0_50px_-12px_rgba(251,133,0,0.3)] scale-105 z-10 bg-gradient-to-b from-violeta-card to-violeta' : 'opacity-80 hover:opacity-100'} ${p.color}`}>
                       {p.featured && (
                         <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                           <span className="bg-naranja text-white text-[10px] font-display font-black px-4 py-1.5 rounded-full shadow-lg shadow-naranja/20 whitespace-nowrap">
                             PACK MÁS ELEGIDO
                           </span>
                         </div>
                       )}
                       <div className="mb-6 flex justify-center">
                         <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${p.featured ? 'bg-naranja/10 border border-naranja/20' : 'bg-white/5'}`}>
                           {p.icon}
                         </div>
                       </div>
                       <h3 className="text-2xl font-black text-center mb-6 tracking-widest font-titulo italic">{p.title}</h3>
                       <ul className="space-y-4 mb-10 flex-1">
                          {p.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-3 text-sm text-blanco-suave">
                               <div className="mt-1 shrink-0"><Plus size={14} className={p.featured ? "text-naranja" : "text-blanco-muted"} /></div>
                               {item}
                            </li>
                          ))}
                       </ul>
                       <div className="text-center pt-6 border-t border-white/5 mb-6">
                          <div className="text-[10px] text-blanco-muted uppercase tracking-[0.2em] mb-1">Precio x Persona</div>
                          <div className={`text-4xl font-display font-black ${p.featured ? 'text-naranja' : 'text-white'}`}>{p.price}</div>
                       </div>
                       <a href="#sec-reservas" className={`shimmer-hover py-4 rounded-xl text-center font-display text-xs font-black tracking-widest transition-all ${p.featured ? 'bg-naranja text-white' : 'bg-white/5 hover:bg-white/10 text-white'}`}>RESERVAR ESTE PACK</a>
                    </div>
                  ))}
               </div>
               <p className="text-[10px] text-center text-blanco-muted mt-12 uppercase tracking-widest">
                 * Todos los paquetes se arman a medida según cantidad de invitados.
               </p>
            </div>
          </section>

          <PointsSection />
          <ReviewSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}
