import { SYMBOL } from 'src/shared/enums/symbol.enum';
import { IBybitRequest } from './request.interface';

export function unSubscribePublic(): IBybitRequest {
  return {
    op: 'unsubscribe',
    args: [`tickers.${SYMBOL.BTCUSDT}`, `tickers.${SYMBOL.ETHUSDT}`],
  };
}
