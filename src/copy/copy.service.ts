import { Injectable } from '@nestjs/common';
import { COPY_ACTIONS } from './copy.actions';
import { OnEvent } from '@nestjs/event-emitter';
import { DBService } from 'src/db/db.service';
import { Bitget } from 'src/exchanges/bitget/http/bitget.service';
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
    private readonly bitget: Bitget,
    private readonly db: DBService,
    private readonly store: CopyStore,
  ) {}

  @OnEvent(COPY_ACTIONS.INIT)
  async init() {
    await this.loadCopiesFromDB();
    this.syncTargetLiveCryptoPrices$();
    await this.syncTargetLiveQtys();
    await this.syncOriginPositions();
  }

  private async loadCopiesFromDB() {
    const dbCopies = await this.db.getCopies();
    this.store.setCopiesFromDB(dbCopies);
  }

  private syncTargetLiveCryptoPrices$() {
    this.bybit
      .getLivePrice$()
      .pipe(tap((ticker) => this.store.setLivePrices$(ticker)))
      .subscribe();
  }

  private async syncTargetLiveQtys() {
    // Initializes origin (bybit) user's live position qtys
    const pos = await this.bybit.getTargetPositions();
    this.store.setLiveQtys(pos);

    // Syncs origin (bybit) user's live position qtys
    this.bybit
      .getTargetPositions$()
      .pipe(tap(() => this.store.setLiveQtys(pos)))
      .subscribe();
  }

  private async syncOriginPositions() {}
}
