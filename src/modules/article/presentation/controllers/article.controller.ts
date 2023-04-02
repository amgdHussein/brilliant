import {
  Controller,
  Inject,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';

import { ARTICLE_USECASE_PROVIDERS } from 'src/core/constants';

import {
  GetArticle,
  GetArticles,
  SetArticle,
  UpdateArticle,
  DeleteArticle,
} from '../../domain/usecases';

import {
  ArticleDto,
  GetArticlesDto,
  SetArticleDto,
  UpdateArticleDto,
} from '../dtos';

@Controller('article')
export class ArticleController {
  constructor(
    @Inject(ARTICLE_USECASE_PROVIDERS.GET_ARTICLE)
    private readonly getArticleUsecase: GetArticle,
    @Inject(ARTICLE_USECASE_PROVIDERS.GET_ARTICLES)
    private readonly getArticlesUsecase: GetArticles,
    @Inject(ARTICLE_USECASE_PROVIDERS.SET_ARTICLE)
    private readonly setArticleUsecase: SetArticle,
    @Inject(ARTICLE_USECASE_PROVIDERS.UPDATE_ARTICLE)
    private readonly updateArticleUsecase: UpdateArticle,
    @Inject(ARTICLE_USECASE_PROVIDERS.DELETE_ARTICLE)
    private readonly deleteArticleUsecase: DeleteArticle,
  ) {}

  @Get('/')
  async getArticles(@Body() dto: GetArticlesDto): Promise<ArticleDto[]> {
    const articles = await this.getArticlesUsecase.execute(
      dto.limit,
      dto.queries,
    );
    return articles.map(article => ArticleDto.fromEntity(article));
  }

  @Get(':id')
  async getArticle(@Param('id') id: string): Promise<ArticleDto> {
    const article = await this.getArticleUsecase.execute(id);
    return ArticleDto.fromEntity(article);
  }

  @Post()
  async setArticle(@Body() dto: SetArticleDto): Promise<ArticleDto> {
    const newArticle = await this.setArticleUsecase.execute(
      ArticleDto.toEntity(dto),
    );
    return ArticleDto.fromEntity(newArticle);
  }

  @Put()
  async updateArticle(@Body() dto: UpdateArticleDto): Promise<ArticleDto> {
    const updatedArt = await this.updateArticleUsecase.execute(
      ArticleDto.toEntity(dto),
    );
    return ArticleDto.fromEntity(updatedArt);
  }

  @Delete(':id')
  async deleteOrg(@Param('id') id: string): Promise<void> {
    return await this.deleteArticleUsecase.execute(id);
  }
}
