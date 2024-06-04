import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class SourceExchangeModule {
  static register(): DynamicModule {
    return {
      module: SourceExchangeModule,
    };
  }
}
