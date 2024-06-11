import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CONFIG } from 'src/app/app.config';
import { Copy } from 'src/copy/copy.entity';
import { TargetPosition } from 'src/copy/target/targetPosition.entity';
import { OriginPosition } from 'src/copy/origin/originPosition.entity';
import { Trader } from 'src/copy/trader/trader.entity';
import { Strategy } from 'src/copy/strategies/strategy.entity';

export const entities = [
  Copy,
  TargetPosition,
  OriginPosition,
  Strategy,
  Trader,
];

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
