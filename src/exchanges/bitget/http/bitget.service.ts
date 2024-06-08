import { Injectable } from '@nestjs/common';
import { BitgetApiService } from './bitgetApi.service';
import { ITraderLiveOrder } from './responses/traderLiveOrder';
import { Trader } from 'src/copy/trader/trader.entity';

@Injectable()
export class BitgetMiddleware extends BitgetApiService {
  async getTraderLivePositions(trader: Trader): Promise<any> {
    const orders = await this.getLiveOrdersByTrader(trader);
    console.log(orders);
    // TODO convert requestOrders into TargetPosition[]
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
    const lastOrder = orders.at(0);

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
