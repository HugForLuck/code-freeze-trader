import { Copy } from './copy.entity';
import { STATUS } from './store/status.enum';
import { Strategy } from './strategies/strategy.entity';

export interface ICopyState {
  status: STATUS;
  count: number;
  copies: Copy[];
  strategies: Strategy[];
}

export const initialCopyState: ICopyState = {
  status: STATUS.NOT_INITIALIZED,
  count: 0,
  copies: [],
  strategies: [],
};
