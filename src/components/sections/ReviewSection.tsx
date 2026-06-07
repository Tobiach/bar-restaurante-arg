import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';
import { RESENAS } from '../../constants';
import { tenantConfig } from '../../config/tenant.config';
import { useToast } from '../Toast';

const WA_URL = `https://wa.me/${tenantConfig.whatsapp}`;

export default function ReviewSection() {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ nombre: '', texto: '', rating: 5 });

  return (
    <section id="sec-resenas" className="py-20 bg-violeta-medio/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">La Tribu Habla</h2>
          <div className="flex items-center justify-center gap-1 text-dorado mb-2">
            {[1, 2, 3, 4, 5].map(s => <Star key={s} fill="#FFD166" size={20} />)}
          </div>
          <p className="text-blanco-muted font-display tracking-widest uppercase text-xs">4.8 / 5 — Basado en 243 opiniones reales</p>
        </div>

        <div className="relative mb-12">
          <div className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth" id="review-carrusel">
            {RESENAS.map((res, i) => (
              <div key={i} className="min-w-full md:min-w-[400px] snap-center">
                <div className="card-premium p-8 h-64 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold">{res.nombre}</span>
                      <span className="text-[10px] uppercase text-naranja bg-naranja/10 px-2 py-0.5 rounded">{res.servicio}</span>
                    </div>
                    <p className="text-blanco-suave italic text-sm leading-relaxed">"{res.texto}"</p>
                  </div>
                  <div className="flex gap-1 text-dorado opacity-60">
                    {Array.from({ length: res.rating }).map((_, j) => <Star key={j} fill="#FFD166" size={12} />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {RESENAS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = document.getElementById('review-carrusel');
                  if (el) el.scrollTo({ left: i * el.offsetWidth, behavior: 'smooth' });
                }}
                className="w-2 h-2 rounded-full bg-violeta-card hover:bg-naranja transition-all"
              ></button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button onClick={() => setModalOpen(true)} className="btn-secondary">DEJAR MI RESEÑA →</button>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="relative bg-violeta-card p-8 rounded-3xl border border-naranja-borde max-w-md w-full">
              <h3 className="text-2xl font-bold mb-6">Tu opinión nos importa</h3>
              <div className="space-y-4">
                <input
                  placeholder="Tu nombre"
                  className="w-full bg-violeta p-3 rounded-xl border border-transparent focus:border-naranja outline-none"
                  value={newReview.nombre}
                  onChange={e => setNewReview({ ...newReview, nombre: e.target.value })}
                />
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map(r => (
                    <button key={r} onClick={() => setNewReview({ ...newReview, rating: r })}>
                      <Star fill={r <= newReview.rating ? "#FFD166" : "none"} className={r <= newReview.rating ? "text-dorado" : "text-blanco-muted"} />
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="¿Qué tal fue tu experiencia?"
                  className="w-full bg-violeta p-3 rounded-xl border border-transparent focus:border-naranja outline-none h-32 resize-none"
                  value={newReview.texto}
                  onChange={e => setNewReview({ ...newReview, texto: e.target.value })}
                />
                <button
                  onClick={() => {
                    if (!newReview.nombre || !newReview.texto) return showToast("Por favor completa los campos", "aviso");
                    const msg = `Nueva reseña de ${newReview.nombre} (${newReview.rating}★):\n"${newReview.texto}"`;
                    window.open(`${WA_URL}?text=${encodeURIComponent(msg)}`, '_blank');
                    showToast("¡Gracias por tu reseña!", "exito");
                    setModalOpen(false);
                    setNewReview({ nombre: '', texto: '', rating: 5 });
                  }}
                  className="btn-primary w-full"
                >
                  PUBLICAR
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
