import { Observable, distinctUntilChanged, map } from 'rxjs';
import { ITicker } from '../response/ticker.interface';
import { filterMarkPrice } from './filterMarkPrice.utils';
import { IBybitRequest } from '../request.interface';

export function filterUniquePrice(
  source$: Observable<IBybitRequest<ITicker>>,
): Observable<ITicker> {
  return source$.pipe(
    filterMarkPrice(), // excludes non markPrice responses (e.g. pongs, etc.)
    map((message) => message.data),
    distinctUntilChanged<ITicker>(
      (pTicker, cTicker) => pTicker?.markPrice === cTicker?.markPrice,
    ), // compare previous with current value, only emits if they are different
  );
}
