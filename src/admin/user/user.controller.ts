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
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

import { UserDto } from './dto';
import { UserService } from './user.service';
import { Auth, GetUser } from '../auth/decorators';
import { BaseFilter } from '../../common/types';
import { Lang, SwaggerFilter } from '../../common/decorators';
import { Permission } from '../permissions/enum';

@ApiTags('Admins')
@ApiBearerAuth()
@Controller('Admin/Admins')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get admin own details' })
  // @UseGuards(JWTGuard)
  getMyData(@GetUser() user: UserDto) {
    return user;
  }

  @ApiOperation({ summary: 'Get all admin users' })
  @Get('all')
  @Auth(Permission.AdminView)
  @SwaggerFilter()
  async findAll(@Query() filter: BaseFilter, @Lang() language) {
    console.log(language)
    return this.userService.filter(filter);
  }

  @ApiOperation({ summary: 'Get admin details by id' })
  @ApiParam({name: 'id'})
  @Get(':id')
  @Auth(Permission.AdminView)
  async findUser(@Param('id',ParseIntPipe) id: number, @Lang() language) {
    console.log(language)
    return this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Create new admin user' })
  @ApiResponse({
    status: 200,
    description: 'User admin created successfully',
  })
  @ApiForbiddenResponse({ description: 'you must login to create admin user' })
  @Post('create')
  @Auth(Permission.AdminUpsert)
  createNewUser(@Body() user: UserDto) {
    return this.userService.createNewUser(user);
  }
}