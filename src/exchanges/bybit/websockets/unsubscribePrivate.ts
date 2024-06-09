import { IBybitRequest } from './request.interface';

export function unsubscribePrivate(): IBybitRequest {
  return {
    op: 'unsubscribe',
    args: ['position'],
  };
}
