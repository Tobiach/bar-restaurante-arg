import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarDays, Users, DollarSign, LogOut, Sparkles, UtensilsCrossed, Image, ClipboardList } from 'lucide-react';
import { getConfig } from '../../config/active';
import { AdminRol } from '../../types/admin.types';
import TabReservas from './TabReservas';
import TabClientes from './TabClientes';
import TabCaja from './TabCaja';
import TabResumenIA from './TabResumenIA';
import TabCarta from './TabCarta';
import TabGaleria from './TabGaleria';
import TabAuditoria from './TabAuditoria';

type Tab = 'reservas' | 'clientes' | 'caja' | 'carta' | 'galeria' | 'auditoria' | 'resumen';
type IconEl = (props: { size?: number; className?: string }) => React.ReactElement | null;

const TABS: { id: Tab; label: string; emoji: string; Icon: IconEl; mobileHide?: boolean }[] = [
  { id: 'reservas',  label: 'Reservas', emoji: '📅', Icon: CalendarDays },
  { id: 'clientes',  label: 'Clientes', emoji: '👥', Icon: Users },
  { id: 'caja',      label: 'Caja',     emoji: '💰', Icon: DollarSign },
  { id: 'carta',     label: 'Carta',    emoji: '📝', Icon: UtensilsCrossed },
  { id: 'galeria',   label: 'Galería',  emoji: '🖼️', Icon: Image,         mobileHide: true },
  { id: 'auditoria', label: 'Log',      emoji: '📋', Icon: ClipboardList, mobileHide: true },
  { id: 'resumen',   label: 'IA',       emoji: '🧠', Icon: Sparkles },
];

interface Props {
  rol: AdminRol;
  nombre: string;
  onLogout: () => void;
}

export default function AdminLayout({ rol, nombre, onLogout }: Props) {
  const tc = getConfig();
  const [activeTab, setActiveTab] = useState<Tab>('reservas');

  const visibleTabs = rol === 'dueno' ? TABS : TABS.filter(t => t.id === 'reservas');
  const mobileTabs  = visibleTabs.filter(t => !t.mobileHide);

  const tabContent: Record<Tab, React.ReactElement> = {
    reservas:  <TabReservas />,
    clientes:  <TabClientes />,
    caja:      <TabCaja />,
    carta:     <TabCarta />,
    galeria:   <TabGaleria />,
    auditoria: <TabAuditoria />,
    resumen:   <TabResumenIA />,
  };

  const [hora, setHora] = useState(() =>
    new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
  );
  useEffect(() => {
    const tick = setInterval(() =>
      setHora(new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }))
    , 30000);
    return () => clearInterval(tick);
  }, []);
  const diaCompleto = new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-violeta)' }}>

      {/* ═══ HEADER ═══ */}
      <header className="flex-shrink-0 relative" style={{ background: 'var(--color-violeta-medio)', borderBottom: '1px solid var(--color-violeta-borde)' }}>
        {/* Naranja accent line top */}
        <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, var(--color-naranja), transparent)' }} />

        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">

          {/* Left: logo + name */}
          <div className="flex items-center gap-3">
            {tc.logo && <img src={tc.logo} alt="" className="h-8 w-auto opacity-90 hidden sm:block" />}
            <div>
              <div className="font-display text-xs font-black tracking-[0.25em] uppercase" style={{ color: 'var(--color-naranja)' }}>
                {tc.nombre}
              </div>
              <div className="text-[10px] capitalize" style={{ color: 'var(--color-blanco-muted)' }}>
                {diaCompleto} · {hora}
              </div>
            </div>
          </div>

          {/* Right: user + logout */}
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black"
                style={{ background: 'var(--color-naranja)20', color: 'var(--color-naranja)', border: '1px solid var(--color-naranja)35' }}>
                {nombre.charAt(0).toUpperCase()}
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold leading-none mb-1" style={{ color: 'var(--color-blanco-suave)' }}>{nombre}</div>
                <span className="text-[9px] font-display font-black tracking-widest uppercase px-1.5 py-0.5 rounded-md"
                  style={{
                    background: rol === 'dueno' ? 'var(--color-naranja)18' : 'var(--color-verde-ok)15',
                    color: rol === 'dueno' ? 'var(--color-naranja)' : 'var(--color-verde-ok)',
                    border: rol === 'dueno' ? '1px solid var(--color-naranja)30' : '1px solid var(--color-verde-ok)25',
                  }}>
                  {rol === 'dueno' ? '👑 Dueño' : '🔑 Empleado'}
                </span>
              </div>
            </div>

            <button onClick={onLogout}
              className="p-2 rounded-xl transition-all"
              style={{ color: 'var(--color-blanco-muted)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-rojo-error)'; (e.currentTarget as HTMLElement).style.background = 'var(--color-rojo-error)12'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-blanco-muted)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              title="Cerrar sesión">
              <LogOut size={15} />
            </button>
          </div>
        </div>

        {/* ── Desktop tabs (dueño only) ── */}
        {rol === 'dueno' && (
          <div className="max-w-6xl mx-auto px-8 hidden md:flex gap-1 pb-0">
            {TABS.map(({ id, label, emoji }) => {
              const active = activeTab === id;
              return (
                <button key={id} onClick={() => setActiveTab(id)}
                  className="relative px-5 py-3 font-display text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-200"
                  style={{ color: active ? 'var(--color-naranja)' : 'var(--color-blanco-muted)' }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--color-blanco-suave)'; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--color-blanco-muted)'; }}
                >
                  <span className="mr-1.5">{emoji}</span>{label}
                  {active && (
                    <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: 'var(--color-naranja)' }} />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Empleado: solo muestra qué tab está activa */}
        {rol === 'empleado' && (
          <div className="max-w-6xl mx-auto px-8 hidden md:flex pb-0">
            <div className="px-5 py-3 font-display text-[11px] font-black tracking-[0.2em] uppercase relative"
              style={{ color: 'var(--color-naranja)' }}>
              📅 Reservas
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'var(--color-naranja)' }} />
            </div>
          </div>
        )}
      </header>

      {/* ═══ CONTENIDO ═══ */}
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}>
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ═══ MOBILE BOTTOM NAV ═══ */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-50 flex ${rol === 'empleado' ? 'justify-center' : ''}`}
        style={{ background: 'var(--color-violeta-medio)', borderTop: '1px solid var(--color-violeta-borde)' }}>
        {mobileTabs.map(({ id, label, emoji, Icon }) => {
          const active = activeTab === id;
          return (
            <button key={id} onClick={() => setActiveTab(id)}
              className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-all relative"
              style={{ color: active ? 'var(--color-naranja)' : 'var(--color-blanco-muted)' }}>
              {active && (
                <motion.div layoutId="mobile-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                  style={{ background: 'var(--color-naranja)' }} />
              )}
              <span className="text-base leading-none">{emoji}</span>
              <Icon size={0} className="hidden" />
              <span className="text-[9px] font-display font-black tracking-widest uppercase">{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
