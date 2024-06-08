import { UserLivePositionRequest } from './requests/userLivePositionRequest';
import { BybitHttpService } from './bybitHttp.service';
import {
  IPositionInfo,
  IPositionInfoResponse,
} from './responses/positionInfoResponse.interface';

export abstract class BybitApiService extends BybitHttpService {
  async getAPIUserLivePositions(): Promise<IPositionInfo[]> {
    const request = new UserLivePositionRequest();
    const axiosResponse = await this.get<IPositionInfoResponse>(request);
    //  TODO catch 10002 servertime desynced
    return axiosResponse.result.list;
  }
}
