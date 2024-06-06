import { Module } from '@nestjs/common';
import { CopyPositionService } from './copyPosition.service';
import { BybitModule } from 'src/exchanges/bybit/bybit.module';
import { CopyPositionStore } from './copyPosition.store';

@Module({
  imports: [BybitModule],
  providers: [CopyPositionService, CopyPositionStore],
  exports: [CopyPositionService],
})
export class CopyModule {}
