import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Minus, Plus, MessageCircle } from 'lucide-react';
import { getConfig } from '../../../config/active';
import { useToast } from '../../Toast';

const MONTH_NAMES = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
const HORARIOS = ["19:00","20:00","21:00","22:00","23:00","00:00"];
const TIPOS = [
  { id: 'Living', label: 'LIVING VIP', desc: 'Vista garantizada, privacidad real' },
  { id: 'Barra',  label: 'BARRA ALTA', desc: 'Experiencia con el bartender' },
  { id: 'Evento', label: 'EVENTO PRIVADO', desc: 'Celebraciones exclusivas' },
];

export default function CieloReservas() {
  const tc = getConfig();
  const { showToast } = useToast();
  const WA_URL = `https://wa.me/${tc.whatsapp}`;
  const [step, setStep] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [form, setForm] = useState({ tipo: '', fecha: '', hora: '', personas: 2, nombre: '', tel: '', obs: '' });

  const nextStep = () => {
    if (step === 1 && !form.tipo) return showToast('Seleccioná un tipo de reserva', 'aviso');
    if (step === 2 && (!form.fecha || !form.hora)) return showToast('Seleccioná fecha y horario', 'aviso');
    setStep(s => s + 1);
  };

  const submit = () => {
    if (!form.nombre || !form.tel) return showToast('Completá tus datos de contacto', 'aviso');
    const msg = `Reserva en Cielo Rooftop:\nTipo: ${form.tipo}\nFecha: ${form.fecha} | Hora: ${form.hora} | Personas: ${form.personas}\nNombre: ${form.nombre} | Tel: ${form.tel}\n${form.obs ? `Nota: ${form.obs}` : ''}`;
    window.open(`${WA_URL}?text=${encodeURIComponent(msg)}`, '_blank');
    showToast('¡Solicitud enviada! Te respondemos en minutos.', 'exito');
  };

  const openDays = tc.horarios.diasAbiertos;

  return (
    <section id="cielo-reservas" className="py-32" style={{ background: '#161310' }}>
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="font-display text-[10px] tracking-[0.5em] uppercase" style={{ color: '#B8966E' }}>◇ RESERVAS ONLINE</span>
          <h2 className="font-titulo font-light mt-4" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: '#EDE0CC', fontStyle: 'italic' }}>
            Asegurá tu lugar.
          </h2>
          <p className="mt-4 text-sm" style={{ color: '#9E8E7A' }}>{tc.reservas.mensajeEscasez}</p>
        </motion.div>

        <div className="p-8 md:p-12 relative" style={{ background: '#1E1A14', border: '1px solid rgba(184,150,110,0.15)' }}>
          {/* Progress bar */}
          <div className="absolute top-0 left-0 h-0.5 transition-all duration-500" style={{ width: `${(step / 3) * 100}%`, background: '#B8966E' }} />

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <h3 className="font-display tracking-[0.2em] text-sm mb-8 text-center" style={{ color: '#EDE0CC' }}>
                PASO 1 — ¿QUÉ TIPO DE VISITA?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {TIPOS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setForm({ ...form, tipo: t.id })}
                    className="p-6 text-left transition-all duration-300"
                    style={{
                      background: form.tipo === t.id ? 'rgba(184,150,110,0.12)' : 'rgba(14,12,9,0.5)',
                      border: `1px solid ${form.tipo === t.id ? '#B8966E' : 'rgba(184,150,110,0.15)'}`,
                    }}
                  >
                    <div className="font-display text-[11px] tracking-[0.3em] mb-2" style={{ color: form.tipo === t.id ? '#B8966E' : '#EDE0CC' }}>
                      {t.label}
                    </div>
                    <div className="text-xs" style={{ color: '#9E8E7A' }}>{t.desc}</div>
                  </button>
                ))}
              </div>
              <button onClick={nextStep} className="w-full py-4 font-display text-xs tracking-[0.35em] uppercase transition-all" style={{ background: '#B8966E', color: '#0E0C09' }}>
                CONTINUAR →
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <button onClick={() => setStep(1)} className="font-display text-[10px] tracking-widest flex items-center gap-1" style={{ color: '#9E8E7A' }}>
                  <ChevronLeft size={14} /> VOLVER
                </button>
                <h3 className="font-display tracking-[0.2em] text-xs" style={{ color: '#EDE0CC' }}>PASO 2 — CUÁNDO Y CUÁNTOS</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Calendario */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-[10px] tracking-[0.3em]" style={{ color: '#B8966E' }}>
                      {MONTH_NAMES[currentMonth.getMonth()]}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-1" style={{ color: '#9E8E7A' }}><ChevronLeft size={16} /></button>
                      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-1" style={{ color: '#9E8E7A' }}><ChevronRight size={16} /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {['D','L','M','M','J','V','S'].map((d, i) => (
                      <div key={i} className="text-[10px] py-2 font-display" style={{ color: '#9E8E7A' }}>{d}</div>
                    ))}
                    {(() => {
                      const y = currentMonth.getFullYear(), m = currentMonth.getMonth();
                      const days = new Date(y, m + 1, 0).getDate();
                      const first = new Date(y, m, 1).getDay();
                      const today = new Date(new Date().setHours(0,0,0,0));
                      const cells = [];
                      for (let i = 0; i < first; i++) cells.push(<div key={`e${i}`} />);
                      for (let d = 1; d <= days; d++) {
                        const date = new Date(y, m, d);
                        const isOpen = openDays.includes(date.getDay());
                        const isPast = date < today;
                        const dateStr = date.toLocaleDateString();
                        const selected = form.fecha === dateStr;
                        cells.push(
                          <button
                            key={d}
                            disabled={!isOpen || isPast}
                            onClick={() => setForm({ ...form, fecha: dateStr })}
                            className="p-2 text-sm font-bold transition-all rounded-sm"
                            style={{
                              opacity: (!isOpen || isPast) ? 0.1 : 1,
                              cursor: (!isOpen || isPast) ? 'not-allowed' : 'pointer',
                              background: selected ? '#B8966E' : 'transparent',
                              color: selected ? '#0E0C09' : '#EDE0CC',
                            }}
                          >{d}</button>
                        );
                      }
                      return cells;
                    })()}
                  </div>
                </div>

                {/* Personas y horario */}
                <div className="space-y-8">
                  <div>
                    <div className="font-display text-[10px] tracking-[0.35em] mb-4" style={{ color: '#B8966E' }}>PERSONAS</div>
                    <div className="flex items-center gap-4 justify-center py-3" style={{ border: '1px solid rgba(184,150,110,0.15)' }}>
                      <button onClick={() => setForm({ ...form, personas: Math.max(1, form.personas - 1) })} className="p-2" style={{ color: '#9E8E7A' }}><Minus size={18} /></button>
                      <span className="font-titulo text-3xl font-light w-12 text-center" style={{ color: '#EDE0CC' }}>{form.personas}</span>
                      <button onClick={() => setForm({ ...form, personas: Math.min(30, form.personas + 1) })} className="p-2" style={{ color: '#9E8E7A' }}><Plus size={18} /></button>
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-[10px] tracking-[0.35em] mb-4" style={{ color: '#B8966E' }}>HORARIO</div>
                    <div className="grid grid-cols-3 gap-2">
                      {HORARIOS.map(h => (
                        <button
                          key={h}
                          onClick={() => setForm({ ...form, hora: h })}
                          className="py-3 font-display text-xs tracking-widest transition-all"
                          style={{
                            background: form.hora === h ? '#B8966E' : 'rgba(14,12,9,0.5)',
                            color: form.hora === h ? '#0E0C09' : '#9E8E7A',
                            border: `1px solid ${form.hora === h ? '#B8966E' : 'rgba(184,150,110,0.15)'}`,
                          }}
                        >{h}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={nextStep} className="w-full py-4 font-display text-xs tracking-[0.35em] uppercase mt-10 transition-all" style={{ background: '#B8966E', color: '#0E0C09' }}>
                CONTINUAR →
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <button onClick={() => setStep(2)} className="font-display text-[10px] tracking-widest flex items-center gap-1" style={{ color: '#9E8E7A' }}>
                  <ChevronLeft size={14} /> VOLVER
                </button>
                <h3 className="font-display tracking-[0.2em] text-xs" style={{ color: '#EDE0CC' }}>PASO 3 — TUS DATOS</h3>
              </div>

              <div className="space-y-0 mb-8">
                {[
                  { placeholder: 'Nombre completo *', key: 'nombre' },
                  { placeholder: 'Teléfono / WhatsApp *', key: 'tel' },
                ].map(f => (
                  <input
                    key={f.key}
                    placeholder={f.placeholder}
                    value={(form as any)[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full px-0 py-4 bg-transparent text-sm outline-none"
                    style={{
                      color: '#EDE0CC',
                      borderBottom: '1px solid rgba(184,150,110,0.25)',
                      '::placeholder': { color: '#9E8E7A' },
                    } as any}
                  />
                ))}
                <textarea
                  placeholder="Algún pedido especial..."
                  value={form.obs}
                  onChange={e => setForm({ ...form, obs: e.target.value })}
                  rows={3}
                  className="w-full px-0 py-4 bg-transparent text-sm outline-none resize-none"
                  style={{ color: '#EDE0CC', borderBottom: '1px solid rgba(184,150,110,0.25)' }}
                />
              </div>

              {/* Resumen */}
              <div className="p-5 mb-8" style={{ background: 'rgba(184,150,110,0.06)', border: '1px solid rgba(184,150,110,0.15)' }}>
                <div className="font-display text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: '#B8966E' }}>RESUMEN</div>
                <p className="text-sm" style={{ color: '#9E8E7A' }}>
                  <span style={{ color: '#EDE0CC' }}>{form.tipo}</span> para <span style={{ color: '#EDE0CC' }}>{form.personas} personas</span><br />
                  El <span style={{ color: '#EDE0CC' }}>{form.fecha}</span> a las <span style={{ color: '#EDE0CC' }}>{form.hora}</span>
                </p>
              </div>

              <button onClick={submit} className="w-full py-4 font-display text-xs tracking-[0.35em] uppercase flex items-center justify-center gap-3 transition-all" style={{ background: '#B8966E', color: '#0E0C09' }}>
                <MessageCircle size={18} /> CONFIRMAR POR WHATSAPP →
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
