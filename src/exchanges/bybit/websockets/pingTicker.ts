import { IBybitRequest } from './request.interface';

export function ping(): IBybitRequest<any> {
  return {
    op: 'ping',
  };
}
