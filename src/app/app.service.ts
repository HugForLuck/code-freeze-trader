import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { asleep } from 'src/shared/wait.utils';
import { APP } from './app.config';

@Injectable()
export class AppService {
  constructor(private event: EventEmitter2) {}

  async onApplicationBootstrap() {
    console.clear();
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
