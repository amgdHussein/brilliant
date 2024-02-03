import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

import { Author } from '../entities';

export class AuthorDto implements Author {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'id',
    type: String,
    required: true,
    example: '23894io23hj4890yu23h',
    description: 'User ID.',
  })
  public id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'username',
    type: String,
    required: true,
    example: 'Amgad Hussein',
    description: 'The name of the user.',
  })
  public username: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    name: 'photoUrl',
    type: String,
    required: true,
    example: 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png',
    description: 'The user profile picture.',
  })
  public photoUrl: string;
}
