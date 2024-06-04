import { Injectable } from '@nestjs/common';
import { ICopyPosition } from 'src/copyPosition/copyPosition.interface';
import { BybitService } from 'src/exchanges/bybit/bybit.service';
import { SIDE } from '../api/side.enum';
import { DIR } from 'src/shared/enums/dir.enum';

/**
 *
 * Bybit middleware is used to map bybit objects to code freeze unified types
 *
 */
@Injectable()
export class BybitMiddleware {
  constructor(private readonly bybit: BybitService) {}

  async getUserLivePositions() {
    const bybitPositions = await this.bybit.getUserLivePositions();
    const copyPositions: ICopyPosition[] = [];
    for (const p of bybitPositions) {
      const copyPosition: ICopyPosition = {
        symbol: p.symbol,
        dir: p.side == SIDE.BUY ? DIR.LONG : DIR.SHORT,
        liveQty: +p.size,
      };
      if (+p.size > 0) copyPositions.push(copyPosition);
    }
    return copyPositions;
  }
}
