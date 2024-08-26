import { BaseEntity } from '../../entities';
import { Role } from '../../role/entities/role.entity';
export declare class User extends BaseEntity {
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    hash: string;
}
