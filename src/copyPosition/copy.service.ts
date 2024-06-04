import { Injectable } from '@nestjs/common';
import { CopyPositionStore as CopyPositionStore } from './copyPosition.store';
import { COPY_POSITION } from './copyPosition.enum';
import { OnEvent } from '@nestjs/event-emitter';
import { STORE_STATE } from 'src/store/storeState.enum';
import { BybitMiddleware } from 'src/exchanges/bybit/bybit.middleware';

/**
 *
 * loads/saves store data and sets store states
 * uses middlewares of API to retrieved unified data to sync with store
 *
 */
@Injectable()
export class CopyPositionService {
  constructor(
    private readonly bybit: BybitMiddleware,
    private readonly copyPositionStore: CopyPositionStore,
  ) {}

  @OnEvent(COPY_POSITION.INIT)
  async init() {
    const response = await this.bybit.getUserLivePositions();
    this.copyPositionStore.state = STORE_STATE.SYNCING;
    console.log(response);
    this.copyPositionStore.state = STORE_STATE.SYNCED;
  }
}
