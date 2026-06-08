import { useState, useEffect } from 'react';
import { getConfig } from '../../config/active';

export default function StatusIndicator() {
  const tenantConfig = getConfig();
  const [status, setStatus] = useState({ open: false, message: '' });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours() + now.getMinutes() / 60;
      const { slots } = tenantConfig.horarios;

      let isOpen = false;

      // Check if we're in late-night hours from the previous day's slot
      const prevDay = (day + 6) % 7;
      const prevSlot = slots.find(s => s.dias.includes(prevDay));
      if (prevSlot && prevSlot.cierra > 24 && hour < prevSlot.cierra - 24) {
        isOpen = true;
      }

      // Check if we're in today's opening hours
      const todaySlot = slots.find(s => s.dias.includes(day));
      if (todaySlot && !isOpen) {
        if (todaySlot.cierra > 24) {
          if (hour >= todaySlot.abre) isOpen = true;
        } else {
          if (hour >= todaySlot.abre && hour < todaySlot.cierra) isOpen = true;
        }
      }

      let message = '';
      if (isOpen) {
        message = 'ABIERTO AHORA';
      } else if (todaySlot && hour < todaySlot.abre) {
        message = `Abrimos hoy a las ${todaySlot.abre}:00 hs`;
      } else {
        // Find next open day
        for (let i = 1; i <= 7; i++) {
          const nextDay = (day + i) % 7;
          const nextSlot = slots.find(s => s.dias.includes(nextDay));
          if (nextSlot) {
            const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
            message = i === 1
              ? `Abrimos mañana a las ${nextSlot.abre}:00 hs`
              : `Abrimos el ${dayNames[nextDay]} a las ${nextSlot.abre}:00 hs`;
            break;
          }
        }
        if (!message) message = 'Próxima apertura en breve';
      }

      setStatus({ open: isOpen, message });
    };

    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 font-display text-sm">
      <span className={`w-2 h-2 rounded-full ${status.open ? 'bg-verde-ok animate-pulse' : 'bg-rojo-error'}`}></span>
      <span className={status.open ? 'text-verde-ok' : 'text-blanco-muted'}>{status.message}</span>
    </div>
  );
}
