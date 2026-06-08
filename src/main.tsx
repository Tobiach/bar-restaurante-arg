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

// Font vars per tenant
const fc = tenantConfig as any;
root.style.setProperty('--font-titulo',  fc.fontTitulo  || "'Inter', sans-serif");
root.style.setProperty('--font-display', fc.fontDisplay || "'Inter', sans-serif");

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
