import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CONFIG } from 'src/app/app.config';
import { Copy } from 'src/copy/copy.entity';
import { CopySymbol } from 'src/copy/copySymbols/copySymbol.entity';
import { Strategy } from 'src/copy/strategy/strategy.entity';
import { TargetPosition } from 'src/copy/targetPositions/targetPosition.entity';

export const entities = [Copy, TargetPosition, Strategy, CopySymbol];

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const { DB } = CONFIG();
    return {
      type: 'mysql',
      host: DB.HOST,
      port: +DB.PORT,
      username: DB.USERNAME,
      password: DB.PASSWORD,
      database: DB.DATABASE,
      entities,
      synchronize: true,
    };
  }
}
