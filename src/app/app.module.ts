import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserService } from 'src/userPosition/userPositionState.service';
import { ExchangeModule } from 'src/exchanges/sourceExchange.module';
import { CopyModule } from 'src/copy/copy.module';

@Module({
  imports: [EventEmitterModule.forRoot(), CopyModule, ExchangeModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
