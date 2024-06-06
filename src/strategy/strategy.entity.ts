import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { ESymbol } from 'src/symbol/symbol.entity';
import { STRATEGY } from './strategy.enum';
import { ColumnNumericTransformer } from 'src/db/utils/columnNumericTransformer.utils';
/**
 *
 * Stores different types of strategies, e.g. 1 symbol at a time,
 * 2 symbols, maxOrders, qty per symbol, etc.
 *
 */
@Entity({ name: 'strategies' })
export class EStrategy {
  @PrimaryColumn()
  id: STRATEGY;

  @Column({ default: 50 })
  maxOrdersPerSymbol: number;

  @Column('decimal', {
    precision: 3,
    scale: 2,
    default: 0.5,
    transformer: new ColumnNumericTransformer(),
  })
  maxPriceChange: number;

  @Column({ default: 1 })
  maxSymbols: number;

  @ManyToMany(() => ESymbol, (symbol) => symbol.strategies, {
    eager: true,
    cascade: true,
  })
  @JoinTable({ name: 'symbols2strategies' })
  symbols: ESymbol[];

  @Column({ default: false })
  isActive: boolean;
}
