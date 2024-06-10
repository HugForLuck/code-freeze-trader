import { Injectable } from '@nestjs/common';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject, of, timer } from 'rxjs';
import { IBybitRequest } from './request.interface';
import { filterMarkPrice } from './filterMarkPrice.utils';
import { subscribePublic } from './subscribePublic';
import { ping } from './pingTicker';
import { ITicker } from './response/ticker.interface';
import { subscribePrivate } from './subscribePrivate';
import { authPrivate } from './utils/authPrivate.utils';
import { IBybitPosition } from './response/position.interface';

@Injectable()
export class BybitWSService {
  ws_public_url = 'wss://stream.bybit.com/v5/public/linear';
  ws_private_url = 'wss://stream-demo.bybit.com/v5/private';
  private publicSocket$: WebSocketSubject<IBybitRequest<ITicker>>;
  private privateSocket$: WebSocketSubject<IBybitRequest<IBybitPosition[]>>;
  private shouldReconnectPublic$ = new Subject<void>();
  private shouldReconnectPrivate$ = new Subject<void>();

  constructor() {
    this.initPublicSocket();
    this.initPrivateSocket();
    // this.privateSocket$ = webSocket<IBybitRequest<IBybitPosition[]>>({
    //   url: this.ws_private_url,
    //   closeObserver: {
    //     next: (closeEvent) => {
    //       console.log('⛔ PrivateWS Closed:', closeEvent);
    //       this.shouldReconnectPrivate$.next();
    //     },
    //   },
    //   openObserver: {
    //     next: () => {
    //       console.log('✅ PrivateWS Opened');
    //       this.subscribePublic(); // Subscribe after reconnect
    //     },
    //   },
    // });
    // this.publicSocket$ = webSocket<IBybitRequest<ITicker>>({
    //   url: this.ws_public_url,
    //   closeObserver: {
    //     next: (closeEvent) => {
    //       console.log('⛔ PublicWS Closed:', closeEvent);
    //       this.subscribePublic();
    //     },
    //   },
    //   openObserver: {
    //     next: () => {
    //       console.log('✅ PublicWS Opened');
    //       this.subscribePrivate(); // Subscribe after reconnect
    //     },
    //   },
    // });

    // this.shouldReconnectPublic$
    //   .pipe(
    //     switchMap(() =>
    //       timer(1000).pipe(takeUntil(this.shouldReconnectPublic$)),
    //     ),
    //     tap(() => this.initPublicSocket()),
    //   )
    //   .subscribe();
    // this.reconnectPublic$().subscribe();
    // // this.ping$().subscribe();
  }

  private initPublicSocket() {
    this.publicSocket$ = webSocket<IBybitRequest<ITicker>>({
      url: this.ws_public_url,
      closeObserver: {
        next: (closeEvent) => {
          console.log('⛔ PublicWS Closed:', closeEvent);
          this.shouldReconnectPublic$.next();
        },
      },
      openObserver: {
        next: () => {
          console.log('✅ PublicWS Opened');
          this.subscribePublic(); // Subscribe after reconnect
        },
      },
    });

    this.shouldReconnectPublic$
      .pipe(
        switchMap(() =>
          timer(1000).pipe(takeUntil(this.shouldReconnectPublic$)),
        ),
        tap(() => this.initPublicSocket()),
      )
      .subscribe();
  }

  private initPrivateSocket() {
    this.privateSocket$ = webSocket<IBybitRequest<IBybitPosition[]>>({
      url: this.ws_private_url,
      closeObserver: {
        next: (closeEvent) => {
          console.log('⛔ PrivateWS Closed:', closeEvent);
          this.shouldReconnectPrivate$.next();
        },
      },
      openObserver: {
        next: () => {
          console.log('✅ PrivateWS Opened');
          this.subscribePrivate(); // Subscribe after reconnect
        },
      },
    });

    this.shouldReconnectPrivate$
      .pipe(
        switchMap(() =>
          timer(1000).pipe(takeUntil(this.shouldReconnectPrivate$)),
        ),
        tap(() => this.initPrivateSocket()),
      )
      .subscribe();
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

  ping$() {
    return timer(0, 1000).pipe(tap(() => this.privateSocket$.next(ping())));
  }

  getLivePositions$(): Observable<IBybitPosition[] | undefined> {
    return this.privateSocket$.pipe(map((positions) => positions.data));
  }

  subscribePrivate() {
    this.privateSocket$.next(authPrivate());
    this.privateSocket$.next(subscribePrivate());
  }

  subscribePublic() {
    this.publicSocket$.next(subscribePublic());
  }
}
