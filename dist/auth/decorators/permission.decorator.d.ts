import { Permission } from '../enum/permission.enum';
export declare const PERMISSION_KEY = "permissions";
export declare const GetPermission: (...permissions: Permission[]) => import("@nestjs/common").CustomDecorator<string>;
