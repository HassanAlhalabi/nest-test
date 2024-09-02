import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Auth } from '../auth/decorators';
import { Permission } from '../permissions/enum';
import { BaseFilter } from '../../common/types';
import { Lang, SwaggerFilter } from '../../common/decorators';
import { AdminController } from '../decorators';
import { SwaggerLang } from 'src/common/decorators/swagger-lang.decorator';
import { PermissionService } from '../permissions/permission.service';

@AdminController('Role')
@ApiTags('Roles')
@ApiBearerAuth()
export class RoleController {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly roleService: RoleService) {}

  @Get('List')
  @Auth(Permission.RoleView)
  @SwaggerFilter()
  findAll(@Query() filter: BaseFilter, @Lang() language) {    
    console.log(language)
    return this.roleService.findAll(filter);
  }

  @Get('Search')
  @Auth(Permission.RoleView)
  @SwaggerFilter()
  searchRoles(@Query() filter: BaseFilter, @Lang() language) {    
    console.log(language)
    return this.roleService.search(filter);
  }

  @Get('GetAllPermission')
  @Auth(Permission.RoleView)
  @SwaggerLang()
  getAllPermissions(@Lang() language) {  
    console.log(language);
    return this.permissionService.getGroupedPermissions()
  }

  @Get(':id')
  @Auth(Permission.RoleView)
  findOne(@Param('id') id: string) {
    return this.roleService.findById(+id);
  }

  @Post('Create')
  @Auth(Permission.RoleUpsert)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Put('Update')
  @Auth(Permission.RoleUpsert)
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto);
  }

  @Put('Activate')
  @Auth(Permission.RoleActivation)
  activate(@Query('id',ParseIntPipe) id: number) {
    console.log(id)
    return this.roleService.activate(id);
  }

  @Put('Deactivate')
  @Auth(Permission.RoleActivation)
  deActivate(@Query('id',ParseIntPipe) id: number) {
    console.log(id)
    return this.roleService.deActivate(id);
  }

  @Delete(':id')
  @Auth(Permission.RoleDelete)
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
