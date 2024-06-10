import { IBybitRequest } from './request.interface';
import { TICKER_SYMBOLS } from './utils/tickerSymbols';

export function unsubscribePublic(): IBybitRequest<any> {
  return {
    req_id: 'ticker',
    op: 'unsubscribe',
    args: TICKER_SYMBOLS,
  };
}
