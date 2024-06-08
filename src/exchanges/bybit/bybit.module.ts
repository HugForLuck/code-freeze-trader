import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NTPService } from '../api/ntp.service';
import { BybitMiddleware } from './http/bybit.service';
import { BybitTickerService } from './websockets/bybitWebsocket.service';

@Module({
  imports: [HttpModule],
  providers: [BybitMiddleware, NTPService, BybitTickerService],
  exports: [BybitMiddleware, BybitTickerService],
})
export class BybitModule {}
