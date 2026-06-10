import { supabase, supabaseEnabled } from './supabase';

export interface HistorialEntry {
  fecha: string;
  desc: string;
  puntos: number;
}

export interface UserPuntos {
  phone: string;
  nombre: string;
  puntos: number;
  nivel: string;
  historial: HistorialEntry[];
}

const NIVELES = [
  { nombre: 'BÁSICO', min: 0 },
  { nombre: 'SILVER', min: 200 },
  { nombre: 'GOLD', min: 500 },
  { nombre: 'VIP', min: 1000 },
];

function getNivel(puntos: number): string {
  let nivel = NIVELES[0].nombre;
  for (const n of NIVELES) {
    if (puntos >= n.min) nivel = n.nombre;
  }
  return nivel;
}

function sanitize(phone: string): string {
  return phone.replace(/\D/g, '').slice(-10);
}

function key(phone: string): string {
  return `hpts_${sanitize(phone)}`;
}

function readLocal(phone: string): UserPuntos | null {
  try {
    const raw = localStorage.getItem(key(phone));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function writeLocal(user: UserPuntos): void {
  try { localStorage.setItem(key(user.phone), JSON.stringify(user)); } catch { /* ignore */ }
}

export const puntosService = {
  get(phone: string): UserPuntos | null {
    return readLocal(phone);
  },

  addPuntos(phone: string, nombre: string, motivo: string, cantidad: number): UserPuntos {
    const existing = readLocal(phone);
    const ahora = new Date().toLocaleDateString('es-AR');
    const updated: UserPuntos = existing
      ? {
          ...existing,
          nombre,
          puntos: existing.puntos + cantidad,
          nivel: getNivel(existing.puntos + cantidad),
          historial: [{ fecha: ahora, desc: motivo, puntos: cantidad }, ...existing.historial].slice(0, 20),
        }
      : {
          phone: sanitize(phone),
          nombre,
          puntos: cantidad,
          nivel: getNivel(cantidad),
          historial: [{ fecha: ahora, desc: motivo, puntos: cantidad }],
        };
    writeLocal(updated);

    // Supabase upsert if enabled
    if (supabaseEnabled && supabase) {
      supabase.from('usuarios_puntos').upsert({
        phone: sanitize(phone),
        nombre,
        puntos: updated.puntos,
        nivel: updated.nivel,
      }, { onConflict: 'phone' }).then(() => {});
    }

    return updated;
  },

  getNextNivel(puntos: number): { nombre: string; falta: number } {
    for (let i = 0; i < NIVELES.length - 1; i++) {
      if (puntos < NIVELES[i + 1].min) {
        return { nombre: NIVELES[i + 1].nombre, falta: NIVELES[i + 1].min - puntos };
      }
    }
    return { nombre: 'VIP', falta: 0 };
  },
};
