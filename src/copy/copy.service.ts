import { Injectable } from '@nestjs/common';
import { CopyStore } from './CopyStore';
import { COPY_ACTIONS } from './copy.actions';
import { OnEvent } from '@nestjs/event-emitter';
import { DBService } from 'src/db/db.service';
import { BybitMiddleware } from 'src/exchanges/bybit/http/bybit.service';
import { BitgetMiddleware } from 'src/exchanges/bitget/http/bitget.service';
import { BybitTickerService } from 'src/exchanges/bybit/websockets/bybitWebsocket.service';

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
    private readonly bybitWS: BybitTickerService,
    private readonly bitget: BitgetMiddleware,
    private readonly db: DBService,
    private readonly store: CopyStore,
  ) {}

  @OnEvent(COPY_ACTIONS.INIT)
  async init() {
    await this.store.syncCopiesFromDB();
    this.store.syncLivePrice();
    await this.store.syncPositionsFromTarget();
    await this.store.syncPositionsFromOrigin();

    this.bybitWS.getMarkPrice$().subscribe({
      next: (ticker) => {
        console.log('MarkPrice', ticker.markPrice, ticker.lastPrice);
        // Process the ticker data
      },
      error: (error) => {
        console.log('ERROR', error);
        // Handle errors
      },
    });

    // const trader = new Trader();
    // trader.name = 'Amazing_';
    // trader.traderId = 'b9b34f738fb03d50a297';
    // const traders = await this.db.getTraders();
    // console.log(traders);
    // const originPositions = await this.bitget.getTraderLivePositions(trader);
  }

  applyTargetPositions() {}
}
