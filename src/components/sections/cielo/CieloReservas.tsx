import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Minus, Plus, MessageCircle } from 'lucide-react';
import { useReservation } from '../../../hooks/useReservation';

const MONTH_NAMES = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];

const FALLBACK_TIPOS = [
  { id: 'Living', title: 'LIVING VIP',      desc: 'Vista garantizada, privacidad real' },
  { id: 'Barra',  title: 'BARRA ALTA',      desc: 'Experiencia con el bartender' },
  { id: 'Evento', title: 'EVENTO PRIVADO',  desc: 'Celebraciones exclusivas' },
];

export default function CieloReservas() {
  const { tc, step, form, setForm, setField, next, back, submit, currentMonth, setCurrentMonth, openDays } = useReservation();

  const tipos = tc.tiposReserva?.length ? tc.tiposReserva : FALLBACK_TIPOS;
  const horarios = tc.horariosReserva?.length ? tc.horariosReserva : ["19:00","20:00","21:00","22:00","23:00","00:00"];

  return (
    <section id="cielo-reservas" className="py-32" style={{ background: tc.tema.primarioMedio }}>
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-14">
          <span className="font-display text-[10px] tracking-[0.5em] uppercase" style={{ color: tc.tema.acento }}>◇ RESERVAS ONLINE</span>
          <h2 className="font-titulo font-light mt-4" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: tc.tema.dorado, fontStyle: 'italic' }}>
            Asegurá tu lugar.
          </h2>
          <p className="mt-4 text-sm" style={{ color: tc.tema.blancoMuted ?? '#9E8E7A' }}>{tc.reservas.mensajeEscasez}</p>
        </motion.div>

        <div className="p-8 md:p-12 relative" style={{ background: tc.tema.primarioCard, border: `1px solid rgba(184,150,110,0.15)` }}>
          {/* Progress bar */}
          <div className="absolute top-0 left-0 h-0.5 transition-all duration-500" style={{ width: `${(step / 3) * 100}%`, background: tc.tema.acento }} />

          {/* STEP 1 */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <h3 className="font-display tracking-[0.2em] text-sm mb-8 text-center" style={{ color: tc.tema.dorado }}>
                PASO 1 — ¿QUÉ TIPO DE VISITA?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {tipos.map((t: any) => (
                  <button key={t.id} onClick={() => setField('tipo', t.id)} className="p-6 text-left transition-all duration-300"
                    style={{
                      background: form.tipo === t.id ? `rgba(184,150,110,0.12)` : 'rgba(14,12,9,0.5)',
                      border: `1px solid ${form.tipo === t.id ? tc.tema.acento : 'rgba(184,150,110,0.15)'}`,
                    }}>
                    <div className="font-display text-[11px] tracking-[0.3em] mb-2" style={{ color: form.tipo === t.id ? tc.tema.acento : tc.tema.dorado }}>
                      {t.title || t.label}
                    </div>
                    <div className="text-xs" style={{ color: tc.tema.blancoMuted ?? '#9E8E7A' }}>{t.desc}</div>
                  </button>
                ))}
              </div>
              <button onClick={next} className="w-full py-4 font-display text-xs tracking-[0.35em] uppercase transition-all" style={{ background: tc.tema.acento, color: tc.tema.primario }}>
                CONTINUAR →
              </button>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <button onClick={back} className="font-display text-[10px] tracking-widest flex items-center gap-1" style={{ color: tc.tema.blancoMuted ?? '#9E8E7A' }}>
                  <ChevronLeft size={14} /> VOLVER
                </button>
                <h3 className="font-display tracking-[0.2em] text-xs" style={{ color: tc.tema.dorado }}>PASO 2 — CUÁNDO Y CUÁNTOS</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Calendario */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-[10px] tracking-[0.3em]" style={{ color: tc.tema.acento }}>
                      {MONTH_NAMES[currentMonth.getMonth()]}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-1" style={{ color: tc.tema.blancoMuted ?? '#9E8E7A' }}><ChevronLeft size={16} /></button>
                      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-1" style={{ color: tc.tema.blancoMuted ?? '#9E8E7A' }}><ChevronRight size={16} /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {['D','L','M','M','J','V','S'].map((d, i) => (
                      <div key={i} className="text-[10px] py-2 font-display" style={{ color: tc.tema.blancoMuted ?? '#9E8E7A' }}>{d}</div>
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
                          <button key={d} disabled={!isOpen || isPast} onClick={() => setField('fecha', dateStr)}
                            className="p-2 text-sm font-bold transition-all rounded-sm"
                            style={{
                              opacity: (!isOpen || isPast) ? 0.1 : 1,
                              cursor: (!isOpen || isPast) ? 'not-allowed' : 'pointer',
                              background: selected ? tc.tema.acento : 'transparent',
                              color: selected ? tc.tema.primario : tc.tema.dorado,
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
                    <div className="font-display text-[10px] tracking-[0.35em] mb-4" style={{ color: tc.tema.acento }}>PERSONAS</div>
                    <div className="flex items-center gap-4 justify-center py-3" style={{ border: `1px solid rgba(184,150,110,0.15)` }}>
                      <button onClick={() => setField('personas', Math.max(1, form.personas - 1))} className="p-2" style={{ color: tc.tema.blancoMuted ?? '#9E8E7A' }}><Minus size={18} /></button>
                      <span className="font-titulo text-3xl font-light w-12 text-center" style={{ color: tc.tema.dorado }}>{form.personas}</span>
                      <button onClick={() => setField('personas', Math.min(30, form.personas + 1))} className="p-2" style={{ color: tc.tema.blancoMuted ?? '#9E8E7A' }}><Plus size={18} /></button>
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-[10px] tracking-[0.35em] mb-4" style={{ color: tc.tema.acento }}>HORARIO</div>
                    <div className="grid grid-cols-3 gap-2">
                      {horarios.map((h: string) => (
                        <button key={h} onClick={() => setField('hora', h)}
                          className="py-3 font-display text-xs tracking-widest transition-all"
                          style={{
                            background: form.hora === h ? tc.tema.acento : 'rgba(14,12,9,0.5)',
                            color: form.hora === h ? tc.tema.primario : (tc.tema.blancoMuted ?? '#9E8E7A'),
                            border: `1px solid ${form.hora === h ? tc.tema.acento : 'rgba(184,150,110,0.15)'}`,
                          }}
                        >{h}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={next} className="w-full py-4 font-display text-xs tracking-[0.35em] uppercase mt-10 transition-all" style={{ background: tc.tema.acento, color: tc.tema.primario }}>
                CONTINUAR →
              </button>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <button onClick={back} className="font-display text-[10px] tracking-widest flex items-center gap-1" style={{ color: tc.tema.blancoMuted ?? '#9E8E7A' }}>
                  <ChevronLeft size={14} /> VOLVER
                </button>
                <h3 className="font-display tracking-[0.2em] text-xs" style={{ color: tc.tema.dorado }}>PASO 3 — TUS DATOS</h3>
              </div>

              <div className="space-y-0 mb-8">
                {[
                  { placeholder: 'Nombre completo *', key: 'nombre' },
                  { placeholder: 'Teléfono / WhatsApp *', key: 'tel' },
                ].map(f => (
                  <input key={f.key} placeholder={f.placeholder} value={(form as any)[f.key]}
                    onChange={e => setForm((prev: any) => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full px-0 py-4 bg-transparent text-sm outline-none"
                    style={{ color: tc.tema.dorado, borderBottom: `1px solid rgba(184,150,110,0.25)` } as any}
                  />
                ))}
                <textarea placeholder="Algún pedido especial..." value={form.obs}
                  onChange={e => setField('obs', e.target.value)} rows={3}
                  className="w-full px-0 py-4 bg-transparent text-sm outline-none resize-none"
                  style={{ color: tc.tema.dorado, borderBottom: `1px solid rgba(184,150,110,0.25)` }}
                />
              </div>

              <div className="p-5 mb-8" style={{ background: 'rgba(184,150,110,0.06)', border: `1px solid rgba(184,150,110,0.15)` }}>
                <div className="font-display text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: tc.tema.acento }}>RESUMEN</div>
                <p className="text-sm" style={{ color: tc.tema.blancoMuted ?? '#9E8E7A' }}>
                  <span style={{ color: tc.tema.dorado }}>{form.tipo}</span> para <span style={{ color: tc.tema.dorado }}>{form.personas} personas</span><br />
                  El <span style={{ color: tc.tema.dorado }}>{form.fecha}</span> a las <span style={{ color: tc.tema.dorado }}>{form.hora}</span>
                </p>
              </div>

              <button onClick={submit} className="w-full py-4 font-display text-xs tracking-[0.35em] uppercase flex items-center justify-center gap-3 transition-all" style={{ background: tc.tema.acento, color: tc.tema.primario }}>
                <MessageCircle size={18} /> CONFIRMAR POR WHATSAPP →
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
