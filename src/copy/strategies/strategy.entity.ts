import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ColumnNumericTransformer } from 'src/db/utils/columnNumericTransformer.utils';
import { SYMBOL } from 'src/shared/enums/symbol.enum';

/**
 *
 * Stores different types of strategies, e.g. 1 symbol at a time,
 * 2 symbols, maxOrders, qty per symbol, etc.
 *
 */
@Entity({ name: 'strategies' })
export class Strategy {
  @PrimaryColumn()
  symbol: SYMBOL;

  @PrimaryColumn()
  traderId: string;

  @Column({ default: 50 })
  maxOrders?: number;

  @Column('decimal', {
    precision: 3,
    scale: 2,
    default: 0.5,
    transformer: new ColumnNumericTransformer(),
  })
  maxPriceChange?: number;

  allowedSymbols: SYMBOL[];

  maxSymbols: number;
}
