import { IBybitRequest } from './request.interface';

export function subscribePrivate<T>(): IBybitRequest<T> {
  return {
    op: 'subscribe',
    args: ['position', 'wallet'], // TODO change to position.linear
  };
}
