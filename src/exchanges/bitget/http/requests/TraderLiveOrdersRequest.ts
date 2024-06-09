import { HttpRequest } from 'src/exchanges/api/requests/httpRequest';
import { PRODUCT_TYPE } from '../utils/productType.interface';
import { TraderLiveOrderParams } from './traderLiveOrderParams';
import { SYMBOL } from 'src/shared/enums/symbol.enum';

export class TraderLiveOrdersRequest extends HttpRequest {
  endPoint = '/api/v2/copy/mix-broker/query-current-traces';
  params: TraderLiveOrderParams = {
    traderId: '',
    productType: PRODUCT_TYPE.USDT_FUTURES,
    endTime: '',
  };

  constructor(traderId: string, endTime = '', symbol?: SYMBOL) {
    super();
    this.params.traderId = traderId;

    // substracts 1 millisecond to avoid receiving last item in following request/page
    if (endTime != '')
      this.params.endTime = (+this.params.endTime! - 1).toString();

    this.params.endTime = endTime;

    if (symbol) this.params.symbol = symbol;
  }
}
