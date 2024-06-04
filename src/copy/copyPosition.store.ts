import { ICopyPosition } from './copyPosition.interface';
import { Injectable } from '@nestjs/common';
import { COPYPOSITION_STATE } from './copyPositionState.enum';

/**
 *
 * Stores all copyPosition related data
 *
 */
@Injectable()
export class CopyPositionStore {
  /**
   *
   * contains the state of the store/data
   *
   */
  private _state = COPYPOSITION_STATE.WAIT_FOR_SYNC;
  get state() {
    return this._state;
  }
  set state(value: COPYPOSITION_STATE) {
    console.log(`changing state from ${this.state} to ${value}`);
    this._state = value;
  }

  /**
   *
   * contains the actual data
   *
   */
  private _positions: ICopyPosition[] = [];

  get positions() {
    console.log('Reading user state');
    return this._positions;
  }

  set positions(value: ICopyPosition[]) {
    console.log('Setting copy positions', value);
    this._positions = value;
  }

  addPositions(value: ICopyPosition[]) {
    console.log('Adding copy positions', value);
    this._positions.push(...value);
  }
}
