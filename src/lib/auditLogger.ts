export interface AuditEntry {
  id: string;
  timestamp: string;
  usuario: string;
  rol: string;
  accion: string;
  entidad: string;
  detalle: string;
}

export function logAudit(tenantNombre: string, entry: Omit<AuditEntry, 'id' | 'timestamp'>) {
  try {
    const KEY = `panel-auditoria-${tenantNombre}`;
    const logs: AuditEntry[] = JSON.parse(localStorage.getItem(KEY) || '[]');
    logs.unshift({ id: `a${Date.now()}`, timestamp: new Date().toISOString(), ...entry });
    if (logs.length > 500) logs.splice(500);
    localStorage.setItem(KEY, JSON.stringify(logs));
  } catch { /* skip */ }
}

export function getAuditLog(tenantNombre: string): AuditEntry[] {
  try {
    return JSON.parse(localStorage.getItem(`panel-auditoria-${tenantNombre}`) || '[]');
  } catch { return []; }
}
