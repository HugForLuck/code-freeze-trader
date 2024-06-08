import { Injectable } from '@nestjs/common';
import { CopyStore } from './copy.store';
import { COPY_ACTIONS } from './copy.actions';
import { OnEvent } from '@nestjs/event-emitter';
import { DBService } from 'src/db/db.service';
import { BybitMiddleware } from 'src/exchanges/bybit/http/bybit.service';
import { BitgetMiddleware } from 'src/exchanges/bitget/http/bitget.service';
import { Trader } from './trader/trader.entity';

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
    private readonly bitget: BitgetMiddleware,
    private readonly db: DBService,
    private readonly store: CopyStore,
  ) {}

  @OnEvent(COPY_ACTIONS.INIT)
  async init() {
    this.store.initializeCopiesFromDB(await this.db.getCopies());

    const targetPositions = await this.bybit.getTargetPositions();
    const isUpdated = this.store.patchTargetPositions(targetPositions);
    if (isUpdated) this.db.saveCopies(this.store.copies);

    const trader = new Trader();
    trader.name = 'Amazing_';
    trader.traderId = 'b9b34f738fb03d50a297';
    const originPositions = await this.bitget.getTraderLivePositions(trader);
  }
}
