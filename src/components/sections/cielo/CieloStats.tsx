import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const STATS = [
  { valor: 18, sufijo: '°', label: 'PISO', sublabel: 'con vista 360°' },
  { valor: 40, sufijo: '+', label: 'COCKTAILS', sublabel: 'de autor' },
  { valor: 5,  sufijo: '★', label: 'EXPERIENCIA', sublabel: 'premium' },
  { valor: null, sufijo: '', label: 'JUE–SÁB', sublabel: 'abierto desde las 19hs' },
];

function AnimatedNumber({ target, sufijo }: { target: number; sufijo: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(target / 30);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
          }, 40);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{sufijo}</span>;
}

export default function CieloStats() {
  return (
    <section className="py-24" style={{ background: '#161310' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center py-14 px-6 text-center relative"
              style={{ borderRight: i < 3 ? '1px solid rgba(184,150,110,0.15)' : 'none' }}
            >
              {/* Número o texto grande */}
              <div
                className="font-titulo font-light mb-2"
                style={{ fontSize: 'clamp(52px, 7vw, 88px)', color: '#B8966E', lineHeight: 1, letterSpacing: '-0.03em' }}
              >
                {s.valor !== null
                  ? <AnimatedNumber target={s.valor} sufijo={s.sufijo} />
                  : <span style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontStyle: 'italic', color: '#EDE0CC' }}>Jue–Sáb</span>
                }
              </div>
              <div className="font-display tracking-[0.3em] text-[11px] mb-1" style={{ color: '#EDE0CC' }}>
                {s.valor !== null ? s.label : ''}
              </div>
              <div className="font-display text-[10px] tracking-widest" style={{ color: '#9E8E7A' }}>
                {s.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
