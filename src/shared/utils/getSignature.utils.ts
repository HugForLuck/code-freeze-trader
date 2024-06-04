import { createHmac } from 'crypto';
import { toString } from './toString.utils';
import { ENCODING } from '../enums/encoding.enum';

export function getSignature(
  params: unknown,
  secret: string,
  encoding = ENCODING.HEX,
) {
  const data = toString(params);
  return createHmac('sha256', secret).update(data).digest(encoding);
}
