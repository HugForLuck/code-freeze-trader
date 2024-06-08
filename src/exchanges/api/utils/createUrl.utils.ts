import { CONFIG } from 'src/app/app.config';
import { HttpRequest } from '../requests/httpRequest';

export function createBitgetUrl({ endPoint }: HttpRequest, query: string) {
  let url = CONFIG().BITGET.HTTP_URL + endPoint;
  if (query.length > 0) url += '?' + query;
  return url;
}
