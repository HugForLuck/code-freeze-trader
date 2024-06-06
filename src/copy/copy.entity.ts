import { SYMBOL } from 'src/exchanges/api/symbol.enum';
import { DIR } from 'src/shared/enums/dir.enum';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { TARGET_EXCHAGE } from './targetExchange.enum';
import { TargetPosition } from './targetPositions/targetPosition.entity';
import { Strategy } from './strategy/strategy.entity';
import { OriginPosition } from './origniPosition.ts/originPosition.entity';

@Entity()
export class Copy {
  @PrimaryColumn()
  symbol: SYMBOL;

  @PrimaryColumn()
  dir: DIR;

  @PrimaryColumn()
  targetExchange: TARGET_EXCHAGE;

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
  originPosition: OriginPosition;

  @ManyToOne(() => Strategy, { eager: true })
  @JoinColumn({ name: 'strategyId' })
  strategy: Strategy;
}
