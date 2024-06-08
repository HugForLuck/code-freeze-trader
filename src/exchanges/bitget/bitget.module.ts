import { Module } from '@nestjs/common';
import { BitgetMiddleware } from './http/bitget.service';
import { HttpModule } from '@nestjs/axios';
import { NTPService } from '../api/ntp.service';

@Module({
  imports: [HttpModule],
  providers: [BitgetMiddleware, NTPService],
  exports: [BitgetMiddleware],
})
export class BitgetModule {}
