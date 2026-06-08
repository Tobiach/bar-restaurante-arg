# AGENTS.md — Instrucciones para agentes IA

> Este archivo es leído por Claude Code, Cursor, Copilot y cualquier agente IA que trabaje en este repo.
> Complementa CLAUDE.md con instrucciones de comportamiento más detalladas.

---

## COMPORTAMIENTO ESPERADO

### Hacer siempre
- Leer CLAUDE.md al inicio de cada sesión
- Ejecutar `npm run lint` antes de cualquier commit
- Verificar que `npm run build` pasa antes de hacer push
- Responder cuando se termina, no antes: qué se hizo, máximo 3 líneas
- Si una tarea tiene ambigüedad real de arquitectura: preguntar en una línea

### No hacer nunca
- Modificar archivos fuera del scope de la tarea
- Agregar dependencias sin mencionarlo
- Cambiar el diseño visual sin pedido explícito
- Hacer push sin pasar lint
- Proponer refactors que no fueron pedidos
- Usar `console.log` en código que va a producción (solo en desarrollo)
- Hardcodear valores que deberían venir de `tenantConfig`

---

## PATRONES DE CÓDIGO OBLIGATORIOS

### Leer el config del tenant activo
```typescript
// ✅ Correcto
import { getConfig } from '../../config/active';
const tenantConfig = getConfig();

// ❌ Incorrecto — archivo legacy
import { tenantConfig } from '../../config/tenant.config';
```

### Leer los datos del tenant activo
```typescript
// ✅ Correcto
import { getActiveData } from '../../config/active';
const { menu, shows, galeria } = getActiveData();

// ❌ Incorrecto — datos hardcodeados de isla
import { MENU_ITEMS } from '../../constants';
```

### Cliente Supabase
```typescript
// ✅ Correcto — verificar antes de usar
import { supabase, supabaseEnabled } from '../../lib/supabase';
if (supabaseEnabled && supabase) {
  await supabase.from('reservas').insert(data);
}

// ❌ Incorrecto — puede crashear si no hay env vars
import { supabase } from '../../lib/supabase';
await supabase.from('reservas').insert(data); // supabase puede ser null
```

### WhatsApp URL
```typescript
// ✅ Correcto — desde config
const WA_URL = `https://wa.me/${tenantConfig.whatsapp}`;

// ❌ Incorrecto — hardcodeado
const WA_URL = 'https://wa.me/5491167890123';
```

### Feature check
```typescript
// ✅ Correcto
{tenantConfig.features.shows && <ShowSection />}

// ❌ Incorrecto — siempre renderiza
<ShowSection />
```

---

## SCOPE DE ARCHIVOS POR TIPO DE TAREA

### "Agregar cliente nuevo"
Tocar solo:
- `src/config/tenants/[nombre].ts` (crear)
- `src/constants.[nombre].ts` (crear)
- `src/config/tenants.ts` (agregar al mapa)
- `src/main.tsx` (agregar al dataMap)

### "Cambiar menú de un cliente"
Tocar solo:
- `src/constants.[tenant].ts`

### "Cambiar colores de un cliente"
Tocar solo:
- `src/config/tenants/[tenant].ts` — objeto `tema`

### "Fix de bug en componente"
Tocar solo:
- El componente afectado
- Si afecta tipos: `types.ts` si existe

### "Feature nueva en una sección"
Tocar solo:
- `src/components/sections/[Seccion].tsx`
- Si necesita config: `src/config/tenants/*.ts` (agregar campo)
- Si necesita datos: `src/constants*.ts`

---

## CONVENCIONES DE COMMIT

```
feat: descripción corta    → feature nueva
fix: descripción corta     → bug resuelto
docs: descripción corta    → solo archivos .md
refactor: descripción      → mejora sin cambio de comportamiento
style: descripción         → solo CSS/clases, sin lógica
chore: descripción         → deps, config, tools
```

Máximo 72 caracteres en el título.
Sin punto final.

---

## VERIFICACIÓN ANTES DE CADA PUSH

```bash
npm run lint          # 0 errores TypeScript
npm run build         # build exitoso
# Si hay cambios visuales: verificar en /?t=isla, /?t=cuarta, /?t=cielo
```

---

## ESTRUCTURA DE RESPUESTA ESPERADA

Al terminar una tarea, responder con este formato exacto:

```
✅ [Qué se hizo en una línea]
Archivos: [lista de archivos modificados]
[Si hay advertencias o pendientes: una línea]
```

Ejemplo:
```
✅ Conectado Supabase — reservas ahora persisten al cerrar el browser
Archivos: src/lib/supabase.ts, ReservationStepper.tsx, AdminPanel.tsx
Pendiente: agregar VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY en Vercel env vars
```
