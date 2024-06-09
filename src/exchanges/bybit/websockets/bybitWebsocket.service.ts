import { Injectable } from '@nestjs/common';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, timer } from 'rxjs';
import { IBybitRequest } from './request.interface';
import { filterMarkPrice } from './filterMarkPrice.utils';
import { unSubscribeTicker } from './unsubscribeTicker';
import { subscribeTicker } from './subscribeTicker';
import { ping } from './pingTicker';
import { ITicker } from './response/ticker.interface';

@Injectable()
export class BybitWSService {
  ws_url = 'wss://stream.bybit.com/v5/public/linear';
  private socket$: WebSocketSubject<IBybitRequest>;

  constructor() {
    this.socket$ = webSocket<IBybitRequest>(this.ws_url);
    this.subscribeTicker();
    this.ping();
  }

  getMarkPrice$(): Observable<ITicker | undefined> {
    return this.socket$.pipe(
      filterMarkPrice(),
      map((message) => message.data),
      catchError((error) => {
        console.error('GetMarkPrice$ error:', error);
        return of(undefined); // Replace the error with 0
      }),
    );
  }

  ping() {
    timer(0, 20000)
      .pipe(tap(() => this.socket$.next(ping())))
      .subscribe();
  }

  subscribeTicker() {
    this.socket$.next(subscribeTicker());
  }

  unsubscribeTicker() {
    this.socket$.next(unSubscribeTicker());
  }
}
