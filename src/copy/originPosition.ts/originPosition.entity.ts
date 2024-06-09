import { DIR } from 'src/shared/enums/dir.enum';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ORIGIN_EXCHANGE } from '../originExchange.enum';
import { Trader } from '../trader/trader.entity';
import { SYMBOL } from 'src/shared/enums/symbol.enum';
import { ITraderLiveOrder } from 'src/exchanges/bitget/http/responses/traderLiveOrder.interface';

@Entity({ name: 'origin_positions' })
export class OriginPosition {
  constructor(
    trader: Trader,
    symbol: SYMBOL,
    dir: DIR,
    orders: ITraderLiveOrder[] = [],
    originExchange = ORIGIN_EXCHANGE.BITGET,
  ) {
    this.trader = trader;
    this.symbol = symbol;
    this.dir = dir;
    this.originExchange = originExchange;
    const posOrders = this.filterOrders(orders);
    this.traderLiveOrders = posOrders.length;
    this.traderBestPrice = this.getBestPrice(posOrders, this.dir);
  }

  @PrimaryColumn()
  symbol: SYMBOL;

  @PrimaryColumn()
  dir: DIR;

  @PrimaryColumn()
  originExchange: ORIGIN_EXCHANGE;

  @ManyToOne(() => Trader, { eager: true })
  trader: Trader | null = null;

  traderLiveOrders: number | null;

  traderBestPrice: number | null;

  private filterOrders(orders: ITraderLiveOrder[]) {
    return orders.filter(
      (order) => order.symbol == this.symbol && order.posSide == this.dir,
    );
  }

  private getBestPrice(orders: ITraderLiveOrder[], dir: DIR) {
    if (orders.length == 0) return 0;
    orders.sort((a, b) => +a.openPriceAvg - +b.openPriceAvg);
    const bestPriceIndex = dir === DIR.LONG ? 0 : -1;
    const bestPriceOrder = orders.at(bestPriceIndex);
    return bestPriceOrder ? +bestPriceOrder.openPriceAvg : 0;
  }
}
