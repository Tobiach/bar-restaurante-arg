import { Beer, MapPin, Phone, Instagram, MessageCircle, Calendar } from 'lucide-react';
import { getConfig } from '../../../config/active';

export default function CuartaFooter() {
  const tc = getConfig();
  const WA_URL = `https://wa.me/${tc.whatsapp}`;

  return (
    <footer style={{ background: '#0D1A0D', borderTop: '1px solid rgba(200,169,110,0.1)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px 48px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '48px', marginBottom: '48px' }}>

          {/* Identidad */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Beer size={20} style={{ color: '#C8A96E' }} />
              <div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '9px', letterSpacing: '0.35em', color: '#9E8E7A', lineHeight: 1, textTransform: 'uppercase' }}>NOS TRAJO</div>
                <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '20px', letterSpacing: '0.08em', color: '#E8DCC8', lineHeight: 1 }}>LA TERCERA</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '15px', color: '#9E8E7A', lineHeight: 1.6, marginBottom: '20px', maxWidth: '260px' }}>
              {tc.footer.descripcion}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={13} style={{ color: '#C8A96E', marginTop: '3px', flexShrink: 0 }} />
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '14px', color: '#9E8E7A' }}>{tc.direccion}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={13} style={{ color: '#C8A96E' }} />
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '14px', color: '#9E8E7A' }}>{tc.telefono}</span>
              </div>
              <a href={`https://instagram.com/${tc.instagram}`} target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <Instagram size={13} style={{ color: '#C8A96E' }} />
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '14px', color: '#9E8E7A', transition: 'color 0.2s' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#C8A96E'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = '#9E8E7A'; }}
                >
                  @{tc.instagram}
                </span>
              </a>
            </div>
          </div>

          {/* Explorar */}
          <div>
            <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '9px', letterSpacing: '0.5em', color: '#C8A96E', textTransform: 'uppercase', marginBottom: '20px' }}>EXPLORAR</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(tc.footer.links?.explorar || []).map((l: any) => (
                <a
                  key={l.label} href={l.href}
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '15px', color: '#9E8E7A', textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '0.05em' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#E8DCC8'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9E8E7A'; }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Festejos */}
          <div>
            <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '9px', letterSpacing: '0.5em', color: '#C8A96E', textTransform: 'uppercase', marginBottom: '20px' }}>FESTEJOS</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(tc.footer.links?.festejos || []).map((l: any) => (
                <a
                  key={l.label} href={l.href}
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '15px', color: '#9E8E7A', textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '0.05em' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#E8DCC8'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9E8E7A'; }}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Horarios quick */}
            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(200,169,110,0.08)' }}>
              <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '9px', letterSpacing: '0.5em', color: '#C8A96E', textTransform: 'uppercase', marginBottom: '10px' }}>HORARIOS</h4>
              {tc.horarios.detalle.map((d: string, i: number) => (
                <div key={i} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', color: '#9E8E7A', marginBottom: '4px', letterSpacing: '0.05em' }}>{d}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(200,169,110,0.07)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(160,128,64,0.4)', textTransform: 'uppercase' }}>
            {tc.footer.copyright}
          </span>
          <a
            href="#"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', letterSpacing: '0.2em', color: '#C8A96E', textDecoration: 'none', textTransform: 'uppercase', opacity: 0.6, transition: 'opacity 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0.6'; }}
          >
            Diseñado por Control.Evo
          </a>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="md:hidden" style={{ position: 'sticky', bottom: 0, left: 0, width: '100%', height: '64px', display: 'flex', background: '#0D1A0D', borderTop: '1px solid rgba(200,169,110,0.15)', zIndex: 50 }}>
        <a href={`tel:${tc.telefono}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', textDecoration: 'none', borderRight: '1px solid rgba(200,169,110,0.1)' }}>
          <Phone size={18} style={{ color: '#C8A96E' }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '8px', letterSpacing: '0.25em', color: '#9E8E7A', textTransform: 'uppercase' }}>LLAMAR</span>
        </a>
        <a href={WA_URL} target="_blank" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', textDecoration: 'none', borderRight: '1px solid rgba(200,169,110,0.1)' }}>
          <MessageCircle size={18} style={{ color: '#4CAF88' }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '8px', letterSpacing: '0.25em', color: '#9E8E7A', textTransform: 'uppercase' }}>WHATSAPP</span>
        </a>
        <a href="#cuarta-reservas" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', textDecoration: 'none', background: '#C8A96E' }}>
          <Calendar size={18} style={{ color: '#0D1A0D' }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '8px', letterSpacing: '0.25em', color: '#0D1A0D', fontWeight: 700, textTransform: 'uppercase' }}>RESERVAR</span>
        </a>
      </div>
    </footer>
  );
}
