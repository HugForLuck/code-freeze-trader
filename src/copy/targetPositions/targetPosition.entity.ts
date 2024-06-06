import { SYMBOL } from 'src/exchanges/api/symbol.enum';
import { DIR } from 'src/shared/enums/dir.enum';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ITargetPosition } from './targetPosition.interface';
import { ColumnNumericTransformer } from 'src/db/utils/columnNumericTransformer.utils';
import { TARGET_EXCHAGE } from '../targetExchange.enum';

@Entity({ name: 'target_positions' })
export class TargetPosition implements ITargetPosition {
  @PrimaryColumn()
  symbol: SYMBOL;

  @PrimaryColumn()
  dir: DIR;

  @PrimaryColumn()
  targetExchange: TARGET_EXCHAGE;

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
    default: 0.5,
    transformer: new ColumnNumericTransformer(),
  })
  maxAvailableBalance: number;

  @Column('decimal', {
    precision: 17,
    scale: 10,
    default: 0.5,
    transformer: new ColumnNumericTransformer(),
  })
  initialPrice: number;

  liveQty: number;
}
