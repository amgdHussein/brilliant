import { OmitType } from '@nestjs/swagger';
import { ArticleDto } from './article.dto';

export class SetArticleDto extends OmitType(ArticleDto, [
  'id',
  'dateCreation',
]) {}
