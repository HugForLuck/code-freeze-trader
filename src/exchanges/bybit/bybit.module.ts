import { Module } from '@nestjs/common';
import { BybitService } from './http/bybit.service';
import { HttpModule } from '@nestjs/axios';
import { NTPService } from '../api/ntp.service';
import { BybitClientService } from './http/bybitClient.service';
import { BybitMiddleware } from './http/bybit.middleware';

@Module({
  imports: [HttpModule],
  providers: [BybitMiddleware, BybitService, BybitClientService, NTPService],
  exports: [BybitMiddleware],
})
export class BybitModule {}
