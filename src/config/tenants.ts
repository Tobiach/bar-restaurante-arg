import { islaConfig } from './tenants/isla';
import { cuartaConfig } from './tenants/cuarta';
import { cieloConfig } from './tenants/cielo';

export const configs: Record<string, typeof islaConfig> = {
  isla:   islaConfig,
  cuarta: cuartaConfig as unknown as typeof islaConfig,
  cielo:  cieloConfig  as unknown as typeof islaConfig,
};
