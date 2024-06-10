import { SYMBOL } from 'src/shared/enums/symbol.enum';
import { IBybitRequest } from './request.interface';

export function subscribePublic(): IBybitRequest<any> {
  return {
    op: 'subscribe',
    args: [`tickers.${SYMBOL.BTCUSDT}`, `tickers.${SYMBOL.ETHUSDT}`],
  };
}
