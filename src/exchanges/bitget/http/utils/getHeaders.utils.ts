import { CONFIG } from 'src/app/app.config';

export function getHeaders(timestamp: string, sign: string) {
  return {
    'ACCESS-KEY': CONFIG().BITGET.KEY,
    'ACCESS-SIGN': sign,
    'ACCESS-TIMESTAMP': timestamp,
    'ACCESS-PASSPHRASE': CONFIG().BITGET.PASS,
    'Content-Type': 'application/json',
    locale: 'en-US',
  };
}
