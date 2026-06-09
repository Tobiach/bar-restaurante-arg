import { motion } from 'motion/react';
import { MapPin, Phone, Instagram, Clock, MessageCircle } from 'lucide-react';
import { getConfig } from '../../../config/active';

export default function CuartaContacto() {
  const tc = getConfig();
  const WA_URL = `https://wa.me/${tc.whatsapp}`;

  return (
    <section id="cuarta-contacto" style={{ background: '#1C1508', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '1px', background: '#C8921C' }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.5em', color: '#C8921C', textTransform: 'uppercase' }}>
              {tc.labels?.contacto || 'CÓMO LLEGAR'}
            </span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(52px, 7vw, 96px)', letterSpacing: '0.02em', color: '#F0E2BF', lineHeight: 0.9, margin: 0 }}>
            ENCONTRANOS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '40px', alignItems: 'start' }}>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ height: '400px', overflow: 'hidden', border: '1px solid rgba(200,146,28,0.1)' }}
          >
            <iframe
              src={`https://maps.google.com/maps?q=${tc.googleMapsQuery}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(80%) invert(90%) hue-rotate(175deg) saturate(0.7)', display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
          >
            {/* Address */}
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <MapPin size={18} style={{ color: '#C8921C', marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.3em', color: '#C8921C', textTransform: 'uppercase', marginBottom: '4px' }}>DIRECCIÓN</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', color: '#F0E2BF' }}>{tc.direccion}</div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Clock size={18} style={{ color: '#C8921C', marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.3em', color: '#C8921C', textTransform: 'uppercase', marginBottom: '8px' }}>HORARIOS</div>
                  {tc.horarios.detalle.map((d: string, i: number) => (
                    <div key={i} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '17px', color: '#9E8050', marginBottom: '4px' }}>{d}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone size={18} style={{ color: '#C8921C', flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.3em', color: '#C8921C', textTransform: 'uppercase', marginBottom: '4px' }}>TELÉFONO</div>
                  <a href={`tel:${tc.telefono}`} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', color: '#F0E2BF', textDecoration: 'none' }}>{tc.telefono}</a>
                </div>
              </div>
            </div>

            {/* Instagram */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Instagram size={18} style={{ color: '#C8921C', flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.3em', color: '#C8921C', textTransform: 'uppercase', marginBottom: '4px' }}>INSTAGRAM</div>
                  <a href={`https://instagram.com/${tc.instagram}`} target="_blank" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', color: '#F0E2BF', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C8921C'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#F0E2BF'; }}
                  >
                    @{tc.instagram}
                  </a>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '10px', paddingTop: '8px', flexWrap: 'wrap' }}>
              <a
                href={`https://maps.google.com/?q=${tc.googleMapsQuery}`}
                target="_blank"
                style={{
                  background: '#C8921C', color: '#080507', padding: '13px 24px',
                  fontFamily: "'Barlow Condensed', sans-serif", fontSize: '12px', letterSpacing: '0.25em', fontWeight: 700, textTransform: 'uppercase',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#E5AE38'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C8921C'; }}
              >
                <MapPin size={14} /> CÓMO LLEGAR
              </a>
              <a
                href={WA_URL}
                target="_blank"
                style={{
                  border: '1px solid rgba(200,146,28,0.3)', color: '#F0E2BF', padding: '13px 24px', background: 'transparent',
                  fontFamily: "'Barlow Condensed', sans-serif", fontSize: '12px', letterSpacing: '0.25em', fontWeight: 700, textTransform: 'uppercase',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C8921C'; (e.currentTarget as HTMLElement).style.color = '#C8921C'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,146,28,0.3)'; (e.currentTarget as HTMLElement).style.color = '#F0E2BF'; }}
              >
                <MessageCircle size={14} /> WHATSAPP
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
