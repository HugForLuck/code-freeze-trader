import { Injectable } from '@nestjs/common';
import { COPY_ACTIONS } from './copy.actions';
import { OnEvent } from '@nestjs/event-emitter';
import { DBService } from 'src/db/db.service';
import { BybitMiddleware } from 'src/exchanges/bybit/http/bybit.service';
import { BitgetMiddleware } from 'src/exchanges/bitget/http/bitget.service';
import { BybitWSService } from 'src/exchanges/bybit/websockets/bybitWebsocket.service';
import { CopyStore } from './store/copy.store';
import { tap } from 'rxjs';

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
    private readonly bybit: BybitMiddleware,
    private readonly bybitWS: BybitWSService,
    private readonly bitget: BitgetMiddleware,
    private readonly db: DBService,
    private readonly store: CopyStore,
  ) {}

  @OnEvent(COPY_ACTIONS.INIT)
  async init() {
    const dbCopies = await this.db.getCopies();
    this.store.setCopiesFromDB(dbCopies);
    this.setLivePrices$();

    // await this.store.syncPositionsFromTarget();
    // await this.store.syncPositionsFromOrigin();

    // const trader = new Trader();
    // trader.name = 'Amazing_';
    // trader.traderId = 'b9b34f738fb03d50a297';
    // const traders = await this.db.getTraders();
    // console.log(traders);
    // const originPositions = await this.bitget.getTraderLivePositions(trader);
  }

  private setLivePrices$() {
    this.bybitWS
      .getMarkPrice$()
      .pipe(tap((ticker) => this.store.setLivePrices$(ticker)))
      .subscribe();
  }

  applyTargetPositions() {}
}
