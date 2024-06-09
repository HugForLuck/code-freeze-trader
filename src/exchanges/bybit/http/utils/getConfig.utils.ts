import { getHeaders } from './getHeaders.utils';
import { getHttpSign } from './getHttpSign.utils';

export const getHttpConfig = (
  timestamp: string,
  query: string,
  recvWindow = '5000',
) => {
  const sign = getHttpSign(timestamp, recvWindow, query);
  return {
    headers: getHeaders(timestamp, sign, recvWindow),
  };
};
