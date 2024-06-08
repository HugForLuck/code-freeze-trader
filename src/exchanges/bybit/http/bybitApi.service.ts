import { UserLivePositionRequest } from './requests/userLivePositionRequest';
import { BybitHttpService } from './bybitHttp.service';
import {
  IPositionInfo,
  IPositionInfoResponse,
} from './responses/positionInfoResponse.interface';
import { Observable, map, switchMap, timer } from 'rxjs';

export abstract class BybitApiService extends BybitHttpService {
  async getAPIUserLivePositions(): Promise<IPositionInfo[]> {
    const request = new UserLivePositionRequest();
    const axiosResponse = await this.get<IPositionInfoResponse>(request);
    return axiosResponse.result.list;
  }

  getAPIUserLivePositions$(): Observable<IPositionInfo[]> {
    const request = new UserLivePositionRequest();
    return timer(0, 1000).pipe(
      switchMap(() =>
        this.get$<IPositionInfoResponse>(request).pipe(
          map((response) => response.result.list),
        ),
      ),
    );
  }
}
