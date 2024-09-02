import { SetMetadata } from '@nestjs/common';
import { Permission } from '../../permissions/enum/permission.enum';

export const PERMISSION_KEY = 'permissions';
export const GetPermission = (...permissions: Permission[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
