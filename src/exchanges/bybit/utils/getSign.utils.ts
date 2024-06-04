import { CONFIG } from 'src/app/app.config';
import { TObject } from 'src/shared/types/object.type';
import { sign } from 'src/shared/utils/sign.utils';
import { toString } from 'src/shared/utils/toString.utils';

export function getSign(
  timestamp: string | number,
  recvWindow: string | number,
  query: string,
  body: TObject | null,
) {
  const { KEY, SECRET } = CONFIG().BYBIT;
  const signString = timestamp + KEY + recvWindow + query + toString(body);
  return sign(signString, SECRET);
}
