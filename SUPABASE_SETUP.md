# SUPABASE — Setup y configuración

## Por qué es importante
Sin Supabase: las reservas se pierden al cerrar el browser (sessionStorage).
Con Supabase: las reservas son persistentes, el panel admin funciona multi-día.
Esta es la diferencia entre "demo" y "producto vendido".

## Setup paso a paso

### 1. Crear proyecto
Ir a supabase.com → New project → elegir región São Paulo (más cercana a Argentina).

### 2. Correr este SQL en el SQL Editor de Supabase

```sql
create table reservas (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  fecha text,
  hora text,
  tipo text,
  nombre text,
  telefono text,
  personas int,
  observaciones text,
  show_nombre text,
  pack text,
  estado text default 'pendiente',
  tenant text
);

alter table reservas enable row level security;

create policy "anon insert" on reservas for insert to anon with check (true);
create policy "anon select" on reservas for select to anon using (true);
create policy "anon update" on reservas for update to anon using (true);
```

### 3. Obtener credenciales
Supabase Dashboard → Settings → API:
- Project URL → copiar como `VITE_SUPABASE_URL`
- anon/public key → copiar como `VITE_SUPABASE_ANON_KEY`

### 4. Agregar en Vercel
Vercel Dashboard → tu proyecto → Settings → Environment Variables:
- `VITE_SUPABASE_URL` = https://xxxx.supabase.co
- `VITE_SUPABASE_ANON_KEY` = eyJ...

### 5. Redeploy
```bash
npx vercel --yes --prod
```

## Cómo funciona en el código
- `src/lib/supabase.ts` exporta `supabase` (cliente) y `supabaseEnabled` (boolean)
- Si no hay env vars → supabase es null → sistema usa sessionStorage como fallback
- `ReservationStepper.tsx`: inserta en tabla `reservas` al confirmar reserva
- `AdminPanel.tsx`: lee de tabla `reservas` ordenado por hora

## Multi-tenant en Supabase
La columna `tenant` almacena el nombre del tenant (`?t=isla`, `?t=cuarta`, etc.).
El AdminPanel puede filtrar por tenant para que cada cliente solo vea sus propias reservas.

## Upsell: sistema de puntos (futuro)
Cuando el cliente quiera puntos reales, agregar:

```sql
create table usuarios (
  id uuid references auth.users primary key,
  nombre text,
  telefono text,
  puntos int default 0,
  nivel text default 'BÁSICO'
);

create table historial_puntos (
  id bigint generated always as identity primary key,
  usuario_id uuid references usuarios,
  puntos int,
  motivo text,
  created_at timestamptz default now()
);
```
