import React, { useState, useEffect } from 'react';

type ToastType = 'exito' | 'error' | 'info' | 'aviso';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev.slice(-2), { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none w-full max-w-[calc(100%-2rem)] sm:max-w-md">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto p-4 rounded-lg shadow-xl border-l-4 animate-slide-in
              ${toast.type === 'exito' ? 'bg-verde-ok/20 border-verde-ok text-white' : ''}
              ${toast.type === 'error' ? 'bg-rojo-error/20 border-rojo-error text-white' : ''}
              ${toast.type === 'info' ? 'bg-violeta-medio border-naranja text-white' : ''}
              ${toast.type === 'aviso' ? 'bg-amarillo-alerta/20 border-amarillo-alerta text-white' : ''}
            `}
          >
            {toast.message}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slide-in {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
      `}</style>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
