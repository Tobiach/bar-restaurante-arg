import { motion } from 'motion/react';
import { Mic2, MessageCircle } from 'lucide-react';
import { getConfig } from '../../../config/active';
import { useToast } from '../../Toast';

export default function CuartaKaraoke() {
  const tc = getConfig();
  const { showToast } = useToast();
  const WA_URL = `https://wa.me/${tc.whatsapp}`;
  const k = tc.karaoke;

  return (
    <section id="cuarta-karaoke" style={{ position: 'relative', overflow: 'hidden', background: '#0D1A0D' }}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1400&q=80"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.15) saturate(1.4)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(13,26,13,0.92) 0%, rgba(13,26,13,0.7) 60%, rgba(13,26,13,0.92) 100%)' }} />
        {/* Amber side glow */}
        <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '40%', height: '80%', background: 'radial-gradient(ellipse at right, rgba(200,169,110,0.07) 0%, transparent 70%)' }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '96px 24px', gap: '64px', alignItems: 'center' }}>
        {/* Left text */}
        <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Mic2 size={18} style={{ color: '#C8A96E' }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.5em', color: '#C8A96E', textTransform: 'uppercase' }}>
              {k.titulo}
            </span>
          </div>

          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(64px, 9vw, 120px)', letterSpacing: '0.02em', lineHeight: 0.88, margin: '0 0 24px', color: '#E8DCC8' }}>
            KARAOKE
          </h2>
          <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(32px, 5vw, 60px)', letterSpacing: '0.04em', lineHeight: 1, margin: '0 0 28px', color: '#C8A96E' }}>
            LOS MARTES
          </h3>

          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', color: '#9E8E7A', marginBottom: '32px', lineHeight: 1.5, maxWidth: '380px', whiteSpace: 'pre-line' }}>
            {k.descripcion}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '36px', flexWrap: 'wrap' }}>
            <div style={{ borderLeft: '2px solid #C8A96E', paddingLeft: '12px' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.3em', color: '#C8A96E', textTransform: 'uppercase', marginBottom: '2px' }}>CONSUMICIÓN MÍN.</div>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '24px', color: '#E8DCC8' }}>{k.consumicionMinima}</div>
            </div>
            <div style={{ borderLeft: '2px solid rgba(200,169,110,0.3)', paddingLeft: '12px' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.3em', color: '#C8A96E', textTransform: 'uppercase', marginBottom: '2px' }}>PUNTOS QUE SUMÁS</div>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '24px', color: '#E8DCC8' }}>+{k.puntosGanados} pts</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                const msg = `Hola! Me quiero anotar para el Karaoke de los martes.`;
                window.open(`${WA_URL}?text=${encodeURIComponent(msg)}`, '_blank');
              }}
              style={{
                background: '#C8A96E', color: '#0D1A0D', padding: '14px 32px', border: 'none', cursor: 'pointer',
                fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#DFC28A'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C8A96E'; }}
            >
              <MessageCircle size={16} /> ANOTARME
            </button>
            <button
              onClick={() => showToast('Llegá desde las 21:00 hs para registrarte', 'info')}
              style={{
                background: 'transparent', color: '#E8DCC8', padding: '14px 24px',
                border: '1px solid rgba(200,169,110,0.3)', cursor: 'pointer',
                fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', letterSpacing: '0.2em', fontWeight: 700, textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C8A96E'; (e.currentTarget as HTMLElement).style.color = '#C8A96E'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.3)'; (e.currentTarget as HTMLElement).style.color = '#E8DCC8'; }}
            >
              ¿CÓMO FUNCIONA?
            </button>
          </div>
        </motion.div>

        {/* Right — genre chips */}
        <motion.div
          initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.12 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.4em', color: '#9E8E7A', textTransform: 'uppercase' }}>GÉNEROS QUE CANTAMOS</span>
          {k.generos.map((g: string, i: number) => (
            <motion.div
              key={g}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
              style={{
                padding: '16px 20px',
                background: i % 2 === 0 ? 'rgba(21,43,21,0.6)' : 'rgba(21,43,21,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderTop: '1px solid rgba(200,169,110,0.08)',
                borderRight: '1px solid rgba(200,169,110,0.08)',
                borderBottom: '1px solid rgba(200,169,110,0.08)',
                borderLeft: `3px solid ${i === 0 ? '#C8A96E' : 'rgba(200,169,110,0.2)'}`,
              }}
            >
              <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '22px', letterSpacing: '0.06em', color: i === 0 ? '#E8DCC8' : '#9E8E7A' }}>
                {g}
              </span>
              <Mic2 size={16} style={{ color: i === 0 ? '#C8A96E' : 'rgba(200,169,110,0.25)' }} />
            </motion.div>
          ))}

          {/* Flecha decorativa */}
          <div style={{ textAlign: 'right', paddingTop: '8px' }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', letterSpacing: '0.3em', color: 'rgba(200,169,110,0.3)', textTransform: 'uppercase' }}>
              Y MÁS ↓
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom divider strip */}
      <div style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(200,169,110,0.08)', padding: '20px 24px', overflowX: 'hidden' }}>
        <div className="animate-marquee" style={{ display: 'flex', gap: '48px', whiteSpace: 'nowrap' }}>
          {Array(8).fill(null).map((_, i) => (
            <span key={i} style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '13px', letterSpacing: '0.35em', color: 'rgba(200,169,110,0.15)', textTransform: 'uppercase' }}>
              ◆ KARAOKE MARTES 21:00 hs
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
