import { SYMBOL } from 'src/exchanges/api/symbol.enum';
import { Strategy } from 'src/copy/strategy/strategy.entity';
import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'allowed_symbols' })
export class AllowedSymbol {
  @PrimaryColumn()
  symbol: SYMBOL;

  @ManyToMany(() => Strategy, (strategy) => strategy.allowedSymbols)
  strategies: Strategy[];
}
