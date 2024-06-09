import { HttpRequest } from 'src/exchanges/api/requests/httpRequest';
import { BitgetResponse } from './bitgetResponse.type';

export function validateBitgetResponse<T>(
  response: BitgetResponse<T>,
  request: HttpRequest,
) {
  if (response.code == '40732') {
    console.log('trader not trader anymore', response, request);
    throw Error(response.msg);
  } else if (response.code !== '00000') {
    console.log('bitget any other error', response, request);
    throw Error(response.msg);
  }
  return response.data;
}
