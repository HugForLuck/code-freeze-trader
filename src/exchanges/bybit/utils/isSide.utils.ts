import { isEnum } from '../../../shared/utils/isEnum.utils';
import { SIDE } from 'src/exchanges/api/side.enum';

export const isSIDE = (o: unknown): boolean => isEnum(o, SIDE);
