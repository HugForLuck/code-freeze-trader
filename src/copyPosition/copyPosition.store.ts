import { STORE_STATE } from 'src/store/storeState.enum';
import { ICopyPosition } from './copyPosition.interface';
import { Injectable } from '@nestjs/common';

/**
 *
 * Stores all copyPosition related data
 *
 */
@Injectable()
export class CopyPositionStore {
  private _state = STORE_STATE.WAIT_FOR_SYNC;
  get state() {
    return this._state;
  }
  set state(value: STORE_STATE) {
    console.log(`changing state from ${this.state} to ${value}`);
    this._state = value;
  }

  data: ICopyPosition[];

  getPositions() {
    console.log('Reading user state');
    return this.data;
  }
}
