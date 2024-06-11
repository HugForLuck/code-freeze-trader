import { DIR } from 'src/shared/enums/dir.enum';
import { OriginPosition } from './origin/originPosition.entity';
import { TARGET_EXCHANGE } from './target/targetExchange.enum';
import { TargetPosition } from './target/targetPosition.entity';
import { SYMBOL } from 'src/shared/enums/symbol.enum';
import { IPosition } from './position.interface';

export interface ICopy extends IPosition {
  symbol: SYMBOL; // Unique symbol
  dir: DIR; // Unique direction
  targetExchange: TARGET_EXCHANGE;
  targetPosition: TargetPosition | null;
  originPosition: OriginPosition | null;
  // strategy: Strategy | null;
}
