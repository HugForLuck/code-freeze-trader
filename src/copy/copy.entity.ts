import { DIR } from 'src/shared/enums/dir.enum';
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { TARGET_EXCHANGE } from './target/targetExchange.enum';
import { TargetPosition } from './target/targetPosition.entity';
import { OriginPosition } from './origin/originPosition.entity';
import { ICopy } from './copy.interface';
import { IPosition } from './position.interface';
import { SYMBOL } from 'src/shared/enums/symbol.enum';
import { Strategy } from './strategies/strategy.entity';

@Entity()
export class Copy implements ICopy {
  @PrimaryColumn()
  symbol: SYMBOL;

  @PrimaryColumn()
  dir: DIR;

  @PrimaryColumn()
  targetExchange: TARGET_EXCHANGE;

  @OneToOne(() => TargetPosition)
  @JoinColumn([
    { name: 'symbol', referencedColumnName: 'symbol' },
    { name: 'dir', referencedColumnName: 'dir' },
    { name: 'targetExchange', referencedColumnName: 'targetExchange' },
  ])
  targetPosition: TargetPosition;

  @OneToOne(() => OriginPosition)
  @JoinColumn([
    { name: 'symbol', referencedColumnName: 'symbol' },
    { name: 'dir', referencedColumnName: 'dir' },
  ])
  originPosition: OriginPosition | null;

  @OneToOne(() => Strategy)
  @JoinColumn([
    { name: 'symbol', referencedColumnName: 'symbol' },
    { name: 'traderId', referencedColumnName: 'traderId' },
  ])
  strategy: Strategy;

  /**
   *
   * Helper
   *
   */
  isCopy(pos: IPosition): boolean {
    return this.symbol == pos.symbol && this.dir == pos.dir;
  }

  resetTarget() {
    this.targetPosition.initialPrice = '';
    this.targetPosition.maxAvailableBalance = '';
    this.targetPosition.liveQty = '';
  }
}
