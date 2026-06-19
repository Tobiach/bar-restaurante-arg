# ============================================================
# bootstrap-domex.ps1 — Setup de domex-temp en cualquier PC
# Uso: desde C:\Users\[usuario]\domex-temp\ →
#      ..\bar-restaurante-arg\scripts\bootstrap-domex.ps1
# O copiar este script al repo de domex
# ============================================================

Write-Host "`n🚀 Domex-temp Bootstrap`n" -ForegroundColor Cyan

$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")

# .vercel/project.json para domex-temp
$vercelDir = ".vercel"
$vercelFile = Join-Path $vercelDir "project.json"

if (-not (Test-Path $vercelFile)) {
    Write-Host "📁 Creando .vercel/project.json para domex-temp..." -ForegroundColor Yellow
    if (-not (Test-Path $vercelDir)) { New-Item -ItemType Directory -Path $vercelDir | Out-Null }
    $json = '{"projectId":"prj_TosIZXUMrCUCGkdBCDiotAOZJ7qR","orgId":"team_2bOT1yAQujtKdnAJFvWjheHK","projectName":"domex-temp"}'
    Set-Content -Path $vercelFile -Value $json -Encoding utf8
    Write-Host "  ✅ Creado" -ForegroundColor Green
} else {
    Write-Host "  ✅ .vercel/project.json ya existe" -ForegroundColor Green
}

if (-not (Test-Path "node_modules")) {
    npm install
}

Write-Host "`n✅ Listo. Deploy: npx vercel --yes --prod" -ForegroundColor Green
Write-Host "📌 Post-deploy: configurar alias aicolmena.vercel.app en Vercel Dashboard`n"
