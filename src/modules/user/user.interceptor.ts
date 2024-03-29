import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { User } from './entities';

export interface UserResponse {
  user?: User;
  users?: User[];
  path: string;
  duration: string;
  method: string;
}

@Injectable()
export class UserResponseInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<UserResponse> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const response = next.handle().pipe<UserResponse>(
      map((output): UserResponse => {
        let field: string = 'user';
        if (Array.isArray(output)) field += 's';

        return {
          [field]: output,
          path: request.path,
          duration: `${Date.now() - now}ms`,
          method: request.method,
        };
      }),
    );

    return response;
  }
}
