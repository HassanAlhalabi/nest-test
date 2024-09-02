import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './entities/role.entity';
import { PermissionModule } from '../permissions/permission.module';
import { Permission } from '../permissions/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission]), PermissionModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
