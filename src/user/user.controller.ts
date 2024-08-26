import {
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

import { UserDto } from './dto';
import { UserService } from './user.service';


import { Auth, GetUser } from '../auth/decorators';
import { BaseFilter } from '../types';
import { Lang, SwaggerFilter } from '../decorators';
import { Permission } from '../auth/enum';

@ApiTags('Users')
@Controller('Users')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get user own details' })
  // @UseGuards(JWTGuard)
  getMyData(@GetUser() user: UserDto) {
    return user;
  }

  @ApiOperation({ summary: 'Get all users' })
  @Get('all')
  // @Auth(Permission.CreateUser)
  @SwaggerFilter()
  async findAll(@Query() filter: BaseFilter, @Lang() language) {
    console.log(language)
    return this.userService.getAllUsers(filter);
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 200,
    description: 'Users created successfully',
  })
  @ApiForbiddenResponse({ description: 'you must login to create users' })
  @Post('create')
  @Auth(Permission.CreateUser)
  createNewUser(@Body() user: UserDto) {
    return this.userService.createNewUser(user);
  }
}