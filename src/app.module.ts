import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FirestoreModule } from './core/providers';

@Module({
  imports: [
    // Core
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    FirestoreModule,

    // Modules
    // UserModule,
    // ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
