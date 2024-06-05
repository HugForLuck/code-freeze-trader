import { CATEGORY } from 'src/exchanges/api/category.enum';
import { SETTLE } from 'src/exchanges/api/settle.enum';
import { BybitRequest } from './bybitRequest';

export class UserLivePositionRequest extends BybitRequest {
  endPoint = '/v5/position/list';
  timestamp: string;
  params = {
    category: CATEGORY.LINEAR,
    settleCoin: SETTLE.USDT,
  };
}
