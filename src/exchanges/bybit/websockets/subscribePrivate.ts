import { IBybitRequest } from './request.interface';

export function subscribePrivate(): IBybitRequest {
  return {
    op: 'subscribe',
    args: ['position'], // TODO change to position.linear
  };
}
