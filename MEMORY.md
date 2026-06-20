# MEMORY — Control.Evo Hospitality Engine (sistema replicable)

## [PROD_URL]
https://bar-restaurante-arg.vercel.app
- `/?t=isla` → Isla Bar Cultural
- `/?t=cuarta` → Nos Trajo la Tercera
- `/?t=cielo` → Cielo Rooftop

## Última actualización
2026-06-20

## Quién soy
Tobias Maldonado — Control.Evo. Vendo sistemas para bares, cervecerías y rooftops en Argentina.
Framework de ventas: Alex Hormozi $100M Offers.
Stack: React + TypeScript + Vite + Tailwind + Supabase + Vercel.

## Este producto
SaaS white-label horizontal para hospitality. No es el sitio de un bar — es un template que
se personaliza en <3 horas y se vende a múltiples clientes.

## Tenants activos
- isla: Isla Bar Cultural (demo, live en isla-bar-cultural.vercel.app)
- cuarta: Nos Trajo la Tercera (cervecería, template) ← renombrado 18/06
- cielo: Cielo Rooftop (rooftop premium, template)

## Precios
| Template | Setup | Mensual |
|----------|-------|---------|
| Cervecería/bar barrio | USD 150 | USD 25 |
| Bar cultural/shows | USD 250 | USD 35 |
| Rooftop/venue premium | USD 400 | USD 60 |

## Arquitectura clave
- Switch de tenant: /?t=isla / /?t=cuarta / /?t=cielo
- Personalizar cliente nuevo: editar src/config/tenants/[nombre].ts + src/constants.[nombre].ts
- Deploy: npx vercel --yes --prod desde C:\Users\Tobia\bar-restaurante-arg\ (PC madre) o C:\Users\estudiante\bar-restaurante-arg\ (PC B)
- PC B (estudiante): hacer git push → deploy desde PC madre con Vercel ya logueado

## Supabase (pendiente)
1. Crear proyecto en supabase.com
2. Correr SQL de SUPABASE_SETUP.md
3. Agregar env vars en Vercel:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY

## GA4 (pendiente)
Reemplazar G-XXXXXXXXXX en index.html con el ID real de Google Analytics.

## Pending tasks ordenadas por impacto
1. Conectar Supabase (reservas persistentes) — ALTA
2. Deploy Vercel desde PC madre (git pull → npx vercel --yes --prod) — ALTA
3. GA4: reemplazar G-XXXXXXXXXX en index.html — MEDIA
4. Sistema de puntos real con auth — MEDIA
5. PWA + push notifications — BAJA
6. MercadoPago seña en shows — BAJA

## Reglas de desarrollo
- npm run lint debe dar 0 errores antes de cada push
- Deploy siempre: npx vercel --yes --prod
- No tocar el diseño visual sin revisar este archivo primero
- Cada cliente nuevo = rama nueva o fork nuevo del repo

## CRM Panel Admin — completado (20/06/2026)
Tabs disponibles (solo dueño excepto Reservas):
- Reservas · Clientes · Caja · Carta · Galería · Log · IA
Seguridad: rate limiting 5 intentos → bloqueo 15min (AdminLogin.tsx)
Auditoria: cada cambio de estado reserva y movimiento de caja queda logueado en localStorage

PINs (todos los tenants demo):
- dueño=`2580` · empleado=`1470` (patrón numpad, fácil de recordar)
- Al entregar cliente real: cambiar en src/config/tenants/[nombre].ts

URL default: cielo (rooftop, neutro para demos — no expone datos de cliente real)
URL isla: solo accesible via /?t=isla (cliente real, no usar como demo)

localStorage keys por tenant (panel-*):
- `panel-reservas-${nombre}` · `panel-caja-${nombre}` · `panel-carta-${nombre}`
- `panel-galeria-${nombre}` · `panel-auditoria-${nombre}` · `pin-lock-${nombre}`

## Demo de 3 minutos (qué mostrar primero)
1. StatusIndicator — punto verde "ABIERTO AHORA"
2. Click "Reservar show X" → stepper pre-rellenado con el show
3. Cambiar features.karaoke: false en config → sección desaparece en vivo
4. PointsSection — club de puntos visual
