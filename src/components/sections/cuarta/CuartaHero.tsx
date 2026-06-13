import { motion } from 'motion/react';
import { ChevronDown, Beer, FlaskConical, Star } from 'lucide-react';
import { getConfig } from '../../../config/active';
import CountUp from '../../ui/CountUp';

const STAT_ICONS = [Beer, FlaskConical, Star];

export default function CuartaHero() {
  const tc = getConfig();

  return (
    <section style={{ position: 'relative', minHeight: '100vh', background: '#0D1A0D', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1800&q=80"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.28) saturate(1.3)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0D1A0D 25%, rgba(13,26,13,0.65) 60%, rgba(13,26,13,0.2) 100%)' }} />
        {/* Warm amber side glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(200,169,110,0.06) 0%, transparent 70%)' }} />
      </div>

      {/* Ticker strip top */}
      <div style={{ position: 'absolute', top: '64px', left: 0, right: 0, overflow: 'hidden', height: '36px', display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
        <div className="animate-marquee" style={{ display: 'flex', gap: '48px', whiteSpace: 'nowrap', paddingLeft: '48px' }}>
          {[...tc.ticker, ...tc.ticker].map((t: string, i: number) => (
            <span key={i} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.3em', color: 'rgba(200,169,110,0.4)', textTransform: 'uppercase' }}>
              ◆ {t}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px', paddingBottom: '80px', paddingTop: '130px', width: '100%' }}>

        {/* Badge line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}
        >
          <div style={{ width: '40px', height: '1px', background: '#C8A96E' }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.5em', color: '#C8A96E', textTransform: 'uppercase' }}>
            CERVECERÍA ARTESANAL · BUENOS AIRES
          </span>
        </motion.div>

        {/* Headline */}
        <div style={{ overflow: 'hidden' }}>
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(76px, 13vw, 168px)', lineHeight: 0.88, letterSpacing: '0.02em', color: '#E8DCC8' }}
          >
            NOS TRAJO
          </motion.div>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: '28px' }}>
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(76px, 13vw, 168px)', lineHeight: 0.88, letterSpacing: '0.02em', color: '#C8A96E' }}
          >
            LA TERCERA
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(16px, 2.2vw, 24px)', color: '#9E8E7A', maxWidth: '520px', marginBottom: '40px', lineHeight: 1.4 }}
        >
          {tc.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}
        >
          <a
            href="#cuarta-menu"
            style={{
              background: '#C8A96E', color: '#0D1A0D',
              padding: '15px 40px',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '13px', letterSpacing: '0.28em', fontWeight: 700,
              textDecoration: 'none', textTransform: 'uppercase',
              transition: 'background 0.2s', display: 'inline-block',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#DFC28A'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C8A96E'; }}
          >
            {tc.hero.cta1}
          </a>
          <a
            href="#cuarta-reservas"
            style={{
              border: '1px solid rgba(200,169,110,0.35)', color: '#E8DCC8',
              padding: '15px 40px',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '13px', letterSpacing: '0.28em', fontWeight: 700,
              textDecoration: 'none', textTransform: 'uppercase',
              transition: 'all 0.2s', display: 'inline-block',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C8A96E'; (e.currentTarget as HTMLElement).style.color = '#C8A96E'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.35)'; (e.currentTarget as HTMLElement).style.color = '#E8DCC8'; }}
          >
            {tc.hero.cta2}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '36px', paddingTop: '28px', borderTop: '1px solid rgba(200,169,110,0.1)' }}
        >
          {(tc.stats || []).map((stat: any, i: number) => {
            const Icon = STAT_ICONS[i] || Beer;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon size={20} style={{ color: '#C8A96E', flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '34px', color: '#DFC28A', lineHeight: 1 }}>
                    <CountUp end={stat.valor} suffix={stat.sufijo} />
                  </div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.22em', color: '#9E8E7A', textTransform: 'uppercase' }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', color: '#C8A96E', opacity: 0.4 }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
