import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

import { Role } from '../../core/constants';
import { Public, RolesAllowed } from './../../core/decorators';
import { RolesGuard } from '../../core/guards';

import { ArticleService } from './article.service';
import { ArticleResponseInterceptor } from './article.interceptor';
import { AddArticleDto, ArticleDto, UpdateArticleDto } from './dtos';

@Controller('articles')
@ApiTags('Articles')
@UseInterceptors(ArticleResponseInterceptor)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Public()
  @Get('/')
  @ApiOperation({ summary: 'Get all articles.' })
  @ApiResponse({
    type: ArticleDto,
    isArray: true,
    description: 'List of all the articles in the database.',
  })
  public async getArticles(): Promise<ArticleDto[]> {
    return await this.articleService.getArticles();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get article by id.' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '23894io23hj4890yu23h',
    required: true,
    description: 'the id of the article.',
  })
  @ApiResponse({
    type: ArticleDto,
    description: 'Article with specified id.',
  })
  public async getArticle(@Param('id') id: string): Promise<ArticleDto> {
    return await this.articleService.getArticle(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Add new article.' })
  @ApiBody({
    type: AddArticleDto,
    required: true,
    description: 'Article info required to create a new document into database.',
  })
  @ApiResponse({
    type: ArticleDto,
    description: 'Article recently added.',
  })
  public async addArticle(@Body() newArticle: AddArticleDto): Promise<ArticleDto> {
    return await this.articleService.addArticle(newArticle);
  }

  @Put('/')
  @ApiOperation({ summary: 'Update article info.' })
  @ApiBody({
    type: UpdateArticleDto,
    required: false,
    description: 'Optional article info to be updated with required article ID.',
  })
  @ApiResponse({
    type: ArticleDto,
    description: 'Updated article.',
  })
  public async updateArticle(@Body() articleProps: UpdateArticleDto): Promise<ArticleDto> {
    return await this.articleService.updateArticle(articleProps);
  }

  @Delete(':id')
  @RolesAllowed(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete article by id.' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '23894io23hj4890yu23h',
    required: true,
    description: 'the id of the article.',
  })
  @ApiResponse({
    type: ArticleDto,
    description: 'Article with specified id that has been deleted.',
  })
  public async deleteArticle(@Param('id') id: string): Promise<ArticleDto> {
    return await this.articleService.deleteArticle(id);
  }

  @Post('view/:id')
  @ApiOperation({ summary: 'Update the views of article by id.' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '23894io23hj4890yu23h',
    required: true,
    description: 'the id of the article.',
  })
  @ApiResponse({ description: 'Successfully updated the views of the article.' })
  public async incrementArticleView(@Param('id') id: string): Promise<void> {
    return await this.articleService.incrementArticleView(id);
  }
}
