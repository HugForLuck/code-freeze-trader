import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Copy } from 'src/copy/copy.entity';
import { copyFindAllOptions, findOneStrategyOptions } from './db.options';
import { Trader } from 'src/copy/trader/trader.entity';
import { Strategy } from 'src/copy/strategies/strategy.entity';
import { SYMBOL } from 'src/shared/enums/symbol.enum';

@Injectable()
export class DBService {
  constructor(
    @InjectRepository(Copy)
    private readonly dbCopy: Repository<Copy>,
    @InjectRepository(Trader)
    private readonly dbTrader: Repository<Trader>,
    @InjectRepository(Strategy)
    private readonly dbStrategy: Repository<Strategy>,
  ) {}

  async getCopies(): Promise<Copy[]> {
    return await this.dbCopy.find(copyFindAllOptions);
  }

  async getTraders(): Promise<Trader[]> {
    return await this.dbTrader.find();
  }

  async getStrategy(symbol: SYMBOL, trader: Trader): Promise<Strategy | null> {
    return await this.dbStrategy.findOne(
      findOneStrategyOptions(symbol, trader),
    );
  }

  async saveCopies(copies: Copy[]) {
    return await this.dbCopy.save(copies);
  }
}
