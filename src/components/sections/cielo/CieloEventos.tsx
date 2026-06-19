import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { getConfig } from '../../../config/active';
import { useToast } from '../../Toast';

const TIPOS_EVENTO = ['Cumpleaños', 'Corporativo', 'Celebración', 'Aniversario', 'Otro'];
const PRESUPUESTOS = ['Hasta $500k', '$500k–$1M', '$1M–$2M', '+$2M', 'A consultar'];

const inputStyle: React.CSSProperties = {
  width: '100%',
  paddingTop: '16px',
  paddingBottom: '12px',
  background: 'transparent',
  outline: 'none',
  color: '#EDE0CC',
  fontSize: '14px',
  borderBottom: '1px solid rgba(184,150,110,0.25)',
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none',
  cursor: 'pointer',
};

export default function CieloEventos() {
  const tc = getConfig();
  const { showToast } = useToast();
  const WA_URL = `https://wa.me/${tc.whatsapp}`;

  const [form, setForm] = useState({
    nombre: '', email: '', tel: '', tipo: '', fecha: '', personas: '', presupuesto: '', mensaje: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.tel) {
      return showToast('Completá los campos obligatorios', 'aviso');
    }
    const msg = `Consulta de evento privado en Cielo Rooftop:\nNombre: ${form.nombre}\nEmail: ${form.email}\nTeléfono: ${form.tel}\nTipo: ${form.tipo}\nFecha: ${form.fecha}\nPersonas: ${form.personas}\nPresupuesto: ${form.presupuesto}\nDetalle: ${form.mensaje}`;
    window.open(`${WA_URL}?text=${encodeURIComponent(msg)}`, '_blank');
    showToast('¡Consulta enviada! Te contactamos en 24 hs.', 'exito');
  };

  return (
    <section id="cielo-eventos" className="py-32" style={{ background: '#0E0C09' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden lg:sticky lg:top-28"
            style={{ height: '600px', border: '1px solid rgba(184,150,110,0.1)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=85"
              alt="Evento privado en rooftop exclusivo"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.75) saturate(0.85)' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,12,9,0.7) 0%, transparent 50%)' }} />
            <div className="absolute bottom-10 left-10">
              <div className="font-display text-[9px] tracking-[0.4em] mb-2" style={{ color: '#B8966E' }}>CAPACIDAD</div>
              <div className="font-titulo text-5xl font-light" style={{ color: '#EDE0CC' }}>200</div>
              <div className="font-display text-[9px] tracking-widest mt-1" style={{ color: '#9E8E7A' }}>PERSONAS MÁX.</div>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
          >
            <span className="font-display text-[10px] tracking-[0.5em] uppercase" style={{ color: '#B8966E' }}>◇ EVENTOS PRIVADOS</span>
            <h2 className="font-titulo font-light mt-4 mb-10" style={{ fontSize: 'clamp(36px, 4vw, 56px)', color: '#EDE0CC', fontStyle: 'italic' }}>
              Tu evento.<br />El escenario perfecto.
            </h2>
            <p className="text-sm mb-10" style={{ color: '#9E8E7A' }}>
              Para hasta 200 personas. Rooftop completo disponible.
            </p>

            <form onSubmit={submit} className="space-y-2">
              <input
                style={inputStyle}
                placeholder="Nombre completo *"
                value={form.nombre}
                onChange={e => setForm({ ...form, nombre: e.target.value })}
              />
              <input
                style={inputStyle}
                placeholder="Email *"
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
              <input
                style={inputStyle}
                placeholder="Teléfono / WhatsApp *"
                value={form.tel}
                onChange={e => setForm({ ...form, tel: e.target.value })}
              />
              <select
                style={selectStyle}
                value={form.tipo}
                onChange={e => setForm({ ...form, tipo: e.target.value })}
              >
                <option value="" style={{ background: '#1E1A14' }}>Tipo de evento</option>
                {TIPOS_EVENTO.map(t => <option key={t} value={t} style={{ background: '#1E1A14' }}>{t}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input
                  style={inputStyle}
                  type="date"
                  value={form.fecha}
                  onChange={e => setForm({ ...form, fecha: e.target.value })}
                />
                <input
                  style={inputStyle}
                  placeholder="Cantidad de personas"
                  type="number"
                  value={form.personas}
                  onChange={e => setForm({ ...form, personas: e.target.value })}
                />
              </div>
              <select
                style={selectStyle}
                value={form.presupuesto}
                onChange={e => setForm({ ...form, presupuesto: e.target.value })}
              >
                <option value="" style={{ background: '#1E1A14' }}>Presupuesto aproximado</option>
                {PRESUPUESTOS.map(p => <option key={p} value={p} style={{ background: '#1E1A14' }}>{p}</option>)}
              </select>
              <textarea
                style={{ ...inputStyle, resize: 'none', paddingBottom: '16px' }}
                placeholder="Detalles adicionales..."
                rows={4}
                value={form.mensaje}
                onChange={e => setForm({ ...form, mensaje: e.target.value })}
              />

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-5 font-display text-xs tracking-[0.35em] uppercase flex items-center justify-center gap-3 transition-all"
                  style={{ background: '#B8966E', color: '#0E0C09' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#D4B896'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#B8966E'; }}
                >
                  <MessageCircle size={16} /> ENVIAR CONSULTA →
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
