import { MonoTypeOperatorFunction, filter } from 'rxjs';
import { IBybitRequest } from './request.interface';
import { AllowedSymbols } from 'src/copy/copy.config';

export function filterMarkPrice(): MonoTypeOperatorFunction<IBybitRequest> {
  return filter((message) => isTicker(message) && hasMarkPrice(message));
}

function isTicker(request: IBybitRequest) {
  const tickers = AllowedSymbols.map((s) => 'tickers.' + s);
  return tickers.includes(request?.topic ?? '');
}

function hasMarkPrice(request: IBybitRequest) {
  return request.data?.markPrice != null;
}
