import { SYMBOL } from 'src/exchanges/api/symbol.enum';
import { DIR } from 'src/shared/enums/dir.enum';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ORIGIN_EXCHANGE } from '../originExchange.enum';
import { Trader } from '../trader/trader.entity';

@Entity()
export class OriginPosition {
  @PrimaryColumn()
  symbol: SYMBOL;

  @PrimaryColumn()
  dir: DIR;

  @PrimaryColumn()
  originExchange: ORIGIN_EXCHANGE;

  @ManyToOne(() => Trader)
  trader: Trader;

  traderLiveOrders: number;
}
