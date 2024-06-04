import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { asleep } from 'src/shared/utils/wait.utils';
import { APP } from './app.config';
import { CopyService } from 'src/copy/copy.service';

@Injectable()
export class AppService {
  constructor(
    private event: EventEmitter2,
    private copy: CopyService,
  ) {}

  async onApplicationBootstrap() {
    this.event.emit(APP.RUN);
  }

  @OnEvent(APP.RUN)
  async boot() {
    console.log('🔵', process.env.BYBIT_KEY);
    let canRun = true;
    let isDelay = true;
    while (canRun) {
      canRun = false;
      isDelay = true;
      try {
        await this.copy.copy();
        // RUNNING CODE FREEZE LOGIC
      } catch (error: any) {
        console.log(error);
        // HANDLE CODE FREEZE ERRORS
        canRun = false;
        isDelay = true;
      }
      await asleep(isDelay);
    }
  }
}
