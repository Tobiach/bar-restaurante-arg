import { useState } from 'react';
import { Delete } from 'lucide-react';
import { getConfig } from '../../config/active';
import { AdminRol } from '../../types/admin.types';

interface Props {
  onAuth: (rol: AdminRol, nombre: string) => void;
}

export default function AdminLogin({ onAuth }: Props) {
  const tc = getConfig();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const users = (tc as any).adminUsers ?? [
    { rol: 'dueno' as AdminRol, pin: tc.adminPin, nombre: 'Administrador' },
  ];

  const handleDigit = (d: string) => {
    if (pin.length >= 4) return;
    const next = pin + d;
    if (next.length === 4) {
      const match = users.find((u: any) => u.pin === next);
      if (match) {
        sessionStorage.setItem('admin-rol', match.rol);
        sessionStorage.setItem('admin-nombre', match.nombre);
        onAuth(match.rol, match.nombre);
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => { setPin(''); setError(false); setShake(false); }, 900);
      }
    } else {
      setPin(next);
    }
  };

  const handleBack = () => {
    if (error) return;
    setPin(p => p.slice(0, -1));
  };

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'del'] as const;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: 'var(--color-violeta)' }}>
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-naranja)18 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-naranja)0c 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      <div className="w-full max-w-xs relative z-10">
        {/* Brand chip */}
        <div className="flex justify-center mb-6">
          <span className="px-3 py-1 rounded-full text-[9px] font-display font-black tracking-[0.4em] uppercase"
            style={{ background: 'var(--color-naranja)18', color: 'var(--color-naranja)', border: '1px solid var(--color-naranja)30' }}>
            🎛️ CONTROL.EVO
          </span>
        </div>

        {/* Logo + name */}
        <div className="text-center mb-8">
          {tc.logo && (
            <div className="mb-4 flex justify-center">
              <div className="p-3 rounded-2xl" style={{ background: 'var(--color-naranja)12', border: '1px solid var(--color-naranja)25' }}>
                <img src={tc.logo} alt="Logo" className="h-12 w-auto" />
              </div>
            </div>
          )}
          <h1 className="font-display text-2xl font-black tracking-[0.15em] uppercase mb-1" style={{ color: 'var(--color-blanco-suave)' }}>
            {tc.nombre}
          </h1>
          <p className="text-[10px] font-display tracking-[0.4em] uppercase" style={{ color: 'var(--color-blanco-muted)' }}>
            Panel Administrativo
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl p-7 shadow-2xl" style={{ background: 'var(--color-violeta-card)', border: '1px solid var(--color-violeta-borde)' }}>

          {/* PIN dots */}
          <p className="text-center text-[9px] font-display tracking-[0.5em] uppercase mb-5" style={{ color: 'var(--color-blanco-muted)' }}>
            Ingresá tu PIN
          </p>

          <div className={`flex justify-center gap-3 mb-7 ${shake ? 'animate-shake' : ''}`}>
            {[0, 1, 2, 3].map(i => {
              const filled = i < pin.length;
              return (
                <div key={i} className="relative">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200"
                    style={{
                      background: filled
                        ? error ? 'var(--color-rojo-error)18' : 'var(--color-naranja)18'
                        : 'var(--color-violeta)',
                      border: filled
                        ? error ? '2px solid var(--color-rojo-error)' : '2px solid var(--color-naranja)'
                        : '2px solid var(--color-violeta-borde)',
                      boxShadow: filled && !error ? '0 0 12px var(--color-naranja)40' : 'none',
                    }}
                  >
                    {filled && (
                      <div className="w-3 h-3 rounded-full" style={{ background: error ? 'var(--color-rojo-error)' : 'var(--color-naranja)' }} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Numpad */}
          <div className="grid grid-cols-3 gap-2.5">
            {digits.map((d, idx) => {
              if (d === null) return <div key={idx} />;
              if (d === 'del') {
                return (
                  <button key="del" onClick={handleBack}
                    className="h-14 rounded-2xl flex items-center justify-center transition-all duration-150 active:scale-95"
                    style={{ background: 'var(--color-violeta)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-rojo-error)18'; (e.currentTarget as HTMLElement).style.color = 'var(--color-rojo-error)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-violeta)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-blanco-muted)'; }}
                    >
                    <Delete size={18} />
                  </button>
                );
              }
              return (
                <button
                  key={d}
                  onClick={() => handleDigit(String(d))}
                  className="h-14 rounded-2xl font-display text-xl font-black transition-all duration-150 active:scale-95"
                  style={{ background: 'var(--color-violeta-medio)', color: 'var(--color-blanco-suave)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--color-naranja)20';
                    (e.currentTarget as HTMLElement).style.color = 'var(--color-naranja)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px var(--color-naranja)25';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--color-violeta-medio)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--color-blanco-suave)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  {d}
                </button>
              );
            })}
          </div>

          {error && (
            <p className="text-center text-[10px] font-display tracking-[0.3em] mt-5 uppercase" style={{ color: 'var(--color-rojo-error)' }}>
              ✗ PIN incorrecto — intentá de nuevo
            </p>
          )}
        </div>

        <a href="/" className="block text-center mt-6 text-[10px] font-display tracking-widest transition-colors" style={{ color: 'var(--color-blanco-muted)40' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-blanco-muted)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-blanco-muted)40'; }}>
          ← Volver al sitio
        </a>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-10px)}
          40%{transform:translateX(10px)}
          60%{transform:translateX(-10px)}
          80%{transform:translateX(10px)}
        }
        .animate-shake { animation: shake 0.45s ease; }
      `}</style>
    </div>
  );
}
