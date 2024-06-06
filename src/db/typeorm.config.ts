import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CONFIG } from 'src/app/app.config';
import { Copy } from 'src/copy/copy.entity';
import { AllowedSymbol } from 'src/copy/copySymbols/copySymbol.entity';
import { Strategy } from 'src/copy/strategy/strategy.entity';
import { TargetPosition } from 'src/copy/targetPositions/targetPosition.entity';
import { OriginPosition } from 'src/copy/origniPosition.ts/originPosition.entity';
import { Trader } from 'src/copy/trader/trader.entity';

export const entities = [
  Copy,
  TargetPosition,
  OriginPosition,
  Trader,
  Strategy,
  AllowedSymbol,
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
