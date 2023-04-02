import { Condition } from 'src/core/common';

import { Article } from '../../domain';

export interface IArticleDatabaseService {
  getArticle(id: string): Promise<Article>;
  getArticles(limit?: number, queries?: Condition[]): Promise<Article[]>;
  setArticle(article: Article): Promise<Article>;
  updateArticle(article: Article): Promise<Article>;
  deleteArticle(id: string): Promise<void>;
}
