import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ChevronDown, MessageCircle, Beer, Ticket, Percent, Coffee } from 'lucide-react';
import { getConfig, getActiveData } from '../../../config/active';

const REWARD_ICONS = [Percent, Beer, Ticket, Coffee];

export default function CuartaPuntos() {
  const tc = getConfig();
  const data = getActiveData();
  const WA_URL = `https://wa.me/${tc.whatsapp}`;
  const { club } = tc;
  const usuario = data?.usuario || club.demoUser;
  const [expanded, setExpanded] = useState(false);
  const progress = Math.min((usuario.puntos / club.demoUser.meta) * 100, 100);

  return (
    <section id="cuarta-puntos" style={{ background: '#0D1A0D', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '1px', background: '#C8A96E' }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.5em', color: '#C8A96E', textTransform: 'uppercase' }}>
              {tc.labels?.puntos || 'CLUB LA CUARTA'}
            </span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(52px, 7vw, 96px)', letterSpacing: '0.02em', color: '#E8DCC8', lineHeight: 0.9, margin: '0 0 16px' }}>
            {club.nombre.toUpperCase()}
          </h2>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', color: '#9E8E7A', maxWidth: '460px' }}>
            {club.descripcion}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '32px', alignItems: 'start' }}>

          {/* Loyalty card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{
              background: '#1A3A1A',
              border: '1px solid rgba(200,169,110,0.15)',
              padding: '36px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background award icon */}
            <Award size={120} style={{ position: 'absolute', right: '-16px', top: '-16px', color: 'rgba(200,169,110,0.04)' }} />

            {/* Top amber strip */}
            <div style={{ height: '4px', background: 'linear-gradient(to right, #C8A96E, #DFC28A, rgba(200,169,110,0.3))', marginLeft: '-36px', marginRight: '-36px', marginTop: '-36px', position: 'relative', top: '-36px', marginBottom: '28px' }} />

            {/* User header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#C8A96E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '22px', color: '#0D1A0D' }}>
                  {usuario.nombre.charAt(0)}
                </span>
              </div>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '20px', color: '#E8DCC8', fontWeight: 600 }}>{usuario.nombre}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <span style={{ background: '#C8A96E', color: '#0D1A0D', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '9px', letterSpacing: '0.25em', fontWeight: 700, padding: '2px 8px', textTransform: 'uppercase' }}>
                    NIVEL {usuario.nivel}
                  </span>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', color: '#9E8E7A' }}>
                    {usuario.puntos} puntos
                  </span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', letterSpacing: '0.2em', color: '#9E8E7A', textTransform: 'uppercase' }}>
                  Progreso → {usuario.proximoNivel}
                </span>
                <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '16px', color: '#C8A96E' }}>
                  {usuario.puntos} / {club.demoUser.meta}
                </span>
              </div>
              <div style={{ height: '6px', background: 'rgba(200,169,110,0.1)', borderRadius: '0', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  style={{ height: '100%', background: 'linear-gradient(to right, #9A7A45, #C8A96E, #DFC28A)' }}
                />
              </div>

              {/* Milestone markers */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                {club.recompensas.map((r: any) => {
                  const pct = (r.pts / club.demoUser.meta) * 100;
                  const reached = usuario.puntos >= r.pts;
                  return (
                    <div key={r.pts} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: reached ? '#C8A96E' : 'rgba(200,169,110,0.2)', border: `1px solid ${reached ? '#C8A96E' : 'rgba(200,169,110,0.2)'}` }} />
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '9px', color: reached ? '#C8A96E' : '#9E8E7A', marginTop: '3px', letterSpacing: '0.1em' }}>
                        {r.pts}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '12px', color: '#9E8E7A', textAlign: 'right', fontStyle: 'italic', marginTop: '6px' }}>
                ¡Faltan {usuario.faltanPuntos} pts para ser {usuario.proximoNivel}!
              </p>
            </div>

            {/* History */}
            <button
              onClick={() => setExpanded(!expanded)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#9E8E7A', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: 0 }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C8A96E'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9E8E7A'; }}
            >
              VER HISTORIAL
              <ChevronDown size={14} style={{ transition: 'transform 0.3s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                  <div style={{ paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(usuario.historial || []).map((h: any, i: number) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px dashed rgba(200,169,110,0.1)' }}>
                        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '12px', color: '#9E8E7A' }}>{h.fecha}</span>
                        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '14px', color: '#E8DCC8', flex: 1, padding: '0 12px' }}>{h.desc}</span>
                        <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '16px', color: '#4CAF88' }}>+{h.puntos}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Canjes CTA */}
            <button
              onClick={() => {
                const msg = `Hola! Soy ${usuario.nombre} y quiero canjear mis ${usuario.puntos} puntos del Club La Cuarta.`;
                window.open(`${WA_URL}?text=${encodeURIComponent(msg)}`, '_blank');
              }}
              style={{
                width: '100%', marginTop: '24px', padding: '14px',
                background: 'transparent', border: '1px solid rgba(200,169,110,0.3)', color: '#C8A96E', cursor: 'pointer',
                fontFamily: "'Barlow Condensed', sans-serif", fontSize: '12px', letterSpacing: '0.25em', fontWeight: 700, textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(200,169,110,0.1)'; el.style.borderColor = '#C8A96E'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(200,169,110,0.3)'; }}
            >
              <MessageCircle size={14} /> QUIERO CANJEAR MIS PUNTOS
            </button>
          </motion.div>

          {/* Rewards list */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', letterSpacing: '0.35em', color: '#C8A96E', textTransform: 'uppercase', marginBottom: '24px' }}>
              ¿QUÉ PODÉS CANJEAR?
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {club.recompensas.map((r: any, i: number) => {
                const Icon = REWARD_ICONS[i % REWARD_ICONS.length];
                const reached = usuario.puntos >= r.pts;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '16px',
                      background: reached ? 'rgba(200,169,110,0.06)' : '#1A3A1A',
                      border: `1px solid ${reached ? 'rgba(200,169,110,0.25)' : 'rgba(200,169,110,0.06)'}`,
                      padding: '18px 20px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ width: '40px', height: '40px', background: reached ? 'rgba(200,169,110,0.12)' : 'rgba(200,169,110,0.04)', border: `1px solid ${reached ? 'rgba(200,169,110,0.25)' : 'rgba(200,169,110,0.08)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={18} style={{ color: reached ? '#C8A96E' : '#9E8E7A' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.2em', color: reached ? '#C8A96E' : '#9E8E7A', textTransform: 'uppercase', marginBottom: '2px' }}>
                        {r.pts} PUNTOS
                      </div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '17px', color: reached ? '#E8DCC8' : '#9E8E7A', fontWeight: 600 }}>
                        {r.gift}
                      </div>
                    </div>
                    {reached && (
                      <span style={{ background: '#C8A96E', color: '#0D1A0D', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '9px', letterSpacing: '0.2em', padding: '3px 8px', textTransform: 'uppercase', fontWeight: 700 }}>
                        DISPONIBLE
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* How to earn */}
            <div style={{ marginTop: '32px', background: '#1A3A1A', border: '1px solid rgba(200,169,110,0.08)', padding: '24px' }}>
              <h5 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.35em', color: '#C8A96E', textTransform: 'uppercase', marginBottom: '16px' }}>
                ¿CÓMO SUMÁS PUNTOS?
              </h5>
              {[
                ['Consumición normal', '+10 pts'],
                ['Mesa reservada', '+20 pts'],
                ['Karaoke martes', `+${tc.karaoke.puntosGanados} pts`],
                ['Cumpleaños grupal', '+50 pts'],
              ].map(([label, pts], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 3 ? '1px solid rgba(200,169,110,0.06)' : 'none' }}>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '15px', color: '#9E8E7A' }}>{label}</span>
                  <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '18px', color: '#C8A96E' }}>{pts}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
