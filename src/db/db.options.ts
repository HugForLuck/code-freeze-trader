import { Copy } from 'src/copy/copy.entity';
import { Strategy } from 'src/copy/strategies/strategy.entity';
import { Trader } from 'src/copy/trader/trader.entity';
import { SYMBOL } from 'src/shared/enums/symbol.enum';
import { FindManyOptions, FindOneOptions } from 'typeorm';

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

export const findOneStrategyOptions = (
  symbol: SYMBOL,
  { traderId }: Trader,
): FindOneOptions<Strategy> => ({
  where: {
    symbol,
    traderId,
  },
});
