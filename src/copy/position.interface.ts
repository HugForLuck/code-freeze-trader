import { SYMBOL } from 'src/exchanges/api/symbol.enum';
import { DIR } from 'src/shared/enums/dir.enum';

export interface IPosition {
  symbol: SYMBOL;
  dir: DIR;
  liveQty?: number;
}
