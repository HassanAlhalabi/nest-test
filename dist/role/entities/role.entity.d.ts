import { User } from "../../user/entities/user.entity";
export declare class Role {
    id: number;
    roleName: string;
    permissions: string[];
    createdAt: Date;
    updatedAt: Date;
    users: User[];
}
