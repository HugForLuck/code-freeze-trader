import { Injectable } from '@nestjs/common';
import { NTPService } from '../api/ntp.service';
import { UserLivePositionRequest } from './requests/userLivePositionRequest';
import { BybitClientService } from './bybitClient.service';

@Injectable()
export class BybitService {
  constructor(
    private readonly client: BybitClientService,
    private readonly ntp: NTPService,
  ) {}

  async getUserLivePositions(): Promise<any> {
    const request = new UserLivePositionRequest();
    const response = await this.client.get(request);
    console.log('Response', response);
  }
}
