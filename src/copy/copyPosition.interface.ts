import { SYMBOL } from 'src/exchanges/api/symbol.enum';
import { DIR } from 'src/shared/enums/dir.enum';

export interface ICopyPosition {
  symbol: SYMBOL;
  dir: DIR;
  maxAvailableBalance?: number;
  liveQty?: number;
  maxPriceChange?: number;
}
