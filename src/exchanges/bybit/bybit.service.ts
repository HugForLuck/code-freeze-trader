import { Injectable } from '@nestjs/common';
import { SIDE } from '../api/side.enum';
import { DIR } from 'src/shared/enums/dir.enum';
import { IPositionInfo } from './http/responses/positionInfoResponse.interface';
import { isSYMBOL } from 'src/shared/utils/isSymbol.utils';
import { isSIDE } from './utils/isSide.utils';
import isNumber from 'src/shared/utils/isNumber.utils';
import { TargetPosition } from 'src/copy/targetPositions/targetPosition.entity';
import { TARGET_EXCHANGE } from 'src/copy/targetExchange.enum';
import { BybitHttpService } from './http/bybitHttp.service';
import { BybitWSService } from './websockets/bybitWebsocket.service';
import { filter, retry, tap } from 'rxjs';

/**
 *
 * Bybit middleware which transforms bybit data to code freeze data and vice verse
 *
 */
@Injectable()
export class Bybit {
  constructor(
    private readonly http: BybitHttpService,
    private readonly ws: BybitWSService,
  ) {}

  async getTargetPositions(): Promise<TargetPosition[]> {
    const bybitPositions = await this.http.getUserLivePositions();
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

  getUserLivePositions$() {
    return this.ws.getLivePositions$().pipe(
      filter((pos) => pos !== undefined),
      retry(),
      tap(console.log),
    );
  }

  getLivePrice$() {
    return this.ws.getLivePrice$();
  }

  private isValid(position: IPositionInfo): boolean {
    if (position == null) return false;
    const symbolIsValid = isSYMBOL(position.symbol);
    const sideIsValid = isSIDE(position.side);
    const size = isNumber(position.size);
    return symbolIsValid && sideIsValid && size;
  }
}
