import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { GrowthBook, Experiment } from '@growthbook/growthbook';
import { GROWTHBOOK_MODULE_OPTIONS } from './growthbook.constants';
import { GrowthbookModuleOptions } from './growthbook.interfaces';

@Injectable()
export class GrowthbookService implements OnApplicationShutdown {
  private growthbook: GrowthBook;

  constructor(
    @Inject(GROWTHBOOK_MODULE_OPTIONS)
    private readonly opts: GrowthbookModuleOptions,
  ) {
    console.log({
      apiHost: opts.apiHost,
      clientKey: opts.clientKey,
      ...opts
    })
    this.growthbook = new GrowthBook({
      apiHost: opts.apiHost,
      clientKey: opts.clientKey,
      ...opts
    })
    this.growthbook.init();

  }

  async onApplicationShutdown(signal?: string) {
    this.growthbook.destroy()
  }

  setAttributes(data: any) {
    this.growthbook.setAttributes(data);
  }

  instance() {
    return this.growthbook;
  }

  async runExperiment<T>(experiment: Experiment<T>): Promise<any> {
    const result = await this.growthbook.run(experiment);
    return result.value;
  }

  isFeatureEnabled(featureKey: string): boolean {
    return this.growthbook.isOn(featureKey);
  }

  getFeatureValue<T>(featureKey: string, defaultValue: T): any {
    return this.growthbook.getFeatureValue(featureKey, defaultValue);
  }
}
