# TENANTS — Registro de clientes

## Cómo usar este archivo
Actualizar cada vez que se cierra un cliente nuevo o cambia el estado de uno existente.
Este archivo es la fuente de verdad sobre quién está pagando, qué tiene y qué viene.

---

## CLIENTES ACTIVOS

| Tenant ID | Local | Template | Setup cobrado | Mensual | Estado | Próx. vencimiento |
|---|---|---|---|---|---|---|
| `isla` | Isla Bar Cultural | Bar cultural | DEMO | DEMO | Demo interna | — |

---

## PIPELINE DE VENTAS

| Local | Rubro | Template | Valor setup | Mensual | Estado | Próx. acción |
|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — |

---

## CLIENTES CERRADOS / HISTORIAL

| Local | Fecha cierre | Template | Setup | Mensual | Estado |
|---|---|---|---|---|---|
| — | — | — | — | — | — |

---

## CÓMO AGREGAR UN CLIENTE NUEVO

### 1. Registrar acá
Agregar fila en CLIENTES ACTIVOS con todos los datos.

### 2. Crear el tenant en el repo
```bash
# Copiar template base según rubro
cp src/config/tenants/isla.ts src/config/tenants/[nombre].ts
cp src/constants.ts src/constants.[nombre].ts

# Editar los dos archivos con datos del cliente
# Registrar en src/config/tenants.ts y src/main.tsx
```

### 3. Personalización estimada
- Editar config (nombre, colores, WhatsApp, horarios, features): 30 min
- Editar menú en constants: 60-90 min
- Reemplazar imágenes (galería, shows): 30 min
- Deploy y verificación: 15 min
- **Total: ~3 horas**

### 4. Entregar al cliente
URL: `isla-bar-cultural.vercel.app/?t=[nombre]`
Admin: `isla-bar-cultural.vercel.app/admin` con PIN configurado en adminPin

---

## UPSELLS DISPONIBLES POR CLIENTE

| Upsell | Precio sugerido | Esfuerzo | Cuándo ofrecerlo |
|---|---|---|---|
| Supabase (reservas persistentes) | +USD 30 setup | 2h | Al cerrar el setup |
| Sistema de puntos real | +USD 20/mes | 8-10h | Al mes 2 |
| Dashboard analytics | +USD 50 setup | 10-15h | Al mes 3 |
| PWA + push notifications | +USD 40 setup | 4-6h | Al mes 3 |
| MercadoPago seña en shows | +USD 60 setup | 6-8h | Si tiene eventos con cupo |
| Imágenes con IA (Muñeca) | USD 50-100 | externo | En el pitch inicial |
