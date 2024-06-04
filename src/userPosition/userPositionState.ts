import { STORE_STATE } from 'src/store/storeState.enum';
import { IUserPosition } from './userPosition.interface';

export class UserPosition {
  state = STORE_STATE.NOT_SYNCED;
  data: IUserPosition[];
}
