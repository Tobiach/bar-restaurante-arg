# DECISIONS — Decisiones de arquitectura

## Por qué existe este archivo
Cada decisión técnica importante que se tomó y por qué.
Antes de revertir o cambiar algo documentado acá, entender primero el motivo.

---

## DEC-001 — Multi-tenant via query param (?t=) en vez de subdominio
**Fecha:** 2026-06
**Decisión:** El tenant activo se selecciona por `?t=isla` en la URL, no por subdominio propio.
**Por qué:** Con un solo proyecto Vercel y cero configuración de DNS adicional, los 3 demos viven en la misma URL. Permite mostrar los 3 templates en la misma demo cambiando solo el parámetro. Escala bien hasta ~10 clientes.
**Tradeoff:** El cliente no tiene su propio dominio (ej: cuarta.vercel.app). Para producción real con dominio propio, cada cliente necesita su propio proyecto Vercel.
**Cuándo cambiar:** Cuando haya 3+ clientes pagando y necesiten dominio propio. Ver ROADMAP Fase 2.

---

## DEC-002 — Supabase null-safe (funciona sin env vars)
**Fecha:** 2026-06
**Decisión:** El cliente Supabase exporta `null` si no hay env vars. Los componentes verifican `supabaseEnabled` antes de llamar.
**Por qué:** El sistema puede funcionar como demo sin configurar Supabase. El fallback es sessionStorage. Esto permite cerrar el primer cliente y deployar en horas, sin depender de configuración de backend.
**Tradeoff:** Las reservas se pierden al cerrar el browser. Se le dice al cliente que "también llegan por WhatsApp" hasta conectar Supabase.
**Cuándo cambiar:** Ya está listo el código. Solo falta agregar env vars en Vercel.

---

## DEC-003 — CSS vars inyectadas en runtime (no en build time)
**Fecha:** 2026-06
**Decisión:** Los colores del tema se inyectan en `document.documentElement` desde `main.tsx` antes de renderizar React. Tailwind lee estas vars via `var(--color-naranja)` etc.
**Por qué:** Permite cambiar la paleta completa editando 7 hexadecimales en el config del tenant, sin recompilar ni generar CSS nuevo. El mismo bundle sirve a los 3 templates.
**Tradeoff:** El CSS inicial carga con los valores por defecto hasta que JS corre. En la práctica es imperceptible (< 16ms).
**Cuándo cambiar:** Solo si se migra a SSR (Next.js). No aplica en este stack.

---

## DEC-004 — Sin Context API ni Redux para el estado compartido
**Fecha:** 2026-06
**Decisión:** `reservationStore.ts` es un módulo JS plano con variables mutables. `active.ts` también es un singleton plano.
**Por qué:** La app no tiene estado global complejo. Un módulo plano es suficiente, más rápido de leer y sin boilerplate. Context API solo se justifica cuando el estado cambia frecuentemente y muchos componentes necesitan re-render.
**Tradeoff:** No hay reactividad automática. Si el config cambia en runtime (no pasa), los componentes no se actualizan solos.
**Cuándo cambiar:** Si se agrega un sistema de login real o estado que cambia frecuentemente en runtime.

---

## DEC-005 — sessionStorage para el carrito (no localStorage)
**Fecha:** 2026-06
**Decisión:** El carrito del menú se persiste en `sessionStorage`, no `localStorage`.
**Por qué:** El carrito es una intención de compra de esa sesión. Si el cliente vuelve al día siguiente, no debería ver la misma selección de hace 24hs. sessionStorage se limpia al cerrar el tab — comportamiento correcto.
**Tradeoff:** Si el cliente abre un tab nuevo para mostrarle el carrito a alguien, lo pierde.
**Cuándo cambiar:** Si se implementa login real. Con cuenta, el carrito puede vivir en Supabase.

---

## DEC-006 — Un solo repo, múltiples tenants (no fork por cliente)
**Fecha:** 2026-06
**Decisión:** Los 3 templates viven en el mismo repo. Agregar un cliente = agregar archivos de config y datos.
**Por qué:** Un solo punto de mantenimiento. Si se arregla un bug en el ReservationStepper, se arregla para todos los clientes a la vez. No hay que parchear 10 repos.
**Tradeoff:** Un error en main.tsx afecta a todos. La separación por config no es perfecta — un cliente podría afectar otro si se comete un error en tenants.ts.
**Cuándo cambiar:** Con 5+ clientes pagando, considerar proyecto Vercel propio por cliente (mismo repo, env var VITE_TENANT_ID diferente).
