import { Injectable } from '@nestjs/common';
import { CopyStore as CopyStore } from './copy.store';
import { COPY_ACTIONS } from './copy.actions';
import { OnEvent } from '@nestjs/event-emitter';
import { BybitMiddleware } from 'src/exchanges/bybit/http/bybit.middleware';
import { DBService } from 'src/db/db.service';

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
    private readonly copyPositionStore: CopyStore,
  ) {}

  @OnEvent(COPY_ACTIONS.INIT)
  async init() {
    const copies = await this.db.getCopies();
    console.log(copies);

    // const pos = await this.db.getTargetPositions();
    // console.log(pos);
    // console.log('......');
    // this.copyPositionStore.state = COPY_STATE.SYNCING_LIVE_POSITIONS;
    // this.bybit
    //   .getUserLivePositions$()
    //   .pipe(tap((pos) => this.copyPositionStore.patchPositions(pos)))
    //   .subscribe();
    // const strategy = await this.db.getActiveStrategy();
    // console.log(strategy);
  }
}
