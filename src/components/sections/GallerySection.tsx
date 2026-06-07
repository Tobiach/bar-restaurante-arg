import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryItems = [
  { title: "Energía en Vivo", cat: "SHOWS", icon: "⚡", img: "https://lh3.googleusercontent.com/d/1LtW01EH0wUQ4VYrY_nR6oa8O1ugBj4XB", color: "from-violeta/80 to-naranja/20" },
  { title: "Rincón Isla", cat: "AMBIENTE", icon: "🌟", img: "https://lh3.googleusercontent.com/d/1KnOZWJi34Ht1POToYlkTjkqtjzDiLMud", color: "from-violeta/80 to-violeta-card" },
  { title: "La Venganza de la Guitarra", cat: "SHOWS", icon: "🎸", img: "https://lh3.googleusercontent.com/d/1OsM3C44jQLoTxQKLHvsdcQRm75KGiORx", color: "from-violeta/80 to-naranja/20" },
  { title: "Barra Especial", cat: "AMBIENTE", icon: "🍸", img: "https://lh3.googleusercontent.com/d/1NaGwJ9P0xwMZnLZmvojs1itVIc5ZfxZe", color: "from-violeta/80 to-blue-800/20" },
  { title: "Momento Show", cat: "SHOWS", icon: "🎤", img: "https://lh3.googleusercontent.com/d/1DauAVjVawQ_B_xREDuzZCHV0og0kqXai", color: "from-violeta/80 to-purple-800/20" },
  { title: "Luces de Noche", cat: "AMBIENTE", icon: "🏮", img: "https://lh3.googleusercontent.com/d/1_6Uyr016Rvz1r-o9yT5qI3wuAbjDSFx6", color: "from-violeta/80 to-yellow-800/20" },
  { title: "Pasión en Escena", cat: "SHOWS", icon: "🎻", img: "https://lh3.googleusercontent.com/d/1fJSlevbs0gAn3YvOH2gCXYr649N6QiOO", color: "from-violeta/80 to-red-900/20" },
  { title: "Detalles que Suman", cat: "AMBIENTE", icon: "✨", img: "https://lh3.googleusercontent.com/d/1HOdELTJLn5FRrgjnbuoeK6ONfJucqDNQ", color: "from-violeta/80 to-green-900/20" },
  { title: "Nuestra Esencia", cat: "AMBIENTE", icon: "🌊", img: "https://lh3.googleusercontent.com/d/1TyVRj_0N5QSbK4dJzdNf0EyQ2bXc0IUn", color: "from-violeta/80 to-emerald-900/20" },
  { title: "Bandas Invitadas", cat: "SHOWS", icon: "🥁", img: "https://lh3.googleusercontent.com/d/1bkogJSouxVfvwRtLyTQuVpHz8MJxtMF-", color: "from-violeta/80 to-cyan-900/20" },
  { title: "La Bicicleta con Alas", cat: "AMBIENTE", icon: "📖", img: "https://lh3.googleusercontent.com/d/1g-T-9rd6lmVqoFhDuYRNZ1KWX4CHA-F0", color: "from-violeta/80 to-amber-900/20" },
  { title: "Escenario Abierto", cat: "SHOWS", icon: "🎭", img: "https://lh3.googleusercontent.com/d/1khMynTX9CT3KQYmFyHwnXS1u1fGp2hHl", color: "from-violeta/80 to-indigo-900/20" },
  { title: "Shows Inolvidables", cat: "SHOWS", icon: "🎥", img: "https://lh3.googleusercontent.com/d/1yVu0xwdi1GDqpxnsFUwLXbfGJwWqWfh_", color: "from-violeta/80 to-rose-900/20" },
  { title: "Noches de Ritmo", cat: "SHOWS", icon: "🕺", img: "https://lh3.googleusercontent.com/d/1RYv_G9J-VgMmaXtiYFK42kxi3UJ3M_2f", color: "from-violeta/80 to-sky-900/20" },
  { title: "Cultura en Almagro", cat: "SHOWS", icon: "🌟", img: "https://lh3.googleusercontent.com/d/16vFERwmM2S0Xuud5RJ2HmyfLp7hhDflk", color: "from-violeta/80 to-violeta-card" },
];

const categories = ['TODOS', 'SHOWS', 'AMBIENTE', 'KARAOKE', 'CUMPLEAÑOS'];

export default function GallerySection() {
  const [filter, setFilter] = useState('TODOS');
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedImage !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedImage]);

  const filtered = filter === 'TODOS' ? galleryItems : galleryItems.filter(i => i.cat === filter);
  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="sec-galeria" className="py-20 bg-violeta">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-header">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">Así Son Nuestras Noches</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-6 py-2 rounded-full font-display text-xs tracking-widest transition-all ${filter === c ? 'bg-naranja text-white' : 'bg-violeta-card/50 text-blanco-muted hover:text-white'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((item, idx) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedImage(idx)}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-violeta-borde"
              >
                {item.img ? (
                  <img
                    src={item.img}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} transition-transform duration-500 group-hover:scale-110`}></div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                {!item.img && (
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30 group-hover:opacity-60 transition-opacity">
                    {item.icon}
                  </div>
                )}
                <div className="absolute inset-0 bg-violeta/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                  <h3 className="font-titulo text-2xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                  <span className="bg-naranja px-3 py-1 rounded text-[10px] font-display font-bold tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.cat}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length > 6 && (
          <div className="mt-12 text-center">
            <button onClick={() => setShowAll(!showAll)} className="text-naranja font-display text-sm tracking-widest uppercase hover:underline">
              {showAll ? 'Ver menos' : 'Ver más noches →'}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setSelectedImage(null)}></div>
            <div className="relative max-w-4xl w-full aspect-video rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center bg-violeta-medio">
              <button
                className="absolute top-6 right-6 z-10 p-2 bg-black/50 rounded-full hover:bg-naranja transition-colors"
                onClick={() => setSelectedImage(null)}
              ><X /></button>

              {visible[selectedImage].img ? (
                <img
                  src={visible[selectedImage].img}
                  alt={visible[selectedImage].title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <div className="text-[120px] mb-8">{visible[selectedImage].icon}</div>
                  <h3 className="text-4xl font-bold mb-4">{visible[selectedImage].title}</h3>
                  <span className="text-naranja font-display tracking-[0.2em]">{visible[selectedImage].cat}</span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                <h3 className="text-2xl font-bold">{visible[selectedImage].title}</h3>
                <span className="text-naranja font-display text-xs tracking-widest">{visible[selectedImage].cat}</span>
              </div>

              <button
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 rounded-full hover:bg-naranja transition-colors"
                onClick={(e) => { e.stopPropagation(); setSelectedImage((selectedImage - 1 + visible.length) % visible.length); }}
              ><ChevronLeft size={32} /></button>
              <button
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 rounded-full hover:bg-naranja transition-colors"
                onClick={(e) => { e.stopPropagation(); setSelectedImage((selectedImage + 1) % visible.length); }}
              ><ChevronRight size={32} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
