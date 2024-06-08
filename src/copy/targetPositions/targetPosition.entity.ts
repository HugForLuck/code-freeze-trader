import { DIR } from 'src/shared/enums/dir.enum';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ITargetPosition } from './targetPosition.interface';
import { ColumnNumericTransformer } from 'src/db/utils/columnNumericTransformer.utils';
import { TARGET_EXCHANGE } from '../targetExchange.enum';
import { TARGET_STATE } from './targetState.enum';
import { SYMBOL } from 'src/shared/enums/symbol.enum';

@Entity({ name: 'target_positions' })
export class TargetPosition implements ITargetPosition {
  /**
   *
   * Sets status of the store
   *
   */
  private _state = TARGET_STATE.NO_QTY_IN_DB;
  get state() {
    return this._state;
  }
  set state(value: TARGET_STATE) {
    if (value == TARGET_STATE.LOADED_INTO_STORE)
      console.log('TargetPosition was added to store');

    this._state = value;
  }

  constructor(
    symbol: SYMBOL,
    dir: DIR,
    targetExchange: TARGET_EXCHANGE,
    liveQty: number,
  ) {
    this.symbol = symbol;
    this.dir = dir;
    this.liveQty = liveQty;
    this.targetExchange = targetExchange;
  }

  @PrimaryColumn()
  symbol: SYMBOL;

  @PrimaryColumn()
  dir: DIR;

  @PrimaryColumn()
  targetExchange: TARGET_EXCHANGE;

  /**
   *
   * Max avaivalble Balance, set at opening a new position and
   * saved in db.copy_positions during its livetime
   * a strategy determines how much balance is available for each copy/position
   *
   */
  @Column('decimal', {
    precision: 17,
    scale: 10,
    default: null,
    transformer: new ColumnNumericTransformer(),
  })
  maxAvailableBalance: number | null;

  @Column('decimal', {
    precision: 17,
    scale: 10,
    default: null,
    transformer: new ColumnNumericTransformer(),
  })
  initialPrice: number | null = null;

  liveQty: number | null = null;

  /**
   *
   * Helper functions
   *
   */
  waitsForNewCopy() {
    this.state = TARGET_STATE.WAITING_FOR_NEW_COPY;
  }

  loadedIntoStore() {
    this.state = TARGET_STATE.LOADED_INTO_STORE;
  }
}
