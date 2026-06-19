import { mockClientes as islaClientes } from './mockClientes.isla';
import { mockClientes as cieloClientes } from './mockClientes.cielo';
import { mockClientes as cuartaClientes } from './mockClientes.cuarta';
import { mockMovimientosCaja as islaMovs, mockItemsVendidos as islaItems } from './mockMovimientosCaja.isla';
import { mockMovimientosCaja as cieloMovs, mockItemsVendidos as cieloItems } from './mockMovimientosCaja.cielo';
import { mockMovimientosCaja as cuartaMovs, mockItemsVendidos as cuartaItems } from './mockMovimientosCaja.cuarta';
import { mockReservas as islaReservas } from './mockReservas.isla';
import { mockReservas as cieloReservas } from './mockReservas.cielo';
import { mockReservas as cuartaReservas } from './mockReservas.cuarta';
import { Cliente, MovimientoCaja, Reserva, ItemVendido } from '../types/admin.types';

interface TenantMockData {
  clientes: Cliente[];
  movimientos: MovimientoCaja[];
  reservas: Reserva[];
  items: ItemVendido[];
}

const DATA: Record<string, TenantMockData> = {
  isla:   { clientes: islaClientes,   movimientos: islaMovs,   reservas: islaReservas,   items: islaItems },
  cielo:  { clientes: cieloClientes,  movimientos: cieloMovs,  reservas: cieloReservas,  items: cieloItems },
  cuarta: { clientes: cuartaClientes, movimientos: cuartaMovs, reservas: cuartaReservas, items: cuartaItems },
};

export function getMockData(): TenantMockData {
  const tenantId = new URLSearchParams(window.location.search).get('t') || 'isla';
  return DATA[tenantId] ?? DATA['isla'];
}
