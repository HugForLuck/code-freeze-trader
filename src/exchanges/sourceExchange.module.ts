import { Module } from '@nestjs/common';
import { BybitModule } from './bybit/bybit.module';

@Module({
  imports: [BybitModule],
  exports: [BybitModule],
})
export class ExchangeModule {}
