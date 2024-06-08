import { Module } from '@nestjs/common';
import { CopyService } from './copy.service';
import { CopyStore } from './CopyStore';
import { DBModule } from 'src/db/db.module';
import { ExchangeModule } from 'src/exchanges/sourceExchange.module';

@Module({
  imports: [ExchangeModule, DBModule],
  providers: [CopyService, CopyStore],
  exports: [CopyService],
})
export class CopyModule {}
