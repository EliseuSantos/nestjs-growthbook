import { Module, DynamicModule, Provider } from '@nestjs/common';
import { GrowthbookCoreModule } from './growthbook-core.module';
import { GrowthbookModuleOptions, GrowthbookModuleAsyncOptions } from './growthbook.interfaces';
import { GROWTHBOOK_TOKEN, GROWTHBOOK_MODULE_OPTIONS } from './growthbook.constants';
import { GrowthbookService } from './growthbook.service';

@Module({
  providers: [
    {
      provide: GROWTHBOOK_TOKEN,
      useClass: GrowthbookService,
    },
  ],
  exports: [GROWTHBOOK_TOKEN, GROWTHBOOK_MODULE_OPTIONS],
})
export class GrowthbookModule {
  static forRoot(options: GrowthbookModuleOptions): DynamicModule {
    const growthbookOptionsProvider: Provider = {
      provide: GROWTHBOOK_MODULE_OPTIONS,
      useValue: options,
    };

    const growthbookProvider: Provider = {
      provide: GROWTHBOOK_TOKEN,
      useClass: GrowthbookService,
    };

    return {
      module: GrowthbookModule,
      imports: [GrowthbookCoreModule.forRoot(options)],
      providers: [growthbookOptionsProvider, growthbookProvider],
      exports: [growthbookProvider],
    };
  }

  static forRootAsync(options: GrowthbookModuleAsyncOptions): DynamicModule {
    const growthbookOptionsProvider: Provider = {
      provide: GROWTHBOOK_MODULE_OPTIONS,
      useValue: options,
    };
    const growthbookProvider: Provider = {
      provide: GROWTHBOOK_TOKEN,
      useClass: GrowthbookService,
    };

    return {
      module: GrowthbookModule,
      imports: [GrowthbookCoreModule.forRootAsync(options)],
      providers: [growthbookOptionsProvider, growthbookProvider],
      exports: [growthbookProvider],
    };
  }
}
