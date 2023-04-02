import { Inject, Injectable } from '@nestjs/common';

import { Usecase, Condition } from 'src/core/common';
import { ARTICLE_REPOSITORY_PROVIDER } from 'src/core/constants/article.constants';

import { Article } from '../entities';
import { IArticleRepository } from '../repositories';

@Injectable()
export class GetArticles implements Usecase {
  constructor(
    @Inject(ARTICLE_REPOSITORY_PROVIDER)
    private readonly repository: IArticleRepository,
  ) {}

  async execute(limit?: number, queries?: Condition[]): Promise<Article[]> {
    // const context = `${GetArticles.name} Usecase Execute`;
    return await this.repository.getArticles(limit, queries);
  }
}
