import { CONFIG } from 'src/app/app.config';

export const getHeaders = (
  timestamp: string,
  sign: string,
  recvWindow = '5000',
) => ({
  'X-BAPI-API-KEY': CONFIG().BYBIT.KEY,
  'X-BAPI-TIMESTAMP': timestamp,
  'X-BAPI-RECV-WINDOW': recvWindow,
  'X-BAPI-SIGN': sign,
});
