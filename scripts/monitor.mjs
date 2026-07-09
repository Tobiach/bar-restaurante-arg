// Chequea que bar-restaurante-arg responda. Uso: npm run monitor
// Limitación real: solo alerta mientras esta PC esté prendida y el script corriendo.
// No reemplaza un monitoreo 24/7 (para eso hace falta un servicio externo).

import { appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const BASE = 'https://bar-restaurante-arg.vercel.app';
const RUTAS = ['/?t=cielo', '/?t=cuarta', '/?t=isla', '/admin'];
const INTERVALO_MS = 5 * 60 * 1000;
const LOG_PATH = fileURLToPath(new URL('./monitor.log', import.meta.url));

async function chequear(ruta) {
  try {
    const res = await fetch(BASE + ruta, { signal: AbortSignal.timeout(10000) });
    return { ruta, ok: res.ok, status: res.status };
  } catch (err) {
    return { ruta, ok: false, status: 0, error: String(err) };
  }
}

function log(linea) {
  const texto = `[${new Date().toISOString()}] ${linea}`;
  console.log(texto);
  try { appendFileSync(LOG_PATH, texto + '\n'); } catch { /* skip */ }
}

async function ronda() {
  for (const ruta of RUTAS) {
    const r = await chequear(ruta);
    if (!r.ok) {
      process.stdout.write('\x07');
      log(`ALERTA — ${ruta} respondió ${r.status}${r.error ? ' — ' + r.error : ''}`);
    } else {
      log(`OK — ${ruta}`);
    }
  }
}

log(`Monitor iniciado — chequeando cada ${INTERVALO_MS / 60000} min`);
ronda();
setInterval(ronda, INTERVALO_MS);
