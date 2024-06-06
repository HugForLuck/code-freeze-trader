import { Injectable } from '@nestjs/common';
import { CopyPositionStore as CopyPositionStore } from './copyPosition.store';
import { COPY_POSITION } from './copyPosition.enum';
import { OnEvent } from '@nestjs/event-emitter';
import { tap } from 'rxjs';
import { BybitMiddleware } from 'src/exchanges/bybit/http/bybit.middleware';
import { COPYPOSITION_STATE } from './copyPositionState.enum';
import { DBService } from 'src/db/db.service';

/**
 *
 * loads/saves store data and sets store states
 * uses middlewares of API to retrieved unified data to sync with store
 * handles complete copy process
 *
 */
@Injectable()
export class CopyPositionService {
  constructor(
    private readonly bybit: BybitMiddleware,
    private readonly db: DBService,
    private readonly copyPositionStore: CopyPositionStore,
  ) {}

  @OnEvent(COPY_POSITION.INIT)
  async init() {
    // const copyPositions = await this.bybit.getUserLivePositions();
    this.copyPositionStore.state = COPYPOSITION_STATE.SYNCING_LIVE_POSITIONS;
    // this.copyPositionStore.addPositions(copyPositions);
    // this.copyPositionStore.state = COPYPOSITION_STATE.LOADED;
    this.bybit
      .getUserLivePositions$()
      .pipe(tap((pos) => this.copyPositionStore.patchPositions(pos)))
      .subscribe();
    const strategy = await this.db.getActiveStrategy();
    console.log(strategy);
  }
}
