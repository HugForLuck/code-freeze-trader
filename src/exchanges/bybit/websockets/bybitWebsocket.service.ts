import { Injectable } from '@nestjs/common';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Observable, Subject, of, timer } from 'rxjs';
import { IBybitRequest } from './request.interface';
import { subscribePublic } from './subscribePublic';
import { ping } from './pingTicker';
import { ITicker } from './response/ticker.interface';
import { subscribePrivate } from './subscribePrivate';
import { authPrivate } from './utils/authPrivate.utils';
import { IBybitPosition } from './response/position.interface';
import { filterUniquePrice } from './utils/filterUniquePrice.utils';
import { IWallet } from './response/wallet.interface';
import { TOPIC } from './topic.enum';

@Injectable()
export class BybitWSService {
  ws_public_url = 'wss://stream.bybit.com/v5/public/linear';
  ws_private_url = 'wss://stream-demo.bybit.com/v5/private';
  private publicSocket$: WebSocketSubject<IBybitRequest<ITicker>>;
  private privateSocket$: WebSocketSubject<
    IBybitRequest<IBybitPosition[] | IWallet[]>
  >;
  private shouldReconnectPublic$ = new Subject<void>();
  private shouldReconnectPrivate$ = new Subject<void>();

  constructor() {
    this.initPublicSocket();
    this.initPrivateSocket();
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
          timer(20000).pipe(takeUntil(this.shouldReconnectPrivate$)),
        ),
        tap(() => this.initPrivateSocket()),
      )
      .subscribe();
    this.ping$().subscribe();
  }

  getLivePrices$(): Observable<ITicker | undefined> {
    return this.publicSocket$.pipe(
      filterUniquePrice,
      catchError((error) => {
        console.error('GetMarkPrice$ error:', error);
        return of(undefined); // Replace the error with 0
      }),
    );
  }

  getUserLivePositions$(): Observable<IBybitPosition[] | undefined> {
    return this.privateSocket$.pipe(
      catchError((error) => {
        console.log('getUserLivePositions ERROR', error);
        return of(undefined);
      }),
      filter((response) => response?.topic == TOPIC.POSITION),
      map((positions) => positions?.data as IBybitPosition[]),
      distinctUntilChanged(),
    );
  }

  getUserWallet$(): Observable<IWallet | undefined> {
    return this.privateSocket$.pipe(
      catchError((error) => {
        console.log('getUserLivePositions ERROR', error);
        return of(undefined);
      }),
      filter((response) => response?.topic == TOPIC.WALLET),
      map((positions) =>
        positions?.data ? (positions?.data[0] as IWallet) : undefined,
      ),
      distinctUntilChanged(),
    );
  }

  ping$() {
    return timer(0, 1000).pipe(tap(() => this.privateSocket$.next(ping())));
  }

  subscribePrivate() {
    this.privateSocket$.next(authPrivate());
    this.privateSocket$.next(subscribePrivate());
  }

  subscribePublic() {
    this.publicSocket$.next(subscribePublic());
  }
}
