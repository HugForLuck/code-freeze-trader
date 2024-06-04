import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserService } from 'src/userPosition/userPositionState.service';
import { ExchangeModule } from 'src/exchanges/sourceExchange.module';
import { CopyModule } from 'src/copy/copy.module';
import { ConfigModule } from '@nestjs/config';
import { CONFIG } from './app.config';
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
  providers: [AppService, UserService],
})
export class AppModule {}
