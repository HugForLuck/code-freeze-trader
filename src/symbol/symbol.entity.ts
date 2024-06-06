import { SYMBOL } from 'src/exchanges/api/symbol.enum';
import { EStrategy } from 'src/strategy/strategy.entity';
import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'symbols' })
export class ESymbol {
  @PrimaryColumn()
  symbol: SYMBOL;

  @ManyToMany(() => EStrategy, (strategy) => strategy.symbols)
  strategies: EStrategy[];
}
