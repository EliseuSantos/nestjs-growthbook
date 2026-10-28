# nestjs-growthbook

A small NestJS module that wraps the [GrowthBook](https://www.growthbook.io/) JavaScript SDK (`@growthbook/growthbook`) so a NestJS app can read feature flags through dependency injection.

## Problem

The GrowthBook SDK is a plain class. In a NestJS app you would otherwise create the client by hand, pass it around, and remember to destroy it on shutdown. This module creates one client from the module options, exposes it as an injectable service, and calls `destroy()` when the application shuts down.

## Usage

Register the module once with static options:

```typescript
import { Module } from '@nestjs/common';
import { GrowthbookModule } from 'nestjs-growthbook';

@Module({
  imports: [
    GrowthbookModule.forRoot({
      apiHost: 'https://cdn.growthbook.io',
      clientKey: process.env.GROWTHBOOK_CLIENT_KEY,
    }),
  ],
})
export class AppModule {}
```

Inject the service with `@InjectGrowthbook()`:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectGrowthbook, GrowthbookService } from 'nestjs-growthbook';

@Injectable()
export class CheckoutService {
  constructor(@InjectGrowthbook() private readonly gb: GrowthbookService) {}

  isNewCheckoutOn(): boolean {
    return this.gb.isFeatureEnabled('new-checkout');
  }
}
```

`GrowthbookService` exposes:

| Method | Calls on the SDK |
| --- | --- |
| `isFeatureEnabled(key)` | `isOn(key)` |
| `getFeatureValue(key, default)` | `getFeatureValue(key, default)` |
| `setAttributes(attrs)` | `setAttributes(attrs)` |
| `runExperiment(experiment)` | `run(experiment)`, returns `result.value` |
| `instance()` | the underlying `GrowthBook` object |

There is one `GrowthBook` instance per application, so attributes set with `setAttributes` are shared by every caller. The options type is the SDK's own `Context` (`lib/growthbook.interfaces.ts`), so any option the SDK accepts can be passed through.

## Main technical decision

The module is a NestJS dynamic module with `forRoot` and `forRootAsync` (`lib/growthbook.module.ts`, `lib/growthbook-core.module.ts`). The options are a provider under the `GROWTHBOOK_MODULE_OPTIONS` symbol, and the service is a provider under the `GROWTHBOOK_TOKEN` symbol (`lib/growthbook.constants.ts`), so consumers depend on a token and a decorator, not on how the client is built. The service wraps a single `GrowthBook` instance and implements `OnApplicationShutdown` to destroy it (`lib/growthbook.service.ts`).

## Status

Not under active development. All releases (1.0.0 to 1.1.2 in `CHANGELOG.md`) are from July 2024. The package is no longer on npm, so use it from source: `pnpm install && pnpm build` produces `dist/`.

Known issues in the current code, not fixed:

- `forRootAsync` does not work with `@InjectGrowthbook()`. `GrowthbookModule.forRootAsync` registers the raw async options object as `GROWTHBOOK_MODULE_OPTIONS`, so the injected service is built without `apiHost` or `clientKey` and the SDK throws `Missing clientKey`. Use `forRoot` with values you already have.
- The service constructor logs its options with `console.log`, which includes `clientKey`.
- `init()` is not awaited, so flags read right after startup may still be unloaded and return their defaults.
- There are no tests (`jest --passWithNoTests`).

## License

MIT. See `LICENSE`.
