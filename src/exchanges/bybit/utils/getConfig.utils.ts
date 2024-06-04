import { getHeaders } from './getHeaders.utils';
import { getSign } from './getSign.utils';

export const getAxiosConfig = (
  timestamp: string,
  query: string,
  recvWindow = '5000',
) => {
  const sign = getSign(timestamp, recvWindow, query);
  return {
    headers: getHeaders(timestamp, sign, recvWindow),
  };
};
