import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { Article } from './entities';

export interface ArticleResponse {
  article?: Article;
  articles?: Article[];
  path: string;
  duration: string;
  method: string;
}

@Injectable()
export class ArticleResponseInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<ArticleResponse> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const response = next.handle().pipe<ArticleResponse>(
      map((output): ArticleResponse => {
        let field: string = 'article';
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
