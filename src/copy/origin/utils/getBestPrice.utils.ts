import { ITraderLiveOrder } from 'src/exchanges/bitget/http/responses/traderLiveOrder.interface';
import { DIR } from 'src/shared/enums/dir.enum';
import { OriginPosition } from '../originPosition.entity';

export function getBestPriceByOrders(orders: ITraderLiveOrder[], dir: DIR) {
  if (orders.length == 0) return '';
  orders.sort((a, b) => +a.openPriceAvg - +b.openPriceAvg);
  const bestPriceIndex = dir === DIR.LONG ? 0 : -1;
  const bestPriceOrder = orders.at(bestPriceIndex);
  return bestPriceOrder ? bestPriceOrder.openPriceAvg : '';
}

export function getBestPriceByPositions(
  p: OriginPosition[],
): OriginPosition | undefined {
  if (p.length == 0) return undefined;
  p.sort((a, b) => +a.traderBestPrice - +b.traderBestPrice);
  const bestPriceIndex = p[0].dir === DIR.LONG ? 0 : -1;
  const bestPriceOrder = p.at(bestPriceIndex);
  return bestPriceOrder;
}
