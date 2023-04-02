import { Logger, Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core/constants';

import { FirestoreModule } from './core/providers/gcloud';
import { LoggingInterceptor, ResponseInterceptor } from './core/interceptors';
import { HttpExceptionFilter } from './core/filters';

import { ArticleModule } from './modules/article';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    FirestoreModule.forRoot({
      useFactory: () => ({
        projectId: process.env.GCLOUD_PROJECT_ID,
        keyFilename: process.env.GCLOUD_KEY_FILE_NAME,
      }),
    }),

    ArticleModule,
  ],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
      scope: Scope.REQUEST,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
