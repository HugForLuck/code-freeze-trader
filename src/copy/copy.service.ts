import { Injectable } from '@nestjs/common';
import { COPY_ACTIONS } from './copy.actions';
import { OnEvent } from '@nestjs/event-emitter';
import { DBService } from 'src/db/db.service';
import { CopyStore } from './store/copy.store';
import { Bybit } from 'src/exchanges/bybit/bybit.service';
import { Bitget } from 'src/exchanges/bitget/bitget.service';
import { tap } from 'rxjs';
import { OriginPosition } from './origin/originPosition.entity';
import { SymbolDirs } from 'src/shared/consts/symbolDirs';
import { getBestPriceByPositions } from './origin/utils/getBestPrice.utils';
import { isBetterOpenPrice } from './origin/utils/isBetterPrice.utils';
import { OpenOrder } from './orders/openOrder';

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
    private readonly bybit: Bybit,
    private readonly bitget: Bitget,
    private readonly db: DBService,
    private readonly store: CopyStore,
  ) {}

  @OnEvent(COPY_ACTIONS.INIT)
  async init() {
    await this.loadCopiesFromDB();
    await this.syncTarget();
    await this.syncOrigin();
  }

  private async syncTarget() {
    this.syncTargetLiveCryptoPrices$();
    await this.syncTargetLiveQtys();
  }

  private syncTargetLiveCryptoPrices$() {
    this.bybit
      .getLivePrices$()
      .pipe(tap((ticker) => this.store.setLivePrices$(ticker)))
      .subscribe();
  }

  private async syncTargetLiveQtys() {
    // Initializes origin (bybit) user's live position qtys
    const pos = await this.bybit.getUserLivePositions();
    this.store.setLiveQtys(pos);

    // Syncs origin (bybit) user's live position qtys
    this.bybit
      .getUserLivePositions$()
      .pipe(tap(() => this.store.setLiveQtys(pos)))
      .subscribe();
  }

  private async loadCopiesFromDB() {
    const dbCopies = await this.db.getCopies();
    this.store.setCopiesFromDB(dbCopies);
  }

  private async syncOrigin() {
    this.bybit
      .getUserWallet$()
      .subscribe((wallet) => console.log(wallet?.coin));
    // load open copies from store
    // if open copies > 0
    // => get bitget traders
    // => get bitget positions
    // => create/send orders
    const traders = await this.db.getTraders();
    console.log(traders);
    const originOpenPos: OriginPosition[] = [];
    for (const trader of traders) {
      originOpenPos.push(...(await this.bitget.getTraderLivePositions(trader)));
    }
    for (const symbolDir of SymbolDirs) {
      const positions = originOpenPos.filter(
        (p) => p.symbol == symbolDir.symbol && p.dir == symbolDir.dir,
      );
      const originPosition = getBestPriceByPositions(positions);
      if (originPosition && originPosition.trader) {
        const strategy = await this.db.getStrategy(
          symbolDir.symbol,
          originPosition.trader,
        );
        const copy = await this.store.getCopy(symbolDir);
        console.log(copy);
        console.log(originPosition);
        console.log(strategy);
        const isBetter = isBetterOpenPrice(
          originPosition,
          copy?.targetPosition.livePrice,
        );
        console.log(isBetter);
        const order = new OpenOrder(
          symbolDir,
          originPosition,
          isBetter,
          strategy,
          copy,
        );
        console.log(order);
      }
    }
    // this.store
    //   .getOpenCopies$()
    //   .pipe(filter((copies) => copies.length > 0))
    //   .subscribe(console.log);
  }
}
