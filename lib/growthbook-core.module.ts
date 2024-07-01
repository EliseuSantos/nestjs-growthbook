import { Module, DynamicModule, Provider } from '@nestjs/common';
import { GrowthbookModuleOptions, GrowthbookModuleAsyncOptions } from './growthbook.interfaces';
import { GrowthbookService } from './growthbook.service';
import { GROWTHBOOK_MODULE_OPTIONS } from './growthbook.constants';

@Module({})
export class GrowthbookCoreModule {
  public static forRoot(options: GrowthbookModuleOptions): DynamicModule {
    const growthbookOptionsProvider: Provider = {
      provide: GROWTHBOOK_MODULE_OPTIONS,
      useValue: options,
    };

    return {
      module: GrowthbookCoreModule,
      providers: [growthbookOptionsProvider, GrowthbookService],
      exports: [GrowthbookService],
    };
  }

  public static forRootAsync(options: GrowthbookModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: GrowthbookCoreModule,
      imports: options.imports || [],
      providers: [...asyncProviders, GrowthbookService],
      exports: [GrowthbookService],
    };
  }

  private static createAsyncProviders(options: GrowthbookModuleAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: GROWTHBOOK_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ];
    }

    if (options.useClass) {
      return [
        {
          provide: GROWTHBOOK_MODULE_OPTIONS,
          useClass: options.useClass,
        },
      ];
    }

    if (options.useExisting) {
      return [
        {
          provide: GROWTHBOOK_MODULE_OPTIONS,
          useExisting: options.useExisting,
        },
      ];
    }

    return [];
  }
}
