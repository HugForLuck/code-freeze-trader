import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CONFIG } from 'src/app/app.config';
import { CopyPosition } from 'src/copy/copyPosition';

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
      entities: [CopyPosition],
      synchronize: true,
    };
  }
}
