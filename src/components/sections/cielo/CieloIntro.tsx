import { motion } from 'motion/react';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};

export default function CieloIntro() {
  return (
    <section className="py-32 md:py-40" style={{ background: '#161310' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 items-center">
          {/* Izquierda — elemento decorativo vertical */}
          <motion.div {...fadeUp} className="md:col-span-2 flex flex-col items-start md:items-center">
            <div className="flex md:flex-col items-center gap-6">
              {/* Línea vertical dorada */}
              <div className="hidden md:block w-px bg-naranja/40" style={{ height: '80px' }} />
              <span
                className="font-display text-[10px] tracking-[0.4em] text-naranja uppercase md:writing-vertical"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.4em' }}
              >
                Rooftop Premium · Palermo · CABA
              </span>
              <div className="hidden md:block w-px bg-naranja/40" style={{ height: '80px' }} />
            </div>

            {/* Imagen decorativa */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-12 w-full aspect-[3/4] overflow-hidden hidden md:block"
              style={{ border: '1px solid rgba(184,150,110,0.15)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=85"
                alt="Cocktail de autor Cielo Rooftop"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.85) saturate(0.9)' }}
              />
            </motion.div>
          </motion.div>

          {/* Derecha — texto editorial */}
          <div className="md:col-span-3">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-titulo font-light leading-[1.05] mb-10"
              style={{ fontSize: 'clamp(48px, 6vw, 80px)', color: '#EDE0CC', fontStyle: 'italic' }}
            >
              El lugar donde<br />
              Buenos Aires<br />
              <span style={{ color: '#B8966E', fontStyle: 'normal', fontWeight: 600 }}>se muestra.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Línea separadora */}
              <div className="w-16 h-px mb-8" style={{ background: '#B8966E' }} />

              <p className="text-lg leading-[1.9] mb-6" style={{ color: '#9E8E7A' }}>
                Cielo Rooftop es una propuesta para quienes buscan algo más que una salida.
                Es el punto más alto de Palermo: livings de cuero oscuro, barra con vista sin
                interrupciones, y una carta de cocktails pensada por bartenders que entienden
                que cada trago es una conversación.
              </p>
              <p className="text-lg leading-[1.9] mb-12" style={{ color: '#9E8E7A' }}>
                No es para todos. Es para los que saben.
              </p>

              <a
                href="#cielo-servicios"
                className="group inline-flex items-center gap-3 font-display text-xs tracking-[0.3em] uppercase transition-colors"
                style={{ color: '#B8966E' }}
              >
                <span>CONOCER MÁS</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
                <span
                  className="block h-px transition-all duration-500 group-hover:w-24"
                  style={{ background: '#B8966E', width: '40px' }}
                />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
