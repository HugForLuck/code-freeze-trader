import { createHmac } from 'crypto';
import { CONFIG } from 'src/app/app.config';
import { IBybitRequest } from '../request.interface';

export function authPrivate(): IBybitRequest<any> {
  const expires = Date.now() + 10000; // 10 seconds in the future
  const signature = createHmac('sha256', CONFIG().BYBIT.SECRET)
    .update(`GET/realtime${expires}`)
    .digest('hex');

  const authPayload: IBybitRequest<any> = {
    op: 'auth',
    args: [CONFIG().BYBIT.KEY, expires, signature],
  };
  return authPayload;
}
