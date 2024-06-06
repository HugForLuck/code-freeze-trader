import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBService } from './db.service';
import { ECopyPosition } from 'src/copy/copyPosition.entity';
import { EStrategy } from 'src/strategy/strategy.entity';
import { ESymbol } from 'src/symbol/symbol.entity';

export const entities = [ECopyPosition, EStrategy, ESymbol];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [DBService],
  exports: [TypeOrmModule, DBService],
})
export class DBModule {}
