import { Injectable } from '@nestjs/common';
import { asleep } from 'src/shared/wait.utils';

@Injectable()
export class AppService {
  async onApplicationBootstrap() {
    console.log('START');
    await asleep();
    console.log('END');
  }
}
