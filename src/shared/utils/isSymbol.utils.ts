import { SYMBOL } from 'src/exchanges/api/symbol.enum';
import { isEnum } from './isEnum.utils';

export const isSYMBOL = (o: unknown): boolean => isEnum(o, SYMBOL);
