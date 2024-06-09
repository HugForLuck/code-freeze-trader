import { Trader } from 'src/copy/trader/trader.entity';
import { BitgetHttpService } from './bitgetHttp.service';
import { TraderLiveOrdersRequest } from './requests/TraderLiveOrdersRequest';
import { SYMBOL } from 'src/shared/enums/symbol.enum';
import { validateBitgetResponse } from './responses/validateBitgetResponse.utils';

export abstract class BitgetApiService extends BitgetHttpService {
  protected async getAPITraderLiveOrders(
    trader: Trader,
    endTime = '',
    symbol?: SYMBOL,
  ): Promise<any> {
    const request = new TraderLiveOrdersRequest(
      trader.traderId,
      endTime,
      symbol,
    );
    const response = await this.get<any>(request);
    return validateBitgetResponse(response, request);
  }
}
