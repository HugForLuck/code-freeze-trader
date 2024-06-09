import { IBybitRequest } from './request.interface';
import { AllowedSymbols } from 'src/copy/copy.config';

export function unSubscribeTicker(): IBybitRequest {
  return {
    op: 'unsubscribe',
    args: AllowedSymbols,
  };
}
