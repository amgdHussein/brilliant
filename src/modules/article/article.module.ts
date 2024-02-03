import { Module } from '@nestjs/common';

import { FirestoreModule } from '../../core/providers';
import { AuthModule } from '../../core/auth';

import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';

@Module({
  imports: [AuthModule, FirestoreModule],
  providers: [ArticleService],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}
