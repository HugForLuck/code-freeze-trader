import { Injectable } from '@nestjs/common';
import { BitgetApiService } from './bitgetApi.service';
import { ITraderLiveOrder } from './responses/traderLiveOrder.interface';
import { Trader } from 'src/copy/trader/trader.entity';
import { AllowedSymbols } from 'src/copy/copy.config';
import { OriginPosition } from 'src/copy/originPosition.ts/originPosition.entity';
import { SYMBOL } from 'src/shared/enums/symbol.enum';
import { DIRS } from 'src/shared/consts/dirs';

@Injectable()
export class Bitget extends BitgetApiService {
  async getTraderLivePositions(
    trader: Trader,
    symbol?: SYMBOL,
  ): Promise<OriginPosition[]> {
    const orders = await this.getLiveOrdersByTrader(trader);
    const symbols = symbol ? [symbol] : AllowedSymbols;
    const pos = symbols
      .map((symbol) =>
        DIRS.map((dir) => new OriginPosition(trader, symbol, dir, orders)),
      )
      .flat()
      .flat();
    const livePositions = pos.filter((p) => p.traderLiveOrders ?? 0 > 0);
    return livePositions;
  }

  private async getLiveOrdersByTrader(
    trader: Trader,
  ): Promise<ITraderLiveOrder[]> {
    let endTime = '';
    const orders: ITraderLiveOrder[] = [];

    while (true) {
      const requestOrders = await this.getAPITraderLiveOrders(trader, endTime);
      if (requestOrders.length == 0) break;
      endTime = this.getLastOrderOpenTime(requestOrders);
      orders.push(...requestOrders);
      if (requestOrders.length < 20) break;
    }
    return orders;
  }

  private getLastOrderOpenTime(orders: ITraderLiveOrder[]) {
    orders.sort((o1, o2) => +o2.openTime - +o1.openTime);
    if (orders.length == 0) return '';
    const lastOrder = orders.at(-1);

    return this.getOpenTime(lastOrder);
  }

  private getOpenTime(order?: ITraderLiveOrder) {
    const openTime = order?.openTime || '';
    if (!openTime) {
      console.log(order);
      throw Error(`openTime not a property of order`);
    }
    return openTime;
  }
}
