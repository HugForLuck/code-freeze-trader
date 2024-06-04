import { getHeaders } from './getHeaders.utils';

export const getAxiosConfig = (
  timestamp: string,
  sign: string,
  recvWindow = '5000',
) => ({
  headers: getHeaders(timestamp, sign, recvWindow),
});
