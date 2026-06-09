import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Star, MessageCircle } from 'lucide-react';
import { getConfig, getActiveData } from '../../../config/active';
import { useToast } from '../../Toast';

export default function CuartaResenas() {
  const tc = getConfig();
  const data = getActiveData();
  const { showToast } = useToast();
  const WA_URL = `https://wa.me/${tc.whatsapp}`;
  const resenas: any[] = data?.resenas || [];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || resenas.length === 0) return;
    timerRef.current = setInterval(() => setActive(a => (a + 1) % resenas.length), 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, resenas.length]);

  return (
    <section id="cuarta-resenas" style={{ background: '#080507', padding: '96px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: '56px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '1px', background: '#C8921C' }} />
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.5em', color: '#C8921C', textTransform: 'uppercase' }}>
                {tc.labels?.resenas || 'LO QUE DICEN'}
              </span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(52px, 7vw, 96px)', letterSpacing: '0.02em', color: '#F0E2BF', lineHeight: 0.9, margin: 0 }}>
              LA GENTE
            </h2>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(52px, 7vw, 96px)', letterSpacing: '0.02em', color: '#C8921C', lineHeight: 0.9, margin: 0 }}>
              LO DICE
            </h2>
          </div>
          <button
            onClick={() => {
              const msg = `Hola! Quiero dejar mi reseña sobre ${tc.nombre}.`;
              window.open(`${WA_URL}?text=${encodeURIComponent(msg)}`, '_blank');
            }}
            style={{
              border: '1px solid rgba(200,146,28,0.3)', color: '#F0E2BF', background: 'transparent',
              padding: '12px 24px', cursor: 'pointer',
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', letterSpacing: '0.25em', fontWeight: 700, textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C8921C'; (e.currentTarget as HTMLElement).style.color = '#C8921C'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,146,28,0.3)'; (e.currentTarget as HTMLElement).style.color = '#F0E2BF'; }}
          >
            <MessageCircle size={14} /> DEJAR MI RESEÑA
          </button>
        </motion.div>

        {/* Cards scroll */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}
        >
          {resenas.map((r: any, i: number) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setActive(i)}
              style={{
                background: active === i ? 'rgba(200,146,28,0.06)' : '#1C1508',
                border: `1px solid ${active === i ? 'rgba(200,146,28,0.3)' : 'rgba(200,146,28,0.07)'}`,
                padding: '28px 24px',
                cursor: 'pointer', transition: 'all 0.3s',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} style={{ color: j < r.rating ? '#C8921C' : 'rgba(200,146,28,0.15)', fill: j < r.rating ? '#C8921C' : 'none' }} />
                ))}
              </div>

              {/* Text */}
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '17px', color: '#9E8050', lineHeight: 1.6, marginBottom: '20px', fontStyle: 'italic' }}>
                "{r.texto}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: active === i ? '#C8921C' : 'rgba(200,146,28,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '14px', color: active === i ? '#080507' : '#C8921C' }}>
                    {r.nombre.charAt(0)}
                  </span>
                </div>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '14px', color: '#F0E2BF', fontWeight: 600 }}>{r.nombre}</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', color: '#9E8050', letterSpacing: '0.1em' }}>{r.fecha}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
          {resenas.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: active === i ? '24px' : '8px', height: '8px',
                background: active === i ? '#C8921C' : 'rgba(200,146,28,0.2)',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
