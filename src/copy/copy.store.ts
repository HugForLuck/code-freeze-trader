import { Injectable } from '@nestjs/common';
import { Copy } from './copy.entity';
import { STORE_STATE } from './store/storeState.enum';
import { TargetPosition } from './targetPositions/targetPosition.entity';
import { TARGET_STATE } from './targetPositions/targetState.enum';
import { AllowedSymbols } from './copy.config';

/**
 *
 * Stores all copyPosition related data
 *
 */
@Injectable()
export class CopyStore {
  /**
   *
   * Fixed strategy data
   *
   */
  allowedSymbols = AllowedSymbols;
  maxSymbols = 2;

  /**
   *
   * Sets status of the store
   *
   */
  private _state = STORE_STATE.NOT_INITIALIZED;
  get state() {
    return this._state;
  }
  set state(value: STORE_STATE) {
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
  initializeCopiesFromDB(value: Copy[]) {
    this.state = STORE_STATE.LOADING_TARGETS_FROM_DB;
    this._copies = value;
    this.state = STORE_STATE.LOADEDED_TARGETS_FROM_DB;
  }

  patchTargetPositions(targetPositions: TargetPosition[]) {
    this.state = STORE_STATE.LOADING_REMOTE_TARGETS;
    let isUpdated = false;

    // apply targetPos to store copy
    this.copies.forEach((copy) => {
      const foundTargetPos = targetPositions.find(copy.isCopy);
      if (foundTargetPos) {
        if (copy.targetPosition.initialPrice == 0) {
          copy.targetPosition.state = TARGET_STATE.NO_QTY_IN_DB;
          console.log('TargetPosition has 0 liveQty in db!');
        } else {
          copy.targetPosition.loadedIntoStore();

          copy.targetPosition = foundTargetPos;
          isUpdated = true;
        }
      } else if (copy.targetPosition.initialPrice ?? 0 > 0) {
        copy.resetTarget();
      }
      copy.targetPosition.waitsForNewCopy();
    });

    this.logCopies();
    this.state = STORE_STATE.LOADED_REMOTE_TARGETS;
    return isUpdated;
  }

  logCopies() {
    console.log(this.copies);
  }
}
