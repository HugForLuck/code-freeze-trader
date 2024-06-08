import { Injectable } from '@nestjs/common';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { timer } from 'rxjs';

interface BybitTicker {
  topic: string;
  type: string;
  data: {
    symbol: string;
    markPrice: string;
    // ... other ticker data fields ...
  };
}

interface BybitRequest {
  op: 'subscribe' | 'unsubscribe';
  args?: string[];
}

interface BybitPing {
  op: 'ping';
}

@Injectable()
export class BybitTickerService {
  private socket$: WebSocketSubject<BybitRequest | BybitTicker | BybitPing>;

  constructor() {
    this.socket$ = webSocket<BybitRequest | BybitTicker>(
      'wss://stream.bybit.com/v5/public/linear',
    );
  }

  subscribeToTicker(symbol: string = 'BTCUSDT') {
    this.socket$.next({
      op: 'subscribe',
      args: [`tickers.${symbol}`],
    } as BybitRequest);

    const ping$ = timer(0, 20000).pipe(
      // Ping every 20 seconds
      tap(() => {
        this.socket$.next({ op: 'ping' } as BybitPing);
      }),
    );

    return ping$.pipe(
      switchMap(() =>
        this.socket$.pipe(
          filter(
            (message): message is BybitTicker =>
              'topic' in message &&
              message.topic === `tickers.${symbol}` &&
              (message.type === 'snapshot' || message.type === 'delta') &&
              message.data.markPrice != null,
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
