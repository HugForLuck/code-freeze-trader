// import { Injectable } from '@nestjs/common';
// import { Copy } from './copy.entity';
// import { STORE_STATE } from './store/storeState.enum';
// import { TargetPosition } from './targetPositions/targetPosition.entity';
// import { TARGET_STATE } from './targetPositions/targetState.enum';
// import { AllowedSymbols } from './copy.config';
// import { DBService } from 'src/db/db.service';
// import { BybitMiddleware } from 'src/exchanges/bybit/http/bybit.service';
// import { BitgetMiddleware } from 'src/exchanges/bitget/http/bitget.service';
// import { getLiveCopies, getOpenCopies } from './utils/copyFilter.utls';
// import { BybitWSService } from 'src/exchanges/bybit/websockets/bybitWebsocket.service';
// import { SYMBOL } from 'src/shared/enums/symbol.enum';

// /**
//  *
//  * Stores all copyPosition related data
//  *
//  */

// @Injectable()
// export class CopyStore {
//   constructor(
//     private readonly db: DBService,
//     private readonly bybit: BybitMiddleware,
//     private readonly bybitWS: BybitWSService,
//     private readonly bitget: BitgetMiddleware,
//   ) {}
//   /**
//    *
//    * Fixed strategy data
//    *
//    */
//   allowedSymbols = AllowedSymbols;
//   maxSymbols = 2;

//   /**
//    *
//    * Sets status of the store
//    *
//    */
//   private _state = STORE_STATE.NOT_INITIALIZED;
//   get state() {
//     return this._state;
//   }
//   set state(value: STORE_STATE) {
//     this._state = value;
//     console.log(`🟣 STORE | ${this.state}`);
//   }

//   /**
//    *
//    * holds actual state data (origin/target positions + strategy)
//    *
//    */
//   private _copies: Copy[] = [];
//   get copies() {
//     return this._copies;
//   }

//   /**
//    *
//    * @param copy[] used to initialize copies
//    *
//    */
//   async syncCopiesFromDB() {
//     this.state = STORE_STATE.LOADING_TARGETS_FROM_DB;
//     this._copies = await this.db.getCopies();
//     this.state = STORE_STATE.LOADEDED_TARGETS_FROM_DB;
//   }

//   syncLivePrices$() {
//     this.bybitWS.getMarkPrice$(SYMBOL.BTCUSDT).subscribe({
//       next: (ticker) => {
//         this.copies.forEach((copy) => {
//           if (copy.symbol == SYMBOL.BTCUSDT) {
//             copy.targetPosition.livePrice = +(ticker?.markPrice ?? 0);
//           }
//         });
//       },
//       error: (error) => {
//         console.log('ERROR', error);
//         // Handle errors
//       },
//     });
//   }

//   async syncPositionsFromTarget() {
//     const targetPositions = await this.bybit.getTargetPositions();
//     const isUpdated = this.patchTargetPositions(targetPositions);
//     if (isUpdated) this.db.saveCopies(this.copies);
//   }

//   private patchTargetPositions(targetPositions: TargetPosition[]) {
//     this.state = STORE_STATE.LOADING_REMOTE_TARGETS;
//     let isUpdated = false;

//     // apply targetPos to store copy
//     this.copies.forEach((copy) => {
//       // TODO check properly when to update, delete/remove or copies different
//       const foundTargetPos = targetPositions.find(copy.isCopy);
//       if (foundTargetPos) {
//         if (copy.targetPosition.initialPrice == 0) {
//           copy.targetPosition.state = TARGET_STATE.NO_QTY_IN_DB;
//           console.log('TargetPosition has 0 liveQty in db!');
//         } else {
//           copy.targetPosition.state = TARGET_STATE.LOADED_INTO_STORE;
//           copy.targetPosition = foundTargetPos;
//           isUpdated = true;
//         }
//       } else if (copy.targetPosition.initialPrice ?? 0 > 0) {
//         copy.resetTarget();
//         this.db.saveCopies([copy]);
//       }
//       copy.targetPosition.waitsForNewCopy();
//     });

//     // this.logCopies();
//     this.state = STORE_STATE.LOADED_REMOTE_TARGETS;
//     return isUpdated;
//   }

//   async syncPositionsFromOrigin() {
//     // await this.syncLivePositionsFromOrigin();
//     // await this.syncOpenPositionsFromOrigin();
//   }

//   private async syncLivePositionsFromOrigin() {
//     const liveCopies = getLiveCopies(this.copies);
//     for (const copy of liveCopies) {
//       if (copy?.targetPosition?.liveQty ?? 0 > 0) {
//         console.log('syncing live position', copy);
//       }
//     }
//   }

//   private async syncOpenPositionsFromOrigin() {
//     const openCopies = getOpenCopies(this.copies);
//     const traders = await this.db.getTraders();

//     for (const trader of traders) {
//       const pos = await this.bitget.getTraderLivePositions(trader);
//       const filteredPos = pos.filter((p) => p.traderLiveOrders ?? 0 > 0);
//       console.log('trader pos', filteredPos);
//     }
//   }

//   /**
//    *
//    * Helper functions
//    *
//    */
//   logCopies() {
//     console.log(this.copies);
//   }
// }
