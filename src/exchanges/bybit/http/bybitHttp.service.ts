import { NTPService } from '../../api/ntp.service';
import { getQuery } from '../../api/utils/getQuery.utils';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { getHttpConfig } from './utils/getConfig.utils';
import { CONFIG } from 'src/app/app.config';
import { BybitResponse } from './responses/bybitResponse.type';
import { Injectable } from '@nestjs/common';
import { HttpRequest } from 'src/exchanges/api/requests/httpRequest';

@Injectable()
export abstract class BybitHttpService {
  recvWindow = '5000';

  constructor(
    private readonly ntp: NTPService,
    private readonly http: HttpService,
  ) {}

  protected async get<T>(request: HttpRequest): Promise<BybitResponse<T>> {
    const timestamp = await this.ntp.getTime();
    const query = getQuery(request);
    const config = getHttpConfig(timestamp, query, this.recvWindow);
    const url = CONFIG().BYBIT.HTTP_URL + `${request.endPoint}?${query}`;

    try {
      const response = await lastValueFrom(this.http.get(url, config));
      return response.data;
    } catch (e: any) {
      throw Error('Bitget ERROR');
    }
  }
}
