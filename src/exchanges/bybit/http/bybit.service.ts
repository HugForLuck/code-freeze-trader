import { Injectable } from '@nestjs/common';
import { UserLivePositionRequest } from './requests/userLivePositionRequest';
import { BybitClientService } from './bybitClient.service';
import {
  IPositionInfo,
  IPositionInfoResponse,
} from './responses/positionInfoResponse.interface';
import { Observable, map, switchMap, timer } from 'rxjs';

@Injectable()
export class BybitService {
  constructor(private readonly client: BybitClientService) {}

  async getUserLivePositions(): Promise<IPositionInfo[]> {
    const request = new UserLivePositionRequest();
    const axiosResponse = await this.client.get<IPositionInfoResponse>(request);
    return axiosResponse.result.list;
  }

  getUserLivePositions$(): Observable<IPositionInfo[]> {
    const request = new UserLivePositionRequest();
    return timer(0, 1000).pipe(
      switchMap(() =>
        this.client
          .get$<IPositionInfoResponse>(request)
          .pipe(map((response) => response.result.list)),
      ),
    );
  }
}
