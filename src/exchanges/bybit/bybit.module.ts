import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NTPService } from '../api/ntp.service';
import { BybitMiddleware } from './http/bybit.service';

@Module({
  imports: [HttpModule],
  providers: [BybitMiddleware, NTPService],
  exports: [BybitMiddleware],
})
export class BybitModule {}
