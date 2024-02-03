import { Logger, Inject, Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { APP_LOGGER_PROVIDER } from '../constants';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(APP_LOGGER_PROVIDER)
    private readonly logger: Logger,
  ) {}

  /**
   * Intercept function for handling requests before and after the route handler.
   * @param {ExecutionContext} context - the execution context
   * @param {CallHandler} next - the call handler for the next function
   * @return {Observable<void> | Promise<Observable<void>>} the observable or promise of void
   */
  public intercept(context: ExecutionContext, next: CallHandler): Observable<void> | Promise<Observable<void>> {
    // Before the route handler
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const userAgent = request.get('user-agent') || 'none';
    const { ip, method, path } = request;

    this.logger.log(
      `method=${method} userAgent=${userAgent} ip=${ip}: handler=${context.getClass().name}.${context.getHandler().name}`,
      `Incoming Request on ${path}`,
    );

    // After the route handler
    return next.handle().pipe<void>(
      tap((): void => {
        return this.logger.log(
          `method=${method} statusCode=${httpContext.getResponse().statusCode} duration +${Date.now() - now}ms`,
          `End Request for ${path}`,
        );
      }),
    );
  }
}
