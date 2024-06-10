import { UserLivePositionRequest } from './requests/userLivePositionRequest';
import { BybitClientService } from './bybitClient.service';
import {
  IPositionInfo,
  IPositionInfoResponse,
} from './responses/positionInfoResponse.interface';
import { SYMBOL } from 'src/shared/enums/symbol.enum';
import { TickerRequest } from 'src/exchanges/bitget/http/requests/tickerRequest';
import { ITickerResponse } from './responses/tickerResponse.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BybitHttpService extends BybitClientService {
  async getUserLivePositions(): Promise<IPositionInfo[]> {
    const request = new UserLivePositionRequest();
    const axiosResponse = await this.get<IPositionInfoResponse>(request);
    //  TODO catch 10002 servertime desynced
    return axiosResponse.result.list;
  }

  async getTicker(symbol: SYMBOL) {
    const request = new TickerRequest(symbol);
    const response = await this.get<ITickerResponse>(request);
    return response.result.list[0];
  }
}
