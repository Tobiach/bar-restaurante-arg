import { motion } from 'motion/react';
import { Diamond } from 'lucide-react';
import { getConfig, getActiveData } from '../../../config/active';

const BENEFICIOS = [
  'Reserva de livings con prioridad',
  'Cocktail de bienvenida en cada visita',
  'Invitaciones a eventos exclusivos',
  'Descuentos en carta y eventos privados',
];

export default function CieloClub() {
  const tc = getConfig();
  const data = getActiveData();
  const usuario = data?.usuario || tc.club.demoUser;
  const pct = Math.round((usuario.puntos / (tc.club.demoUser.meta || 2000)) * 100);

  return (
    <section id="cielo-club" className="py-32" style={{ background: '#0E0C09' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <span className="font-display text-[10px] tracking-[0.5em] uppercase" style={{ color: '#B8966E' }}>◇ MEMBRESÍA</span>

            <h2 className="font-titulo font-light mt-4 mb-8" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: '#EDE0CC', fontStyle: 'italic' }}>
              La noche tiene<br />sus privilegios.
            </h2>

            <div className="w-10 h-px mb-8" style={{ background: '#B8966E' }} />

            <p className="text-base leading-[1.9] mb-10" style={{ color: '#9E8E7A' }}>
              Membresía exclusiva para quienes hacen del Cielo su lugar.
              Acceso prioritario, descuentos reales, eventos antes que nadie.
            </p>

            <ul className="space-y-4 mb-12">
              {BENEFICIOS.map(b => (
                <li key={b} className="flex items-start gap-4 text-sm" style={{ color: '#9E8E7A' }}>
                  <Diamond size={12} className="mt-0.5 shrink-0" style={{ color: '#B8966E' }} />
                  {b}
                </li>
              ))}
            </ul>

            <a
              href="#cielo-reservas"
              className="inline-flex items-center gap-3 font-display text-xs tracking-[0.35em] uppercase px-10 py-4 transition-all"
              style={{ background: '#B8966E', color: '#0E0C09' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#D4B896'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#B8966E'; }}
            >
              UNIRME AL CIELO CLUB →
            </a>
          </motion.div>

          {/* Tarjeta de membresía */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div
              className="rounded-2xl p-10 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1E1A14 0%, #2A2218 50%, #1E1A14 100%)',
                border: '1px solid rgba(184,150,110,0.3)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
              }}
            >
              {/* Shimmer overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(184,150,110,0.06) 50%, transparent 60%)' }}
              />

              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <Diamond size={16} style={{ color: '#B8966E' }} />
                  <span className="font-display text-xs tracking-[0.35em]" style={{ color: '#EDE0CC' }}>CIELO ROOFTOP</span>
                </div>
                <span
                  className="font-display text-[9px] tracking-[0.3em] px-3 py-1"
                  style={{ background: 'rgba(184,150,110,0.15)', color: '#B8966E', border: '1px solid rgba(184,150,110,0.3)' }}
                >
                  {usuario.nivel}
                </span>
              </div>

              {/* Nombre */}
              <div className="mb-10">
                <div className="font-titulo text-3xl font-light mb-1" style={{ color: '#EDE0CC' }}>{usuario.nombre}</div>
                <div className="font-display text-[9px] tracking-[0.4em]" style={{ color: '#9E8E7A' }}>PALERMO · PISO 18 · BUENOS AIRES</div>
              </div>

              {/* Puntos y barra */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-display text-[9px] tracking-[0.3em]" style={{ color: '#9E8E7A' }}>PUNTOS ACUMULADOS</span>
                  <span className="font-display text-[9px] tracking-[0.3em]" style={{ color: '#B8966E' }}>
                    {usuario.puntos.toLocaleString()} / {(tc.club.demoUser.meta || 2000).toLocaleString()}
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(184,150,110,0.15)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ background: 'linear-gradient(90deg, #8B6E4E, #B8966E, #D4B896)' }}
                  >
                    <div className="absolute inset-0 animate-shimmer" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
                  </motion.div>
                </div>
              </div>

              {/* Recompensas mini */}
              <div className="grid grid-cols-2 gap-3 mt-8">
                {tc.club.recompensas.slice(0, 4).map((r: any) => (
                  <div
                    key={r.pts}
                    className="p-3 text-center"
                    style={{ background: 'rgba(14,12,9,0.5)', border: '1px solid rgba(184,150,110,0.1)' }}
                  >
                    <div className="font-titulo text-lg font-light" style={{ color: usuario.puntos >= r.pts ? '#B8966E' : '#9E8E7A' }}>
                      {r.pts}
                    </div>
                    <div className="font-display text-[8px] tracking-wider" style={{ color: '#9E8E7A' }}>{r.gift}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
