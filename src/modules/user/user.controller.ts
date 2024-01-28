import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { AddUserDto, UpdateUserDto, UserDto } from './dtos';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  public async getUsers(): Promise<UserDto[]> {
    return await this.userService.getUsers();
  }

  @Post('/add')
  public async addUser(@Body() newUser: AddUserDto): Promise<UserDto> {
    return await this.userService.addUser(newUser);
  }

  @Put('/update')
  public async updateUser(@Body() user: UpdateUserDto): Promise<UserDto> {
    return await this.userService.addUser(user);
  }
}
