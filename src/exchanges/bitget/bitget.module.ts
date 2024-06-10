import { Module } from '@nestjs/common';
import { Bitget } from './http/bitget.service';
import { HttpModule } from '@nestjs/axios';
import { NTPService } from '../api/ntp.service';

@Module({
  imports: [HttpModule],
  providers: [Bitget, NTPService],
  exports: [Bitget],
})
export class BitgetModule {}
