import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Permission } from '../../permissions/entities/permission.entity';
import { RoleTranslation } from './role-translation.entity';
// import { LANGUAGES } from "../../../common/constants";

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => RoleTranslation, (RoleTranslation) => RoleTranslation.role, {
    cascade: true,
  })
  translations: RoleTranslation[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
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
