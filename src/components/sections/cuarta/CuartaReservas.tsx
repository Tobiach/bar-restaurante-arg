import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MessageCircle, Minus, Plus, Sofa, Users, Gift } from 'lucide-react';
import { useReservation } from '../../../hooks/useReservation';

const TIPO_ICONS: Record<string, any> = { Sofa, Music2: Sofa, Gift, Users };
const MONTH_NAMES = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];

export default function CuartaReservas() {
  const { tc, step, form, setForm, setField, next, back, submit, currentMonth, setCurrentMonth, openDays, progressPct } = useReservation();

  return (
    <section id="cuarta-reservas" style={{ background: tc.tema.primario, padding: '96px 0' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '16px', background: `rgba(${hexToRgb(tc.tema.acento)},0.07)`, padding: '6px 16px', border: `1px solid rgba(${hexToRgb(tc.tema.acento)},0.15)` }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.4em', color: tc.tema.acento, textTransform: 'uppercase' }}>RESERVAS ONLINE</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(48px, 6vw, 80px)', letterSpacing: '0.02em', color: tc.tema.dorado, margin: '0 0 8px', lineHeight: 0.9 }}>
            ASEGURÁ TU MESA
          </h2>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '17px', color: tc.tema.blancoMuted ?? '#9E8050' }}>
            {tc.reservas.mensajeEscasez}
          </p>
        </motion.div>

        {/* Stepper card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ background: tc.tema.primarioCard, border: `1px solid rgba(${hexToRgb(tc.tema.acento)},0.1)`, padding: '40px', position: 'relative', overflow: 'hidden' }}
        >
          {/* Progress bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `rgba(${hexToRgb(tc.tema.acento)},0.08)` }}>
            <motion.div animate={{ width: `${progressPct}%` }} transition={{ duration: 0.5 }} style={{ height: '100%', background: tc.tema.acento }} />
          </div>

          {/* Step indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '40px', paddingTop: '8px' }}>
            {['TIPO', 'CUÁNDO', 'DATOS'].map((label, i) => {
              const s = i + 1;
              const done = step > s;
              const active = step === s;
              return (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: done ? tc.tema.acento : active ? `rgba(${hexToRgb(tc.tema.acento)},0.15)` : 'transparent',
                    border: `1px solid ${done || active ? tc.tema.acento : `rgba(${hexToRgb(tc.tema.acento)},0.2)`}`,
                    fontFamily: "'Bebas Neue', cursive", fontSize: '14px',
                    color: done ? tc.tema.primario : active ? tc.tema.acento : (tc.tema.blancoMuted ?? '#9E8050'),
                  }}>
                    {done ? '✓' : s}
                  </div>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.25em', color: active ? tc.tema.dorado : (tc.tema.blancoMuted ?? '#9E8050'), textTransform: 'uppercase' }}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '14px', letterSpacing: '0.2em', color: tc.tema.blancoMuted ?? '#9E8050', textTransform: 'uppercase', marginBottom: '24px', textAlign: 'center' }}>
                  ¿Para qué vas a venir?
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '28px' }}>
                  {tc.tiposReserva.map((tipo: any) => {
                    const Icon = TIPO_ICONS[tipo.iconName] || Sofa;
                    const sel = form.tipo === tipo.id;
                    return (
                      <button key={tipo.id} onClick={() => setField('tipo', tipo.id)}
                        style={{
                          padding: '28px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center',
                          background: sel ? `rgba(${hexToRgb(tc.tema.acento)},0.1)` : `rgba(${hexToRgb(tc.tema.primarioCard)},0.5)`,
                          border: `1px solid ${sel ? tc.tema.acento : `rgba(${hexToRgb(tc.tema.acento)},0.12)`}`,
                          cursor: 'pointer', transition: 'all 0.2s',
                        }}>
                        <Icon size={32} style={{ color: sel ? tc.tema.acento : (tc.tema.blancoMuted ?? '#9E8050') }} strokeWidth={1.3} />
                        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '14px', letterSpacing: '0.15em', textTransform: 'uppercase', color: sel ? tc.tema.dorado : (tc.tema.blancoMuted ?? '#9E8050'), fontWeight: 600 }}>
                          {tipo.title}
                        </span>
                        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '12px', color: tc.tema.blancoMuted ?? '#9E8050' }}>{tipo.desc}</span>
                      </button>
                    );
                  })}
                </div>
                <BtnPrimary tc={tc} onClick={next}>CONTINUAR →</BtnPrimary>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '32px', marginBottom: '28px' }}>
                  {/* Calendar */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', letterSpacing: '0.2em', color: tc.tema.acento, textTransform: 'uppercase' }}>
                        {MONTH_NAMES[currentMonth.getMonth()]}
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: tc.tema.blancoMuted ?? '#9E8050' }}><ChevronLeft size={16} /></button>
                        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: tc.tema.blancoMuted ?? '#9E8050' }}><ChevronRight size={16} /></button>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center' }}>
                      {['D','L','M','M','J','V','S'].map((d, i) => (
                        <div key={i} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', color: tc.tema.blancoMuted ?? '#9E8050', padding: '6px 0', letterSpacing: '0.1em' }}>{d}</div>
                      ))}
                      {(() => {
                        const yr = currentMonth.getFullYear(), mo = currentMonth.getMonth();
                        const days = new Date(yr, mo + 1, 0).getDate();
                        const first = new Date(yr, mo, 1).getDay();
                        const today = new Date(); today.setHours(0,0,0,0);
                        const cells = [];
                        for (let i = 0; i < first; i++) cells.push(<div key={`e${i}`} />);
                        for (let d = 1; d <= days; d++) {
                          const date = new Date(yr, mo, d);
                          const isOpen = openDays.includes(date.getDay());
                          const ds = date.toLocaleDateString();
                          const sel = form.fecha === ds;
                          const past = date < today;
                          cells.push(
                            <button key={d} disabled={!isOpen || past} onClick={() => setField('fecha', ds)}
                              style={{
                                padding: '6px', fontSize: '12px', fontWeight: 600, transition: 'all 0.15s',
                                background: sel ? tc.tema.acento : 'transparent',
                                color: sel ? tc.tema.primario : (!isOpen || past) ? `rgba(${hexToRgb(tc.tema.acento)},0.2)` : tc.tema.dorado,
                                border: `1px solid ${sel ? tc.tema.acento : 'transparent'}`,
                                cursor: (!isOpen || past) ? 'not-allowed' : 'pointer',
                              }}
                            >{d}</button>
                          );
                        }
                        return cells;
                      })()}
                    </div>
                  </div>
                  {/* Time + Persons */}
                  <div>
                    <div style={{ marginBottom: '20px' }}>
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', letterSpacing: '0.25em', color: tc.tema.acento, textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>PERSONAS</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: tc.tema.primarioMedio, padding: '8px 16px', border: `1px solid rgba(${hexToRgb(tc.tema.acento)},0.12)`, justifyContent: 'center' }}>
                        <button onClick={() => setField('personas', Math.max(1, form.personas - 1))} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: tc.tema.acento }}><Minus size={18} /></button>
                        <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '32px', color: tc.tema.dorado, width: '40px', textAlign: 'center' }}>{form.personas}</span>
                        <button onClick={() => setField('personas', Math.min(30, form.personas + 1))} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: tc.tema.acento }}><Plus size={18} /></button>
                      </div>
                    </div>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', letterSpacing: '0.25em', color: tc.tema.acento, textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>HORARIO</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      {tc.horariosReserva.map((h: string) => (
                        <button key={h} onClick={() => setField('hora', h)}
                          style={{
                            padding: '8px', fontFamily: "'Bebas Neue', cursive", fontSize: '16px', letterSpacing: '0.06em',
                            background: form.hora === h ? tc.tema.acento : 'transparent',
                            color: form.hora === h ? tc.tema.primario : (tc.tema.blancoMuted ?? '#9E8050'),
                            border: `1px solid ${form.hora === h ? tc.tema.acento : `rgba(${hexToRgb(tc.tema.acento)},0.15)`}`,
                            cursor: 'pointer', transition: 'all 0.15s',
                          }}
                        >{h} hs</button>
                      ))}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {form.tipo === 'Cumpleaños' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px', overflow: 'hidden' }}>
                      <input placeholder="Nombre del agasajado" value={form.festejo.agasajado} onChange={e => setForm(f => ({ ...f, festejo: { ...f.festejo, agasajado: e.target.value } }))}
                        style={inputStyle(tc)} />
                      <input placeholder="Edad que cumple" value={form.festejo.edad} onChange={e => setForm(f => ({ ...f, festejo: { ...f.festejo, edad: e.target.value } }))}
                        style={inputStyle(tc)} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <BtnBack tc={tc} onClick={back} />
                  <BtnPrimary tc={tc} onClick={next} style={{ flex: 1 }}>CONTINUAR →</BtnPrimary>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <input placeholder="Nombre completo *" value={form.nombre} onChange={e => setField('nombre', e.target.value)} style={inputStyle(tc)} />
                  <input placeholder="Teléfono / WhatsApp *" value={form.tel} onChange={e => setField('tel', e.target.value)} style={inputStyle(tc)} />
                  <textarea placeholder="Algún pedido especial..." value={form.obs} onChange={e => setField('obs', e.target.value)} rows={3} style={{ ...inputStyle(tc), resize: 'none' }} />
                </div>

                <div style={{ background: `rgba(${hexToRgb(tc.tema.acento)},0.05)`, border: `1px solid rgba(${hexToRgb(tc.tema.acento)},0.15)`, padding: '16px', marginBottom: '20px' }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.3em', color: tc.tema.acento, textTransform: 'uppercase', marginBottom: '8px' }}>RESUMEN</div>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '16px', color: tc.tema.dorado, lineHeight: 1.5 }}>
                    <strong>{form.tipo}</strong>{form.pack ? ` — ${form.pack}` : ''} para <strong>{form.personas} personas</strong><br />
                    El <strong>{form.fecha}</strong> a las <strong>{form.hora} hs</strong>
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <BtnBack tc={tc} onClick={back} />
                  <button onClick={submit}
                    style={{ flex: 1, padding: '14px', background: tc.tema.acento, color: tc.tema.primario, border: 'none', cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', letterSpacing: '0.25em', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <MessageCircle size={18} /> CONFIRMAR POR WHATSAPP →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function inputStyle(tc: any): React.CSSProperties {
  return {
    background: tc.tema.primarioMedio,
    border: `1px solid rgba(${hexToRgb(tc.tema.acento)},0.12)`,
    padding: '14px 16px',
    color: tc.tema.dorado,
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '16px',
    outline: 'none',
    width: '100%',
  };
}

function BtnPrimary({ tc, onClick, children, style = {} }: any) {
  return (
    <button onClick={onClick} style={{ width: '100%', padding: '16px', background: tc.tema.acento, color: tc.tema.primario, border: 'none', cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase', ...style }}>
      {children}
    </button>
  );
}

function BtnBack({ tc, onClick }: any) {
  return (
    <button onClick={onClick} style={{ padding: '14px 20px', background: 'transparent', border: `1px solid rgba(${hexToRgb(tc.tema.acento)},0.2)`, color: tc.tema.blancoMuted ?? '#9E8050', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '12px', letterSpacing: '0.2em' }}>
      ← VOLVER
    </button>
  );
}
