import { Module } from '@nestjs/common';

import { FirestoreModule } from '../../core/providers';

import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';

@Module({
  imports: [FirestoreModule],
  providers: [ArticleService],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}
