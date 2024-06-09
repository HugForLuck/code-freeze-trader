import { CONFIG } from 'src/app/app.config';
import { METHOD } from 'src/exchanges/api/utils/method.enum';
import { ENCODING } from 'src/shared/enums/encoding.enum';
import { sign } from 'src/shared/utils/sign.utils';
import { stringify } from 'src/shared/utils/stringify.utils';

export function getHttpSign(
  timestamp: string,
  method: METHOD,
  path: string,
  query: string,
  body: any,
) {
  const data = +timestamp + method + path + '?' + query + stringify(body);
  return sign(data, CONFIG().BITGET.SECRET, ENCODING.BASE64);
}
