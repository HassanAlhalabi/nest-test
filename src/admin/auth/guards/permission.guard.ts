import { PERMISSION_KEY } from '../decorators/permission.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from 'src/admin/permissions/enum';
import { User } from 'src/admin/user/entities/user.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()]
    );

    const { user } = context.switchToHttp().getRequest();

    return requiredPermissions.every((permission) =>
      Boolean((user as User).role.permissions?.find(rolePermission => rolePermission.name === permission))
    );

  }
}
