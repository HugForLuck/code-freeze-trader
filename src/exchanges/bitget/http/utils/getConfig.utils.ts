import { METHOD } from 'src/exchanges/api/utils/method.enum';
import { getHeaders } from './getHeaders.utils';
import { getHttpSign } from './getHttpSign.utils';
import { HttpRequest } from 'src/exchanges/api/requests/httpRequest';

export const getHttpConfig = (
  timestamp: string,
  method: METHOD,
  { endPoint }: HttpRequest,
  query: string,
  body: any,
) => {
  const sign = getHttpSign(timestamp, method, endPoint, query, body);
  return {
    headers: getHeaders(timestamp, sign),
  };
};
