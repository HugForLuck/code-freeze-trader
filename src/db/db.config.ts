import { Copy } from 'src/copy/copy.entity';
import { FindManyOptions } from 'typeorm';

export const copyFindAllOptions: FindManyOptions<Copy> = {
  select: {
    symbol: true,
    dir: true,
    targetPosition: {
      targetExchange: true,
      maxAvailableBalance: true,
      initialPrice: true,
    },
    originPosition: {
      originExchange: true,
    },
    strategy: {
      maxOrdersPerSymbol: true,
      maxPriceChange: true,
      maxSymbols: true,
      allowedSymbols: true,
    },
  },
  relations: {
    targetPosition: true,
    originPosition: true,
    strategy: true,
  },
};
