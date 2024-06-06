import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { asleep } from 'src/shared/utils/wait.utils';
import { APP } from './app.config';
import { COPY_POSITION } from 'src/copy/copyPosition.enum';
import { CopyPositionService } from 'src/copy/copyPosition.service';

@Injectable()
export class AppService {
  constructor(
    private event: EventEmitter2,
    private copy: CopyPositionService,
  ) {}

  async onApplicationBootstrap() {
    // this.event.emit(APP.RUN);
    this.event.emit(COPY_POSITION.INIT);
  }

  @OnEvent(APP.RUN)
  async boot() {
    let canRun = true;
    let isDelay = true;
    while (canRun) {
      canRun = false;
      isDelay = true;
      try {
        // await this.copy.copy();
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
