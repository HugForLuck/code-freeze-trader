import { Module } from '@nestjs/common';
import { BybitService } from './bybit.service';
import { HttpModule } from '@nestjs/axios';
import { NTPService } from '../api/ntp.service';
import { BybitClientService } from './bybitClient.service';
import { BybitMiddleware } from './bybit.middleware';

@Module({
  imports: [HttpModule],
  providers: [BybitMiddleware, BybitService, BybitClientService, NTPService],
  exports: [BybitMiddleware],
})
export class BybitModule {}
