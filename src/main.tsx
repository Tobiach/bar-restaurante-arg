import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { tenantConfig } from './config/tenant.config';
import App from './App.tsx';
import AdminPanel from './pages/AdminPanel.tsx';
import './index.css';

// Inject tenant theme CSS vars at runtime — changing tenant.config.ts tema is enough
const root = document.documentElement;
const { tema } = tenantConfig;
root.style.setProperty('--color-violeta', tema.primario);
root.style.setProperty('--color-violeta-medio', tema.primarioMedio);
root.style.setProperty('--color-violeta-card', tema.primarioCard);
root.style.setProperty('--color-naranja', tema.acento);
root.style.setProperty('--color-naranja-claro', tema.acentoClaro);
root.style.setProperty('--color-naranja-oscuro', tema.acentoOscuro);
root.style.setProperty('--color-dorado', tema.dorado);
root.style.setProperty('--color-naranja-glow', `${tema.acento}38`);
root.style.setProperty('--color-naranja-borde', `${tema.acento}66`);
root.style.setProperty('--color-violeta-borde', `${tema.acento}40`);

// Also set the raw vars used in custom CSS
root.style.setProperty('--violeta', tema.primario);
root.style.setProperty('--violeta-medio', tema.primarioMedio);
root.style.setProperty('--violeta-card', tema.primarioCard);
root.style.setProperty('--naranja', tema.acento);
root.style.setProperty('--naranja-claro', tema.acentoClaro);
root.style.setProperty('--naranja-oscuro', tema.acentoOscuro);
root.style.setProperty('--naranja-glow', `${tema.acento}38`);
root.style.setProperty('--naranja-borde', `${tema.acento}66`);
root.style.setProperty('--violeta-borde', `${tema.acento}40`);
root.style.setProperty('--dorado', tema.dorado);

const isAdmin = window.location.pathname === '/admin' || window.location.pathname === '/panel';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? <AdminPanel /> : <App />}
  </StrictMode>
);
