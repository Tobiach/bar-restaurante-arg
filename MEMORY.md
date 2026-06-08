# MEMORY — Control.Evo Hospitality Engine (sistema replicable)

## Última actualización
2026-06-07

## Quién soy
Tobias Maldonado — Control.Evo. Vendo sistemas para bares, cervecerías y rooftops en Argentina.
Framework de ventas: Alex Hormozi $100M Offers.
Stack: React + TypeScript + Vite + Tailwind + Supabase + Vercel.

## Este producto
SaaS white-label horizontal para hospitality. No es el sitio de un bar — es un template que
se personaliza en <3 horas y se vende a múltiples clientes.

## Tenants activos
- isla: Isla Bar Cultural (demo, live en isla-bar-cultural.vercel.app)
- cuarta: Nos Trajo la Cuarta (cervecería, template)
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
- Deploy: npx vercel --yes --prod desde C:\Users\Tobia\bar-restaurante-arg\

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
2. Sistema de puntos real con auth — MEDIA
3. Panel admin multi-día con analytics — MEDIA
4. PWA + push notifications — BAJA
5. MercadoPago seña en shows — BAJA

## Reglas de desarrollo
- npm run lint debe dar 0 errores antes de cada push
- Deploy siempre: npx vercel --yes --prod
- No tocar el diseño visual sin revisar este archivo primero
- Cada cliente nuevo = rama nueva o fork nuevo del repo

## Demo de 3 minutos (qué mostrar primero)
1. StatusIndicator — punto verde "ABIERTO AHORA"
2. Click "Reservar show X" → stepper pre-rellenado con el show
3. Cambiar features.karaoke: false en config → sección desaparece en vivo
4. PointsSection — club de puntos visual
