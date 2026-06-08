import { Diamond, Instagram, MapPin, Phone, MessageCircle, Calendar } from 'lucide-react';
import { getConfig } from '../../../config/active';
import { useToast } from '../../Toast';

const LINKS_EXPERIENCIAS = [
  { label: 'Livings VIP', href: '#cielo-servicios' },
  { label: 'Cocktails de Autor', href: '#cielo-carta' },
  { label: 'Eventos Privados', href: '#cielo-eventos' },
  { label: 'Cielo Club', href: '#cielo-club' },
];

const LINKS_INFO = [
  { label: 'Sobre Nosotros', href: '#cielo-intro' },
  { label: 'Membresía', href: '#cielo-club' },
  { label: 'Galería', href: '#cielo-galeria' },
  { label: 'Contacto', href: '#cielo-contacto' },
];

export default function CieloFooter() {
  const tc = getConfig();
  const { showToast } = useToast();
  const WA_URL = `https://wa.me/${tc.whatsapp}`;

  return (
    <footer style={{ background: '#161310', borderTop: '1px solid rgba(184,150,110,0.12)' }}>
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Col izquierda — identidad */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <Diamond size={14} style={{ color: '#B8966E' }} />
              <span className="font-display tracking-[0.3em] text-sm" style={{ color: '#EDE0CC' }}>CIELO ROOFTOP</span>
            </div>
            <p className="text-sm leading-relaxed mb-8" style={{ color: '#9E8E7A' }}>
              Buenos Aires desde arriba.
            </p>
            <div className="space-y-3 text-sm" style={{ color: '#9E8E7A' }}>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: '#B8966E' }} />
                <span>{tc.direccion}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} style={{ color: '#B8966E' }} />
                <span>{tc.telefono}</span>
              </div>
              <div className="flex items-center gap-3">
                <span style={{ color: '#B8966E', fontSize: '14px' }}>@</span>
                <a
                  href={`https://instagram.com/${tc.instagram}`}
                  target="_blank"
                  className="hover:text-naranja transition-colors"
                  style={{ color: '#9E8E7A' }}
                >
                  {tc.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Instagram size={14} style={{ color: '#B8966E' }} />
                <a
                  href={`https://instagram.com/${tc.instagram}`}
                  target="_blank"
                  className="transition-colors"
                  style={{ color: '#9E8E7A' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#B8966E'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = '#9E8E7A'; }}
                >
                  @{tc.instagram}
                </a>
              </div>
            </div>
          </div>

          {/* Col centro — experiencias */}
          <div>
            <h4 className="font-display text-[9px] tracking-[0.5em] uppercase mb-8" style={{ color: '#B8966E' }}>EXPERIENCIAS</h4>
            <div className="flex flex-col gap-4">
              {LINKS_EXPERIENCIAS.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm transition-colors"
                  style={{ color: '#9E8E7A' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#EDE0CC'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = '#9E8E7A'; }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col derecha — información */}
          <div>
            <h4 className="font-display text-[9px] tracking-[0.5em] uppercase mb-8" style={{ color: '#B8966E' }}>INFORMACIÓN</h4>
            <div className="flex flex-col gap-4">
              {LINKS_INFO.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm transition-colors"
                  style={{ color: '#9E8E7A' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#EDE0CC'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = '#9E8E7A'; }}
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => showToast(`Sumate a nuestro newsletter: ${tc.email}`, 'info')}
                className="text-sm text-left transition-colors"
                style={{ color: '#9E8E7A' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = '#EDE0CC'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = '#9E8E7A'; }}
              >
                Newsletter
              </button>
            </div>
          </div>
        </div>

        {/* Horarios */}
        <div className="py-8 mb-8" style={{ borderTop: '1px solid rgba(184,150,110,0.1)', borderBottom: '1px solid rgba(184,150,110,0.1)' }}>
          <div className="flex flex-wrap gap-8 justify-center">
            {tc.horarios.detalle.map((d: string, i: number) => (
              <span key={i} className="font-display text-[9px] tracking-[0.3em] uppercase" style={{ color: '#9E8E7A' }}>{d}</span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-display text-[9px] tracking-[0.2em] uppercase" style={{ color: '#9E8E7A' }}>
            {tc.footer.copyright}
          </span>
          <div className="flex gap-6">
            <button onClick={() => showToast('Sección en construcción', 'info')} className="font-display text-[9px] tracking-widest uppercase transition-colors" style={{ color: '#9E8E7A' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = '#B8966E'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = '#9E8E7A'; }}
            >Privacidad</button>
            <button onClick={() => showToast('Sección en construcción', 'info')} className="font-display text-[9px] tracking-widest uppercase transition-colors" style={{ color: '#9E8E7A' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = '#B8966E'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = '#9E8E7A'; }}
            >Términos</button>
            <a href="#" className="font-display text-[9px] tracking-widest uppercase transition-colors" style={{ color: '#B8966E' }}>
              Diseñado por Control.Evo
            </a>
          </div>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="md:hidden sticky bottom-0 left-0 w-full h-16 flex z-50" style={{ background: '#161310', borderTop: '1px solid rgba(184,150,110,0.15)' }}>
        <a href={`tel:${tc.telefono}`} className="flex-1 flex flex-col items-center justify-center gap-1" style={{ borderRight: '1px solid rgba(184,150,110,0.12)' }}>
          <Phone size={18} style={{ color: '#B8966E' }} />
          <span className="font-display text-[8px] tracking-widest" style={{ color: '#9E8E7A' }}>LLAMAR</span>
        </a>
        <a href={WA_URL} target="_blank" className="flex-1 flex flex-col items-center justify-center gap-1" style={{ borderRight: '1px solid rgba(184,150,110,0.12)' }}>
          <MessageCircle size={18} style={{ color: '#4CAF88' }} />
          <span className="font-display text-[8px] tracking-widest" style={{ color: '#9E8E7A' }}>WHATSAPP</span>
        </a>
        <a href="#cielo-reservas" className="flex-1 flex flex-col items-center justify-center gap-1" style={{ background: '#B8966E' }}>
          <Calendar size={18} style={{ color: '#0E0C09' }} />
          <span className="font-display text-[8px] tracking-widest" style={{ color: '#0E0C09' }}>RESERVAR</span>
        </a>
      </div>
    </footer>
  );
}
