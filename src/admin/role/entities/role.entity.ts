import { Column,Entity, JoinTable, ManyToMany, OneToMany} from "typeorm";

import { User } from "../../user/entities/user.entity";
import { BaseEntity } from "../../../common/entities/base.entity";
import { Permission } from "../../permissions/entities/permission.entity";

@Entity('roles')
export class Role extends BaseEntity {
  @Column({unique: true})
  name: string

  @OneToMany(() => User, (user) => user.role, { cascade: true })
  users: User[];

  @ManyToMany(() => Permission, permission => permission.roles, { cascade: true })
  @JoinTable({
    name: 'role_permissions', // Name of the join table
    joinColumn: {
      name: 'roleId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permissionId',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];

}