import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { User } from '../enitites';
import { UserRole, UserStatus } from '../../../core/constants';

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
  @ApiProperty({
    name: 'email',
    type: String,
    required: true,
    example: 'amgad.hussein@example.com',
    description: 'The email address of brilliant user.',
  })
  public email: string;

  @IsString()
  @ApiProperty({
    name: 'photoUrl',
    type: String,
    required: true,
    example: 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png',
    description: 'The user profile picture.',
  })
  public photoUrl: string;

  @IsEnum(UserRole)
  @ApiProperty({
    name: 'role',
    enum: UserRole,
    required: true,
    example: UserRole.ADMIN,
    description: 'The type of the user (Admin or User)',
  })
  public role: UserRole;

  @IsEnum(UserStatus)
  @ApiProperty({
    name: 'status',
    enum: UserStatus,
    required: true,
    example: UserStatus.ACTIVE,
    description: 'The user status (Active or Inactive)',
  })
  public status: UserStatus;
}

export class AddUserDto extends OmitType(UserDto, ['id']) {}

export class UpdateUserDto extends PartialType(UserDto) {}
