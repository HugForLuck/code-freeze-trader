import { Module } from '@nestjs/common';
import { BybitService } from './bybit.service';
import { HttpModule } from '@nestjs/axios';
import { NTPService } from '../api/ntp.service';

@Module({
  imports: [HttpModule],
  providers: [BybitService, NTPService],
  exports: [BybitService],
})
export class BybitModule {}
