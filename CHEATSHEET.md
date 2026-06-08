# CHEATSHEET — Acciones rápidas

## Personalizar para cliente nuevo

### Mínimo viable (2 horas)
1. `src/config/tenants/[cliente].ts` → cambiar nombre, colores, WhatsApp, horarios, features
2. `src/constants.[cliente].ts` → cambiar menú (máx 30-40 items), shows, reseñas, galería
3. `src/config/tenants.ts` → agregar al mapa
4. `src/main.tsx` → agregar al dataMap
5. `npx vercel --yes --prod`

### Cambios frecuentes por mantenimiento mensual
- Cambiar shows de la semana: `src/constants.[tenant].ts` → array `shows[]`
- Cambiar menú: `src/constants.[tenant].ts` → array `menu[]`
- Cambiar horarios: `src/config/tenants/[tenant].ts` → `horarios.slots`
- Cambiar packs de cumpleaños: `src/config/tenants/[tenant].ts` → `packs[]`
- Cambiar recompensas del club: `src/config/tenants/[tenant].ts` → `club.recompensas[]`
- Habilitar/deshabilitar karaoke: `src/config/tenants/[tenant].ts` → `features.karaoke: false`

## Cambiar colores de un tenant
Solo editar `tenantConfig.tema` en `src/config/tenants/[tenant].ts`.
Los 7 hexadecimales se propagan automáticamente a toda la UI via CSS vars.

## Cambiar número de WhatsApp
`src/config/tenants/[tenant].ts` → `whatsapp: "5491112345678"`
Formato: código país + código área + número, sin +, sin espacios, sin guiones.

## Cambiar PIN del admin
`src/config/tenants/[tenant].ts` → `adminPin: "1234"`

## Agregar foto a la galería
`src/constants.[tenant].ts` → `galeria[]` → agregar objeto:
```ts
{ id: "gX", cat: "Ambiente", src: "URL_UNSPLASH_O_DRIVE", alt: "descripción" }
```
Categorías disponibles: Ambiente, Shows, Karaoke, Comida, Vista, Cocktails, Eventos

## Agregar show nuevo
`src/constants.[tenant].ts` → `shows[]` → agregar objeto:
```ts
{ id: "shX", nombre: "Nombre del show", fecha: "Sáb 14 Jun", hora: "22:00",
  precio: 0, capacidad: 80, vendidos: 20, imagen: "URL" }
```
Si `precio: 0` → "ENTRADA LIBRE". Si `vendidos >= capacidad` → "SOLD OUT".

## Ver las 3 demos
- `/?t=isla` → Isla Bar Cultural
- `/?t=cuarta` → Nos Trajo la Cuarta
- `/?t=cielo` → Cielo Rooftop

## Acceder al panel admin
URL: `isla-bar-cultural.vercel.app/admin`
PIN: `1234` (o el configurado en `adminPin`)

## Deploy siempre
```bash
cd C:\Users\Tobia\bar-restaurante-arg
npx vercel --yes --prod
```

## Errores comunes

### Pantalla negra
Causa: error TypeScript en build o env vars mal configuradas.
Fix: `npm run lint` → corregir errores → `npm run build` → si pasa → push.

### WhatsApp no abre
Causa: número de WhatsApp mal formateado.
Fix: verificar que `whatsapp` en config NO tiene +, espacios ni guiones.

### Shows no aparecen
Causa: `features.shows: false` en el config del tenant.
Fix: cambiar a `true`.

### Admin panel vacío
Causa: sessionStorage limpio (browser cerrado o nueva sesión).
Fix: conectar Supabase (ver SUPABASE_SETUP.md).

### Google Maps no carga
Causa: `googleMapsQuery` tiene caracteres especiales sin encodear.
Fix: usar `+` en vez de espacios: `"Av.+Corrientes+3800,+Buenos+Aires"`
