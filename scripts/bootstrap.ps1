# ============================================================
# bootstrap.ps1 — Control.Evo Setup en cualquier PC nueva
# Uso: desde la raiz del repo → .\scripts\bootstrap.ps1
# ============================================================

Write-Host "`n🚀 Control.Evo Bootstrap`n" -ForegroundColor Cyan

# ── 1. Fix PATH (Node/npm) ──────────────────────────────────
Write-Host "⚡ Rehidratando PATH de Node..." -ForegroundColor Yellow
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")

$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "  ✅ Node $nodeVersion encontrado" -ForegroundColor Green
} else {
    Write-Host "  ❌ Node no encontrado — instalá desde https://nodejs.org" -ForegroundColor Red
    exit 1
}

# ── 2. Crear .vercel/project.json si no existe ──────────────
$vercelDir = Join-Path $PSScriptRoot ".." ".vercel"
$vercelFile = Join-Path $vercelDir "project.json"

if (-not (Test-Path $vercelFile)) {
    Write-Host "`n📁 Creando .vercel/project.json..." -ForegroundColor Yellow
    if (-not (Test-Path $vercelDir)) { New-Item -ItemType Directory -Path $vercelDir | Out-Null }
    $json = '{"projectId":"prj_t4gwAk5ne2mnYyYexJ3xoBNLVxOw","orgId":"team_2bOT1yAQujtKdnAJFvWjheHK","projectName":"nos-trajo-la-tercera"}'
    Set-Content -Path $vercelFile -Value $json -Encoding utf8
    Write-Host "  ✅ .vercel/project.json creado" -ForegroundColor Green
} else {
    Write-Host "`n  ✅ .vercel/project.json ya existe" -ForegroundColor Green
}

# ── 3. npm install si falta node_modules ────────────────────
$nmDir = Join-Path $PSScriptRoot ".." "node_modules"
if (-not (Test-Path $nmDir)) {
    Write-Host "`n📦 Instalando dependencias (npm install)..." -ForegroundColor Yellow
    Set-Location (Join-Path $PSScriptRoot "..")
    npm install
    Write-Host "  ✅ Dependencias instaladas" -ForegroundColor Green
} else {
    Write-Host "  ✅ node_modules ya existe" -ForegroundColor Green
}

# ── 4. Estado git ───────────────────────────────────────────
Write-Host "`n📋 Estado del repo:" -ForegroundColor Cyan
git log --oneline -5
Write-Host ""
git status --short

# ── 5. Instrucciones finales ────────────────────────────────
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host "✅ Listo. Comandos útiles:" -ForegroundColor Green
Write-Host "  npm run dev        → localhost:3000 (o 3001 si está ocupado)"
Write-Host "  npx vercel login   → autenticar con esenciezen@gmail.com"
Write-Host "  npx vercel --yes --prod  → deploy a producción"
Write-Host "`n📖 Ver RESCUE.md para IDs, PINs y placeholders pendientes"
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor DarkGray
