import { Injectable } from '@nestjs/common';
import { BitgetApiService } from './bitget.service';

@Injectable()
export class BitgetMiddleware extends BitgetApiService {}
