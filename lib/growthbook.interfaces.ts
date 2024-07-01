import { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import { Context } from "@growthbook/growthbook"

export interface GrowthbookCloseOptions {}

export type GrowthbookModuleOptions = Omit<Context, 'x'>;

export interface GrowthbookOptionsFactory {
    createGrowthbookModuleOptions(): Promise<GrowthbookModuleOptions> | GrowthbookModuleOptions;
}

export interface GrowthbookModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useClass?: Type<GrowthbookOptionsFactory>;
    useExisting?: Type<GrowthbookOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<GrowthbookModuleOptions> | GrowthbookModuleOptions;
}

export interface GrowthbookFilterFunction {
    (exception:any): boolean
}

export interface GrowthbookInterceptorOptionsFilter {
    type: any;
    filter?: GrowthbookFilterFunction;
}