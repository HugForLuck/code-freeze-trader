import { Injectable } from '@nestjs/common';
import { CATEGORY } from '../api/category.enum';
import { SETTLE } from '../api/settle.enum';
import { toString } from 'src/shared/utils/toString.utils';
import { getSignature } from 'src/shared/utils/getSignature.utils';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { NTPService } from '../api/ntp.service';

@Injectable()
export class BybitService {
  constructor(
    private readonly http: HttpService,
    private readonly ntp: NTPService,
  ) {}
  async getUserLivePositions(): Promise<any> {
    console.log(await this.ntp.getTime());
    const endPoint = '/v5/position/list';
    const timestamp = Date.now().toString();
    const params = {
      category: CATEGORY.LINEAR,
      settleCoin: SETTLE.USDT,
    };
    const apiKey = 'KJgI0IoNbh4ZvY4sIB';
    const secret = 'kbCFVINcueBlAr41IRSUDEMbUxIi8wf0Ov5o';
    const query = new URLSearchParams(params).toString();
    const body = null;
    const signString = timestamp + apiKey + 5000 + query + toString(body);
    const signature = getSignature(signString, secret);
    const headers = {
      'X-BAPI-API-KEY': apiKey,
      'X-BAPI-TIMESTAMP': timestamp,
      'X-BAPI-RECV-WINDOW': 5000,
      'X-BAPI-SIGN': signature,
    };
    const response = await lastValueFrom(
      this.http.get(`https://api-demo.bybit.com${endPoint}?${query}`, {
        headers,
      }),
    );
    console.log('Response', response);
  }
}
