import { HttpRequest } from 'src/exchanges/api/requests/httpRequest';
import { SYMBOL } from 'src/shared/enums/symbol.enum';

export class TickerRequest extends HttpRequest {
  endPoint = '/v5/market/tickers';
  params = {
    category: 'linear',
    symbol: SYMBOL.NONE,
  };

  constructor(symbol: SYMBOL) {
    super();
    this.params.symbol = symbol;
  }
}
