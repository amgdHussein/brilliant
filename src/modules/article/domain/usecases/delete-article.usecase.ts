import { Inject, Injectable } from '@nestjs/common';

import { Usecase } from 'src/core/common';
import { ARTICLE_REPOSITORY_PROVIDER } from 'src/core/constants/article.constants';

import { IArticleRepository } from '../repositories';

@Injectable()
export class DeleteArticle implements Usecase {
  constructor(
    @Inject(ARTICLE_REPOSITORY_PROVIDER)
    private readonly repository: IArticleRepository,
  ) {}

  async execute(id: string): Promise<void> {
    // const context = `${DeleteArticle.name} Usecase Execute`;
    return await this.repository.deleteArticle(id);
  }
}
