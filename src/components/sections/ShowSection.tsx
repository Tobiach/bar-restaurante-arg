import { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Utensils, Music } from 'lucide-react';
import { SHOWS, ShowBadge } from '../../constants';
import { reservationStore } from '../../store/reservationStore';

const formatPrice = (price: number) => `$${price.toLocaleString('es-AR')}`;

const getBadgeColor = (badge?: ShowBadge) => {
  switch (badge) {
    case ShowBadge.LLENO: return 'bg-rojo-error';
    case ShowBadge.ULTIMOS_LUGARES: return 'bg-amarillo-alerta text-violeta';
    case ShowBadge.HOY: return 'bg-naranja animate-pulse';
    default: return 'bg-verde-ok';
  }
};

export default function ShowSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleShows = showAll ? SHOWS : SHOWS.slice(0, 3);

  const handleReservar = (showNombre: string) => {
    reservationStore.set({ tipo: 'Show', showNombre });
    document.getElementById('sec-reservas')?.scrollIntoView({ behavior: 'smooth' });
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

                {show.imagen && (
                  <div className="absolute inset-0 bg-gradient-to-t from-violeta/60 to-transparent"></div>
                )}

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
                    <button
                      onClick={() => handleReservar(show.nombre)}
                      className="btn-primary w-full text-center py-2 text-sm"
                    >
                      RESERVAR LUGAR →
                    </button>
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
}
