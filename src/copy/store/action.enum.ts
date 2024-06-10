import { ITicker } from 'src/exchanges/bybit/websockets/response/ticker.interface';
import { Copy } from '../copy.entity';
import { STATUS } from './status.enum';
import { IPosition } from '../position.interface';

export enum ACTION {
  SET_STATUS = 'SET_STATUS',
  SET_COPIES = 'SET_COPIES',
  SET_MARKPRICES = 'SET_MARKPRICES',
  SET_ORIGIN_LIVE_QTYS = 'SET_ORIGIN_LIVE_QTYS',
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
  setMarkPrices: (ticker?: ITicker) => ({
    type: ACTION.SET_MARKPRICES,
    payload: ticker,
  }),
  setLiveQtys: (positions?: IPosition[]) => ({
    type: ACTION.SET_ORIGIN_LIVE_QTYS,
    payload: positions,
  }),
};
