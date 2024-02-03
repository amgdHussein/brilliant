import { Inject, Injectable } from '@nestjs/common';

import { DB_COLLECTION_PROVIDER } from '../../core/constants';
import { FirestoreCollectionService } from '../../core/providers/firestore';

import { Article } from './entities';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(DB_COLLECTION_PROVIDER.ARTICLES)
    private readonly collection: FirestoreCollectionService<Article>,
  ) {}

  /**
   * Retrieves an article by its ID.
   * @param {string} id - The ID of the article to retrieve
   * @return {Promise<Article>} The retrieved article
   */
  public async getArticle(id: string): Promise<Article> {
    return await this.collection.getDoc(id);
  }

  /**
   * Gets a list of articles.
   * @return {Promise<Article[]>} The list of articles.
   */
  public async getArticles(): Promise<Article[]> {
    return await this.collection.getDocs();
  }

  /**
   * Adds an article to the collection with default values for publishedAt, views, likes, and comments.
   * @param {Partial<Article>} article - the article to be added
   * @return {Promise<Article>} the added article
   */
  public async addArticle(article: Partial<Article>): Promise<Article> {
    return await this.collection.addDoc({
      ...article,
      publishedAt: Date.now(),
      views: 0,
      likes: 0,
      comments: 0,
    });
  }

  /**
   * Updates an article with the provided data.
   * @param {Partial<Article> & { id: string }} article - the article data to update
   * @return {Promise<Article>} the updated article
   */
  public async updateArticle(article: Partial<Article> & { id: string }): Promise<Article> {
    return await this.collection.updateDoc(article);
  }

  /**
   * Deletes an article with the specified ID.
   * @param {string} id - The ID of the article to be deleted
   * @return {Promise<Article>} A Promise that resolves to the deleted Article
   */
  public async deleteArticle(id: string): Promise<Article> {
    return await this.collection.deleteDoc(id);
  }

  /**
   * Increment article view count by 1.
   * @param {string} id - The unique identifier of the article.
   * @return {Promise<void>} Promise that resolves when the view count is successfully incremented.
   */
  public async incrementArticleView(id: string): Promise<void> {
    return await this.collection.incrementField(id, 'views', 1);
  }
}
