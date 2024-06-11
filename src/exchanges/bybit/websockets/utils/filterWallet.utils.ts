import { Observable, filter, map, distinctUntilChanged } from 'rxjs';
import { IBybitRequest } from '../request.interface';
import { IWallet } from '../response/wallet.interface';
import { TOPIC } from '../topic.enum';

export function filterWallet(
  source$: Observable<IBybitRequest<IWallet[]>>,
): Observable<IWallet | undefined> {
  return source$.pipe(
    filter((response) => response?.topic == TOPIC.WALLET),
    map((wallets) => {
      if (wallets.data && wallets.data?.length > 0) {
        return wallets.data[0];
      }
    }),
    distinctUntilChanged(),
  );
}
