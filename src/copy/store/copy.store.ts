import { Injectable } from '@nestjs/common';
import { Copy } from '../copy.entity';
import { STATUS } from './status.enum';
import { TargetPosition } from '../targetPositions/targetPosition.entity';
import { TARGET_STATE } from '../targetPositions/targetState.enum';
import { DBService } from 'src/db/db.service';
import { Bitget } from 'src/exchanges/bitget/http/bitget.service';
import { getUniqueSymbols } from 'src/shared/utils/getUniqueSymbols.utils';
import { getLiveCopies, getOpenCopies } from '../utils/copyFilter.utls';
import { setTargetLivePrice } from '../utils/setTargetLivePrice.utils';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  map,
  scan,
} from 'rxjs';
import { ICopyState, initialCopyState } from '../copyState';
import { ACTION, copyActions } from './action.enum';
import { ITicker } from 'src/exchanges/bybit/websockets/response/ticker.interface';
import { IPosition } from '../position.interface';
import { setTargetLiveQtys } from '../utils/setTargetLiveQtys.utils';
import Decimal from 'decimal.js';

/**
 *
 * Stores all copyPosition related data
 *
 */
@Injectable()
export class CopyStore {
  private state$: BehaviorSubject<ICopyState>;

  constructor(
    private readonly db: DBService,
    private readonly bitget: Bitget,
  ) {
    this.state$ = new BehaviorSubject<ICopyState>(initialCopyState);

    // this.select$((state) => state).subscribe(console.log);
    // this.getStatus$().subscribe(console.log);
    this.getCopies$().subscribe(console.log);
    // this.getPrices$().subscribe(console.log);
  }

  private dispatch(action: any) {
    this.state$.next(this.reducer(this.state$.value, action));
  }

  private reducer(state: ICopyState, action: any): ICopyState {
    switch (action.type) {
      case ACTION.SET_COPIES:
        return { ...state, copies: action.payload };
      case ACTION.SET_STATUS:
        return { ...state, status: action.payload };
      case ACTION.SET_MARKPRICES:
        return {
          ...state,
          copies: setTargetLivePrice(state.copies, action.payload),
        };
      case ACTION.SET_ORIGIN_LIVE_QTYS:
        return {
          ...state,
          copies: setTargetLiveQtys(state.copies, action.payload),
        };
      default:
        return state;
    }
  }

  setCopiesFromDB(copies: Copy[]) {
    this.setStatus(STATUS.LOADING_COPIES_FROM_DB);
    this.dispatch(copyActions.setCopies(copies));
    this.setStatus(STATUS.LOADED_COPIES_FROM_DB);
  }

  setStatus(status: STATUS) {
    this.dispatch(copyActions.setStatus(status));
  }

  setLivePrices$(ticker?: ITicker) {
    if (!ticker) return;
    this.dispatch(copyActions.setMarkPrices(ticker));
  }

  setLiveQtys(positions: IPosition[]) {
    if (!positions) return;
    this.dispatch(copyActions.setLiveQtys(positions));
  }

  /**
   *
   * Selectors for all or substates
   *
   */
  getStatus$() {
    return this.state$.asObservable().pipe(
      map((state) => state.status),
      distinctUntilChanged(),
    );
  }

  get$(selector?: (state: ICopyState) => any): Observable<any> {
    return this.state$.asObservable().pipe(
      map((state) => state),
      distinctUntilChanged(),
      scan((acc, state) => (selector ? selector(state) : state), undefined),
    );
  }

  getCopies$() {
    return this.state$.asObservable().pipe(
      map((state) => state.copies),
      distinctUntilChanged(),
    );
  }

  getPrices$() {
    return this.state$.asObservable().pipe(
      map((state) => [
        ...new Map(
          state.copies.map((copy) => [
            copy.symbol,
            {
              symbol: copy.symbol,
              livePrice: copy.targetPosition.livePrice,
            },
          ]),
        ).values(),
      ]),
      distinctUntilChanged(),
    );
  }

  /**
   *
   * Fixed strategy data
   *
   */
  // allowedSymbols = AllowedSymbols;
  // maxSymbols = 2;

  /**
   *
   * Sets status of the store
   *
   */
  private _state = STATUS.NOT_INITIALIZED;
  get state() {
    return this._state;
  }
  set state(value: STATUS) {
    this._state = value;
    console.log(`🟣 STORE | ${this.state}`);
  }

  /**
   *
   * holds actual state data (origin/target positions + strategy)
   *
   */
  private _copies: Copy[] = [];
  get copies() {
    return this._copies;
  }

  /**
   *
   * @param copy[] used to initialize copies
   *
   */
  async syncCopiesFromDB() {
    this.state = STATUS.LOADING_TARGETS_FROM_DB;
    this._copies = await this.db.getCopies();
    this.state = STATUS.LOADEDED_TARGETS_FROM_DB;
  }

  // async syncPositionsFromTarget() {
  //   const targetPositions = await this.bybit.getTargetPositions();
  //   const isUpdated = this.patchTargetPositions(targetPositions);
  //   if (isUpdated) this.db.saveCopies(this.copies);
  // }

  private patchTargetPositions(targetPositions: TargetPosition[]) {
    this.state = STATUS.LOADING_REMOTE_TARGETS;
    let isUpdated = false;

    // apply targetPos to store copy
    this.copies.forEach((copy) => {
      // TODO check properly when to update, delete/remove or copies different
      const foundTargetPos = targetPositions.find(copy.isCopy);
      if (foundTargetPos) {
        if (copy.targetPosition.initialPrice == '') {
          copy.targetPosition.state = TARGET_STATE.TARGET_NO_QTY_IN_DB;
          console.log('TargetPosition has 0 liveQty in db!');
        } else {
          copy.targetPosition.state = TARGET_STATE.LOADED_INTO_STORE;
          copy.targetPosition = foundTargetPos;
          isUpdated = true;
        }
      } else if (new Decimal(copy.targetPosition.initialPrice).greaterThan(0)) {
        copy.resetTarget();
        this.db.saveCopies([copy]);
      }
      copy.targetPosition.waitsForNewCopy();
    });

    this.state = STATUS.LOADED_REMOTE_TARGETS;
    return isUpdated;
  }

  async syncPositionsFromOrigin() {
    // await this.syncLivePositionsFromOrigin();
    // await this.syncOpenPositionsFromOrigin();
  }

  private async syncLivePositionsFromOrigin() {
    const liveCopies = getLiveCopies(this.copies);
    this.copies;
    for (const copy of liveCopies) {
      console.log('syncing live position', copy);
    }
  }

  private async syncOpenPositionsFromOrigin() {
    const openCopies = getOpenCopies(this.copies);
    const uniqueSymbols = getUniqueSymbols(openCopies);
    const traders = await this.db.getTraders();

    for (const symbol of uniqueSymbols) {
      for (const trader of traders) {
        this.bitget.getTraderLivePositions(trader, symbol);
      }
    }
  }

  /**
   *
   * Helper functions
   *
   */
  logCopies() {
    console.log(this.copies);
  }
}
