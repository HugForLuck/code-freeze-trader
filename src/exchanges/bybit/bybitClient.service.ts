import { Injectable } from '@nestjs/common';
import { NTPService } from '../api/ntp.service';
import { BybitRequest } from './requests/bybitRequest';
import { getQuery } from '../api/utils/getQuery.utils';
import { getSign } from './utils/getSign.utils';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { getAxiosConfig } from './utils/getConfig.utils';

@Injectable()
export class BybitClientService {
  constructor(
    private readonly ntp: NTPService,
    private readonly http: HttpService,
  ) {}

  async get(request: BybitRequest) {
    const timestamp = (await this.ntp.getTime()).toString();
    const query = getQuery(request.params);
    const body = null;
    const recvWindow = '5000';
    const signature = getSign(timestamp, recvWindow, query, body);
    const config = getAxiosConfig(timestamp, signature, recvWindow);
    const url = `https://api-demo.bybit.com${request.endPoint}?${query}`;
    const response = await lastValueFrom(this.http.get(url, config));
    return response;
  }
}
