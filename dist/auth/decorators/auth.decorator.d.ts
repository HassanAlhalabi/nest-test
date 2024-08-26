import { Permission } from '../enum/permission.enum';
export declare function Auth(...permissions: Permission[]): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
