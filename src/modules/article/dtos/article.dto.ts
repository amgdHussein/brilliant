import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, ValidateNested, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

import { Article, Topic } from '../entities';
import { AuthorDto } from './author.dto';

export class ArticleDto implements Article {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'id',
    type: String,
    required: true,
    example: '23894io23hj4890yu23h',
    description: 'Article ID.',
  })
  public id: string;

  @ValidateNested()
  @Type(() => AuthorDto)
  @IsNotEmpty()
  @ApiProperty({
    name: 'author',
    type: String,
    required: true,
    example: {
      id: '23894io23hj4890yu23h',
      username: 'Amgad Hussein',
      photoUrl: 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png',
    },
    description: 'Article author data.',
  })
  public author: AuthorDto;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'title',
    type: String,
    required: true,
    example: 'The Day of Tomorrow',
    description: 'Article title.',
  })
  public title: string;

  @IsEnum(Topic)
  @IsNotEmpty()
  @ApiProperty({
    name: 'topic',
    enum: Topic,
    required: true,
    example: Topic.ART,
    description: 'The article topic (Technology, History or Sports, etc.).',
  })
  public topic: Topic;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'content',
    type: String,
    required: true,
    example: `
      Last month, I had the incredible honor of winning Singapore's first ever GPT-4 Prompt Engineering competition, which brought together over 400 prompt-ly brilliant participants, organised by the Government Technology Agency of Singapore (GovTech).
      Prompt engineering is a discipline that blends both art and science — it is as much technical understanding as it is of creativity and strategic thinking. This is a compilation of the prompt engineering strategies I learned along the way, that push any LLM to do exactly what you need and more!    
      Author's Note:
      In writing this, I sought to steer away from the traditional prompt engineering techniques that have already been extensively discussed and documented online. Instead, my aim is to bring fresh insights that I learned through experimentation, and a different, personal take in understanding and approaching certain techniques. I hope you'll enjoy reading this piece!
      etc...
    `,
    description: 'Article content.',
  })
  public content: string;

  @IsNumber()
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    name: 'publishedAt',
    type: Number,
    required: false,
    example: 1706968342870,
    description: 'Article published date.',
  })
  public publishedAt: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'views',
    type: Number,
    required: false,
    example: 32,
    description: 'Article number of views.',
  })
  public views: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'likes',
    type: Number,
    required: false,
    example: 10,
    description: 'Article number of likes.',
  })
  public likes: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'comments',
    type: Number,
    required: false,
    example: 5,
    description: 'Article number of comments.',
  })
  public comments: number;
}
