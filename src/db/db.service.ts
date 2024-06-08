import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Copy } from 'src/copy/copy.entity';
import { copyFindAllOptions } from './db.config';

@Injectable()
export class DBService {
  constructor(
    @InjectRepository(Copy)
    private readonly dbCopy: Repository<Copy>,
  ) {}

  async getCopies(): Promise<Copy[]> {
    return await this.dbCopy.find(copyFindAllOptions);
  }

  // getCopies$(): Observable<Copy[]> {
  //   return timer(0, 1000).pipe(
  //     switchMap(() => this.dbCopy.find(copyFindAllOptions)),
  //   );
  // }

  async saveCopies(copies: Copy[]) {
    return await this.dbCopy.save(copies);
  }
}
