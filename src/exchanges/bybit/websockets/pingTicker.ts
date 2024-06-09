import { IBybitRequest } from './request.interface';

export function ping(): IBybitRequest {
  return {
    op: 'ping',
  };
}
