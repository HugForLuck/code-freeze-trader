import { DIR } from 'src/shared/enums/dir.enum';
import { OriginPosition } from './originPosition.ts/originPosition.entity';
import { TARGET_EXCHANGE } from './targetExchange.enum';
import { TargetPosition } from './targetPositions/targetPosition.entity';
import { SYMBOL } from 'src/shared/enums/symbol.enum';

export interface ICopy {
  symbol: SYMBOL; // Unique symbol
  dir: DIR; // Unique direction
  targetExchange: TARGET_EXCHANGE;
  targetPosition: TargetPosition | null;
  originPosition: OriginPosition | null;
  // strategy: Strategy | null;
}
