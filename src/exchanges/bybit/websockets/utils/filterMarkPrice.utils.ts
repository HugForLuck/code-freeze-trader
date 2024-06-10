import { MonoTypeOperatorFunction, filter } from 'rxjs';
import { IBybitRequest } from '../request.interface';
import { AllowedSymbols } from 'src/copy/copy.config';
import { ITicker } from '../response/ticker.interface';

export function filterMarkPrice(): MonoTypeOperatorFunction<
  IBybitRequest<ITicker>
> {
  return filter((message) => isTicker(message) && hasMarkPrice(message));
}

function isTicker(request: IBybitRequest<ITicker>) {
  const tickers = AllowedSymbols.map((s) => 'tickers.' + s);
  return tickers.includes(request?.topic ?? '');
}

function hasMarkPrice(request: IBybitRequest<ITicker>) {
  return request.data?.markPrice != null;
}
