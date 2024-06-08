import { Copy } from 'src/copy/copy.entity';
import { FindManyOptions } from 'typeorm';

export const copyFindAllOptions: FindManyOptions<Copy> = {
  select: {
    symbol: true,
    dir: true,
    targetPosition: {
      symbol: true,
      dir: true,
      targetExchange: true,
      maxAvailableBalance: true,
      initialPrice: true,
    },
    originPosition: {
      symbol: true,
      dir: true,
      originExchange: true,
    },
  },
  relations: {
    targetPosition: true,
    originPosition: true,
    strategy: true,
  },
};
