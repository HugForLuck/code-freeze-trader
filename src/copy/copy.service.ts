import { Injectable } from '@nestjs/common';
import { CopyPositionStore as CopyPositionStore } from './copyPosition.store';
import { COPY_POSITION } from './copyPosition.enum';
import { OnEvent } from '@nestjs/event-emitter';
import { BybitMiddleware } from 'src/exchanges/bybit/http/bybit.middleware';
import { COPYPOSITION_STATE } from './copyPositionState.enum';

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
    const copyPositions = await this.bybit.getUserLivePositions();
    this.copyPositionStore.state = COPYPOSITION_STATE.SYNCING;
    this.copyPositionStore.addPositions(copyPositions);
    this.copyPositionStore.state = COPYPOSITION_STATE.LIVE_POSITION_LOADED;
    console.log(this.copyPositionStore.positions);
  }
}
