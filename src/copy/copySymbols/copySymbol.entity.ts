import { SYMBOL } from 'src/exchanges/api/symbol.enum';
import { Strategy } from 'src/copy/strategy/strategy.entity';
import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'symbols' })
export class CopySymbol {
  @PrimaryColumn()
  symbol: SYMBOL;

  @ManyToMany(() => Strategy, (strategy) => strategy.symbols)
  strategies: Strategy[];
}
