import { Module, Provider } from '@nestjs/common';

import {
  ARTICLE_DATABASE_PROVIDER,
  ARTICLE_REPOSITORY_PROVIDER,
  ARTICLE_USECASE_PROVIDERS,
} from 'src/core/constants';

import { ArticleFirestoreService, ArticleRepository } from './infrastructure';

import {
  DeleteArticle,
  GetArticle,
  GetArticles,
  SetArticle,
  UpdateArticle,
} from './domain';

import { ArticleController } from './presentation';

@Module({
  controllers: [ArticleController],
  providers: [
    {
      provide: ARTICLE_DATABASE_PROVIDER,
      useClass: ArticleFirestoreService,
    },

    {
      provide: ARTICLE_REPOSITORY_PROVIDER,
      useClass: ArticleRepository,
    },

    ...[
      [ARTICLE_USECASE_PROVIDERS.GET_ARTICLE, GetArticle],
      [ARTICLE_USECASE_PROVIDERS.GET_ARTICLES, GetArticles],
      [ARTICLE_USECASE_PROVIDERS.SET_ARTICLE, SetArticle],
      [ARTICLE_USECASE_PROVIDERS.DELETE_ARTICLE, DeleteArticle],
      [ARTICLE_USECASE_PROVIDERS.UPDATE_ARTICLE, UpdateArticle],
    ].map(
      ([providerName, T]: [ARTICLE_USECASE_PROVIDERS, any]): Provider => ({
        provide: providerName,
        useClass: T,
      }),
    ),
  ],
})
export class ArticleModule {}
