import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ChevronRight, User, Percent, Ticket, Calendar, Beer, Phone, X, Loader2 } from 'lucide-react';
import { getConfig, getActiveData } from '../../config/active';
import { puntosService, type UserPuntos } from '../../lib/puntosService';

const REWARD_ICONS = [Percent, Ticket, Calendar, Beer];

export default function PointsSection() {
  const tenantConfig = getConfig();
  const data = getActiveData();
  const WA_URL = `https://wa.me/${tenantConfig.whatsapp}`;
  const { club } = tenantConfig;
  const labels = tenantConfig.labels || {};

  const [expanded, setExpanded] = useState(false);
  const [showLookup, setShowLookup] = useState(false);
  const [phone, setPhone] = useState('');
  const [searching, setSearching] = useState(false);
  const [realUser, setRealUser] = useState<UserPuntos | null>(null);
  const [notFound, setNotFound] = useState(false);

  const demoUser = data?.usuario || club.demoUser;
  const usuario = realUser ?? demoUser;
  const isReal = !!realUser;

  const handleLookup = () => {
    if (phone.length < 8) return;
    setSearching(true);
    setNotFound(false);
    setTimeout(() => {
      const found = puntosService.get(phone);
      setSearching(false);
      if (found) {
        setRealUser(found);
        setShowLookup(false);
        setPhone('');
      } else {
        setNotFound(true);
      }
    }, 400);
  };

  const next = puntosService.getNextNivel(usuario.puntos);
  const meta = isReal ? (next.falta === 0 ? usuario.puntos : usuario.puntos + next.falta) : club.demoUser.meta;
  const pct = Math.min(100, (usuario.puntos / meta) * 100);

  return (
    <section id="sec-puntos" className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-header">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">{labels.puntos || club.nombre}</h2>
          <p className="text-blanco-muted">{club.descripcion}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-violeta-card to-violeta-medio p-8 rounded-3xl border border-naranja-borde/20 shadow-2xl relative">
              <Award className="absolute top-8 right-8 text-naranja/20" size={80} />

              {/* Header usuario */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-naranja flex items-center justify-center">
                  <User size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold">{usuario.nombre}</h3>
                    {isReal && (
                      <button onClick={() => { setRealUser(null); setExpanded(false); }}
                        className="text-blanco-muted/40 hover:text-blanco-muted transition-colors">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-widest uppercase bg-naranja text-white px-2 py-0.5 rounded">
                      NIVEL {isReal ? usuario.nivel : usuario.nivel}
                    </span>
                    <span className="text-xs text-blanco-muted font-display">{usuario.puntos} puntos</span>
                    {!isReal && (
                      <span className="text-[9px] text-blanco-muted/40 uppercase tracking-widest">Demo</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Barra progreso */}
              <div className="mb-8">
                <div className="flex justify-between text-xs font-display tracking-widest mb-2 uppercase">
                  <span>Progreso → {isReal ? next.nombre : `Nivel ${usuario.proximoNivel}`}</span>
                  <span className="text-naranja">{usuario.puntos} / {meta}</span>
                </div>
                <div className="h-4 bg-violeta rounded-full overflow-hidden border border-violeta-borde">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-naranja to-dorado relative"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-shimmer scale-x-150" />
                  </motion.div>
                </div>
                <p className="text-[10px] text-blanco-muted mt-2 text-right uppercase tracking-widest italic">
                  {isReal
                    ? next.falta > 0 ? `¡Faltan ${next.falta} puntos para ser ${next.nombre}!` : '¡Ya sos VIP! 🎉'
                    : `¡Faltan ${usuario.faltanPuntos} puntos para ser ${usuario.proximoNivel}!`
                  }
                </p>
              </div>

              {/* Historial */}
              <div className="space-y-4">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-white text-sm font-bold flex items-center gap-2 hover:text-naranja transition-colors"
                >
                  {expanded ? 'Ocultar historial' : 'Ver historial de puntos'}
                  <ChevronRight size={16} className={`transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {expanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="space-y-3 pt-4 font-mono text-[10px]">
                        {(usuario.historial || []).map((h: { fecha: string; desc: string; puntos: number }, i: number) => (
                          <div key={i} className="flex justify-between items-center py-2 border-b border-violeta-borde last:border-0 border-dashed">
                            <span className="text-blanco-muted">{h.fecha}</span>
                            <span className="flex-1 px-4">{h.desc}</span>
                            <span className="text-verde-ok font-bold">+{h.puntos}</span>
                          </div>
                        ))}
                        {(!usuario.historial || usuario.historial.length === 0) && (
                          <p className="text-blanco-muted/50 text-center py-4">Sin historial aún</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA consultar */}
              {!isReal && (
                <div className="mt-6 pt-6 border-t border-violeta-borde">
                  <button
                    onClick={() => setShowLookup(true)}
                    className="flex items-center gap-2 text-sm text-naranja font-bold hover:text-naranja/70 transition-colors"
                  >
                    <Phone size={16} /> Consultar mis puntos reales →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recompensas */}
          <div className="space-y-6">
            <h4 className="font-display tracking-[0.2em] text-sm text-naranja uppercase mb-4">¿Cómo canjear?</h4>
            {club.recompensas.map((p: { pts: number; gift: string }, i: number) => {
              const RewardIcon = REWARD_ICONS[i % REWARD_ICONS.length];
              return (
                <div key={i} className="flex items-center gap-4 bg-violeta-medio/40 p-4 rounded-xl border border-transparent hover:border-naranja/20 transition-all">
                  <div className="p-3 rounded-full bg-naranja/10 text-naranja">
                    <RewardIcon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] text-blanco-muted font-display tracking-widest">{p.pts} pts</div>
                    <div className="text-sm font-bold">{p.gift}</div>
                  </div>
                </div>
              );
            })}
            <button
              onClick={() => {
                const msg = `Hola! Soy ${usuario.nombre} y quiero canjear mis puntos.`;
                window.open(`${WA_URL}?text=${encodeURIComponent(msg)}`, '_blank');
              }}
              className="btn-secondary w-full shimmer-hover"
            >
              QUIERO CANJEAR →
            </button>
          </div>
        </div>
      </div>

      {/* Modal lookup */}
      <AnimatePresence>
        {showLookup && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowLookup(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-violeta-card rounded-3xl p-8 w-full max-w-sm relative z-10 border border-naranja-borde/20 shadow-2xl">
              <button onClick={() => setShowLookup(false)} className="absolute top-4 right-4 text-blanco-muted hover:text-white">
                <X size={20} />
              </button>
              <h3 className="font-display text-xl font-black tracking-widest text-naranja mb-2">MIS PUNTOS</h3>
              <p className="text-xs text-blanco-muted mb-6">Ingresá tu WhatsApp para ver tus puntos acumulados</p>
              <input
                type="tel"
                placeholder="Ej: 1167890123"
                value={phone}
                onChange={e => { setPhone(e.target.value); setNotFound(false); }}
                onKeyDown={e => e.key === 'Enter' && handleLookup()}
                className="w-full bg-violeta p-4 rounded-xl outline-none border border-transparent focus:border-naranja text-lg font-mono mb-3"
              />
              {notFound && (
                <p className="text-xs text-amarillo-alerta mb-3">
                  No encontramos puntos para ese número. ¡Hacé tu primera reserva y acumulá 50 puntos!
                </p>
              )}
              <button onClick={handleLookup} disabled={searching || phone.length < 8}
                className="btn-primary w-full flex items-center justify-center gap-2">
                {searching ? <Loader2 size={18} className="animate-spin" /> : <Phone size={18} />}
                {searching ? 'Buscando...' : 'CONSULTAR'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
