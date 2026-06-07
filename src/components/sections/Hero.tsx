import { motion } from 'motion/react';
import { Music, UtensilsCrossed, Star, Zap, type LucideIcon } from 'lucide-react';
import { tenantConfig } from '../../config/tenant.config';
import { SHOWS } from '../../constants';
import CountUp from '../ui/CountUp';

const STAT_ICONS: Record<string, LucideIcon> = {
  Music,
  UtensilsCrossed,
  Star,
};

export default function Hero() {
  const mainShow = SHOWS[0];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      <div className="watermark">ISLA</div>

      {mainShow.imagen && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-violeta via-violeta/90 to-transparent z-10"></div>
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 2 }}
            src={mainShow.imagen}
            alt="Main Event"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full animate-on-scroll">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-naranja/40 bg-naranja/10 text-naranja font-display text-xs tracking-widest mb-6 uppercase">
            <Zap size={12} fill="currentColor" />
            {tenantConfig.hero.tagBadge}: {mainShow.nombre}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black leading-[1.05] mb-6" style={{ letterSpacing: '-0.03em' }}>
            {tenantConfig.hero.titulo1} <br />
            <span className="text-naranja italic">{tenantConfig.hero.titulo2}</span>
          </h1>
          <p className="text-lg md:text-xl text-blanco-suave mb-10 max-w-xl">
            {tenantConfig.hero.subtitulo}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href="#sec-carta" className="btn-primary shimmer-hover text-center">{tenantConfig.hero.cta1}</a>
            <a href="#sec-shows" className="btn-secondary text-center">{tenantConfig.hero.cta2}</a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8 border-t border-violeta-borde">
            {tenantConfig.hero.stats.map((stat, i) => {
              const Icon = STAT_ICONS[stat.iconName] ?? Star;
              return (
                <div key={i} className={i === 2 ? 'hidden sm:block' : ''}>
                  <div className="text-naranja font-display text-2xl font-bold mb-1 flex items-center gap-2">
                    <Icon size={22} className="text-naranja" />
                    <CountUp end={stat.valor} suffix={stat.sufijo} />
                  </div>
                  <div className="text-xs text-blanco-muted uppercase tracking-widest">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-naranja-oscuro hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-naranja-borde rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-naranja rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}
