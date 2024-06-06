import { ICopyPosition } from './copyPosition.interface';
import { Injectable } from '@nestjs/common';
import { COPYPOSITION_STATE } from './copyPositionState.enum';
import { SYMBOL } from 'src/exchanges/api/symbol.enum';
import { DIR } from 'src/shared/enums/dir.enum';

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

  patchPositions(livePositions: ICopyPosition[]): boolean {
    let isUpdated = false;
    let patchedArray: CopyPositionItem[] = [];

    // Helper function to create composite key
    const createKey = (pos: CopyPositionItem) => `${pos.symbol}-${pos.dir}`;

    // Create a map for quick lookup by composite key
    const originMap = new Map<string, CopyPositionItem>();
    this.positions.forEach((item) => originMap.set(createKey(item), item));

    // Process updates
    livePositions.forEach((update) => {
      const key = createKey(update);
      if (originMap.has(key)) {
        // Update the existing item
        const originalItem = originMap.get(key)!;
        if (JSON.stringify(originalItem) !== JSON.stringify(update)) {
          Object.assign(originalItem, update);
          isUpdated = true;
        }
      } else {
        // Add new item
        this.positions.push(update);
        isUpdated = true;
      }
    });

    // Remove old items
    const updateKeys = new Set(livePositions.map((pos) => createKey(pos)));
    patchedArray = this._positions.filter((pos) => {
      if (updateKeys.has(createKey(pos))) {
        return true;
      } else {
        isUpdated = true;
        return false;
      }
    });

    if (isUpdated) {
      this.positions = patchedArray;
      console.log('🟢 CopyPositions got updated', this.positions);
    }

    return isUpdated;
  }
}

type CopyPositionItem = {
  symbol: SYMBOL; // Unique symbol
  dir: DIR; // Unique direction
  [key: string]: any; // Other properties can vary
};
