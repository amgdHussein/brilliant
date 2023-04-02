import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CollectionReference, Query } from '@google-cloud/firestore';

import { FIRESTORE_COLLECTION_PROVIDERS } from 'src/core/constants';
import { Condition } from 'src/core/common';

import { Article } from 'src/modules/article/domain/entities';
import { IArticleDatabaseService } from './article.database.service.interface';

@Injectable()
export class ArticleFirestoreService implements IArticleDatabaseService {
  constructor(
    @Inject(FIRESTORE_COLLECTION_PROVIDERS.ARTICLES)
    private readonly articlesCollection: CollectionReference<Article>,
  ) {}

  async getArticle(id: string): Promise<Article> {
    const docRef = this.articlesCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new HttpException('Article not found.', HttpStatus.BAD_REQUEST, {
        cause: new Error(`The specified id(${id}) does not exist.`),
      });
    }

    const article = doc.data() as Article;
    return article;
  }

  async getArticles(limit?: number, queries?: Condition[]): Promise<Article[]> {
    let query: Query<Article> = this.updateQueries(queries);
    if (limit) query = query.limit(limit);
    const snapshot = await query
      .get()
      .then(snapshot => snapshot)
      .catch(error => {
        throw new HttpException(
          'An error occurred while querying data.',
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          },
        );
      });

    return snapshot.docs.map(snapshot => snapshot.data());
  }

  private updateQueries(queries?: Condition[]): Query<Article> {
    let query: Query<Article> = this.articlesCollection;
    if (queries && queries.length > 0) {
      for (const [key, operation, value] of queries) {
        query = query.where(key, operation, value);
      }
    }
    return query;
  }

  async setArticle(article: Article): Promise<Article> {
    const docRef = this.articlesCollection.doc();

    // Add the new doc id to article
    const newArticle: Article = {
      ...article,
      id: docRef.id,
      dateCreation: Date.now(),
    };

    return await docRef
      .set(newArticle)
      .then(async () => await this.getArticle(docRef.id))
      .catch(error => {
        throw new HttpException(
          'An error occurred while adding new article.',
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          },
        );
      });
  }

  async updateArticle(article: Article): Promise<Article> {
    if (!article.id) throw new Error('Article ID not specified');
    const docRef = this.articlesCollection.doc(article.id);
    return await docRef
      .update(article)
      .then(async () => await this.getArticle(docRef.id))
      .catch(error => {
        throw new HttpException(
          'An error occurred while updating.',
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          },
        );
      });
  }

  async deleteArticle(id: string): Promise<void> {
    const docRef = this.articlesCollection.doc(id);
    await this.getArticle(docRef.id);
    await docRef.delete().catch(error => {
      throw new HttpException(
        'An error occurred while deleting.',
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    });
  }
}
