import { Injectable } from '@nestjs/common';
import { NTPService } from '../../api/ntp.service';
import { BybitRequest } from './requests/bybitRequest';
import { getQuery } from '../../api/utils/getQuery.utils';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { getHttpConfig } from './utils/getConfig.utils';
import { CONFIG } from 'src/app/app.config';
import { BybitResponse } from './responses/bybitResponse.type';

@Injectable()
export class BybitClientService {
  recvWindow = '5000';
  url = CONFIG().BYBIT.HTTP_URL;

  constructor(
    private readonly ntp: NTPService,
    private readonly http: HttpService,
  ) {}

  async get<T>(request: BybitRequest): Promise<BybitResponse<T>> {
    const timestamp = (await this.ntp.getTime()).toString();
    const query = getQuery(request.params);
    const config = getHttpConfig(timestamp, query, this.recvWindow);
    this.url += `${request.endPoint}?${query}`;
    const response = await lastValueFrom(this.http.get(this.url, config));
    return response.data;
  }
}
