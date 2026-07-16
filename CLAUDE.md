# CLAUDE.md — Control.Evo Hospitality Engine

## [PROD_URL]
https://bar-restaurante-arg.vercel.app
- `/?t=isla` → Isla Bar Cultural
- `/?t=cuarta` → Nos Trajo la Tercera (tenant key: cuarta)
- `/?t=cielo` → Cielo Rooftop

> Este archivo es leído automáticamente por Claude Code al iniciar cada sesión.
> Contiene todo lo necesario para trabajar sin preguntas innecesarias.

---

## QUIÉN ES TOBIAS

Emprendedor en Argentina. No es técnico. Vende sistemas digitales y terciariza el desarrollo.
Trabaja con claridad brutal: sin motivar, sin validar ideas automáticamente, sin abrir frentes nuevos.
Cada sugerencia debe responder: ¿genera dinero ahora o después?

---

## QUÉ ES ESTE PROYECTO

**Control.Evo Hospitality Engine** — SaaS white-label para bares, cervecerías y rooftops en Argentina.
No es el sitio de un bar. Es un template que se vende, se personaliza en menos de 3 horas y se deployea.

**Live demo:** https://bar-restaurante-arg.vercel.app
**Repo:** https://github.com/Tobiach/bar-restaurante-arg.git
**Deploy siempre:** `npx vercel --yes --prod` desde `C:\Users\Tobia\bar-restaurante-arg\`

---

## STACK

React 19 · Vite 6 · TypeScript · Tailwind 4 · Framer Motion (`motion/react`) · Lucide React · Vercel
Backend: @supabase/supabase-js (null-safe — funciona sin env vars)

---

## ARQUITECTURA MULTI-TENANT

Switch por URL query param:
- `/?t=isla` → Isla Bar Cultural (negro obsidiana + ámbar #C9973A · Inter)
- `/?t=cuarta` → Nos Trajo la Cuarta (marrón cálido + mostaza #F5A623 · Bebas Neue)
- `/?t=cielo` → Cielo Rooftop (azul noche + dorado #C9A84C · Cormorant Garamond)

Archivos clave:
```
src/config/active.ts          → singleton getConfig() / getActiveData()
src/config/tenants.ts         → mapa { isla, cuarta, cielo }
src/config/tenants/*.ts       → config por tenant (colores, features, textos, packs)
src/constants*.ts             → datos por tenant (menú, shows, galería, reseñas)
src/main.tsx                  → lee ?t=, inyecta CSS vars + fonts + dot pattern
src/lib/supabase.ts           → cliente null-safe (supabase + supabaseEnabled exports)
src/pages/AdminPanel.tsx      → ruta /admin, PIN en tenantConfig.adminPin
src/store/reservationStore.ts → pre-popula stepper desde shows/packs
```

Todos los componentes usan `getConfig()` y `getActiveData()` — nunca import estático de tenant.config.

---

## REGLAS DE TRABAJO — OBLIGATORIAS

```
1. npm run lint = 0 errores antes de cualquier commit
2. npm run build debe pasar sin warnings críticos
3. Commit cada 3 tareas completadas
4. Deploy: npx vercel --yes --prod (nunca git push solo como deploy)
5. No tocar el diseño visual sin pedido explícito de Tobias
6. No agregar dependencias sin mencionar el motivo
7. No modificar archivos fuera del scope de la tarea
8. Responder solo al terminar: qué hice, máximo 3 líneas
9. Si hay ambigüedad real de arquitectura: preguntar en una línea antes de ejecutar
10. Sin explicar lo que vas a hacer antes de hacerlo
```

---

## SUPABASE (PENDIENTE)

Código listo en supabase.ts, ReservationStepper.tsx y AdminPanel.tsx.
Falta configurar en Vercel:
- `VITE_SUPABASE_URL` = https://xxxx.supabase.co
- `VITE_SUPABASE_ANON_KEY` = eyJ...

Ver SUPABASE_SETUP.md para el SQL completo.
Sin env vars: sistema funciona con sessionStorage como fallback.

---

## AGREGAR CLIENTE NUEVO

1. `src/config/tenants/[nombre].ts` → copiar isla.ts, editar identidad + tema + features
2. `src/constants.[nombre].ts` → copiar constants.ts, editar menú + shows + galería
3. `src/config/tenants.ts` → agregar al mapa
4. `src/main.tsx` → agregar al dataMap
5. `npx vercel --yes --prod`
6. URL del cliente: `bar-restaurante-arg.vercel.app/?t=[nombre]`

---

## PRECIOS (para contexto comercial)

| Template | Setup | Mensual |
|---|---|---|
| Cervecería / bar barrio | USD 150 | USD 25 |
| Bar cultural / shows | USD 250 | USD 35 |
| Rooftop / venue premium | USD 400 | USD 60 |

---

## ERRORES FRECUENTES Y FIXES

| Error | Causa | Fix |
|---|---|---|
| Pantalla negra en Vercel | TS errors o env vars mal | `npm run lint` → corregir → rebuild |
| WhatsApp no abre | Número mal formateado | Sin +, sin espacios, sin guiones |
| Shows no aparecen | `features.shows: false` | Cambiar a `true` en config |
| Admin panel vacío | sessionStorage limpio | Conectar Supabase |
| Google Maps no carga | Query sin encodear | Usar + en vez de espacios |

---

## PENDIENTES REALES (auditado contra código, 2026-07-14)

> Reemplaza cualquier auditoría vieja en Google Docs — esa quedó desactualizada por el
> refactor multi-tenant y del panel admin. Esta lista está verificada línea por línea.

| Ítem | Prioridad | Detalle |
|---|---|---|
| Puntos: lectura no lee Supabase | **ALTA** | `puntosService.get()` (src/lib/puntosService.ts) solo lee `localStorage`. `addPuntos()` sí hace upsert a Supabase. Si el cliente cambia de dispositivo o borra caché, ve saldo $0 aunque tenga puntos reales guardados. Fix: hacer `get()` async, `select` a Supabase primero, fallback a localStorage solo si `!supabaseEnabled`. |
| GA4 sin ID real | MEDIA | `index.html` tiene el tag de gtag.js con `G-XXXXXXXXXX` placeholder — no está midiendo nada hasta cargar el Measurement ID real. |
| Newsletter fake | BAJA | Footer.tsx: solo toast + reset del form, no conecta a ningún servicio. |
| Reseñas no persisten | BAJA | ReviewSection.tsx: el botón "Publicar" envía por WhatsApp pero no guarda en Supabase; el carrusel sigue mostrando reseñas estáticas. |
| Sin auth real de clientes | BAJA (decisión previa) | Sistema de puntos identifica por teléfono, sin `supabase.auth`. No es un bug nuevo, fue diseño explícito de esta sesión — revisar solo si se quiere multi-dispositivo con login real. |

**Ya resuelto (no repetir trabajo):** calendario de reservas (días reales del mes), panel admin
refactorizado (AdminLogin+AdminLayout+tabs, ya no el AdminPanel monolítico viejo), reservas
con insert+realtime a Supabase, mapa real en ContactSection, ShowSection con ícono Lucide en
vez de emoji fallback, `.animate-shimmer`, formulario de Karaoke vía WhatsApp, meta tags OG.

---

## LO QUE NO HACER NUNCA

- Usar `import { tenantConfig } from '../config/tenant.config'` en componentes (archivo legacy)
- Hardcodear URLs de WhatsApp (wa.me/...)
- Usar `createClient('', '')` sin verificar env vars primero
- Modificar `src/index.css` variables sin actualizar también `tenantConfig.tema`
- Hacer push sin pasar lint
