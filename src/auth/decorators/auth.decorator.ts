import { applyDecorators, UseGuards } from '@nestjs/common';

import { Permission } from '../enum/permission.enum';
import { GetPermission } from './permission.decorator';
import { PermissionGuard, JWTGuard } from '../guards';

export function Auth(...permissions: Permission[]) {
  return permissions.length > 0 ? applyDecorators(
    GetPermission(...permissions),
    UseGuards(JWTGuard, PermissionGuard)
  ) : UseGuards(JWTGuard)
}
