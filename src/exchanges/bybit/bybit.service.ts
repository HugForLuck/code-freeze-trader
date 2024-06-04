import { Injectable } from '@nestjs/common';

@Injectable()
export class BybitService {
  onApplicationBootstrap() {
    console.log('BybitService constructor');
  }
}
