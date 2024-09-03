import { Body, Delete, Get, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserDto } from './dto';
import { UserService } from './user.service';
import { Auth, GetUser } from '../auth/decorators';
import { BaseFilter } from '../../common/types';
import { SwaggerFilter } from '../../common/decorators';
import { Permission } from '../permissions/enum';
import { AdminController } from '../decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserId } from 'src/common/decorators/user-id.decorator';

@ApiTags('Admins')
@ApiBearerAuth()
@AdminController('Admin')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get admin own details' })
  @Auth(Permission.AdminView)
  getMyData(@GetUser() user: UserDto) {
    return user;
  }

  @ApiOperation({ summary: 'Get all admin users' })
  @Get('List')
  @Auth(Permission.AdminView)
  @SwaggerFilter()
  async getAllUsers(@Query() filter: BaseFilter) {
    return this.userService.filter(filter);
  }

  @ApiOperation({ summary: 'Search all admin users' })
  @Get('Search')
  @Auth(Permission.AdminView)
  @SwaggerFilter()
  async searchUsers(@Query() filter: BaseFilter) {
    return this.userService.filter(filter);
  }

  @ApiOperation({ summary: 'Get admin details by id' })
  @Get('Details')
  @Auth(Permission.AdminView)
  async findUser(@Query('id', ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Create new admin user' })
  @ApiResponse({
    status: 200,
    description: 'User admin created successfully',
  })
  @ApiForbiddenResponse({ description: 'you must login to create admin user' })
  @Post('Create')
  @Auth(Permission.AdminUpsert)
  createNewUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @ApiOperation({ summary: 'Update admin user' })
  @Put('Update')
  @Auth(Permission.AdminUpsert)
  updateUser(@Body() user: UpdateUserDto) {
    return this.userService.update(user);
  }

  @Put('Activate')
  @Auth(Permission.AdminActivation)
  activate(@Query('id', ParseIntPipe) id: number, @UserId() userId) {
    return this.userService.activate(id, userId);
  }

  @Put('Deactivate')
  @Auth(Permission.AdminActivation)
  deActivate(@Query('id', ParseIntPipe) id: number, @UserId() userId) {
    return this.userService.deActivate(id, userId);
  }

  @Delete('Delete')
  @Auth(Permission.AdminDelete)
  remove(@Query('id') id: string, @UserId() userId) {
    return this.userService.remove(+id, userId);
  }

}
