import { Module } from '@nestjs/common';
import { BybitService } from './bybit.service';
import { HttpModule } from '@nestjs/axios';
import { NTPService } from '../api/ntp.service';
import { BybitClientService } from './bybitClient.service';

@Module({
  imports: [HttpModule],
  providers: [BybitService, BybitClientService, NTPService],
  exports: [BybitService],
})
export class BybitModule {}
