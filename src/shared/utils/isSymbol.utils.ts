import { SYMBOL } from '../enums/symbol.enum';
import { isEnum } from './isEnum.utils';

export const isSYMBOL = (o: unknown): boolean => isEnum(o, SYMBOL);
