import { Injectable } from '@nestjs/common';
import { NTPService } from '../api/ntp.service';
import { UserLivePositionRequest } from './requests/userLivePositionRequest';
import { BybitClientService } from './bybitClient.service';
import {
  IPositionInfo,
  IPositionInfoResponse,
} from './responses/positionInfoResponse.interface';

@Injectable()
export class BybitService {
  constructor(
    private readonly client: BybitClientService,
    private readonly ntp: NTPService,
  ) {}

  async getUserLivePositions(): Promise<IPositionInfo[]> {
    const request = new UserLivePositionRequest();
    const axiosResponse = await this.client.get<IPositionInfoResponse>(request);
    return axiosResponse.result.list;
  }
}
