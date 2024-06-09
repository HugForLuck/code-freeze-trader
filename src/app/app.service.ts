import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { COPY_ACTIONS } from 'src/copy/copy.actions';

@Injectable()
export class AppService {
  constructor(private event: EventEmitter2) {}

  async onApplicationBootstrap() {
    this.event.emit(COPY_ACTIONS.INIT);
  }

  // @OnEvent(APP.RUN)
  // async boot() {
  //   let canRun = true;
  //   let isDelay = true;
  //   while (canRun) {
  //     canRun = false;
  //     isDelay = true;
  //     try {
  //       // await this.copy.copy();
  //       // RUNNING CODE FREEZE LOGIC
  //     } catch (error: any) {
  //       // HANDLE CODE FREEZE ERRORS
  //       canRun = false;
  //       isDelay = true;
  //     }
  //     await asleep(isDelay);
  //   }
  // }
}
