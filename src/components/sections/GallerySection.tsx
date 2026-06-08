import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { getConfig, getActiveData } from '../../config/active';

export default function GallerySection() {
  const tenantConfig = getConfig();
  const data = getActiveData();
  const galeria: any[] = data?.galeria || [];
  const labels = tenantConfig.labels || {};

  const allCats = ['TODOS', ...Array.from(new Set(galeria.map((i: any) => i.cat as string)))];

  const [filter, setFilter] = useState('TODOS');
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedImage !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedImage]);

  const filtered = filter === 'TODOS' ? galeria : galeria.filter((i: any) => i.cat === filter);
  const visible = showAll ? filtered : filtered.slice(0, 6);

  const getImgSrc = (item: any) => item.src || item.img || '';
  const getImgAlt = (item: any) => item.alt || item.title || '';
  const getImgTitle = (item: any) => item.title || item.alt || '';

  return (
    <section id="sec-galeria" className="py-20 bg-violeta">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-header">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">{labels.galeria || 'Galería'}</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {allCats.map(c => (
            <button
              key={c}
              onClick={() => { setFilter(c); setShowAll(false); }}
              className={`px-6 py-2 rounded-full font-display text-xs tracking-widest transition-all ${filter === c ? 'bg-naranja text-white' : 'bg-violeta-card/50 text-blanco-muted hover:text-white'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((item: any, idx: number) => (
              <motion.div
                key={item.id || idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedImage(idx)}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-violeta-borde"
              >
                {getImgSrc(item) ? (
                  <img
                    src={getImgSrc(item)}
                    alt={getImgAlt(item)}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color || 'from-violeta-card to-violeta'} transition-transform duration-500 group-hover:scale-110`}></div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                {!getImgSrc(item) && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                    <ImageOff size={48} className="text-naranja" />
                  </div>
                )}
                <div className="absolute inset-0 bg-violeta/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                  <h3 className="font-titulo text-2xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{getImgTitle(item)}</h3>
                  <span className="bg-naranja px-3 py-1 rounded text-[10px] font-display font-bold tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.cat}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length > 6 && (
          <div className="mt-12 text-center">
            <button onClick={() => setShowAll(!showAll)} className="text-naranja font-display text-sm tracking-widest uppercase hover:underline">
              {showAll ? 'Ver menos' : 'Ver más →'}
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

              {getImgSrc(visible[selectedImage]) ? (
                <img
                  src={getImgSrc(visible[selectedImage])}
                  alt={getImgAlt(visible[selectedImage])}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <ImageOff size={80} className="mx-auto mb-8 text-naranja/40" />
                  <h3 className="text-4xl font-bold mb-4">{getImgTitle(visible[selectedImage])}</h3>
                  <span className="text-naranja font-display tracking-[0.2em]">{visible[selectedImage].cat}</span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                <h3 className="text-2xl font-bold">{getImgTitle(visible[selectedImage])}</h3>
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
