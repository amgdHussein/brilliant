import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { User, UserGender } from '../enitites';

export class UserDto implements User {
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

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    type: String,
    required: true,
    example: 'amgad.hussein@example.com',
    description: 'The email address of brilliant user.',
  })
  public email: string;

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

  @IsEnum(UserGender)
  @IsNotEmpty()
  @ApiProperty({
    name: 'gender',
    enum: UserGender,
    required: true,
    example: UserGender.MALE,
    description: 'The user gender type (Male or Female).',
  })
  public gender: UserGender;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'age',
    type: Number,
    required: true,
    example: 19,
    description: 'The user age.',
  })
  public age: number;
}
