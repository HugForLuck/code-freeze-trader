import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { AllowedSymbol } from 'src/copy/copySymbols/copySymbol.entity';
import { ColumnNumericTransformer } from 'src/db/utils/columnNumericTransformer.utils';
import { STRATEGY } from './strategy.enum';
/**
 *
 * Stores different types of strategies, e.g. 1 symbol at a time,
 * 2 symbols, maxOrders, qty per symbol, etc.
 *
 */
@Entity({ name: 'strategies' })
export class Strategy {
  @PrimaryColumn()
  strategyId: STRATEGY;

  @Column({ default: 50 })
  maxOrdersPerSymbol: number;

  @Column('decimal', {
    precision: 3,
    scale: 2,
    default: 0.5,
    transformer: new ColumnNumericTransformer(),
  })
  maxPriceChange: number;

  @Column({ default: 2 })
  maxSymbols: number;

  @ManyToMany(() => AllowedSymbol, (symbol) => symbol.strategies, {
    eager: true,
    cascade: true,
  })
  @JoinTable({ name: 'symbols2strategies' })
  symbols: AllowedSymbol[];

  @Column({ default: false })
  isActive: boolean;
}
