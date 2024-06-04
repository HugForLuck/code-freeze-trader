import { SYMBOL } from 'src/exchanges/api/symbol.enum';
import { DIR } from 'src/shared/enums/dir.enum';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CopyPosition {
  @PrimaryColumn()
  symbol: SYMBOL;

  @PrimaryColumn()
  dir: DIR;

  @Column()
  initialPrice: number;

  @Column()
  maxAvailableBalance: number;
}
