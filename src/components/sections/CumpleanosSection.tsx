import { Gift, PartyPopper, Crown, Plus } from 'lucide-react';
import { tenantConfig } from '../../config/tenant.config';
import { reservationStore } from '../../store/reservationStore';

const icons = [
  <Gift className="text-blanco-muted" />,
  <PartyPopper className="text-naranja" />,
  <Crown className="text-dorado" />,
];
const borderColors = ['border-white/5', 'border-naranja/50', 'border-dorado/30'];

export default function CumpleanosSection() {
  const handleReservarPack = (title: string) => {
    reservationStore.set({ tipo: 'Cumpleaños', pack: title });
    document.getElementById('sec-reservas')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="sec-cumple" className="py-20 bg-violeta-card/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-header text-center border-l-0 pl-0 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 italic">Tu Festejo, Tu Manera</h2>
          <p className="text-blanco-muted max-w-xl mx-auto">Diseñamos la noche perfecta para vos y tus amigos. Elegí el paquete que más te guste.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tenantConfig.packs.map((p, i) => (
            <div
              key={p.title}
              className={`relative card-premium p-8 flex flex-col transition-all duration-500 hover:translate-y-[-8px] ${p.featured ? 'border-naranja shadow-[0_0_50px_-12px_rgba(251,133,0,0.3)] scale-105 z-10 bg-gradient-to-b from-violeta-card to-violeta' : 'opacity-80 hover:opacity-100'} ${borderColors[i]}`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-naranja text-white text-[10px] font-display font-black px-4 py-1.5 rounded-full shadow-lg shadow-naranja/20 whitespace-nowrap">
                    PACK MÁS ELEGIDO
                  </span>
                </div>
              )}
              <div className="mb-6 flex justify-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${p.featured ? 'bg-naranja/10 border border-naranja/20' : 'bg-white/5'}`}>
                  {icons[i]}
                </div>
              </div>
              <h3 className="text-2xl font-black text-center mb-6 tracking-widest font-titulo italic">{p.title}</h3>
              <ul className="space-y-4 mb-10 flex-1">
                {p.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-blanco-suave">
                    <div className="mt-1 shrink-0"><Plus size={14} className={p.featured ? "text-naranja" : "text-blanco-muted"} /></div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="text-center pt-6 border-t border-white/5 mb-6">
                <div className="text-[10px] text-blanco-muted uppercase tracking-[0.2em] mb-1">Precio x Persona</div>
                <div className={`text-4xl font-display font-black ${p.featured ? 'text-naranja' : 'text-white'}`}>{p.price}</div>
              </div>
              <button
                onClick={() => handleReservarPack(p.title)}
                className={`shimmer-hover py-4 rounded-xl text-center font-display text-xs font-black tracking-widest transition-all ${p.featured ? 'bg-naranja text-white' : 'bg-white/5 hover:bg-white/10 text-white'}`}
              >
                RESERVAR ESTE PACK
              </button>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-center text-blanco-muted mt-12 uppercase tracking-widest">
          * Todos los paquetes se arman a medida según cantidad de invitados.
        </p>
      </div>
    </section>
  );
}
