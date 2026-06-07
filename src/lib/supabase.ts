import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseEnabled = !!(SUPABASE_URL && SUPABASE_ANON_KEY);
export const supabase = supabaseEnabled ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

/*
-- Correr en Supabase SQL Editor:
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
*/
