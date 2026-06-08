import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ChevronRight, User, Percent, Ticket, Calendar, Beer } from 'lucide-react';
import { getConfig, getActiveData } from '../../config/active';

const REWARD_ICONS = [Percent, Ticket, Calendar, Beer];

export default function PointsSection() {
  const tenantConfig = getConfig();
  const data = getActiveData();
  const WA_URL = `https://wa.me/${tenantConfig.whatsapp}`;
  const { club } = tenantConfig;
  const labels = tenantConfig.labels || {};
  const usuario = data?.usuario || club.demoUser;
  const [expanded, setExpanded] = useState(false);

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
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-naranja flex items-center justify-center">
                  <User size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{usuario.nombre}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-widest uppercase bg-naranja text-white px-2 py-0.5 rounded">NIVEL {usuario.nivel}</span>
                    <span className="text-xs text-blanco-muted font-display">{usuario.puntos} puntos</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between text-xs font-display tracking-widest mb-2 uppercase">
                  <span>Progreso Nivel {usuario.proximoNivel}</span>
                  <span className="text-naranja">{usuario.puntos} / {club.demoUser.meta}</span>
                </div>
                <div className="h-4 bg-violeta rounded-full overflow-hidden border border-violeta-borde">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(usuario.puntos / club.demoUser.meta) * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-naranja to-dorado relative"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-shimmer scale-x-150"></div>
                  </motion.div>
                </div>
                <p className="text-[10px] text-blanco-muted mt-2 text-right uppercase tracking-widest italic">
                  ¡Faltan {usuario.faltanPuntos} puntos para ser {usuario.proximoNivel}!
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-white text-sm font-bold flex items-center gap-2 hover:text-naranja transition-colors"
                >
                  {expanded ? 'Ocultar historial' : 'Ver historial de puntos'}{' '}
                  <ChevronRight size={16} className={`transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {expanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="space-y-3 pt-4 font-mono text-[10px]">
                        {(usuario.historial || []).map((h: any, i: number) => (
                          <div key={i} className="flex justify-between items-center py-2 border-b border-violeta-borde last:border-0 border-dashed">
                            <span className="text-blanco-muted">{h.fecha}</span>
                            <span className="flex-1 px-4">{h.desc}</span>
                            <span className="text-verde-ok font-bold">+{h.puntos}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-display tracking-[0.2em] text-sm text-naranja uppercase mb-4">¿Cómo canjear?</h4>
            {club.recompensas.map((p: any, i: number) => {
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
    </section>
  );
}
