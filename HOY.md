# HOY — Control.Evo · Hoja de ruta

## 🚀 DEPLOY (PC madre — hacer hoy)

```powershell
cd C:\Users\Tobia\bar-restaurante-arg
git pull
npx vercel --yes --prod
```
Si Node no aparece, primero:
```powershell
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")
```
Si pide login: `npx vercel login` → browser → esenciezen@gmail.com

**Si .vercel/project.json no existe**, crearlo:
```
{"projectId":"prj_t4gwAk5ne2mnYyYexJ3xoBNLVxOw","orgId":"team_2bOT1yAQujtKdnAJFvWjheHK","projectName":"nos-trajo-la-tercera"}
```
→ Puede que PC madre tenga otro project.json (isla-bar-cultural). Si es así: deployar con ese también. Ver ambas URLs resultantes.

---

## ✅ VERIFICAR POST-DEPLOY

| URL | Qué debe mostrar |
|-----|-----------------|
| `bar-restaurante-arg.vercel.app` | Cielo Rooftop (default nuevo) |
| `.../?t=isla` | Isla Bar Cultural |
| `.../?t=cuarta` | Nos Trajo la Tercera |
| `.../admin` | PIN dueño: `2580` · empleado: `1470` |

---

## 🔐 PINs (todos los tenants)

| Rol | PIN |
|-----|-----|
| Dueño | `2580` |
| Empleado | `1470` |

Patrón: columna del medio del numpad hacia abajo / columna izquierda.
**Al entregar cliente real → cambiar en** `src/config/tenants/[nombre].ts`

---

## 📱 PARA VENDER — URLs a mostrar

- Demo premium: `.../?t=cielo` → Cielo Rooftop
- Demo cervecería: `.../?t=cuarta` → Nos Trajo la Tercera
- Cliente real: `.../?t=isla` → NO usar como demo (datos reales)
- Panel admin demo: `.../admin?t=cielo` · PIN `2580`

---

## 📋 QUÉ TIENE EL SISTEMA HOY

**Sitio público por tenant:**
- Hero · Carta interactiva · Shows · Karaoke · Cumpleaños
- Club de puntos · Galería · Reseñas · Mapa/contacto · Footer

**Panel Admin (/admin):**
- 📅 Reservas — confirmar/cancelar, filtros, KPIs
- 👥 Clientes — historial, puntos, nivel
- 💰 Caja — ingresos/egresos, gráfico, margen
- 🍽️ Carta — editar precios y ocultar items sin código
- 🖼️ Galería — agregar fotos por URL, aparece al instante
- 📋 Log — quién hizo qué y cuándo (auditoría)
- 🧠 IA — resumen semanal automático (upsell $99)

**Seguridad:** rate limiting 5 intentos → bloqueo 15 min

**Datos:** localStorage (funciona sin Supabase). Cuando se conecte Supabase → persiste en la nube.

---

## 💰 PRECIOS

| Pack | Setup | /mes |
|------|-------|------|
| Cervecería / bar barrio | USD 150 | USD 25 |
| Bar cultural / shows | USD 250 | USD 35 |
| Rooftop / venue premium | USD 400 | USD 60 |
| **IA Brain (upsell)** | **USD 99** | — |

---

## ⚠️ PENDIENTE (no bloquea ventas)

- [ ] GA4 real — reemplazar `G-XXXXXXXXXX` en `index.html`
- [ ] Supabase — configurar env vars en Vercel Dashboard cuando haya primer cliente
- [ ] Dominio propio por cliente — configurar en Vercel post-venta

---

## 🆘 RESCUE rápido

- Repo: https://github.com/Tobiach/bar-restaurante-arg.git
- Vercel account: esenciezen@gmail.com
- Último commit PC B: `8111ee1` (fix PINs + default cielo)
- Archivo completo de emergencia: RESCUE.md en el repo
