import { SYMBOL } from '../enums/symbol.enum';

export function toSymbol(s: string): SYMBOL {
  return SYMBOL[s as keyof typeof SYMBOL];
}
