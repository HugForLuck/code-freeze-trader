import { SIDE } from 'src/exchanges/api/side.enum';
import { SYMBOL } from 'src/exchanges/api/symbol.enum';

export interface IPositionInfoResponse {
  list: IPositionInfo[];
}

export interface IPositionInfo {
  positionIdx: number;
  riskId: number;
  riskLimitValue: string;
  symbol: SYMBOL;
  side: SIDE;
  size: string;
  avgPrice: string;
  positionValue: string;
  tradeMode: number;
  positionStatus: string;
  autoAddMargin: number;
  adlRankIndicator: number;
  leverage: string;
  positionBalance: string;
  markPrice: string;
  liqPrice: string;
  bustPrice: string;
  positionMM: string;
  positionIM: string;
  tpslMode: string;
  takeProfit: string;
  stopLoss: string;
  trailingStop: string;
  unrealisedPnl: string;
  curRealisedPnl: string;
  cumRealisedPnl: string;
  seq: number;
  isReduceOnly: boolean;
  mmrSysUpdateTime: string;
  leverageSysUpdatedTime: string;
  sessionAvgPrice: string;
  createdTime: string;
  updatedTime: string;
}
