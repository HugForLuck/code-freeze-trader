import { ITicker } from './response/ticker.interface';

export interface IBybitRequest {
  topic?: string;
  type?: string;
  ret_msg?: string;
  data?: ITicker;
  op: 'subscribe' | 'unsubscribe' | 'ping' | 'pong' | 'auth';
  args?: (string | number)[];
}
