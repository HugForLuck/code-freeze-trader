import { CATEGORY } from 'src/exchanges/api/category.enum';
import { HttpRequest } from 'src/exchanges/api/requests/httpRequest';
import { SETTLE } from 'src/exchanges/api/settle.enum';

export class UserLivePositionRequest extends HttpRequest {
  endPoint = '/v5/position/list';
  timestamp: string;
  params = {
    category: CATEGORY.LINEAR,
    settleCoin: SETTLE.USDT,
  };
}
