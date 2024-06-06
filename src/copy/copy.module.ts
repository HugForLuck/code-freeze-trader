import { Module } from '@nestjs/common';
import { CopyPositionService } from './copyPosition.service';
import { BybitModule } from 'src/exchanges/bybit/bybit.module';
import { CopyPositionStore } from './copyPosition.store';
import { DBModule } from 'src/db/db.module';

@Module({
  imports: [BybitModule, DBModule],
  providers: [CopyPositionService, CopyPositionStore],
  exports: [CopyPositionService],
})
export class CopyModule {}
