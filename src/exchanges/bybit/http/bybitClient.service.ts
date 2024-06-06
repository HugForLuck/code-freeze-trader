import { Injectable } from '@nestjs/common';
import { NTPService } from '../../api/ntp.service';
import { BybitRequest } from './requests/bybitRequest';
import { getQuery } from '../../api/utils/getQuery.utils';
import { HttpService } from '@nestjs/axios';
import { Observable, from, lastValueFrom, map, switchMap } from 'rxjs';
import { getHttpConfig } from './utils/getConfig.utils';
import { CONFIG } from 'src/app/app.config';
import { BybitResponse } from './responses/bybitResponse.type';

@Injectable()
export class BybitClientService {
  recvWindow = '5000';

  constructor(
    private readonly ntp: NTPService,
    private readonly http: HttpService,
  ) {}

  async get<T>(request: BybitRequest): Promise<BybitResponse<T>> {
    const timestamp = (await this.ntp.getTime()).toString();
    const query = getQuery(request.params);
    const config = getHttpConfig(timestamp, query, this.recvWindow);
    const url = CONFIG().BYBIT.HTTP_URL + `${request.endPoint}?${query}`;
    const response = await lastValueFrom(this.http.get(url, config));
    return response.data;
  }

  get$<T>(request: BybitRequest): Observable<BybitResponse<T>> {
    return from(this.ntp.getTime()).pipe(
      map((timestamp) => timestamp.toString()),
      switchMap((timestamp) => {
        const query = getQuery(request.params);
        const config = getHttpConfig(timestamp, query, this.recvWindow);
        const url = CONFIG().BYBIT.HTTP_URL + `${request.endPoint}?${query}`;
        return this.http.get(url, config);
        // return response.data;
      }),
      map((response) => response.data),
    );
  }
}
