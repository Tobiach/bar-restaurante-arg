import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarDays, Users, DollarSign, LogOut, Sparkles } from 'lucide-react';
import { getConfig } from '../../config/active';
import { AdminRol } from '../../types/admin.types';
import TabReservas from './TabReservas';
import TabClientes from './TabClientes';
import TabCaja from './TabCaja';
import TabResumenIA from './TabResumenIA';

type Tab = 'reservas' | 'clientes' | 'caja' | 'resumen';

type IconComponent = (props: { size?: number; className?: string }) => React.ReactElement | null;

const TABS: { id: Tab; label: string; Icon: IconComponent }[] = [
  { id: 'reservas', label: 'Reservas', Icon: CalendarDays },
  { id: 'clientes', label: 'Clientes', Icon: Users },
  { id: 'caja',     label: 'Caja',     Icon: DollarSign },
  { id: 'resumen',  label: 'IA',       Icon: Sparkles },
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

  const tabContent = {
    reservas: <TabReservas />,
    clientes: <TabClientes />,
    caja:     <TabCaja />,
    resumen:  <TabResumenIA />,
  };

  return (
    <div className="min-h-screen bg-violeta flex flex-col">
      {/* Header */}
      <header className="bg-violeta-medio border-b border-violeta-borde px-4 md:px-8 py-4 flex-shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {tc.logo && <img src={tc.logo} alt="Logo" className="h-9 w-auto opacity-80 hidden sm:block" />}
            <div>
              <span className="font-display text-sm font-black tracking-[0.2em] text-naranja uppercase">{tc.nombre}</span>
              <div className="text-[10px] text-blanco-muted font-display tracking-widest uppercase">
                {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] text-blanco-muted font-display tracking-widest uppercase">Sesión activa</div>
              <div className="text-xs font-semibold text-blanco-suave">{nombre}</div>
            </div>
            <span className={`px-2 py-1 rounded text-[9px] font-display font-black tracking-widest uppercase ${
              rol === 'dueno' ? 'bg-naranja/20 text-naranja' : 'bg-verde-ok/20 text-verde-ok'
            }`}>
              {rol === 'dueno' ? 'DUEÑO' : 'EMPLEADO'}
            </span>
            <button
              onClick={onLogout}
              className="p-2 rounded-lg text-blanco-muted hover:text-rojo-error hover:bg-rojo-error/10 transition-all"
              title="Cerrar sesión"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Desktop tabs */}
      {rol === 'dueno' && (
        <div className="bg-violeta-medio border-b border-violeta-borde hidden md:block flex-shrink-0">
          <div className="max-w-6xl mx-auto px-8 flex gap-1">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-6 py-4 font-display text-xs font-black tracking-[0.2em] uppercase transition-all border-b-2 ${
                  activeTab === id
                    ? 'border-naranja text-naranja'
                    : 'border-transparent text-blanco-muted hover:text-blanco-suave hover:border-blanco-muted/20'
                }`}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Contenido */}
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile bottom nav */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 bg-violeta-medio border-t border-violeta-borde flex z-50 ${rol === 'empleado' ? 'justify-center' : ''}`}>
        {visibleTabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-all ${
              activeTab === id ? 'text-naranja' : 'text-blanco-muted'
            }`}
          >
            <Icon size={20} />
            <span className="text-[9px] font-display font-black tracking-widest uppercase">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
