import { Inject, Injectable } from '@nestjs/common';

import { Usecase } from 'src/core/common';
import { ARTICLE_REPOSITORY_PROVIDER } from 'src/core/constants/article.constants';

import { Article } from '../entities';
import { IArticleRepository } from '../repositories';

@Injectable()
export class UpdateArticle implements Usecase {
  constructor(
    @Inject(ARTICLE_REPOSITORY_PROVIDER)
    private readonly repository: IArticleRepository,
  ) {}

  async execute(article: Article): Promise<Article> {
    // const context = `${UpdateArticle.name} Usecase Execute`;
    return await this.repository.updateArticle(article);
  }
}
