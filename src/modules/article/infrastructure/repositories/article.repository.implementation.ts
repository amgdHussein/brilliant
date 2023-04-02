import { Inject } from '@nestjs/common';

import { ARTICLE_DATABASE_PROVIDER } from 'src/core/constants';
import { Condition } from 'src/core/common';

import { Article, IArticleRepository } from '../../domain';
import { IArticleDatabaseService } from '../services';

export class ArticleRepository implements IArticleRepository {
  constructor(
    @Inject(ARTICLE_DATABASE_PROVIDER)
    private readonly database: IArticleDatabaseService,
  ) {}

  async getArticle(id: string): Promise<Article> {
    return this.database.getArticle(id);
  }

  async getArticles(limit?: number, queries?: Condition[]): Promise<Article[]> {
    return this.database.getArticles(limit, queries);
  }

  async setArticle(article: Article): Promise<Article> {
    return this.database.setArticle(article);
  }

  async updateArticle(article: Article): Promise<Article> {
    return this.database.updateArticle(article);
  }

  async deleteArticle(id: string): Promise<void> {
    return this.database.deleteArticle(id);
  }
}
