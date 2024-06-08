import { Injectable } from '@nestjs/common';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { timer } from 'rxjs';

interface BybitRequest {
  topic: string;
  type: string;
  data: {
    symbol: string;
    markPrice: string;
    lastPrice: string;
    // ... other ticker data fields ...
  };
  op: 'subscribe' | 'unsubscribe' | 'ping' | 'pong';
  args?: string[];
}

@Injectable()
export class BybitTickerService {
  private socket$: WebSocketSubject<BybitRequest>;

  constructor() {
    this.socket$ = webSocket<BybitRequest>(
      'wss://stream.bybit.com/v5/public/linear',
    );
  }

  getMarkPrice$(symbol: string = 'BTCUSDT') {
    this.socket$.next({
      op: 'subscribe',
      args: [`tickers.${symbol}`],
    } as BybitRequest);

    const ping$ = timer(0, 20000).pipe(
      // Ping every 20 seconds
      tap(() => {
        this.socket$.next({ op: 'ping' } as BybitRequest);
      }),
    );

    return ping$.pipe(
      mergeMap(() =>
        this.socket$.pipe(
          tap((message) => {
            if ('op' in message && message.op === 'pong') {
              // Type guard for pong messages
              console.log('Received pong');
              // (Optional) You can add logic here to track pong responses and handle timeouts if needed.
            }
          }),
          filter(
            (message): message is BybitRequest =>
              'topic' in message &&
              message.topic === `tickers.${symbol}` &&
              (message.type === 'snapshot' || message.type === 'delta') &&
              (message.data.markPrice != null ||
                message.data.lastPrice != null),
          ), // Accept both snapshot and delta
          map((message) => message.data),
        ),
      ),
    );
  }

  unsubscribeFromTicker(symbol: string = 'BTCUSDT') {
    this.socket$.next({
      op: 'unsubscribe',
      args: [`tickers.${symbol}`],
    } as BybitRequest);
  }
}
