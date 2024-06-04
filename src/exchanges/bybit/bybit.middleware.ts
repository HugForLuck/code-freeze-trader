import { Injectable } from '@nestjs/common';
import { BybitService } from 'src/exchanges/bybit/bybit.service';

/**
 *
 * Bybit middleware is used to map bybit objects to code freeze unified types
 *
 */
@Injectable()
export class BybitMiddleware {
  constructor(private readonly bybit: BybitService) {}

  async getUserLivePositions() {
    const response = await this.bybit.getUserLivePositions();
    console.log(response);
  }
}
