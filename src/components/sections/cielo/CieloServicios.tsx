import { motion } from 'motion/react';
import { getConfig } from '../../../config/active';

const CARDS = [
  {
    titulo: 'LIVINGS VIP',
    descripcion: 'Nuestros livings de cuero negro y madera oscura están diseñados para grupos que quieren algo más que una mesa. Vista garantizada. Privacidad real.',
    cta: 'RESERVAR LIVING →',
    href: '#cielo-reservas',
    imagen: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85',
    invertir: false,
  },
  {
    titulo: 'COCKTAILS DE AUTOR',
    descripcion: 'Una carta pensada por bartenders con historia. Desde el Buenos Aires Sour hasta el Cielo Negroni, cada trago lleva el nombre de la ciudad.',
    cta: 'VER LA CARTA →',
    href: '#cielo-carta',
    imagen: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&q=85',
    invertir: true,
  },
  {
    titulo: 'EVENTOS PRIVADOS',
    descripcion: 'Desde cumpleaños exclusivos hasta lanzamientos corporativos. El rooftop entero disponible para experiencias que no se olvidan.',
    cta: 'CONSULTAR DISPONIBILIDAD →',
    href: '#cielo-eventos',
    imagen: 'https://images.unsplash.com/photo-1540575467537-61b5a31acef2?w=1200&q=85',
    invertir: false,
  },
];

export default function CieloServicios() {
  const tc = getConfig();
  return (
    <section id="cielo-servicios" className="py-24" style={{ background: '#0E0C09' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-display text-[10px] tracking-[0.5em] uppercase" style={{ color: '#B8966E' }}>
            ◇ EXPERIENCIAS
          </span>
          <h2 className="font-titulo font-light mt-4" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: '#EDE0CC', fontStyle: 'italic' }}>
            Tres razones para volver.
          </h2>
        </motion.div>

        <div className="space-y-4">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.titulo}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group grid grid-cols-1 md:grid-cols-2 min-h-[420px] overflow-hidden`}
              style={{ border: '1px solid rgba(184,150,110,0.1)' }}
            >
              {/* Imagen */}
              <div className={`relative overflow-hidden ${card.invertir ? 'md:order-2' : ''}`}>
                <img
                  src={card.imagen}
                  alt={card.titulo}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ minHeight: '300px', filter: 'brightness(0.8) saturate(0.85)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(14,12,9,0.3), transparent)' }} />
              </div>

              {/* Texto */}
              <div
                className={`flex flex-col justify-center p-12 md:p-16 ${card.invertir ? 'md:order-1' : ''}`}
                style={{ background: '#161310' }}
              >
                <span className="font-display text-[10px] tracking-[0.5em] mb-4 block" style={{ color: '#B8966E' }}>0{i + 1}</span>
                <h3
                  className="font-display tracking-[0.15em] mb-4 text-xl"
                  style={{ color: '#EDE0CC' }}
                >
                  {card.titulo}
                </h3>
                {/* Línea dorada que aparece en hover */}
                <div
                  className="w-10 h-px mb-6 transition-all duration-500 group-hover:w-20"
                  style={{ background: '#B8966E' }}
                />
                <p className="text-base leading-[1.8] mb-10" style={{ color: '#9E8E7A' }}>
                  {card.descripcion}
                </p>
                <a
                  href={card.href}
                  className="inline-flex items-center gap-2 font-display text-xs tracking-[0.3em] uppercase transition-colors self-start"
                  style={{ color: '#B8966E' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#D4B896'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = '#B8966E'; }}
                >
                  {card.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
