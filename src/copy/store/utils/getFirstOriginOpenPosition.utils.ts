import { Observable, first, map } from 'rxjs';
import { Copy } from 'src/copy/copy.entity';
import { ICopyState } from 'src/copy/copyState';

export function getFirstOriginOpenPosition(
  source$: Observable<ICopyState>,
): Observable<Copy[]> {
  return source$.pipe(
    first(),
    map((state) =>
      state.copies.filter((copy) => copy.originPosition?.trader == null),
    ),
  );
}
