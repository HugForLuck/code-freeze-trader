import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ExchangeModule } from 'src/exchanges/sourceExchange.module';
import { ConfigModule } from '@nestjs/config';
import { CONFIG } from './app.config';
import { CopyModule } from 'src/copy/copy.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBModule } from 'src/db/db.module';
import { TypeOrmConfigService } from 'src/db/typeorm.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/env/.env',
      isGlobal: true,
      load: [CONFIG],
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    DBModule,
    CopyModule,
    ExchangeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
