import { DIR } from 'src/shared/enums/dir.enum';
import { SYMBOL } from 'src/shared/enums/symbol.enum';

export interface IPosition {
  symbol: SYMBOL;
  dir: DIR;
  liveQty?: number | null;
}
