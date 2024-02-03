import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Role } from '../../core/constants';
import { Public, RolesAllowed } from '../../core/decorators';
import { RolesGuard } from '../../core/guards';

import { UserService } from './user.service';
import { UserResponseInterceptor } from './user.interceptor';
import { UserDto, AddUserDto, UpdateUserDto } from './dtos';

@Controller('users')
@ApiTags('Users')
@UseInterceptors(UserResponseInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get('/')
  @ApiOperation({ summary: 'Get all users.' })
  @ApiResponse({
    type: UserDto,
    isArray: true,
    description: 'List of all the users in the database.',
  })
  public async getUsers(): Promise<UserDto[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User by id.' })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'K05ThPKxfugr9yYhA82Z',
    required: true,
    description: 'the id of the user.',
  })
  @ApiResponse({
    type: UserDto,
    description: 'User with specified id.',
  })
  public async getUser(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.getUser(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Add new User.' })
  @ApiBody({
    type: AddUserDto,
    required: true,
    description: 'User info required to create a new document into database.',
  })
  @ApiResponse({
    type: UserDto,
    description: 'User recently added.',
  })
  public async addUser(@Body() newUser: AddUserDto): Promise<UserDto> {
    return await this.userService.addUser(newUser);
  }

  @Put('/')
  @ApiOperation({ summary: 'Update user info.' })
  @ApiBody({
    type: UpdateUserDto,
    required: false,
    description: 'Optional user info to be updated with required user ID.',
  })
  @ApiResponse({
    type: UserDto,
    description: 'Updated user.',
  })
  public async updateUser(@Body() userProps: UpdateUserDto): Promise<UserDto> {
    return await this.userService.updateUser(userProps);
  }

  @Delete(':id')
  @RolesAllowed(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete User by id.' })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'K05ThPKxfugr9yYhA82Z',
    required: true,
    description: 'the id of the user.',
  })
  @ApiResponse({
    type: UserDto,
    description: 'User with specified id that has been deleted.',
  })
  public async deleteUser(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.deleteUser(id);
  }
}
