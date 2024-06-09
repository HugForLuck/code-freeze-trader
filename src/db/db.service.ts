import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Copy } from 'src/copy/copy.entity';
import { copyFindAllOptions } from './db.config';
import { Trader } from 'src/copy/trader/trader.entity';

@Injectable()
export class DBService {
  constructor(
    @InjectRepository(Copy)
    private readonly dbCopy: Repository<Copy>,
    @InjectRepository(Trader)
    private readonly dbTrader: Repository<Trader>,
  ) {}

  async getCopies(): Promise<Copy[]> {
    return await this.dbCopy.find(copyFindAllOptions);
  }

  async getTraders(): Promise<Trader[]> {
    return await this.dbTrader.find();
  }

  async saveCopies(copies: Copy[]) {
    return await this.dbCopy.save(copies);
  }
}
