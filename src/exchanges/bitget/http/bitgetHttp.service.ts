import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { NTPService } from 'src/exchanges/api/ntp.service';
import { getQuery } from 'src/exchanges/api/utils/getQuery.utils';
import { getHttpConfig } from './utils/getConfig.utils';
import { METHOD } from 'src/exchanges/api/utils/method.enum';
import { BitgetResponse } from './responses/bitgetResponse.type';
import { lastValueFrom } from 'rxjs';
import { createBitgetUrl } from 'src/exchanges/api/utils/createUrl.utils';
import { HttpRequest } from 'src/exchanges/api/requests/httpRequest';

@Injectable()
export abstract class BitgetHttpService {
  constructor(
    private readonly ntp: NTPService,
    private readonly http: HttpService,
  ) {}

  protected async get<T>(request: HttpRequest): Promise<BitgetResponse<T>> {
    const timestamp = await this.ntp.getTime();
    const query = getQuery(request);
    const body = null;
    const config = getHttpConfig(timestamp, METHOD.GET, request, query, body);
    const url = createBitgetUrl(request, query);
    try {
      const response = await lastValueFrom(this.http.get(url, config));
      return response.data;
    } catch (e: any) {
      console.log(request);
      console.log(e);
      throw Error(e);
    }
  }
}
