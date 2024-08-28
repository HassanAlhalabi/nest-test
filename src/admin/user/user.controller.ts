import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

import { UserDto } from './dto';
import { UserService } from './user.service';
import { Auth, GetUser } from '../../auth/decorators';
import { BaseFilter } from '../../common/types';
import { Lang, SwaggerFilter } from '../../common/decorators';
import { Permission } from '../../auth/enum';

@ApiTags('Users')
@Controller('Admin/Users')
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
  @Auth(Permission.CreateUser)
  @SwaggerFilter()
  async findAll(@Query() filter: BaseFilter, @Lang() language) {
    console.log(language)
    return this.userService.filter(filter);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({name: 'id'})
  @Get(':id')
  @Auth(Permission.CreateUser)
  async findUser(@Param('id',ParseIntPipe) id: number, @Lang() language) {
    console.log(language)
    return this.userService.getById(id);
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