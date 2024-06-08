import { Injectable } from '@nestjs/common';
import { CopyStore as CopyStore } from './copy.store';
import { COPY_ACTIONS } from './copy.actions';
import { OnEvent } from '@nestjs/event-emitter';
import { DBService } from 'src/db/db.service';
import { BybitMiddleware } from 'src/exchanges/bybit/http/bybitMiddleware.service';

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
    private readonly db: DBService,
    private readonly store: CopyStore,
  ) {}

  @OnEvent(COPY_ACTIONS.INIT)
  async init() {
    this.store.initializeCopiesFromDB(await this.db.getCopies());

    const targetPositions = await this.bybit.getTargetPositions();
    const isUpdated = this.store.patchTargetPositions(targetPositions);
    if (isUpdated) this.db.saveCopies(this.store.copies);
  }
}
