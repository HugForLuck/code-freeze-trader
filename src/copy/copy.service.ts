import { Injectable } from '@nestjs/common';
import { BybitService } from 'src/exchanges/bybit/bybit.service';

@Injectable()
export class CopyService {
  constructor(private readonly bybit: BybitService) {}
  async copy() {
    await this.bybit.getUserLivePositions();
  }
}
