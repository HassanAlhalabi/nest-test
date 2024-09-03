import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PermissionService } from './permission.service';
import { Permission } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
