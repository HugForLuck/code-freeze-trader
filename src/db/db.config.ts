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
  },
  relations: {
    targetPosition: true,
  },
};
