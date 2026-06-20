# 🆘 RESCUE — Comodín de emergencia Control.Evo

> Este archivo existe para que NUNCA se pierda contexto, sin importar qué PC, qué sesión o qué pasó.
> Si algo falla, este archivo lo resuelve. Está en GitHub = accesible desde cualquier lugar.

---

## 🖥️ DOS PCs — cómo diferenciarlas

| PC | Usuario | Path repos | Memoria Claude |
|----|---------|-----------|----------------|
| **PC madre** | `Tobia` | `C:\Users\Tobia\bar-restaurante-arg\` | Local a esa PC |
| **PC B (nueva)** | `estudiante` | `C:\Users\estudiante\bar-restaurante-arg\` | Local a esa PC |

**Regla:** Siempre verificar en qué PC estás antes de correr cualquier comando.

---

## ⚡ FIX INMEDIATO — Node/npm no encontrado (PC B)

Cada vez que abrís PowerShell en PC B, corré esto primero:

```powershell
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")
```

O usá el script: `scripts\bootstrap.ps1` (ver más abajo).

---

## 🔑 VERCEL — IDs críticos (gitignoreados, recrear si faltan)

Si `.vercel/project.json` no existe, crearlo manualmente:

### bar-restaurante-arg
```json
{"projectId":"prj_t4gwAk5ne2mnYyYexJ3xoBNLVxOw","orgId":"team_2bOT1yAQujtKdnAJFvWjheHK","projectName":"nos-trajo-la-tercera"}
```

### domex-temp
```json
{"projectId":"prj_TosIZXUMrCUCGkdBCDiotAOZJ7qR","orgId":"team_2bOT1yAQujtKdnAJFvWjheHK","projectName":"domex-temp"}
```

O correr `scripts\bootstrap.ps1` que los crea automáticamente.

---

## 🚀 DEPLOY — Secuencia completa desde cero

```powershell
# 1. Fix PATH (PC B solamente)
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")

# 2. Login Vercel (solo la primera vez en cada PC) — tener browser listo ANTES de correr
npx vercel login
# → Abrir URL que aparece → login con esenciezen@gmail.com → confirmar código

# 3. Deploy bar-restaurante-arg
Set-Location "C:\Users\estudiante\bar-restaurante-arg"   # PC B
# Set-Location "C:\Users\Tobia\bar-restaurante-arg"      # PC madre
npx vercel --yes --prod

# 4. Deploy domex-temp
Set-Location "C:\Users\estudiante\domex-temp"
npx vercel --yes --prod
```

**Cuenta Vercel:** esenciezen@gmail.com
**URL producción:** https://bar-restaurante-arg.vercel.app

---

## 📌 PLACEHOLDERS — cosas fake en producción que hay que reemplazar

### bar-restaurante-arg

| Qué | Dónde | Cómo |
|-----|-------|------|
| Google Analytics | `index.html` → `G-XXXXXXXXXX` | Reemplazar con ID real GA4 |
| Supabase URL | Vercel Dashboard → env vars | `VITE_SUPABASE_URL=https://xxxx.supabase.co` |
| Supabase Key | Vercel Dashboard → env vars | `VITE_SUPABASE_ANON_KEY=eyJ...` |
| Datos CRM | src/data/mock*.ts | Son ficticios — Supabase los reemplaza al conectar |
| Guardar movimiento | TabCaja.tsx → `guardarMovimiento()` | TODO: insert a Supabase |

### domex-temp

| Qué | Dónde | Cómo |
|-----|-------|------|
| books_cache table | Supabase SQL Editor | Correr SQL de SUPABASE_SETUP.md |
| Alias dominio | Vercel Dashboard | Configurar `aicolmena.vercel.app` post-deploy |

---

## 🔐 PINs del CRM Admin Panel

| Tenant | URL | Dueño | Empleado |
|--------|-----|-------|----------|
| Isla | `/?t=isla` → `/admin` | `1234` | `5678` |
| Cielo | `/?t=cielo` → `/admin` | `9999` | `1111` |
| Cuarta | `/?t=cuarta` → `/admin` | `4444` | `2222` |

---

## 🏗️ ARQUITECTURA — resumen para Claude Code nuevo

```
React + Vite + TypeScript + Tailwind 4 + Supabase + Vercel
Multi-tenant via ?t=isla|cielo|cuarta
getConfig() / getActiveData() — NUNCA import estático de tenant
getMockData() en src/data/mockIndex.ts — datos demo por tenant
insightsEngine.ts — 8 reglas → ResumenSemanal automático
/admin → AdminPanel → AdminLogin (PIN) → AdminLayout (tabs)
Tabs: Reservas (todos) | Clientes | Caja | 🧠 IA (solo dueño)
```

---

## 💬 PROMPT DE CONTINUACIÓN — pegar al inicio de sesión nueva

```
CONTINUACIÓN Control.Evo — PC [B/madre]

Repos: C:\Users\[estudiante|Tobia]\bar-restaurante-arg\
Último commit: 49952bd — design(admin) overhaul visual
Commits en GitHub NO deployados: 377a6ac, 9f4040c, a3bb713, ef037a4, 49952bd

PENDIENTE CRÍTICO:
- vercel login → npx vercel --yes --prod (bar-restaurante-arg)
- .vercel/project.json: ver RESCUE.md del repo si no existe
- GA4: G-XXXXXXXXXX en index.html
- Supabase env vars en Vercel Dashboard

CRM: 3 tabs + IA, mock data por tenant, insightsEngine.ts
Leer CLAUDE.md y MEMORY.md antes de tocar nada.
No quemes tokens. No preguntes lo que no es necesario.
```

---

## 📦 ÚLTIMOS COMMITS (al 2026-06-19)

```
49952bd  design(admin): overhaul visual completo del panel
ef037a4  feat(admin): datos demo por tenant + motor de insights IA
a3bb713  docs: registrar CRM panel admin completado
9f4040c  feat(admin): CRM panel 3 tabs 2 roles
377a6ac  feat(cielo): replace hero and gallery images with Unsplash
```

---

## 💼 NEGOCIO

| Pack | Setup | Mensual | CRM incluido |
|------|-------|---------|--------------|
| Cervecería / bar barrio | USD 150 | USD 25 | ❌ No |
| Bar cultural / shows | USD 250 | USD 35 | ✅ Básico (Reservas + Clientes) |
| Rooftop / venue premium | USD 400 | USD 60 | ✅ Completo |
| **Control.Evo Brain (IA)** | **USD 99 one-time** | — | Upsell para cualquier pack |

---

*Última actualización: 2026-06-20 — PC B (estudiante)*

## 🔑 localStorage keys por tenant
```
panel-reservas-${nombre}   panel-caja-${nombre}       panel-carta-${nombre}
panel-galeria-${nombre}    panel-auditoria-${nombre}  pin-lock-${nombre}
```
