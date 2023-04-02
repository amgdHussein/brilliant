import { Inject, Injectable } from '@nestjs/common';

import { Usecase } from 'src/core/common';
import { ARTICLE_REPOSITORY_PROVIDER } from 'src/core/constants/article.constants';

import { Article } from '../entities';
import { IArticleRepository } from '../repositories';

@Injectable()
export class GetArticle implements Usecase {
  constructor(
    @Inject(ARTICLE_REPOSITORY_PROVIDER)
    private readonly repository: IArticleRepository,
  ) {}

  async execute(id: string): Promise<Article> {
    // const context = `${GetArticle.name} Usecase Execute`;
    return await this.repository.getArticle(id);
  }
}
