[![npm version](http://img.shields.io/npm/v/nestjs-growthbook.svg?style=flat)](https://npmjs.org/package/nestjs-growthbook "View this project on npm")

<p align="center">
  <h3 align="center">
    nestjs-growthbook
  </h3>

  <p align="center">
    Provides an injectable growthbook.io client to provide feature-flag on nestjs
  </p>
</p>

## Table Of Contents

- [About](#about)
- [Installation](#installation)
- [Getting Started](#getting-started)

## About

`nestjs-growthbook` implements a module, `GrowthbookModule`, which when imported into
your nestjs project provides a Growthbook.io client to any class that injects it. This
lets Growthbook.io be worked into your dependency injection workflow without having to
do any extra work outside of the initial setup.

## Installation

```bash
[pnpm|yarn|npm] i nestjs-growthbook
```

## Getting Started

The simplest way to use `nestjs-growthbook` is to use `GrowthbookModule.forRoot`

```typescript
import { Module } from '@nestjs-common';
import { GrowthbookModule } from 'nestjs-growthbook';

@Module({
  imports: [
    GrowthbookModule.forRoot({
      apiHost: 'xxxxxxxxxx',
      clientKey: 'xxxxxxxxxx'
    }),
  ],
})
export class AppModule {}
```

The async way `nestjs-growthbook` is to use `GrowthbookModule.forRootAsync`

```typescript
import { Module } from '@nestjs/common';
import { GrowthbookModule } from 'nestjs-growthbook';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    GrowthbookModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg:ConfigService) => ({
        apiHost: cfg.get('GROWTHBOOK_HOST'),
        clientKey: cfg.get('GROWTHBOOK_KEY'),
      }),
      inject: [ConfigService],
    })
  ]
})

export class AppModule {}
```

You can then inject the Growthbook client into any of your injectables by using a
custom decorator

```typescript
import { Injectable } from '@nestjs/common';
import { InjectGrowthbook, GrowthbookService } from 'nestjs-growthbook';

@Injectable()
export class AppService {
  public constructor(@InjectGrowthbook() private readonly gb: GrowthbookService) {
      // gb.instance().isFeatureEnabled('key');
      // gb.instance().getFeatureValue('key');
      ... and more
  }
}
```
