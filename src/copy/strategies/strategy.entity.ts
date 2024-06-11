import { Column, Entity, PrimaryColumn } from 'typeorm';
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

  maxPriceChange: string;

  allowedSymbols: SYMBOL[];

  maxSymbols: number;
}
