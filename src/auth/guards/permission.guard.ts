import { PERMISSION_KEY } from './../decorators/permission.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../enum/permission.enum';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()]
    );

    const { user } = context.switchToHttp().getRequest();

    return requiredPermission.every((permission) =>
      user.role.permissions?.includes(permission)
    );
  }
}
