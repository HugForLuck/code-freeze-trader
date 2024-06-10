import { Injectable } from '@nestjs/common';
import { TargetPosition } from 'src/copy/targetPositions/targetPosition.entity';
import { TARGET_EXCHANGE } from 'src/copy/targetExchange.enum';
import { BybitHttpService } from './http/bybitHttp.service';
import { BybitWSService } from './websockets/bybitWebsocket.service';
import { filter, map, retry } from 'rxjs';
import { IBybitPosition } from './websockets/response/position.interface';
import { toSymbol } from 'src/shared/utils/toSymbol.utils';
import { IPosition } from 'src/copy/position.interface';
import { getDir } from './utils/getDir.utils';

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

  async getUserLivePositions(): Promise<TargetPosition[]> {
    const bybitPositions = await this.http.getUserLivePositions();
    const targetPositions: TargetPosition[] = [];
    for (const p of bybitPositions) {
      const dir = getDir(p.side);
      const target = TARGET_EXCHANGE.BYBIT;
      const targetPosition = new TargetPosition(p.symbol, dir, target, p.size);
      if (+p.size > 0) targetPositions.push(targetPosition);
    }
    return targetPositions;
  }

  getUserLivePositions$() {
    return this.ws.getUserLivePositions$().pipe(
      filter((pos) => pos !== undefined),
      map((pos: IBybitPosition[]): IPosition[] =>
        pos.map<IPosition>((p) => ({
          symbol: toSymbol(p.symbol),
          dir: getDir(p.side),
          liveQty: p.size,
        })),
      ),
      retry(),
    );
  }

  getLivePrices$() {
    return this.ws.getLivePrices$();
  }
}
