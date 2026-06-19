import { useState } from 'react';
import { X } from 'lucide-react';
import { getConfig } from '../../config/active';
import { AdminRol } from '../../types/admin.types';

interface Props {
  onAuth: (rol: AdminRol, nombre: string) => void;
}

export default function AdminLogin({ onAuth }: Props) {
  const tc = getConfig();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const users = (tc as any).adminUsers ?? [
    { rol: 'dueno' as AdminRol, pin: tc.adminPin, nombre: 'Administrador' },
  ];

  const handleDigit = (d: string) => {
    const next = pin + d;
    if (next.length === 4) {
      const match = users.find((u: any) => u.pin === next);
      if (match) {
        sessionStorage.setItem('admin-rol', match.rol);
        sessionStorage.setItem('admin-nombre', match.nombre);
        onAuth(match.rol, match.nombre);
      } else {
        setError(true);
        setTimeout(() => { setPin(''); setError(false); }, 800);
      }
    } else {
      setPin(next);
    }
  };

  return (
    <div className="min-h-screen bg-violeta flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          {tc.logo && <img src={tc.logo} alt="Logo" className="h-14 w-auto mx-auto mb-4 opacity-80" />}
          <h1 className="font-display text-2xl font-black tracking-[0.2em] text-blanco-suave uppercase mb-1">
            {tc.nombre}
          </h1>
          <p className="text-blanco-muted text-[10px] font-display tracking-[0.4em] uppercase">
            Panel de Control · Ingresá tu PIN
          </p>
        </div>

        <div className="bg-violeta-card p-8 rounded-2xl border border-violeta-borde shadow-2xl">
          {/* Indicadores de dígitos */}
          <div className={`flex justify-center gap-4 mb-8 transition-all duration-300 ${error ? 'animate-shake' : ''}`}>
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-black transition-all ${
                  i < pin.length
                    ? error
                      ? 'bg-rojo-error/20 border-rojo-error text-rojo-error'
                      : 'bg-naranja/20 border-naranja text-naranja'
                    : 'bg-violeta border-violeta-borde'
                }`}
              >
                {i < pin.length ? '●' : ''}
              </div>
            ))}
          </div>

          {/* Numpad */}
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
              <button
                key={n}
                onClick={() => handleDigit(String(n))}
                className="h-14 bg-violeta-medio rounded-xl font-display text-xl font-black hover:bg-naranja/20 hover:text-naranja transition-all active:scale-95"
              >
                {n}
              </button>
            ))}
            <div />
            <button
              onClick={() => handleDigit('0')}
              className="h-14 bg-violeta-medio rounded-xl font-display text-xl font-black hover:bg-naranja/20 hover:text-naranja transition-all active:scale-95"
            >
              0
            </button>
            <button
              onClick={() => setPin(pin.slice(0, -1))}
              className="h-14 bg-violeta-medio rounded-xl flex items-center justify-center hover:bg-rojo-error/20 hover:text-rojo-error transition-all active:scale-95"
            >
              <X size={20} />
            </button>
          </div>

          {error && (
            <p className="text-rojo-error text-center text-[10px] font-display tracking-[0.3em] mt-5 uppercase">
              PIN incorrecto
            </p>
          )}
        </div>

        <p className="text-center text-blanco-muted/40 text-[10px] mt-6 font-display tracking-widest">
          <a href="/" className="hover:text-blanco-muted transition-colors">← Volver al sitio</a>
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-8px)}
          80%{transform:translateX(8px)}
        }
        .animate-shake { animation: shake 0.4s ease; }
      `}</style>
    </div>
  );
}
