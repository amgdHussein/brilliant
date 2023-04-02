import { Condition } from 'src/core/common';

import { Article } from '../entities';

export interface IArticleRepository {
  getArticle(id: string): Promise<Article>; // Get one article by id.
  getArticles(limit?: number, queries?: Condition[]): Promise<Article[]>; // Get all/N articles that meet the list of queries.
  setArticle(article: Article): Promise<Article>; // Add new article.
  updateArticle(article: Article): Promise<Article>; // Update an existing article.
  deleteArticle(id: string): Promise<void>; // Delete an existing article by id.
}
