import { motion } from 'motion/react';
import { Beer } from 'lucide-react';
import { getActiveData } from '../../../config/active';

export default function CuartaBeerSpotlight() {
  const data = getActiveData();
  const canillas: any[] = (data?.menu || []).filter((i: any) => i.cat === 'CANILLAS');

  return (
    <section id="cuarta-spotlight" style={{ background: '#0D1A0D', padding: '80px 0 60px', overflow: 'hidden' }}>
      {/* Section header */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', marginBottom: '64px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '1px', background: '#C8A96E' }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.5em', color: '#C8A96E', textTransform: 'uppercase' }}>
              TIRANDO EN VIVO
            </span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(52px, 7vw, 96px)', letterSpacing: '0.02em', color: '#E8DCC8', lineHeight: 0.9, margin: 0 }}>
            LAS CANILLAS
          </h2>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(52px, 7vw, 96px)', letterSpacing: '0.02em', color: '#C8A96E', lineHeight: 0.9, margin: 0 }}>
            DE HOY
          </h2>
        </motion.div>
      </div>

      {/* Beer list — alternating layout */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {canillas.map((beer: any, i: number) => (
          <motion.div
            key={beer.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{
              gap: '0',
              borderBottom: i < canillas.length - 1 ? '1px solid rgba(200,169,110,0.08)' : 'none',
              padding: '40px 0',
              alignItems: 'center',
            }}
          >
            {/* Number + details */}
            <div style={{ order: i % 2 === 0 ? 0 : 1, paddingRight: i % 2 === 0 ? '40px' : '0', paddingLeft: i % 2 !== 0 ? '40px' : '0' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '12px' }}>
                <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '80px', color: 'rgba(200,169,110,0.08)', lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(28px, 3vw, 44px)', color: '#E8DCC8', lineHeight: 1, letterSpacing: '0.04em' }}>
                    {beer.nombre}
                  </div>
                  {beer.badges?.length > 0 && (
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.3em', color: '#C8A96E', textTransform: 'uppercase', background: 'rgba(200,169,110,0.1)', padding: '2px 8px' }}>
                      {beer.badges[0]}
                    </span>
                  )}
                </div>
              </div>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '17px', color: '#9E8E7A', marginBottom: '16px', lineHeight: 1.5, maxWidth: '380px' }}>
                {beer.desc}
              </p>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '28px', color: '#C8A96E', letterSpacing: '0.04em' }}>
                ${beer.precio.toLocaleString('es-AR')}
              </div>
            </div>

            {/* Visual side */}
            <div className="hidden lg:flex" style={{ order: i % 2 === 0 ? 1 : 0, alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.4 }}
                style={{
                  width: '160px', height: '160px', borderRadius: '50%',
                  background: `radial-gradient(circle, rgba(200,169,110,0.12) 0%, rgba(13,26,13,0.8) 70%)`,
                  border: '1px solid rgba(200,169,110,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <Beer size={52} style={{ color: '#9A7A45', opacity: 0.7 }} strokeWidth={1.2} />
                {/* Amber glow ring */}
                <div style={{
                  position: 'absolute', inset: '-12px', borderRadius: '50%',
                  border: '1px solid rgba(200,169,110,0.06)',
                }} />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA banner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          maxWidth: '1280px', margin: '56px auto 0', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px',
        }}
      >
        <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', color: '#9E8E7A', letterSpacing: '0.05em' }}>
          Las canillas rotan semanalmente. Consultá disponibilidad.
        </p>
        <a
          href="#cuarta-menu"
          style={{
            border: '1px solid rgba(200,169,110,0.3)', color: '#E8DCC8',
            padding: '12px 28px',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '11px', letterSpacing: '0.25em', fontWeight: 700,
            textDecoration: 'none', textTransform: 'uppercase', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C8A96E'; (e.currentTarget as HTMLElement).style.color = '#C8A96E'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.3)'; (e.currentTarget as HTMLElement).style.color = '#E8DCC8'; }}
        >
          VER CARTA COMPLETA →
        </a>
      </motion.div>
    </section>
  );
}
