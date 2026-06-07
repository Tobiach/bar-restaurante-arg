import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MessageCircle, Minus, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { tenantConfig } from '../../config/tenant.config';
import { reservationStore } from '../../store/reservationStore';
import { useToast } from '../Toast';

const WA_URL = `https://wa.me/${tenantConfig.whatsapp}`;
const monthNames = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];

export default function ReservationStepper() {
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tipo: '',
    showNombre: '',
    pack: '',
    fecha: '',
    hora: '',
    personas: 2,
    nombre: '',
    tel: '',
    email: '',
    obs: '',
    festejo: { agasajado: '', edad: '', torta: false },
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Pre-populate from reservationStore
  useEffect(() => {
    const pre = reservationStore.get();
    if (pre.tipo) {
      setFormData(prev => ({
        ...prev,
        tipo: pre.tipo!,
        showNombre: pre.showNombre || '',
        pack: pre.pack || '',
      }));
      reservationStore.clear();
    }
  }, []);

  const nextStep = () => {
    if (step === 1 && !formData.tipo) return showToast("Por favor selecciona un tipo de visita", "aviso");
    if (step === 2) {
      if (!formData.fecha) return showToast("Selecciona una fecha", "aviso");
      if (!formData.hora) return showToast("Selecciona un horario", "aviso");
    }
    setStep(step + 1);
    setTimeout(() => {
      const el = document.getElementById('sec-reservas');
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }, 100);
  };

  const submitReservation = () => {
    if (!formData.nombre || !formData.tel) return showToast("Faltan tus datos de contacto", "aviso");

    // Save to sessionStorage for AdminPanel
    const reserva = {
      id: Date.now(),
      fecha: formData.fecha,
      hora: formData.hora,
      tipo: formData.tipo,
      nombre: formData.nombre,
      personas: formData.personas,
      obs: formData.obs,
      estado: 'pendiente',
      timestamp: new Date().toISOString(),
    };
    try {
      const reservas = JSON.parse(sessionStorage.getItem('panel-reservas') || '[]');
      reservas.push(reserva);
      sessionStorage.setItem('panel-reservas', JSON.stringify(reservas));
    } catch { /* silently ignore */ }

    const message = `Hola Isla Bar! Quiero reservar:
Tipo: ${formData.tipo}${formData.showNombre ? ` — ${formData.showNombre}` : ''}${formData.pack ? ` — Pack ${formData.pack}` : ''}
Fecha: ${formData.fecha} | Hora: ${formData.hora} | Personas: ${formData.personas}
Nombre: ${formData.nombre} | Tel: ${formData.tel}
${formData.tipo === 'Cumpleaños' ? `Agasajado: ${formData.festejo.agasajado}, Edad: ${formData.festejo.edad}` : ''}
${formData.obs ? `Observaciones: ${formData.obs}` : ''}
¡Muchas gracias!`;

    window.open(`${WA_URL}?text=${encodeURIComponent(message)}`, '_blank');
    showToast("¡Solicitud enviada! Respondemos en minutos.", "exito");

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FD5E53', '#FFD166', '#F5F0FF'],
    });
  };

  const openDays = tenantConfig.horarios.diasAbiertos;

  return (
    <section id="sec-reservas" className="py-20 bg-violeta-medio/20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="section-header text-center border-l-0 pl-0">
          <div className="inline-block px-3 py-1 bg-naranja/10 text-naranja text-[10px] tracking-[0.3em] font-display rounded-full mb-4">RESERVAS ONLINE</div>
          <h2 className="text-4xl md:text-5xl font-bold">Asegurá tu Lugar</h2>
          <p className="text-blanco-muted max-w-md mx-auto mt-4">{tenantConfig.reservas.mensajeEscasez}</p>
        </div>

        <div className="mt-12 bg-violeta-card p-4 md:p-8 rounded-2xl border border-naranja-borde/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 bg-naranja transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="step1" className="space-y-6">
                <h3 className="text-xl font-bold text-center mb-8">Paso 1: ¿Para qué querés venir?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tenantConfig.tiposReserva.map(tipo => (
                    <button
                      key={tipo.id}
                      onClick={() => setFormData({ ...formData, tipo: tipo.id })}
                      className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2 text-center ${formData.tipo === tipo.id ? 'bg-naranja/10 border-naranja' : 'bg-violeta border-transparent border-t-violeta-borde hover:border-naranja-borde'}`}
                    >
                      <span className="text-4xl mb-2">{tipo.icon}</span>
                      <span className="font-display font-bold tracking-widest">{tipo.title}</span>
                      <span className="text-[10px] text-blanco-muted uppercase">{tipo.desc}</span>
                    </button>
                  ))}
                </div>
                {formData.showNombre && (
                  <div className="bg-naranja/10 border border-naranja/30 rounded-xl p-3 text-sm text-center">
                    🎭 Pre-seleccionado: <strong>{formData.showNombre}</strong>
                  </div>
                )}
                {formData.pack && (
                  <div className="bg-naranja/10 border border-naranja/30 rounded-xl p-3 text-sm text-center">
                    🎂 Pack seleccionado: <strong>{formData.pack}</strong>
                  </div>
                )}
                <button onClick={nextStep} className="btn-primary w-full py-4 text-lg">CONTINUAR →</button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="step2" className="space-y-8">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => setStep(1)} className="text-blanco-muted flex items-center gap-2"><ChevronLeft size={16} /> VOLVER</button>
                  <h3 className="text-xl font-bold">Paso 2: Cuándo y cuántos</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-xs font-display tracking-widest text-naranja uppercase">{monthNames[currentMonth.getMonth()]}</label>
                      <div className="flex gap-2">
                        <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))} className="p-1 hover:text-naranja"><ChevronLeft size={16} /></button>
                        <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))} className="p-1 hover:text-naranja"><ChevronRight size={16} /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => (
                        <div key={i} className="text-[10px] text-blanco-muted py-2">{d}</div>
                      ))}
                      {Array.from({ length: 28 }).map((_, i) => {
                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
                        const isOpen = openDays.includes(date.getDay());
                        const dateStr = date.toLocaleDateString();
                        const isSelected = formData.fecha === dateStr;
                        const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                        return (
                          <button
                            key={i}
                            disabled={!isOpen || isPast}
                            onClick={() => setFormData({ ...formData, fecha: dateStr })}
                            className={`p-2 rounded-lg text-sm font-bold transition-all relative ${(!isOpen || isPast) ? 'opacity-10 cursor-not-allowed' : 'hover:bg-naranja/20'} ${isSelected ? 'bg-naranja text-white shadow-lg shadow-naranja/40' : ''}`}
                          >
                            {date.getDate()}
                            {date.getDay() === 6 && isOpen && !isPast && (
                              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-naranja rounded-full"></div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-display tracking-widest text-naranja uppercase mb-3">Personas</label>
                      <div className="flex items-center gap-4 bg-violeta p-2 rounded-lg justify-center">
                        <button onClick={() => setFormData({ ...formData, personas: Math.max(1, formData.personas - 1) })} className="p-2 bg-violeta-medio rounded-md"><Minus size={20} /></button>
                        <span className="text-2xl font-display font-bold w-12 text-center">{formData.personas}</span>
                        <button onClick={() => setFormData({ ...formData, personas: Math.min(30, formData.personas + 1) })} className="p-2 bg-violeta-medio rounded-md"><Plus size={20} /></button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-display tracking-widest text-naranja uppercase mb-3">Horario</label>
                      <div className="grid grid-cols-2 gap-2">
                        {tenantConfig.horariosReserva.map(h => (
                          <button
                            key={h}
                            onClick={() => setFormData({ ...formData, hora: h })}
                            className={`py-2 rounded-md font-display text-sm border ${formData.hora === h ? 'bg-naranja border-naranja' : 'border-violeta-borde hover:border-naranja/30'}`}
                          >
                            {h} hs
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {formData.tipo === 'Cumpleaños' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-6 border-t border-violeta-borde grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      placeholder="Nombre del agasajado"
                      className="bg-violeta p-3 rounded-lg outline-none focus:border-naranja border border-transparent transition-all"
                      value={formData.festejo.agasajado}
                      onChange={e => setFormData({ ...formData, festejo: { ...formData.festejo, agasajado: e.target.value } })}
                    />
                    <input
                      placeholder="Edad que cumple"
                      className="bg-violeta p-3 rounded-lg outline-none focus:border-naranja border border-transparent transition-all"
                      value={formData.festejo.edad}
                      onChange={e => setFormData({ ...formData, festejo: { ...formData.festejo, edad: e.target.value } })}
                    />
                  </motion.div>
                )}

                <button onClick={nextStep} className="btn-primary w-full py-4 text-lg">CONTINUAR →</button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="step3" className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => setStep(2)} className="text-blanco-muted flex items-center gap-2"><ChevronLeft size={16} /> VOLVER</button>
                  <h3 className="text-xl font-bold">Paso 3: Tus datos</h3>
                </div>

                <div className="space-y-4">
                  <input
                    placeholder="Nombre completo"
                    className="w-full bg-violeta p-4 rounded-xl outline-none border border-transparent focus:border-naranja"
                    value={formData.nombre}
                    onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                  />
                  <input
                    placeholder="Teléfono (WhatsApp)"
                    className="w-full bg-violeta p-4 rounded-xl outline-none border border-transparent focus:border-naranja"
                    value={formData.tel}
                    onChange={e => setFormData({ ...formData, tel: e.target.value })}
                  />
                  <textarea
                    placeholder="Algún pedido especial o comentario..."
                    className="w-full bg-violeta p-4 rounded-xl outline-none border border-transparent focus:border-naranja h-32 resize-none"
                    value={formData.obs}
                    onChange={e => setFormData({ ...formData, obs: e.target.value })}
                  />
                </div>

                <div className="bg-naranja/5 p-4 rounded-xl border border-naranja/20">
                  <h4 className="text-xs font-display tracking-widest text-naranja uppercase mb-2">Resumen de tu reserva</h4>
                  <p className="text-sm">
                    <strong>{formData.tipo}</strong>{formData.showNombre ? ` — ${formData.showNombre}` : ''}{formData.pack ? ` — Pack ${formData.pack}` : ''} para <strong>{formData.personas} personas</strong><br />
                    El <strong>{formData.fecha}</strong> a las <strong>{formData.hora} hs</strong>
                  </p>
                </div>

                <button onClick={submitReservation} className="btn-primary w-full py-4 text-lg shimmer-hover flex items-center justify-center gap-2">
                  <MessageCircle size={24} /> CONFIRMAR POR WHATSAPP →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
