export interface IBybitRequest<T> {
  topic?: string;
  type?: string;
  req_id?: string;
  ret_msg?: string;
  data?: T;
  op: 'subscribe' | 'unsubscribe' | 'ping' | 'pong' | 'auth';
  args?: (string | number)[];
}
