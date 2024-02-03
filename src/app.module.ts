import { Logger, Module, Scope, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { APP_LOGGER_PROVIDER } from './core/constants';

import { AuthModule } from './core/auth';
import { FirestoreModule } from './core/providers';

import { AuthenticationGuard } from './core/guards';
import { AppExceptionFilter } from './core/filters';
import { LoggingInterceptor } from './core/interceptors';

import { ArticleModule, UserModule } from './modules';

@Module({
  imports: [
    //? Core
    ConfigModule.forRoot({ isGlobal: true }),

    AuthModule,

    FirestoreModule.forRoot({
      useFactory: () => ({
        projectId: process.env.GCLOUD_PROJECT_ID,
        credentials: {
          client_email: process.env.GCLOUD_CLIENT_EMAIL,
          private_key: process.env.GCLOUD_PRIVATE_KEY,
        },
      }),
    }),

    //? Modules
    UserModule,
    ArticleModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        disableErrorMessages: Boolean(JSON.parse(process.env.DISABLE_ERROR_MESSAGES)),
        whitelist: Boolean(JSON.parse(process.env.WHITE_LIST)),
        transform: Boolean(JSON.parse(process.env.TRANSFORM)),
      }),
    },
    {
      provide: APP_LOGGER_PROVIDER,
      useClass: Logger,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
      scope: Scope.REQUEST,
    },
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule {}
