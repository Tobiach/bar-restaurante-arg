# ROADMAP — Control.Evo Hospitality Engine

## Estado actual
Demo vendible. 3 templates live. Personalización en <3 horas.
El sistema genera reservas por WhatsApp. El panel admin funciona con sessionStorage.

---

## FASE ACTUAL — Demo a producto real

### 🔴 Crítico (bloquea ventas o genera objeciones)

| # | Feature | Esfuerzo | Impacto |
|---|---|---|---|
| 1 | Conectar Supabase (reservas persistentes) | 1h config | Elimina objeción #1 del dueño |
| 2 | GA4 real (reemplazar G-XXXXXXXXXX) | 5min | Métricas para justificar fee mensual |

### 🟡 Alta prioridad (justifica el fee mensual)

| # | Feature | Esfuerzo | Impacto |
|---|---|---|---|
| 3 | Panel admin multi-día con filtro por fecha | 3-4h | El dueño lo usa cada noche |
| 4 | Panel admin — exportar lista del día como texto | 1h | Operativa real del bar |
| 5 | Newsletter conectado a Supabase tabla | 1h | Base de datos de clientes del bar |

### 🟢 Upsell (se vende después del setup)

| # | Feature | Esfuerzo | Valor adicional |
|---|---|---|---|
| 6 | Sistema de puntos real (Supabase auth + acumulación) | 8-10h | +USD 20/mes por cliente |
| 7 | Dashboard analytics en /admin (reservas históricas, platos más pedidos) | 10-15h | Diferencial competitivo fuerte |
| 8 | PWA + push notifications | 4-6h | Retención de clientes del bar |
| 9 | MercadoPago seña en shows | 6-8h | Seguridad en eventos con cupo |

---

## FASE 2 — Escala (3+ clientes activos)

| # | Feature | Esfuerzo | Por qué |
|---|---|---|---|
| 10 | Multi-tenant real con subdominio por cliente | 8-12h | Hoy cada cliente es URL param. Con 5+ clientes necesitás subdominio propio |
| 11 | Panel de administración Control.Evo (ver todos los clientes) | 10h | Gestionar múltiples tenants sin tocar código |
| 12 | Generador automático de tenant desde formulario | 15h | Eliminar el trabajo manual de personalización |

---

## FASE 3 — SaaS real

| # | Feature | Esfuerzo | Por qué |
|---|---|---|---|
| 13 | Login del bar (dueño gestiona su propio menú y shows) | 20h | Autonomía del cliente = menos soporte |
| 14 | Facturación automática mensual | 10h | Cobro recurrente sin intervención manual |
| 15 | Marketplace de templates | — | Vender el template a otras agencias |

---

## DECISIÓN ESTRATÉGICA

No ir a Fase 2 hasta tener al menos 3 clientes pagando mensual.
No construir Fase 3 hasta que el sistema de soporte de Fase 2 sea estable.
Prioridad absoluta ahora: cerrar el primer cliente real con Supabase conectado.
