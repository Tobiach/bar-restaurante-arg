import { useState } from 'react';
import { motion } from 'motion/react';
import { Mic, Info, Music2 } from 'lucide-react';
import { getConfig } from '../../config/active';
import { useToast } from '../Toast';

export default function KaraokeSection() {
  const tenantConfig = getConfig();
  const WA_URL = `https://wa.me/${tenantConfig.whatsapp}`;
  const { karaoke } = tenantConfig;
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [song, setSong] = useState('');

  return (
    <section id="sec-karaoke" className="py-20 bg-violeta-medio/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
            <div className="inline-block px-3 py-1 bg-naranja text-white font-display text-[10px] tracking-widest uppercase rounded mb-6">DÍAS ESPECÍFICOS</div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6">{karaoke.titulo}</h2>
            <p className="text-xl text-blanco-suave mb-8" style={{ whiteSpace: 'pre-line' }}>{karaoke.descripcion}</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {karaoke.generos.map((g: string) => (
                <div key={g} className="flex items-center gap-3 text-sm text-blanco-muted">
                  <Music2 size={12} className="text-naranja flex-shrink-0" /> {g}
                </div>
              ))}
            </div>
            <div className="p-6 bg-violeta-card rounded-2xl border border-naranja/20 shadow-xl">
              <h4 className="font-bold mb-4 flex items-center gap-2"><Info size={18} className="text-naranja" /> ¿Cómo funciona?</h4>
              <ol className="space-y-3 text-sm text-blanco-muted">
                <li className="flex gap-3"><span className="text-naranja font-bold">01.</span> Te anotás con nuestro equipo o en el form de aquí al lado.</li>
                <li className="flex gap-3"><span className="text-naranja font-bold">02.</span> Te llamamos al escenario cuando llegue tu turno.</li>
                <li className="flex gap-3"><span className="text-naranja font-bold">03.</span> ¡Cantás, te divertís y sumás {karaoke.puntosGanados} puntos!</li>
              </ol>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-violeta-card to-violeta p-8 rounded-3xl border border-naranja-borde shadow-2xl relative overflow-hidden"
          >
            <Mic className="absolute -bottom-10 -right-10 text-naranja/5 rotate-12" size={200} />
            <h3 className="text-2xl font-bold mb-8 text-center italic">Anotate para cantar</h3>
            <div className="space-y-4 relative z-10">
              <div>
                <label className="block text-[10px] font-display tracking-widest text-naranja uppercase mb-2">Tu Nombre</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-violeta-medio/50 p-4 rounded-xl border border-violeta-borde outline-none focus:border-naranja transition-all"
                  placeholder="Ej: Valentina"
                />
              </div>
              <div>
                <label className="block text-[10px] font-display tracking-widest text-naranja uppercase mb-2">¿Qué canción vas a romper?</label>
                <input
                  type="text"
                  value={song}
                  onChange={e => setSong(e.target.value)}
                  className="w-full bg-violeta-medio/50 p-4 rounded-xl border border-violeta-borde outline-none focus:border-naranja transition-all"
                  placeholder="Ej: Total Eclipse of the Heart"
                />
              </div>
              <button
                onClick={() => {
                  if (!name || !song) return showToast("Completá tu nombre y canción", "aviso");
                  const msg = `Hola! Me anoto para el Karaoke:\nNombre: ${name}\nCanción: ${song}\n¡Nos vemos!`;
                  window.open(`${WA_URL}?text=${encodeURIComponent(msg)}`, '_blank');
                  showToast("¡Agendado! Te esperamos.", "exito");
                  setName(''); setSong('');
                }}
                className="btn-primary w-full py-4 shimmer-hover"
              >
                ANOTARME AHORA
              </button>
              <p className="text-[10px] text-center text-blanco-muted uppercase tracking-widest mt-4">
                Consumición mínima: {karaoke.consumicionMinima} p/p
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
