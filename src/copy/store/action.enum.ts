import { ITicker } from 'src/exchanges/bybit/websockets/response/ticker.interface';
import { Copy } from '../copy.entity';
import { STATUS } from './status.enum';

export enum ACTION {
  SET_STATUS = 'SET_STATUS',
  SET_COPIES = 'SET_COPIES',
  SET_MARKPRICES = 'SET_MARKPRICES',
}

export const copyActions = {
  setStatus: (status: STATUS) => ({
    type: ACTION.SET_STATUS,
    payload: status,
  }),
  setCopies: (status: Copy[]) => ({
    type: ACTION.SET_COPIES,
    payload: status,
  }),
  setMarkPrices: (ticker: ITicker) => ({
    type: ACTION.SET_MARKPRICES,
    payload: ticker,
  }),
};
