import { Injectable } from '@nestjs/common';
import { SIDE } from '../../api/side.enum';
import { DIR } from 'src/shared/enums/dir.enum';
import { IPositionInfo } from './responses/positionInfoResponse.interface';
import { isSYMBOL } from 'src/shared/utils/isSymbol.utils';
import { isSIDE } from '../utils/isSide.utils';
import isNumber from 'src/shared/utils/isNumber.utils';
import { TargetPosition } from 'src/copy/targetPositions/targetPosition.entity';
import { TARGET_EXCHANGE } from 'src/copy/targetExchange.enum';
import { BybitApiService } from './bybitApi.service';

/**
 *
 * Bybit middleware which transforms bybit data to code freeze data and vice verse
 *
 */
@Injectable()
export class BybitMiddleware extends BybitApiService {
  async getTargetPositions(): Promise<TargetPosition[]> {
    const bybitPositions = await this.getAPIUserLivePositions();
    const targetPositions: TargetPosition[] = [];
    for (const p of bybitPositions) {
      const dir = p.side == SIDE.BUY ? DIR.LONG : DIR.SHORT;
      const liveQty = +p.size;
      const target = TARGET_EXCHANGE.BYBIT;
      const targetPosition = new TargetPosition(p.symbol, dir, target, liveQty);
      if (+p.size > 0) targetPositions.push(targetPosition);
    }
    return targetPositions;
  }

  private isValid(position: IPositionInfo): boolean {
    if (position == null) return false;
    const symbolIsValid = isSYMBOL(position.symbol);
    const sideIsValid = isSIDE(position.side);
    const size = isNumber(position.size);
    return symbolIsValid && sideIsValid && size;
  }
}
