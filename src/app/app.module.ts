import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ExchangeModule } from 'src/exchanges/sourceExchange.module';
import { ConfigModule } from '@nestjs/config';
import { CONFIG } from './app.config';
import { CopyModule } from 'src/copyPosition/copy.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/env/.env',
      isGlobal: true,
      load: [CONFIG],
    }),
    EventEmitterModule.forRoot(),
    CopyModule,
    ExchangeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
