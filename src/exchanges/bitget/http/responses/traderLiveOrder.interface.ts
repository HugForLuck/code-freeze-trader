import { SYMBOL } from 'src/shared/enums/symbol.enum';

export interface ITraderLiveOrder {
  trackingNo: string;
  openOrderId: string;
  marginMode: string;
  posSide: string;
  symbol: SYMBOL;
  openLeverage: string;
  openPriceAvg: string;
  openTime: string;
  openQty: string;
  openFee: string;
  marginAmount: string;
  followCount: string;
  stopSurplusPrice: string;
  stopLossPrice: string;
  cTime: string;
}
