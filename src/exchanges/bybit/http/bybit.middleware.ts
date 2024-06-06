import { Injectable } from '@nestjs/common';
import { BybitService } from 'src/exchanges/bybit/http/bybit.service';
import { SIDE } from '../../api/side.enum';
import { DIR } from 'src/shared/enums/dir.enum';
import { IPositionInfo } from './responses/positionInfoResponse.interface';
import { isSYMBOL } from 'src/shared/utils/isSymbol.utils';
import { isSIDE } from '../utils/isSide.utils';
import isNumber from 'src/shared/utils/isNumber.utils';
import { map } from 'rxjs';
import { mapToCopyPositions } from './utils/mapToCopyPosition.utils';
import { ITargetPosition } from 'src/copy/targetPositions/targetPosition.interface';

/**
 *
 * Bybit middleware which transforms bybit data to code freeze data and vice verse
 *
 */
@Injectable()
export class BybitMiddleware {
  constructor(private readonly bybit: BybitService) {}

  async getUserLivePositions(): Promise<ITargetPosition[]> {
    const bybitPositions = await this.bybit.getUserLivePositions();
    const copyPositions: ITargetPosition[] = [];
    for (const p of bybitPositions) {
      const copyPosition: ITargetPosition = {
        symbol: p.symbol,
        dir: p.side == SIDE.BUY ? DIR.LONG : DIR.SHORT,
        liveQty: +p.size,
      };
      if (+p.size > 0) copyPositions.push(copyPosition);
    }
    return copyPositions;
  }

  getUserLivePositions$() {
    return this.bybit.getUserLivePositions$().pipe(map(mapToCopyPositions));
  }

  private isValid(position: IPositionInfo): boolean {
    if (position == null) return false;
    const symbolIsValid = isSYMBOL(position.symbol);
    const sideIsValid = isSIDE(position.side);
    const size = isNumber(position.size);
    return symbolIsValid && sideIsValid && size;
  }
}
