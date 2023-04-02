import { IntersectionType, PickType, PartialType } from '@nestjs/swagger';

import { ArticleDto } from './article.dto';
import { SetArticleDto } from './set-article.dto';

export class UpdateArticleDto extends IntersectionType(
  PickType(ArticleDto, ['id', 'dateCreation']),
  PartialType(SetArticleDto),
) {}
