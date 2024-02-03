import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { ArticleDto } from './article.dto';

export class UpdateArticleDto extends IntersectionType(
  PickType(ArticleDto, ['id']),

  PartialType(PickType(ArticleDto, ['title', 'topic', 'content'])),
) {}
