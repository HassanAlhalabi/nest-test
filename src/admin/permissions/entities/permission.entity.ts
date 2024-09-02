import { Column,Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";

import { Permission as PermissionEnum } from "../enum"
import { Role } from "../../role/entities";

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id?: number
    
    @Column()
    name: PermissionEnum;

    @Column({unique: true})
    displayName: string

    @ManyToMany(() => Role, (role) => role.permissions)
    roles?: Role[];
}