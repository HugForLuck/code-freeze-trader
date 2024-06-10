import { IBybitRequest } from './request.interface';

export function unsubscribePrivate(): IBybitRequest<any> {
  return {
    op: 'unsubscribe',
    args: ['position'],
  };
}
