import { IBybitRequest } from './request.interface';

export function subscribePrivate(): IBybitRequest<any> {
  return {
    op: 'subscribe',
    args: ['position'], // TODO change to position.linear
  };
}
