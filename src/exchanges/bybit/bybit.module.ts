import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NTPService } from '../api/ntp.service';
import { Bybit } from './bybit.service';
import { BybitWSService } from './websockets/bybitWebsocket.service';
import { BybitHttpService } from './http/bybitHttp.service';

@Module({
  imports: [HttpModule],
  providers: [Bybit, BybitHttpService, NTPService, BybitWSService],
  exports: [Bybit, BybitWSService],
})
export class BybitModule {}
