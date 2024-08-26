import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Auth } from '../auth/decorators';
import { Permission } from '../auth/enum';
import { BaseFilter } from '../types';
import { Lang, SwaggerFilter } from '../decorators';

@Controller('Roles')
@ApiTags('Roles')
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Auth(Permission.CreateRole)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @Auth(Permission.ReadRole)
  @SwaggerFilter()
  findAll(@Query() filter: BaseFilter, @Lang() language) {    
    console.log(language)
    return this.roleService.findAll(filter);
  }

  @Get(':id')
  @Auth(Permission.ReadRole)
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @Auth(Permission.UpdateRole)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @Auth(Permission.DeleteRole)
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
