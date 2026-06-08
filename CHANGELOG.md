# CHANGELOG — Control.Evo Hospitality Engine

Formato: [versión] — [fecha] — [descripción] — [commit]

---

## v0.5.0 — 2026-06 — Multi-tenant + 3 identidades visuales
- Arquitectura multi-tenant via ?t= query param
- 3 configs completos: isla, cuarta, cielo
- 3 datasets: islaData, cuartaData, cieloData
- Fuentes dinámicas por tenant: Inter / Bebas Neue / Cormorant Garamond
- Dot pattern del body por tenant
- Títulos de sección dinámicos via tenantConfig.labels

## v0.4.0 — 2026-06 — Supabase + SEO + fixes
- Supabase null-safe: código listo, env vars pendientes
- GA4 placeholder en index.html
- Karaoke → envía inscripción por WhatsApp
- Reviews → envía reseña por WhatsApp
- SEO + OG tags completos
- fix: vite-env.d.ts (resolvió pantalla negra en producción)

## v0.3.0 — 2026-06 — Fixes de conversión
- Calendario con días reales del mes (fix 28 días hardcodeados)
- Mapa Google Maps iframe real en ContactSection
- animate-shimmer keyframes en index.css
- Dead code limpiado (animate-on-scroll, emoji residuales)

## v0.2.0 — 2026-06 — Refactor + modularización
- App.tsx: 1573 líneas → 87 líneas
- 11 componentes en sections/ + 3 en ui/
- tenant.config.ts: toda la parametrización centralizada
- CSS vars inyectadas en runtime desde main.tsx
- Feature toggles: 6 activos
- ReservationStepper pre-populado desde shows y packs
- Carrito persistido en sessionStorage
- WhatsApp dinámico (0 URLs hardcodeadas)
- Panel admin /admin con PIN

## v0.1.0 — 2026-05 — MVP inicial
- SPA monolítica en App.tsx (1573 líneas)
- Secciones: Hero, Shows, Menú, Karaoke, Galería, Cumpleaños, Puntos, Reseñas, Contacto
- ReservationStepper 4 pasos + WhatsApp
- StatusIndicator abierto/cerrado en tiempo real
- Carrito con sessionStorage
- Galería con lightbox
- Sticky mobile action bar

---

## Cómo agregar entradas

Al hacer cada commit importante, agregar acá:
```
## v[X.Y.Z] — [YYYY-MM-DD] — [título corto]
- [cambio 1]
- [cambio 2]
- commit: [hash corto]
```
