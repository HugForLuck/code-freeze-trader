import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserService } from 'src/userPosition/userPositionState.service';
import { BybitModule } from 'src/exchanges/bybit/bybit.module';

@Module({
  imports: [EventEmitterModule.forRoot(), BybitModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
