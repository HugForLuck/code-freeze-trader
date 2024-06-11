import { DIR } from 'src/shared/enums/dir.enum';
import { SYMBOL } from 'src/shared/enums/symbol.enum';
import { IPosition } from '../position.interface';
import { Copy } from '../copy.entity';
import { OriginPosition } from '../origin/originPosition.entity';
import { Strategy } from '../strategies/strategy.entity';
import Decimal from 'decimal.js';

export class OpenOrder {
  symbol: SYMBOL;
  dir: DIR;
  qty = '0';

  constructor(
    symbolDir: IPosition,
    originPos: OriginPosition,
    isBetter: boolean,
    strategy: Strategy | null = null,
    copy?: Copy,
  ) {
    if (copy === undefined || strategy === null || !isBetter) return;
    this.symbol = symbolDir.symbol;
    this.dir = symbolDir.dir;
    this.setQty(originPos, strategy);
  }

  private setQty(originPos: OriginPosition, strategy: Strategy) {
    const traderRatio = this.getTraderRatio(originPos, strategy);
    // this.qty = this.getOrderQty(position, traderRatio);
  }

  // TODO needs to be properly tested
  private getTraderRatio(pos: OriginPosition, strategy: Strategy) {
    Decimal.set({ rounding: Decimal.ROUND_DOWN, precision: 1 });
    const liveOrders = new Decimal(pos.traderLiveOrders ?? 0);
    const maxOrders = new Decimal(strategy.maxOrders ?? 0);
    const traderRatio = liveOrders.div(maxOrders);
    return traderRatio.greaterThan(1) ? 1 : traderRatio;
  }
}
