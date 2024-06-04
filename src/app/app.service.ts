import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { asleep } from 'src/shared/utils/wait.utils';
import { APP } from './app.config';
import { UserService } from 'src/userPosition/userPositionState.service';
import { BybitService } from 'src/exchanges/bybit/bybit.service';

@Injectable()
export class AppService {
  constructor(
    private event: EventEmitter2,
    private user: UserService,
    private bybit: BybitService,
  ) {}

  async onApplicationBootstrap() {
    this.event.emit(APP.RUN);
    console.log('END');
  }

  @OnEvent(APP.RUN)
  async boot() {
    let canRun = true;
    let isDelay = true;
    while (canRun) {
      canRun = true;
      isDelay = true;
      console.log('looping');
      try {
        console.log(this.user.getPositions());
        // RUNNING CODE FREEZE LOGIC
      } catch (error: any) {
        // HANDLE CODE FREEZE ERRORS
        canRun = false;
        isDelay = true;
      }
      await asleep(isDelay);
    }
  }
}
