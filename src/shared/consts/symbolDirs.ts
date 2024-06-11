import { AllowedSymbols } from 'src/copy/copy.config';
import { DIRS } from './dirs';
import { IPosition } from 'src/copy/position.interface';

export const SymbolDirs: IPosition[] = AllowedSymbols.map((symbol) =>
  DIRS.map((dir) => ({ symbol, dir })),
).flat();
