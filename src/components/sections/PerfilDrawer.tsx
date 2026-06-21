import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Star, Calendar, LogOut, Eye, EyeOff, ChevronRight } from 'lucide-react';
import { getConfig } from '../../config/active';
import { getMockData } from '../../data/mockIndex';

interface UsuarioRegistrado {
  id: string;
  nombre: string;
  identificador: string;
  pwHash: string;
  fechaRegistro: string;
}

const USER_KEY    = (n: string) => `usuarios-${n}`;
const SESSION_KEY = (n: string) => `usuario-sesion-${n}`;
const PUNTOS_KEY  = (n: string) => `panel-puntos-${n}`;

function getUsuarios(n: string): UsuarioRegistrado[] {
  try { return JSON.parse(localStorage.getItem(USER_KEY(n)) || '[]'); } catch { return []; }
}
function saveUsuarios(n: string, u: UsuarioRegistrado[]) {
  try { localStorage.setItem(USER_KEY(n), JSON.stringify(u)); } catch { /* skip */ }
}
function getSession(n: string): { id: string; nombre: string } | null {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY(n)) || 'null'); } catch { return null; }
}
function saveSession(n: string, d: { id: string; nombre: string }) {
  try { sessionStorage.setItem(SESSION_KEY(n), JSON.stringify(d)); } catch { /* skip */ }
}
function clearSession(n: string) {
  try { sessionStorage.removeItem(SESSION_KEY(n)); } catch { /* skip */ }
}

const NIVEL_STYLES = {
  VIP:       { bg: 'bg-verde-ok/10',     text: 'text-verde-ok',    border: 'border-verde-ok/30',    emoji: '👑' },
  Frecuente: { bg: 'bg-naranja/10',      text: 'text-naranja',     border: 'border-naranja/30',     emoji: '⭐' },
  Nuevo:     { bg: 'bg-blanco-muted/10', text: 'text-blanco-muted',border: 'border-blanco-muted/20',emoji: '🆕' },
} as const;

function fmt(n: number) { return '$' + n.toLocaleString('es-AR'); }
function diasDesde(iso: string) {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (d === 0) return 'hoy';
  if (d === 1) return 'ayer';
  return `hace ${d} días`;
}

