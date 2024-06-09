import { Injectable } from '@nestjs/common';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { map, tap } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';
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
    this.ping();
  }

  getMarkPrice$(): Observable<ITicker | undefined> {
    this.subscribeTicker();
    return this.socket$.pipe(
      filterMarkPrice(),
      map((message) => message.data),
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
