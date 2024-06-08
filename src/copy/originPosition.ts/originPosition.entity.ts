import { DIR } from 'src/shared/enums/dir.enum';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ORIGIN_EXCHANGE } from '../originExchange.enum';
import { Trader } from '../trader/trader.entity';
import { SYMBOL } from 'src/shared/enums/symbol.enum';

@Entity({ name: 'origin_positions' })
export class OriginPosition {
  @PrimaryColumn()
  symbol: SYMBOL;

  @PrimaryColumn()
  dir: DIR;

  @PrimaryColumn()
  originExchange: ORIGIN_EXCHANGE;

  @ManyToOne(() => Trader, { eager: true })
  trader: Trader | null;

  traderLiveOrders: number | null;
}
