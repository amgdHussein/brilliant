import { IsOptional, IsNumber, IsArray, Min } from 'class-validator';

import { Condition } from 'src/core/common';

export class GetArticlesDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsArray({
    message: 'queries must be an array of from [key, operation, value]',
  })
  queries?: Condition[];
}
