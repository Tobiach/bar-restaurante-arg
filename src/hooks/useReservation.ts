import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { getConfig } from '../config/active';
import { reservationStore } from '../store/reservationStore';
import { supabase, supabaseEnabled } from '../lib/supabase';
import { useToast } from '../components/Toast';
import { puntosService } from '../lib/puntosService';

export interface ReservationForm {
  tipo: string;
  pack: string;
  showNombre: string;
  fecha: string;
  hora: string;
  personas: number;
  nombre: string;
  tel: string;
  obs: string;
  festejo: { agasajado: string; edad: string };
}

const INITIAL_FORM: ReservationForm = {
  tipo: '', pack: '', showNombre: '',
  fecha: '', hora: '', personas: 2,
  nombre: '', tel: '', obs: '',
  festejo: { agasajado: '', edad: '' },
};

export function useReservation(confettiColors?: string[]) {
  const tc = getConfig();
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [form, setForm] = useState<ReservationForm>(INITIAL_FORM);

  // Pre-populate from shows/packs
  useEffect(() => {
    const pre = reservationStore.get();
    if (pre.tipo) {
      setForm(f => ({ ...f, tipo: pre.tipo!, pack: pre.pack || '', showNombre: pre.showNombre || '' }));
      reservationStore.clear();
    }
  }, []);

  const next = () => {
    if (step === 1 && !form.tipo) return showToast('Seleccioná un tipo de visita', 'aviso');
    if (step === 2 && !form.fecha) return showToast('Seleccioná una fecha', 'aviso');
    if (step === 2 && !form.hora) return showToast('Seleccioná un horario', 'aviso');
    setStep(s => s + 1);
  };

  const back = () => setStep(s => Math.max(1, s - 1));

  const submit = () => {
    if (!form.nombre || !form.tel) return showToast('Completá tus datos de contacto', 'aviso');

    const reserva = {
      id: Date.now(),
      fecha: form.fecha,
      hora: form.hora,
      tipo: form.tipo,
      nombre: form.nombre,
      personas: form.personas,
      observaciones: form.obs,
      estado: 'pendiente',
      timestamp: new Date().toISOString(),
    };

    // Persist to localStorage for admin panel (survives page reloads)
    try {
      const KEY = `panel-reservas-${tc.nombre}`;
      const rs = JSON.parse(localStorage.getItem(KEY) || '[]');
      rs.push({ ...reserva, telefono: form.tel });
      localStorage.setItem(KEY, JSON.stringify(rs));
    } catch { /* skip */ }

    // Supabase insert if enabled
    if (supabaseEnabled && supabase) {
      supabase.from('reservas').insert({
        ...reserva,
        telefono: form.tel,
        pack: form.pack || null,
        show_nombre: form.showNombre || null,
        tenant: tc.nombre,
      }).then(() => {});
    }

    // Points — 50pts per reservation
    if (form.tel) {
      puntosService.addPuntos(form.tel, form.nombre, `Reserva: ${form.tipo}`, 50);
    }

    // WhatsApp deeplink
    const msg = [
      `Hola ${tc.nombre}! Quiero reservar:`,
      `Tipo: ${form.tipo}${form.pack ? ` — ${form.pack}` : ''}`,
      `Fecha: ${form.fecha} | Hora: ${form.hora} | Personas: ${form.personas}`,
      `Nombre: ${form.nombre} | Tel: ${form.tel}`,
      form.obs ? `Observaciones: ${form.obs}` : '',
      '¡Gracias!',
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${tc.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    showToast('¡Reserva enviada! Te confirmamos en minutos.', 'exito');

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: confettiColors ?? [tc.tema.acento, tc.tema.acentoClaro, tc.tema.dorado],
    });
  };

  const setField = <K extends keyof ReservationForm>(key: K, value: ReservationForm[K]) =>
    setForm(f => ({ ...f, [key]: value }));

  const openDays: number[] = tc.horarios.diasAbiertos;
  const progressPct = ((step - 1) / 2) * 100;

  return { tc, step, form, setForm, setField, next, back, submit, currentMonth, setCurrentMonth, openDays, progressPct };
}
