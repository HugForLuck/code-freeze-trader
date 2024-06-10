import { Injectable } from '@nestjs/common';
import { COPY_ACTIONS } from './copy.actions';
import { OnEvent } from '@nestjs/event-emitter';
import { DBService } from 'src/db/db.service';
import { BitgetMiddleware } from 'src/exchanges/bitget/http/bitget.service';
import { CopyStore } from './store/copy.store';
import { tap } from 'rxjs';
import { Bybit } from 'src/exchanges/bybit/bybit.service';

/**
 *
 * calls external apis and db to use copy store to sync copy state
 * uses middlewares of API to retrieved unified data to sync with store
 * handles complete copy process
 *
 */
@Injectable()
export class CopyService {
  constructor(
    private readonly bybit: Bybit,
    private readonly bitget: BitgetMiddleware,
    private readonly db: DBService,
    private readonly store: CopyStore,
  ) {}

  @OnEvent(COPY_ACTIONS.INIT)
  async init() {
    const dbCopies = await this.db.getCopies();
    this.store.setCopiesFromDB(dbCopies);
    this.setLivePrices$();
    this.bybit.getTargetPositions$().subscribe({
      next: (pos) => this.store.setLiveQtys(pos),
      error: (error) => console.log('ERRORED', error),
      complete: () => console.log('COMPLETED'),
    });
  }

  private setLivePrices$() {
    this.bybit
      .getLivePrice$()
      .pipe(tap((ticker) => this.store.setLivePrices$(ticker)))
      .subscribe();
  }

  applyTargetPositions() {}
}
