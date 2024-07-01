import { Provider } from '@nestjs/common';
import { GrowthbookModuleOptions } from './growthbook.interfaces';
import { GROWTHBOOK_TOKEN } from './growthbook.constants';
import { GrowthbookService } from './growthbook.service';

export function createGrowthbookProviders(options: GrowthbookModuleOptions) : Provider {
    return {
        provide: GROWTHBOOK_TOKEN,
        useValue: new GrowthbookService(options),
    }
}