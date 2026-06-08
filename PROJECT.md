# PROJECT — Control.Evo Hospitality Engine

## Stack técnico
- React 19 + Vite 6 + TypeScript
- Tailwind CSS 4 (@theme + CSS vars runtime)
- Framer Motion (motion/react) — animaciones
- Lucide React — iconografía
- @supabase/supabase-js — backend (null-safe, funciona sin env vars)
- Vercel — deploy

## Estructura de archivos
```
src/
  config/
    active.ts              ← singleton del config activo
    tenants.ts             ← mapa { isla, cuarta, cielo }
    tenants/
      isla.ts              ← Isla Bar Cultural
      cuarta.ts            ← Nos Trajo la Cuarta
      cielo.ts             ← Cielo Rooftop
  constants.ts             ← datos isla (menu, shows, galeria, resenas)
  constants.cuarta.ts      ← datos cervecería
  constants.cielo.ts       ← datos rooftop
  lib/
    supabase.ts            ← cliente null-safe (supabase + supabaseEnabled)
  store/
    reservationStore.ts    ← pre-populado stepper entre componentes
  pages/
    AdminPanel.tsx         ← /admin PIN 1234
  components/
    sections/              ← 11 secciones de la app
    ui/                    ← Navbar, StatusIndicator, CountUp
    Toast.tsx              ← sistema de notificaciones
  App.tsx                  ← layout + feature toggles
  main.tsx                 ← entry point + CSS vars injection + tenant switch
  index.css                ← @theme Tailwind 4 + componentes base
  vite-env.d.ts            ← tipos para import.meta.env
```

## Agregar un nuevo tenant (cliente nuevo)

1. Crear `src/config/tenants/[nombre].ts`
   Copiar estructura de isla.ts y editar: nombre, colores, features, labels, hero, packs, etc.

2. Crear `src/constants.[nombre].ts`
   Copiar estructura de constants.ts y editar: menu[], shows[], galeria[], resenas[]

3. Registrar en `src/config/tenants.ts`:
   ```ts
   import { nombreConfig } from './tenants/nombre';
   export const configs = { isla, cuarta, cielo, nombre: nombreConfig };
   ```

4. Registrar datos en `src/main.tsx`:
   ```ts
   import { nombreData } from './constants.nombre';
   const dataMap = { isla: islaData, cuarta: cuartaData, cielo: cieloData, nombre: nombreData };
   ```

5. Acceder en: `isla-bar-cultural.vercel.app/?t=nombre`

## Sistema de colores

CSS vars inyectadas en runtime desde `tenantConfig.tema`:
- `--color-violeta` → fondo base
- `--color-violeta-medio` → fondo secciones alternas
- `--color-violeta-card` → fondo cards
- `--color-naranja` → acento principal (CTAs, borders, highlights)
- `--color-naranja-claro` → hover states
- `--color-naranja-oscuro` → pressed states
- `--color-dorado` → highlights premium

Para cambiar la paleta de un tenant: editar solo `tenantConfig.tema` — se propaga automáticamente.

## Sistema de tipografía

Font vars inyectadas en runtime:
- `--font-titulo` → tenantConfig.fontTitulo
- `--font-display` → tenantConfig.fontDisplay

Google Fonts cargadas en index.html:
- Bebas Neue (cuarta)
- Cormorant Garamond (cielo)
- Inter (todos)

## Feature toggles disponibles

En `tenantConfig.features`:
- `shows: boolean` → ShowSection
- `karaoke: boolean` → KaraokeSection
- `cumpleanos: boolean` → CumpleanosSection
- `puntos: boolean` → PointsSection
- `galeria: boolean` → GallerySection
- `resenas: boolean` → ReviewSection
- `newsletter: boolean` → formulario en Footer

## Panel admin

URL: `/admin`
PIN default: `1234` (configurable en `tenantConfig.adminPin`)
Almacenamiento actual: sessionStorage (se pierde al cerrar browser)
Con Supabase: persiste en base de datos

## Variables de entorno necesarias

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Agregar en: Vercel Dashboard → Settings → Environment Variables → redeploy.

## Deploy

```bash
npx vercel --yes --prod
```

Siempre desde: `C:\Users\Tobia\bar-restaurante-arg\`
