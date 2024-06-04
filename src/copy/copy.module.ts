import { Module } from '@nestjs/common';
import { CopyService } from './copy.service';
import { ExchangeModule } from 'src/exchanges/sourceExchange.module';

@Module({
  imports: [ExchangeModule],
  providers: [CopyService],
  exports: [CopyService],
})
export class CopyModule {}
