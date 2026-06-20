import { useState } from 'react';
import { Clock, User, Shield, RefreshCcw } from 'lucide-react';
import { getConfig } from '../../config/active';
import { getAuditLog, AuditEntry } from '../../lib/auditLogger';

type Periodo = 'hoy' | 'semana' | 'todo';

const ACCION_CONFIG: Record<string, { emoji: string; color: string }> = {
  cambio_estado:    { emoji: '🔄', color: 'var(--color-amarillo-alerta)' },
  nuevo_movimiento: { emoji: '💰', color: 'var(--color-verde-ok)' },
  editar_carta:     { emoji: '📝', color: 'var(--color-naranja)' },
  nueva_foto:       { emoji: '🖼️', color: 'var(--color-naranja)' },
  eliminar_foto:    { emoji: '🗑️', color: 'var(--color-rojo-error)' },
  eliminar_item:    { emoji: '🗑️', color: 'var(--color-rojo-error)' },
  login:            { emoji: '🔐', color: 'var(--color-verde-ok)' },
};

function filterByPeriodo(logs: AuditEntry[], periodo: Periodo): AuditEntry[] {
  const now = new Date();
  if (periodo === 'todo') return logs;
  const cutoff = new Date(now);
  if (periodo === 'hoy') {
    cutoff.setHours(0, 0, 0, 0);
  } else {
    cutoff.setDate(now.getDate() - 7);
    cutoff.setHours(0, 0, 0, 0);
  }
  return logs.filter(e => new Date(e.timestamp) >= cutoff);
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  const hoy = new Date();
  const esHoy = d.toDateString() === hoy.toDateString();
  if (esHoy) return d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' }) + ' · ' +
    d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
}

export default function TabAuditoria() {
  const tc = getConfig();
  const [periodo, setPeriodo] = useState<Periodo>('semana');
  const [logs, setLogs] = useState<AuditEntry[]>(() => getAuditLog(tc.nombre));

  const refresh = () => setLogs(getAuditLog(tc.nombre));
  const filtered = filterByPeriodo(logs, periodo);

  const PERIODOS: { id: Periodo; label: string }[] = [
    { id: 'hoy', label: 'Hoy' }, { id: 'semana', label: 'Semana' }, { id: 'todo', label: 'Todo' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xs font-black tracking-[0.3em] text-naranja uppercase">Historial de Cambios</h2>
          <p className="text-[11px] text-blanco-muted mt-0.5">Registro de quién hizo qué y cuándo.</p>
        </div>
        <button onClick={refresh} className="p-2 text-blanco-muted hover:text-naranja transition-colors rounded-lg hover:bg-naranja/10">
          <RefreshCcw size={15} />
        </button>
      </div>

      {/* Filtro período */}
      <div className="flex gap-1 bg-violeta-card border border-violeta-borde rounded-lg p-1 w-fit mb-6">
        {PERIODOS.map(p => (
          <button key={p.id} onClick={() => setPeriodo(p.id)}
            className={`px-4 py-1.5 rounded text-[11px] font-display font-black tracking-widest uppercase transition-all ${
              periodo === p.id ? 'bg-naranja text-violeta' : 'text-blanco-muted hover:text-blanco-suave'
            }`}>
            {p.label}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="bg-violeta-card border border-violeta-borde rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-violeta-borde">
          <span className="font-display text-xs font-black tracking-[0.3em] text-naranja uppercase">
            {filtered.length} evento{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-blanco-muted">
            <Clock size={36} className="mx-auto mb-3 opacity-20" />
            <p className="font-display text-xs tracking-widest uppercase">Sin actividad en este período</p>
            <p className="text-[11px] mt-2 text-blanco-muted/50">Los cambios en reservas, caja y carta quedarán registrados acá.</p>
          </div>
        ) : (
          <div className="divide-y divide-violeta-borde">
            {filtered.map(entry => {
              const config = ACCION_CONFIG[entry.accion] || { emoji: '📌', color: 'var(--color-blanco-muted)' };
              return (
                <div key={entry.id} className="px-6 py-4 flex items-start gap-4 hover:bg-violeta-medio/20 transition-colors">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
                    style={{ background: `${config.color}12`, border: `1px solid ${config.color}25` }}>
                    {config.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-sm font-semibold text-blanco-suave">{entry.detalle}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1 text-[10px] text-blanco-muted">
                        <User size={10} /> {entry.usuario}
                      </span>
                      <span className="flex items-center gap-1 text-[9px] font-display font-black tracking-widest uppercase px-1.5 py-0.5 rounded"
                        style={{
                          background: entry.rol === 'dueno' ? 'var(--color-naranja)15' : 'var(--color-verde-ok)12',
                          color: entry.rol === 'dueno' ? 'var(--color-naranja)' : 'var(--color-verde-ok)',
                        }}>
                        <Shield size={8} /> {entry.rol === 'dueno' ? 'Dueño' : 'Empleado'}
                      </span>
                      <span className="text-[10px] text-blanco-muted/50 ml-auto flex items-center gap-1">
                        <Clock size={10} /> {formatTime(entry.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
