import { SYMBOL } from 'src/shared/enums/symbol.enum';
import { IBybitRequest } from './request.interface';

export function subscribeTicker(): IBybitRequest {
  return {
    op: 'subscribe',
    args: [`tickers.${SYMBOL.BTCUSDT}`, `tickers.${SYMBOL.ETHUSDT}`],
  };
}
