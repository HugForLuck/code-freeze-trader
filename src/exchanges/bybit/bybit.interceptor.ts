import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class BybitInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log('⛔ Request URL:', request.url);

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`✅ After... ${Date.now() - now}ms`)));
  }
}
