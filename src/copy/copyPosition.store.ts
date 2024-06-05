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
    console.log(`🟣 Live Position | ${this.state} ➡️ ${value}`);
    this._state = value;
  }

  /**
   *
   * contains the actual data
   *
   */
  private _positions: ICopyPosition[] = [];

  get positions() {
    return this._positions;
  }

  set positions(value: ICopyPosition[]) {
    this._positions = value;
  }

  addPositions(pos: ICopyPosition[]) {
    console.log(this.positions);
    console.log('⬇️');
    this._positions.push(...pos);
    console.log(this.positions);
  }

  getPatchedPositions(livePositions: ICopyPosition[]): void {
    let updated = false;
    const updatePositions = this._positions
      .map((storePos) => {
        // patches pos
        const patch = livePositions.find(
          (patchPos) =>
            patchPos.symbol === storePos.symbol &&
            patchPos.dir === storePos.dir &&
            patchPos.liveQty !== storePos.liveQty,
        );
        if (patch) {
          updated = true;
          return { ...storePos, ...patch };
        }
        return null;
      })
      .filter((p) => {
        // removes old pos
        if (p?.symbol !== undefined) {
          updated = true;
          return true;
        }
        return false;
      })
      .concat(
        // adds new pos
        livePositions.filter((livePos) => {
          const isNew = !this._positions.some(
            (storePos) =>
              livePos.symbol === storePos.symbol &&
              livePos.dir === storePos.dir,
          );
          if (isNew) {
            updated = true;
            return true;
          }
          return false;
        }),
      ) as ICopyPosition[];

    if (updated) {
      this._positions = updatePositions;
      console.log('🟢 Position got updated', this._positions);
    }
  }
}
