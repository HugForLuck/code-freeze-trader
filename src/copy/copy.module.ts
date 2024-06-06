import { Module } from '@nestjs/common';
import { CopyService } from './copy.service';
import { BybitModule } from 'src/exchanges/bybit/bybit.module';
import { CopyStore } from './copy.store';
import { DBModule } from 'src/db/db.module';

@Module({
  imports: [BybitModule, DBModule],
  providers: [CopyService, CopyStore],
  exports: [CopyService],
})
export class CopyModule {}
