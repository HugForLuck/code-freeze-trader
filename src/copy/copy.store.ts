import { Injectable } from '@nestjs/common';
import { Copy } from './copy.entity';

/**
 *
 * Stores all copyPosition related data
 *
 */
@Injectable()
export class CopyStore {
  private _copies: Copy[] = [];

  get copies() {
    return this._copies;
  }

  set copies(value: Copy[]) {
    this._copies = value;
  }
}
// private _state = COPY_STATE.WAIT_FOR_SYNC;
// get state() {
//   return this._state;
// }
// set state(value: COPY_STATE) {
//   console.log(`🟣 Live Position | ${this.state} ➡️ ${value}`);
//   this._state = value;
// }

/**
 *
 * contains the actual data
 *
 */
// private _targetPositions: ITargetPosition[] = [];

//   get positions() {
//     return this._targetPositions;
//   }

//   set positions(value: ITargetPosition[]) {
//     this._targetPositions = value;
//   }

//   addPositions(pos: ITargetPosition[]) {
//     console.log(this.positions);
//     console.log('⬇️');
//     this._targetPositions.push(...pos);
//     console.log(this.positions);
//   }

//   patchPositions(livePositions: ITargetPosition[]): boolean {
//     let isUpdated = false;
//     let patchedArray: CopyPositionItem[] = [];

//     // Helper function to create composite key
//     const createKey = (pos: CopyPositionItem) => `${pos.symbol}-${pos.dir}`;

//     // Create a map for quick lookup by composite key
//     const originMap = new Map<string, CopyPositionItem>();
//     this.positions.forEach((item) => originMap.set(createKey(item), item));

//     // Process updates
//     livePositions.forEach((update) => {
//       const key = createKey(update);
//       if (originMap.has(key)) {
//         // Update the existing item
//         const originalItem = originMap.get(key)!;
//         if (JSON.stringify(originalItem) !== JSON.stringify(update)) {
//           Object.assign(originalItem, update);
//           isUpdated = true;
//         }
//       } else {
//         // Add new item
//         this.positions.push(update);
//         isUpdated = true;
//       }
//     });

//     // Remove old items
//     const updateKeys = new Set(livePositions.map((pos) => createKey(pos)));
//     patchedArray = this._targetPositions.filter((pos) => {
//       if (updateKeys.has(createKey(pos))) {
//         return true;
//       } else {
//         isUpdated = true;
//         return false;
//       }
//     });

//     if (isUpdated) {
//       this.positions = patchedArray;
//       console.log('🟢 CopyPositions got updated', this.positions);
//     }

//     return isUpdated;
//   }
// }

// type CopyPositionItem = {
//   symbol: SYMBOL; // Unique symbol
//   dir: DIR; // Unique direction
//   [key: string]: any; // Other properties can vary
// };
