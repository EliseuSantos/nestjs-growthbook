import { GROWTHBOOK_MODULE_OPTIONS, GROWTHBOOK_TOKEN } from './growthbook.constants';
import { Inject } from '@nestjs/common';

export const InjectGrowthbook = () => Inject(GROWTHBOOK_TOKEN);

/**
 * Injects the Growthbook Module config
 */
export const InjectGrowthbookModuleConfig = Inject(
  GROWTHBOOK_MODULE_OPTIONS,
);
