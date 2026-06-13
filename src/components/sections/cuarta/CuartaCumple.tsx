import { motion } from 'motion/react';
import { Check, MessageCircle, PartyPopper } from 'lucide-react';
import { getConfig } from '../../../config/active';
import { reservationStore } from '../../../store/reservationStore';

export default function CuartaCumple() {
  const tc = getConfig();
  const WA_URL = `https://wa.me/${tc.whatsapp}`;

  const handlePack = (packTitle: string) => {
    reservationStore.set({ tipo: 'Cumpleaños', pack: packTitle });
    const el = document.getElementById('cuarta-reservas');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="cuarta-cumple" style={{ background: '#1A3A1A', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '1px', background: '#C8A96E' }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.5em', color: '#C8A96E', textTransform: 'uppercase' }}>
              {tc.labels?.cumpleanos || 'FESTEJOS'}
            </span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(52px, 7vw, 96px)', letterSpacing: '0.02em', color: '#E8DCC8', lineHeight: 0.9, margin: 0 }}>
            CELEBRÁ EN
          </h2>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(52px, 7vw, 96px)', letterSpacing: '0.02em', color: '#C8A96E', lineHeight: 0.9, margin: 0 }}>
            LA TERCERA
          </h2>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', color: '#9E8E7A', marginTop: '20px', maxWidth: '520px' }}>
            Cumpleaños, grupos, eventos privados. Armamos el festejo que se merezca.
          </p>
        </motion.div>

        {/* Packs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {tc.packs.map((pack: any, i: number) => (
            <motion.div
              key={pack.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                background: pack.featured ? 'rgba(200,169,110,0.06)' : '#152B15',
                border: `1px solid ${pack.featured ? '#C8A96E' : 'rgba(200,169,110,0.1)'}`,
                padding: '36px 28px',
                position: 'relative',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => { if (!pack.featured) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.3)'; }}
              onMouseLeave={e => { if (!pack.featured) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.1)'; }}
            >
              {/* Featured badge */}
              {pack.featured && (
                <div style={{ position: 'absolute', top: '-12px', left: '24px', background: '#C8A96E', color: '#0D1A0D', padding: '4px 12px', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '9px', letterSpacing: '0.3em', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <PartyPopper size={10} /> MÁS ELEGIDO
                </div>
              )}

              {/* Number */}
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '80px', color: pack.featured ? 'rgba(200,169,110,0.1)' : 'rgba(200,169,110,0.05)', lineHeight: 1, position: 'absolute', top: '16px', right: '20px' }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Title */}
              <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '28px', letterSpacing: '0.06em', color: '#E8DCC8', marginBottom: '20px', lineHeight: 1.1 }}>
                {pack.title}
              </h3>

              {/* Items */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {pack.items.map((item: string, j: number) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Check size={14} style={{ color: '#C8A96E', marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '15px', color: '#9E8E7A', lineHeight: 1.4 }}>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '24px' }}>
                <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '40px', color: '#C8A96E', letterSpacing: '0.04em', lineHeight: 1 }}>
                  {pack.price}
                </span>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '12px', color: '#9E8E7A', textTransform: 'uppercase', letterSpacing: '0.15em' }}>/ por grupo</span>
              </div>

              <button
                onClick={() => handlePack(pack.title)}
                style={{
                  width: '100%', padding: '13px',
                  background: pack.featured ? '#C8A96E' : 'transparent',
                  color: pack.featured ? '#0D1A0D' : '#E8DCC8',
                  border: `1px solid ${pack.featured ? '#C8A96E' : 'rgba(200,169,110,0.3)'}`,
                  cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '12px', letterSpacing: '0.25em', fontWeight: 700, textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; if (!pack.featured) { el.style.background = 'rgba(200,169,110,0.1)'; el.style.borderColor = '#C8A96E'; } else { el.style.background = '#DFC28A'; } }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; if (!pack.featured) { el.style.background = 'transparent'; el.style.borderColor = 'rgba(200,169,110,0.3)'; } else { el.style.background = '#C8A96E'; } }}
              >
                <MessageCircle size={14} /> RESERVAR ESTE PACK
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '14px', color: 'rgba(160,128,64,0.5)', textAlign: 'center', marginTop: '36px', textTransform: 'uppercase', letterSpacing: '0.15em' }}
        >
          Precios sujetos a actualización · Consultá disponibilidad antes de reservar
        </motion.p>
      </div>
    </section>
  );
}
