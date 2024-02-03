import { PickType } from '@nestjs/swagger';

import { ArticleDto } from './article.dto';

export class AddArticleDto extends PickType(ArticleDto, ['title', 'topic', 'content', 'author']) {}
