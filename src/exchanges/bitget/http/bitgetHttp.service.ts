import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { NTPService } from 'src/exchanges/api/ntp.service';

@Injectable()
export abstract class BitgetHttpService {
  constructor(
    private readonly ntp: NTPService,
    private readonly http: HttpService,
  ) {}
}
