import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MinDate,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Article } from '../../domain/entities';

export class ArticleDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsNotEmpty()
  @IsString()
  topic: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsArray()
  @IsUrl(undefined, { each: true })
  imgs: string[];

  @IsNumber()
  @IsDate()
  @MinDate(new Date('2022'))
  @Type(() => Date)
  dateCreation: number;

  static fromEntity(entity: Article): ArticleDto {
    return {
      id: entity.id,
      uid: entity.uid,
      topic: entity.topic,
      title: entity.title,
      content: entity.content,
      imgs: entity.imgs,
      dateCreation: entity.dateCreation,
    } as ArticleDto;
  }

  static toEntity(dto: any): Article {
    return {
      id: dto.id,
      uid: dto.uid,
      topic: dto.topic,
      title: dto.title,
      content: dto.content,
      imgs: dto.imgs,
      dateCreation: dto.dateCreation,
    };
  }
}
