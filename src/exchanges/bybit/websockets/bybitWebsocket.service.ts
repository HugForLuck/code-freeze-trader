import { Injectable } from '@nestjs/common';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, timer } from 'rxjs';
import { IBybitRequest } from './request.interface';
import { filterMarkPrice } from './filterMarkPrice.utils';
import { unSubscribePublic } from './unsubscribePublic';
import { subscribePublic } from './subscribePublic';
import { ping } from './pingTicker';
import { ITicker } from './response/ticker.interface';
import { subscribePrivate } from './subscribePrivate';
import { unsubscribePrivate } from './unsubscribePrivate';
import { createHmac } from 'crypto';
import { CONFIG } from 'src/app/app.config';

@Injectable()
export class BybitWSService {
  ws_public_url = 'wss://stream.bybit.com/v5/public/linear';
  ws_private_url = 'wss://stream-demo.bybit.com/v5/private';
  private publicSocket$: WebSocketSubject<IBybitRequest>;
  private privateSocket$: WebSocketSubject<IBybitRequest>;

  constructor() {
    this.privateSocket$ = webSocket<IBybitRequest>(this.ws_private_url);
    this.privateSocket$.next(this.getSignedAuthPayload());
    this.privateSocket$.subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
    });
    this.publicSocket$ = webSocket<IBybitRequest>(this.ws_public_url);
    this.subscribe();
    this.ping();
  }

  getLivePrice$(): Observable<ITicker | undefined> {
    return this.publicSocket$.pipe(
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
      .pipe(tap(() => this.publicSocket$.next(ping())))
      // .pipe(tap(() => this.privateSocket$.next(ping())))
      .subscribe();
  }

  getLivePositions$(): Observable<any> {
    return this.privateSocket$;
  }

  subscribe() {
    this.privateSocket$.next(subscribePrivate());
    this.publicSocket$.next(subscribePublic());
  }

  unsubscribe() {
    this.privateSocket$.next(unsubscribePrivate());
    this.publicSocket$.next(unSubscribePublic());
  }

  getSignedAuthPayload(): IBybitRequest {
    const expires = Date.now() + 10000; // 10 seconds in the future
    const signature = createHmac('sha256', CONFIG().BYBIT.SECRET)
      .update(`GET/realtime${expires}`)
      .digest('hex');

    const authPayload = {
      op: 'auth',
      args: [CONFIG().BYBIT.KEY, expires, signature],
    } as IBybitRequest;

    // If Bybit requires an additional pre-auth step (check their docs), add it here

    return authPayload;
  }
}
