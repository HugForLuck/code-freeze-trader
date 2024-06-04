import { Injectable } from '@nestjs/common';
import { UserPosition } from './userPositionState';

@Injectable()
export class UserService {
  private _positions: UserPosition[] = [];

  getPositions() {
    console.log('Reading user state');
    return this._positions;
  }
}
