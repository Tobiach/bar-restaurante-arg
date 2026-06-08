import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const RESENAS = [
  {
    nombre: 'Camila Bertolini',
    ciudad: 'Palermo, Buenos Aires',
    rating: 5,
    texto: 'El Buenos Aires Sour desde el piso 18 es una de esas experiencias que quedan. La vista, el servicio, el ambiente. Volvemos seguro.',
    fecha: 'hace 3 días',
  },
  {
    nombre: 'Martín Echeverría',
    ciudad: 'Recoleta, Buenos Aires',
    rating: 5,
    texto: 'Llevé a mi pareja por su cumpleaños. El living VIP con champagne de bienvenida superó todas las expectativas. Lugar único en la ciudad.',
    fecha: 'hace 1 semana',
  },
  {
    nombre: 'Florencia Sáenz',
    ciudad: 'San Isidro, Buenos Aires',
    rating: 5,
    texto: 'El evento corporativo que organizamos fue impecable. El equipo de Cielo se encargó de cada detalle. Los 80 invitados quedaron impresionados.',
    fecha: 'hace 2 semanas',
  },
  {
    nombre: 'Andrés Fontana',
    ciudad: 'Belgrano, Buenos Aires',
    rating: 5,
    texto: 'La mejor barra de cocktails que probé en Buenos Aires. El Cielo Negroni es imbatible. Ahora somos socios del Cielo Club.',
    fecha: 'hace 1 mes',
  },
  {
    nombre: 'Lucía Morales',
    ciudad: 'Puerto Madero, Buenos Aires',
    rating: 4,
    texto: 'Vista de 360° sin exagerar. La carta es sofisticada sin ser pretenciosa. El servicio, de primer nivel. Un imprescindible de la noche porteña.',
    fecha: 'hace 1 mes',
  },
];

export default function CieloResenas() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => setActive(a => (a + 1) % RESENAS.length), 5000);
  };
  const stopTimer = () => { if (timerRef.current) clearInterval(timerRef.current); };

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, []);

  return (
    <section className="py-32" style={{ background: '#161310' }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-1 mb-3">
            {'★★★★★'.split('').map((s, i) => (
              <span key={i} style={{ color: '#B8966E', fontSize: '18px' }}>{s}</span>
            ))}
          </div>
          <div className="font-titulo text-4xl font-light mb-1" style={{ color: '#EDE0CC' }}>4.9 de 5</div>
          <div className="font-display text-[10px] tracking-[0.4em]" style={{ color: '#9E8E7A' }}>
            BASADO EN 847 EXPERIENCIAS REALES — GOOGLE · TRIPADVISOR
          </div>
        </motion.div>

        {/* Carrusel */}
        <div
          className="relative"
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
        >
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto px-8 py-14"
            style={{ background: '#1E1A14', border: '1px solid rgba(184,150,110,0.12)' }}
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-8">
              {Array.from({ length: RESENAS[active].rating }).map((_, i) => (
                <span key={i} style={{ color: '#B8966E' }}>★</span>
              ))}
              {RESENAS[active].rating < 5 && <span style={{ color: 'rgba(184,150,110,0.3)' }}>★</span>}
            </div>

            {/* Comillas decorativas */}
            <div className="font-titulo text-6xl font-light mb-4" style={{ color: 'rgba(184,150,110,0.15)', lineHeight: 0.5 }}>"</div>

            {/* Texto */}
            <p
              className="font-titulo text-xl font-light leading-[1.7] mb-10"
              style={{ color: '#EDE0CC', fontStyle: 'italic' }}
            >
              {RESENAS[active].texto}
            </p>

            {/* Autor */}
            <div>
              <div className="font-display text-xs tracking-[0.3em]" style={{ color: '#EDE0CC' }}>
                {RESENAS[active].nombre}
              </div>
              <div className="font-display text-[9px] tracking-[0.3em] mt-1" style={{ color: '#9E8E7A' }}>
                {RESENAS[active].ciudad} · {RESENAS[active].fecha}
              </div>
            </div>
          </motion.div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {RESENAS.map((_, i) => (
              <button
                key={i}
                onClick={() => { stopTimer(); setActive(i); startTimer(); }}
                className="h-px transition-all duration-500"
                style={{
                  width: i === active ? '40px' : '16px',
                  background: i === active ? '#B8966E' : 'rgba(184,150,110,0.25)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
