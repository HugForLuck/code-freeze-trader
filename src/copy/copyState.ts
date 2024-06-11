import { Copy } from './copy.entity';
import { STATUS } from './store/status.enum';

export interface ICopyState {
  status: STATUS;
  count: number;
  copies: Copy[];
}

export const initialCopyState: ICopyState = {
  status: STATUS.NOT_INITIALIZED,
  count: 0,
  copies: [],
};
