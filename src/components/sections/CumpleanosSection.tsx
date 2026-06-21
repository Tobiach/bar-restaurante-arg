import { Gift, PartyPopper, Crown, Plus } from 'lucide-react';
import { getConfig } from '../../config/active';
import { reservationStore } from '../../store/reservationStore';

const icons = [
  <Gift className="text-blanco-muted" />,
  <PartyPopper className="text-naranja" />,
  <Crown className="text-dorado" />,
];
const borderColors = ['border-white/5', 'border-naranja/50', 'border-dorado/30'];

export default function CumpleanosSection() {
  const tenantConfig = getConfig();
  const labels = tenantConfig.labels || {};

  const handleReservarPack = (title: string) => {
    reservationStore.set({ tipo: 'Cumpleaños', pack: title });
    document.getElementById('sec-reservas')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="sec-cumple" className="py-20 bg-violeta-card/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-header text-center border-l-0 pl-0 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 italic">{labels.cumpleanos || 'Tu Festejo, Tu Manera'}</h2>
          <p className="text-blanco-muted max-w-xl mx-auto">Diseñamos la noche perfecta para vos y tus amigos. Elegí el paquete que más te guste.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tenantConfig.packs.map((p: any, i: number) => (
            <div
              key={p.title}
              className={`relative card-premium p-8 flex flex-col transition-all duration-500 hover:translate-y-[-8px] ${p.featured ? 'border-naranja shadow-[0_0_50px_-12px_rgba(251,133,0,0.3)] scale-105 z-10 bg-gradient-to-b from-violeta-card to-violeta' : 'opacity-80 hover:opacity-100'} ${borderColors[i]}`}
            >
              {p.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-naranja text-white text-[10px] font-display font-bold tracking-widest px-4 py-1 rounded-full uppercase">
                  MÁS POPULAR
                </div>
              )}
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-xl ${p.featured ? 'bg-naranja/20' : 'bg-violeta-medio'}`}>
                  {icons[i]}
                </div>
                <h3 className="text-2xl font-display font-black tracking-widest">{p.title}</h3>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {p.items.map((item: string) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-blanco-muted">
                    <Plus size={16} className="text-naranja mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <div className="text-3xl font-display font-black text-naranja mb-1">{p.price}</div>
                <div className="text-[10px] font-display tracking-widest text-naranja/50 mb-5">
                  🌟 {Math.floor((parseInt((p.price as string).replace(/\D/g, ''), 10) || 0) / 500)} pts al reservar
                </div>
                <button
                  onClick={() => handleReservarPack(p.title)}
                  className={`w-full py-3 text-sm font-display tracking-widest rounded-xl transition-all ${p.featured ? 'btn-primary' : 'btn-secondary'}`}
                >
                  RESERVAR ESTE PAQUETE →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