export default function PerfilDrawer() {
  const tc = getConfig();
  const tenantId = new URLSearchParams(window.location.search).get('t') || 'isla';
  const reservasHref: Record<string, string> = {
    isla: '#sec-reservas', cielo: '#cielo-reservas', cuarta: '#cuarta-reservas',
  };

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'login' | 'register' | 'perfil'>('login');
  const [session, setSession] = useState<{ id: string; nombre: string } | null>(() => getSession(tc.nombre));
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [fNombre, setFNombre] = useState('');
  const [fId, setFId] = useState('');
  const [fPw, setFPw] = useState('');

  const reset = () => { setFNombre(''); setFId(''); setFPw(''); setError(''); setShowPw(false); };

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setView(session ? 'perfil' : 'login');
    };
    window.addEventListener('open-perfil', handler);
    return () => window.removeEventListener('open-perfil', handler);
  }, [session]);

  const login = () => {
    setError('');
    const users = getUsuarios(tc.nombre);
    const user = users.find(u => u.identificador.toLowerCase() === fId.trim().toLowerCase());
    if (!user) { setError('Usuario no encontrado'); return; }
    if (user.pwHash !== btoa(fPw)) { setError('Contraseña incorrecta'); return; }
    const ses = { id: user.id, nombre: user.nombre };
    saveSession(tc.nombre, ses);
    setSession(ses);
    setView('perfil');
    reset();
  };

  const register = () => {
    setError('');
    if (!fNombre.trim() || !fId.trim() || !fPw.trim()) { setError('Completá todos los campos'); return; }
    if (fPw.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return; }
    const users = getUsuarios(tc.nombre);
    if (users.find(u => u.identificador.toLowerCase() === fId.trim().toLowerCase())) {
      setError('Ese email/teléfono ya está registrado'); return;
    }
    const nu: UsuarioRegistrado = {
      id: `u${Date.now()}`,
      nombre: fNombre.trim(),
      identificador: fId.trim(),
      pwHash: btoa(fPw),
      fechaRegistro: new Date().toISOString().slice(0, 10),
    };
    saveUsuarios(tc.nombre, [nu, ...users]);
    const ses = { id: nu.id, nombre: nu.nombre };
    saveSession(tc.nombre, ses);
    setSession(ses);
    setView('perfil');
    reset();
  };

  const logout = () => {
    clearSession(tc.nombre);
    setSession(null);
    setView('login');
    reset();
  };

  // Match session user against mockClientes
  const clientes = getMockData().clientes;
  const extraPuntos: Record<string, number> = (() => {
    try { return JSON.parse(localStorage.getItem(PUNTOS_KEY(tc.nombre)) || '{}'); } catch { return {}; }
  })();
  const currentUser = session ? getUsuarios(tc.nombre).find(u => u.id === session.id) : null;
  const clienteMatch = currentUser
    ? clientes.find(c => {
        const idNorm = currentUser.identificador.toLowerCase();
        const telNorm = currentUser.identificador.replace(/\D/g, '');
        return (c.email && c.email.toLowerCase() === idNorm) ||
               (telNorm.length > 5 && c.telefono.replace(/\D/g, '').includes(telNorm));
      })
    : null;

  const nivelKey = (clienteMatch?.nivel ?? 'Nuevo') as keyof typeof NIVEL_STYLES;
  const nivelStyle = NIVEL_STYLES[nivelKey];
  const puntosTotales = clienteMatch
    ? clienteMatch.puntos + (extraPuntos[clienteMatch.id] || 0)
    : 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex justify-end"
          style={{ background: 'rgba(13,13,13,0.82)' }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
            className="w-full max-w-sm h-full flex flex-col overflow-y-auto"
            style={{ background: 'var(--color-violeta)', borderLeft: '1px solid var(--color-violeta-borde)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex-shrink-0 px-6 py-5 flex items-center justify-between border-b"
              style={{ borderColor: 'var(--color-violeta-borde)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--color-naranja)18', border: '1px solid var(--color-naranja)30' }}>
                  <User size={16} style={{ color: 'var(--color-naranja)' }} />
                </div>
                <span className="font-display text-[11px] font-black tracking-[0.3em] uppercase"
                  style={{ color: 'var(--color-naranja)' }}>Mi Perfil</span>
              </div>
              <button onClick={() => setOpen(false)}
                className="p-2 text-blanco-muted hover:text-rojo-error transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 px-6 py-6">

              {/* ── PERFIL ── */}
              {view === 'perfil' && session && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black"
                      style={{ background: 'var(--color-naranja)20', color: 'var(--color-naranja)', border: '1px solid var(--color-naranja)35' }}>
                      {session.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-blanco-suave text-base">{session.nombre}</div>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xl border text-[10px] font-display font-black tracking-widest uppercase mt-1 ${nivelStyle.bg} ${nivelStyle.text} ${nivelStyle.border}`}>
                        {nivelStyle.emoji} {clienteMatch?.nivel ?? 'Nuevo'}
                      </span>
                    </div>
                  </div>

                  {/* Puntos */}
                  <div className="rounded-2xl p-5"
                    style={{ background: 'var(--color-violeta-card)', border: '1px solid var(--color-naranja)20' }}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[9px] font-display tracking-[0.3em] text-blanco-muted uppercase">Puntos acumulados</span>
                      <span className="text-lg font-black" style={{ color: 'var(--color-naranja)' }}>{puntosTotales}</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-violeta)' }}>
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${Math.min((puntosTotales / 2000) * 100, 100)}%`, background: 'var(--color-naranja)' }} />
                    </div>
                    <div className="text-[9px] text-blanco-muted mt-2">Próximo nivel a los 2.000 pts</div>
                  </div>

                  {/* Stats */}
                  {clienteMatch ? (
                    <>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: 'Visitas', value: String(clienteMatch.visitas), color: 'var(--color-blanco-suave)' },
                          { label: 'Gasto total', value: fmt(clienteMatch.gastoTotal), color: 'var(--color-verde-ok)' },
                          { label: 'Última visita', value: diasDesde(clienteMatch.ultimaVisita), color: 'var(--color-blanco-muted)' },
                        ].map(({ label, value, color }) => (
                          <div key={label} className="rounded-xl p-3 text-center"
                            style={{ background: 'var(--color-violeta-card)', border: '1px solid var(--color-violeta-borde)' }}>
                            <div className="text-[8px] text-blanco-muted font-display tracking-widest uppercase mb-1">{label}</div>
                            <div className="text-xs font-bold" style={{ color }}>{value}</div>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-xl p-4"
                        style={{ background: 'var(--color-violeta-card)', border: '1px solid var(--color-violeta-borde)' }}>
                        <div className="text-[9px] text-blanco-muted font-display tracking-widest uppercase mb-2">Ticket promedio</div>
                        <div className="text-sm font-bold" style={{ color: 'var(--color-naranja)' }}>
                          {fmt(clienteMatch.ticketPromedio)} / visita
                        </div>
                        {clienteMatch.notas && (
                          <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-violeta-borde)' }}>
                            <div className="text-[9px] text-blanco-muted font-display tracking-widest uppercase mb-1">Notas del local</div>
                            <p className="text-[11px] text-blanco-suave">{clienteMatch.notas}</p>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="rounded-2xl p-6 text-center"
                      style={{ background: 'var(--color-violeta-card)', border: '1px dashed var(--color-violeta-borde)' }}>
                      <Star size={26} className="text-naranja mx-auto mb-3" />
                      <p className="text-sm text-blanco-suave font-semibold mb-1">¡Bienvenido/a!</p>
                      <p className="text-[11px] text-blanco-muted leading-relaxed">
                        Visitá el local y reservá para acumular puntos y ver tu historial aquí
                      </p>
                    </div>
                  )}

                  <a href={reservasHref[tenantId] ?? '#sec-reservas'} onClick={() => setOpen(false)}
                    className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl transition-all"
                    style={{ background: 'var(--color-naranja)', color: 'var(--color-violeta)' }}>
                    <span className="font-display text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
                      <Calendar size={13} /> Hacer una reserva
                    </span>
                    <ChevronRight size={14} />
                  </a>

                  <button onClick={logout}
                    className="flex items-center gap-2 text-[11px] text-blanco-muted hover:text-rojo-error transition-colors">
                    <LogOut size={14} /> Cerrar sesión
                  </button>
                </div>
              )}

              {/* ── LOGIN ── */}
              {view === 'login' && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-base font-bold text-blanco-suave mb-1">Iniciar sesión</h2>
                    <p className="text-[11px] text-blanco-muted">Accedé a tus puntos, historial y reservas</p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[9px] font-display tracking-widest uppercase text-blanco-muted block mb-1.5">
                        Email o teléfono
                      </label>
                      <input type="text" value={fId} onChange={e => setFId(e.target.value)}
                        placeholder="ejemplo@mail.com"
                        className="w-full bg-violeta-card border border-violeta-borde rounded-xl px-4 py-3 text-sm text-blanco-suave placeholder:text-blanco-muted/40 outline-none focus:border-naranja/50 transition-colors" />
                    </div>
                    <div>
                      <label className="text-[9px] font-display tracking-widest uppercase text-blanco-muted block mb-1.5">
                        Contraseña
                      </label>
                      <div className="relative">
                        <input type={showPw ? 'text' : 'password'} value={fPw} onChange={e => setFPw(e.target.value)}
                          placeholder="••••••"
                          onKeyDown={e => { if (e.key === 'Enter') login(); }}
                          className="w-full bg-violeta-card border border-violeta-borde rounded-xl px-4 py-3 text-sm text-blanco-suave placeholder:text-blanco-muted/40 outline-none focus:border-naranja/50 transition-colors pr-10" />
                        <button type="button" onClick={() => setShowPw(s => !s)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-blanco-muted hover:text-blanco-suave transition-colors">
                          {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  {error && <p className="text-[11px] font-semibold text-rojo-error">{error}</p>}
                  <button onClick={login}
                    className="w-full py-3.5 rounded-2xl font-display text-xs font-black tracking-[0.3em] uppercase transition-all"
                    style={{ background: 'var(--color-naranja)', color: 'var(--color-violeta)' }}>
                    INGRESAR
                  </button>
                  <button onClick={() => { setView('register'); reset(); }}
                    className="w-full text-center text-[11px] text-blanco-muted hover:text-blanco-suave transition-colors">
                    ¿No tenés cuenta? <span style={{ color: 'var(--color-naranja)' }}>Registrarse</span>
                  </button>
                </div>
              )}

              {/* ── REGISTER ── */}
              {view === 'register' && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-base font-bold text-blanco-suave mb-1">Crear cuenta</h2>
                    <p className="text-[11px] text-blanco-muted">Registrate para ver tus puntos e historial</p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[9px] font-display tracking-widest uppercase text-blanco-muted block mb-1.5">
                        Nombre
                      </label>
                      <input type="text" value={fNombre} onChange={e => setFNombre(e.target.value)}
                        placeholder="Tu nombre"
                        className="w-full bg-violeta-card border border-violeta-borde rounded-xl px-4 py-3 text-sm text-blanco-suave placeholder:text-blanco-muted/40 outline-none focus:border-naranja/50 transition-colors" />
                    </div>
                    <div>
                      <label className="text-[9px] font-display tracking-widest uppercase text-blanco-muted block mb-1.5">
                        Email o teléfono
                      </label>
                      <input type="text" value={fId} onChange={e => setFId(e.target.value)}
                        placeholder="ejemplo@mail.com"
                        className="w-full bg-violeta-card border border-violeta-borde rounded-xl px-4 py-3 text-sm text-blanco-suave placeholder:text-blanco-muted/40 outline-none focus:border-naranja/50 transition-colors" />
                    </div>
                    <div>
                      <label className="text-[9px] font-display tracking-widest uppercase text-blanco-muted block mb-1.5">
                        Contraseña
                      </label>
                      <div className="relative">
                        <input type={showPw ? 'text' : 'password'} value={fPw} onChange={e => setFPw(e.target.value)}
                          placeholder="Mínimo 6 caracteres"
                          onKeyDown={e => { if (e.key === 'Enter') register(); }}
                          className="w-full bg-violeta-card border border-violeta-borde rounded-xl px-4 py-3 text-sm text-blanco-suave placeholder:text-blanco-muted/40 outline-none focus:border-naranja/50 transition-colors pr-10" />
                        <button type="button" onClick={() => setShowPw(s => !s)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-blanco-muted hover:text-blanco-suave transition-colors">
                          {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  {error && <p className="text-[11px] font-semibold text-rojo-error">{error}</p>}
                  <button onClick={register}
                    className="w-full py-3.5 rounded-2xl font-display text-xs font-black tracking-[0.3em] uppercase transition-all"
                    style={{ background: 'var(--color-naranja)', color: 'var(--color-violeta)' }}>
                    CREAR CUENTA
                  </button>
                  <button onClick={() => { setView('login'); reset(); }}
                    className="w-full text-center text-[11px] text-blanco-muted hover:text-blanco-suave transition-colors">
                    ¿Ya tenés cuenta? <span style={{ color: 'var(--color-naranja)' }}>Iniciar sesión</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
