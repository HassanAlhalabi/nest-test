import { Column,Entity, OneToMany} from "typeorm";

import { User } from "../../user/entities/user.entity";
import { BaseEntity } from "../../../common/entities/base.entity";

@Entity('roles')
export class Role extends BaseEntity {
  @Column('simple-array', { default: [] })
  permissions: string[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}