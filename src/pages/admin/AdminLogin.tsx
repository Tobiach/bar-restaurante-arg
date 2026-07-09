import { useState, useEffect } from 'react';
import { Delete, Lock } from 'lucide-react';
import { getConfig } from '../../config/active';
import { AdminRol } from '../../types/admin.types';

const MAX_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000;

interface LockRecord { attempts: number; lockedUntil: number; }

function readLock(key: string): LockRecord {
  try { return JSON.parse(localStorage.getItem(key) || '{"attempts":0,"lockedUntil":0}'); }
  catch { return { attempts: 0, lockedUntil: 0 }; }
}

function writeLock(key: string, s: LockRecord) {
  try { localStorage.setItem(key, JSON.stringify(s)); } catch { /* skip */ }
}

interface Props {
  onAuth: (rol: AdminRol, nombre: string) => void;
}

export default function AdminLogin({ onAuth }: Props) {
  const tc = getConfig();
  const LOCK_KEY = `pin-lock-${tc.nombre}`;
  const congelado = (tc as any).congelado === true;

  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [lockRecord, setLockRecord] = useState<LockRecord>(() => readLock(LOCK_KEY));
  const [tick, setTick] = useState(0);

  const remaining = Math.max(0, lockRecord.lockedUntil - Date.now());
  const isLocked = remaining > 0;
  const minutesLeft = Math.ceil(remaining / 60000);
  const attemptsLeft = MAX_ATTEMPTS - lockRecord.attempts;

  useEffect(() => {
    if (!isLocked) return;
    const t = setInterval(() => setTick(n => n + 1), 1000);
    return () => clearInterval(t);
  }, [isLocked]);

  void tick;

  const users = (tc as any).adminUsers ?? [
    { rol: 'dueno' as AdminRol, pin: tc.adminPin, nombre: 'Administrador' },
  ];

  const handleDigit = (d: string) => {
    if (isLocked || pin.length >= 4) return;
    const next = pin + d;
    if (next.length === 4) {
      const match = users.find((u: any) => u.pin === next);
      if (match) {
        writeLock(LOCK_KEY, { attempts: 0, lockedUntil: 0 });
        sessionStorage.setItem('admin-rol', match.rol);
        sessionStorage.setItem('admin-nombre', match.nombre);
        onAuth(match.rol, match.nombre);
      } else {
        const newAttempts = lockRecord.attempts + 1;
        const newRecord: LockRecord = newAttempts >= MAX_ATTEMPTS
          ? { attempts: newAttempts, lockedUntil: Date.now() + LOCK_MS }
          : { attempts: newAttempts, lockedUntil: 0 };
        writeLock(LOCK_KEY, newRecord);
        setLockRecord(newRecord);
        setError(true);
        setShake(true);
        setTimeout(() => { setPin(''); setError(false); setShake(false); }, 900);
      }
    } else {
      setPin(next);
    }
  };

  const handleBack = () => {
    if (error || isLocked) return;
    setPin(p => p.slice(0, -1));
  };

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'del'] as const;

  if (congelado) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--color-violeta)' }}>
        <div className="w-full max-w-xs text-center rounded-3xl p-7" style={{ background: 'var(--color-violeta-card)', border: '1px solid var(--color-violeta-borde)' }}>
          <Lock size={28} className="mx-auto mb-4" style={{ color: 'var(--color-blanco-muted)' }} />
          <p className="font-display text-xs font-black tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--color-blanco-suave)' }}>
            Panel suspendido
          </p>
          <p className="text-[11px]" style={{ color: 'var(--color-blanco-muted)' }}>
            Contactá a Control.Evo para reactivarlo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: 'var(--color-violeta)' }}>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-naranja)18 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-naranja)0c 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      <div className="w-full max-w-xs relative z-10">
        <div className="flex justify-center mb-6">
          <span className="px-3 py-1 rounded-full text-[9px] font-display font-black tracking-[0.4em] uppercase"
            style={{ background: 'var(--color-naranja)18', color: 'var(--color-naranja)', border: '1px solid var(--color-naranja)30' }}>
            🎛️ CONTROL.EVO
          </span>
        </div>

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

        <div className="rounded-3xl p-7 shadow-2xl" style={{ background: 'var(--color-violeta-card)', border: '1px solid var(--color-violeta-borde)' }}>

          {isLocked ? (
            <div className="text-center py-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'var(--color-rojo-error)12', border: '1px solid var(--color-rojo-error)30' }}>
                  <Lock size={28} style={{ color: 'var(--color-rojo-error)' }} />
                </div>
              </div>
              <p className="font-display text-xs font-black tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--color-rojo-error)' }}>
                Panel bloqueado
              </p>
              <p className="text-[11px] mb-4" style={{ color: 'var(--color-blanco-muted)' }}>
                Demasiados intentos fallidos.
              </p>
              <div className="rounded-xl py-3 px-4" style={{ background: 'var(--color-violeta)', border: '1px solid var(--color-violeta-borde)' }}>
                <span className="font-display text-2xl font-black tabular-nums" style={{ color: 'var(--color-naranja)' }}>
                  {minutesLeft} min
                </span>
                <p className="text-[9px] font-display tracking-widest uppercase mt-1" style={{ color: 'var(--color-blanco-muted)' }}>
                  para desbloquear
                </p>
              </div>
            </div>
          ) : (
            <>
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

              <div className="grid grid-cols-3 gap-2.5">
                {digits.map((d, idx) => {
                  if (d === null) return <div key={idx} />;
                  if (d === 'del') {
                    return (
                      <button key="del" onClick={handleBack}
                        className="h-14 rounded-2xl flex items-center justify-center transition-all duration-150 active:scale-95"
                        style={{ background: 'var(--color-violeta)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-rojo-error)18'; (e.currentTarget as HTMLElement).style.color = 'var(--color-rojo-error)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-violeta)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-blanco-muted)'; }}>
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
                  ✗ PIN incorrecto — {attemptsLeft > 0 ? `${attemptsLeft} intento${attemptsLeft !== 1 ? 's' : ''} restante${attemptsLeft !== 1 ? 's' : ''}` : 'último intento'}
                </p>
              )}
            </>
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
