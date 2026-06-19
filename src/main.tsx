import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { configs } from './config/tenants';
import { setActiveConfig, setActiveData } from './config/active';
import { islaData } from './constants';
import { cuartaData } from './constants.cuarta';
import { cieloData } from './constants.cielo';
import App from './App.tsx';
import AdminPanel from './pages/AdminPanel.tsx';
import './index.css';

// Tenant selection via ?t= query param
const params = new URLSearchParams(window.location.search);
const tenantId = params.get('t') || 'isla';
const tenantConfig = configs[tenantId] || configs['isla'];

// Data selection
const dataMap: Record<string, any> = {
  isla:   islaData,
  cuarta: cuartaData,
  cielo:  cieloData,
};
const tenantData = dataMap[tenantId] || islaData;

// Register in active module (read by all components)
setActiveConfig(tenantConfig);
setActiveData(tenantData);

// Inject tenant theme CSS vars at runtime
const root = document.documentElement;
const { tema } = tenantConfig;
root.style.setProperty('--color-violeta',         tema.primario);
root.style.setProperty('--color-violeta-medio',   tema.primarioMedio);
root.style.setProperty('--color-violeta-card',    tema.primarioCard);
root.style.setProperty('--color-naranja',         tema.acento);
root.style.setProperty('--color-naranja-claro',   tema.acentoClaro);
root.style.setProperty('--color-naranja-oscuro',  tema.acentoOscuro);
root.style.setProperty('--color-dorado',          tema.dorado);
root.style.setProperty('--color-naranja-glow',    `${tema.acento}38`);
root.style.setProperty('--color-naranja-borde',   `${tema.acento}66`);
root.style.setProperty('--color-violeta-borde',   `${tema.acento}40`);

root.style.setProperty('--violeta',         tema.primario);
root.style.setProperty('--violeta-medio',   tema.primarioMedio);
root.style.setProperty('--violeta-card',    tema.primarioCard);
root.style.setProperty('--naranja',         tema.acento);
root.style.setProperty('--naranja-claro',   tema.acentoClaro);
root.style.setProperty('--naranja-oscuro',  tema.acentoOscuro);
root.style.setProperty('--naranja-glow',    `${tema.acento}38`);
root.style.setProperty('--naranja-borde',   `${tema.acento}66`);
root.style.setProperty('--violeta-borde',   `${tema.acento}40`);
root.style.setProperty('--dorado',          tema.dorado);

// Optional blanco vars (cielo overrides warm tones)
const temaAny = tema as any;
if (temaAny.blancoSuave) {
  root.style.setProperty('--color-blanco-suave', temaAny.blancoSuave);
  root.style.setProperty('--blanco-suave', temaAny.blancoSuave);
}
if (temaAny.blancoMuted) {
  root.style.setProperty('--color-blanco-muted', temaAny.blancoMuted);
  root.style.setProperty('--blanco-muted', temaAny.blancoMuted);
}

// Font vars per tenant
const fc = tenantConfig as any;
root.style.setProperty('--font-titulo',  fc.fontTitulo  || "'Inter', sans-serif");
root.style.setProperty('--font-display', fc.fontDisplay || "'Inter', sans-serif");

// Dynamic meta tags per tenant
document.title = `${tenantConfig.nombre} — ${tenantConfig.tagline}`;
document.querySelector('meta[name="description"]')?.setAttribute('content', `${tenantConfig.nombre} — ${tenantConfig.tagline}`);
document.querySelector('meta[property="og:title"]')?.setAttribute('content', tenantConfig.nombre);
document.querySelector('meta[property="og:description"]')?.setAttribute('content', tenantConfig.tagline);
if (tenantConfig.logo) {
  document.querySelector('meta[property="og:image"]')?.setAttribute('content', tenantConfig.logo);
}

// Favicon per tenant
const TENANT_EMOJI: Record<string, string> = { isla: '🎵', cielo: '🥂', cuarta: '🍺' };
const faviconEmoji = TENANT_EMOJI[tenantId] || '🍸';
const favicon = document.getElementById('fav') as HTMLLinkElement | null;
if (favicon) {
  favicon.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${faviconEmoji}</text></svg>`;
}

// Dot pattern color per tenant accent
const dotColor = `${tema.acento}10`;
document.body.style.backgroundImage = `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`;
document.body.style.backgroundSize = '32px 32px';

const isAdmin = window.location.pathname === '/admin' || window.location.pathname === '/panel';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? <AdminPanel /> : <App />}
  </StrictMode>
);
