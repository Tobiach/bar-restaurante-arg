# CHANGELOG — Control.Evo Hospitality Engine

Formato: [versión] — [fecha] — [descripción] — [commit]

---

## v0.6.0 — 2026-06-08 — Cielo Rooftop landing premium completa — commit 5f131a6
- Paleta bronce cálida inspirada en Alvear Icon (#0E0C09 / #B8966E / #EDE0CC)
- NavbarCielo: transparente → sólido en scroll, drawer mobile
- CieloHero: parallax, h1 128px Cormorant italic, scroll indicator animado
- CieloIntro: layout asimétrico editorial 2 columnas
- CieloServicios: 3 cards anchas alternadas con imagen + hover scale
- CieloStats: 4 números animados con IntersectionObserver
- CieloMenu: tabs por categoría, grid editorial
- CieloReservas: stepper 3 pasos completo → WhatsApp
- CieloClub: tarjeta membresía CSS, barra progreso animada
- CieloResenas: carrusel auto-scroll 5s, 5 reseñas, pausar on hover
- CieloEventos: formulario 7 campos con sticky imagen → WhatsApp
- CieloGaleria: masonry 3 col, filtros, lightbox
- CieloFooter: 3 col editorial, sticky mobile bar
- App.tsx: render condicional cielo vs general
- main.tsx: inyecta blancoSuave/blancoMuted opcionales por tenant
- Docs completas en raíz: CLAUDE, MEMORY, PROJECT, ROADMAP, CHANGELOG, TENANTS, DECISIONS, AGENTS, CHEATSHEET, SALES, SUPABASE_SETUP

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
