import { Module } from '@nestjs/common';
import { BybitModule } from './bybit/bybit.module';
import { BitgetModule } from './bitget/bitget.module';

@Module({
  imports: [BybitModule, BitgetModule],
  exports: [BybitModule, BitgetModule],
})
export class ExchangeModule {}
