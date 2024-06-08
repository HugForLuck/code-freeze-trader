import { IPosition } from 'src/copy/position.interface';
import { SYMBOL } from '../enums/symbol.enum';

export function getUniqueSymbols(orders: IPosition[]): SYMBOL[] {
  return [...new Set(orders.map((o) => o.symbol))];
}
