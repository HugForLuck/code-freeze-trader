import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NTPService } from '../api/ntp.service';
import { BybitMiddleware } from './http/bybit.service';
import { BybitWSService } from './websockets/bybitWebsocket.service';

@Module({
  imports: [HttpModule],
  providers: [BybitMiddleware, NTPService, BybitWSService],
  exports: [BybitMiddleware, BybitWSService],
})
export class BybitModule {}
