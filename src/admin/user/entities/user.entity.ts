
import { Entity, Column,  ManyToOne} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({default: ''})
  firstName?: string;

  @Column({default: ''})
  lastName?: string;

  @Column({unique: true})
  email: string
  
  @Column({default: 2})
  roleId: number

  @Column()
  hash: string

  @ManyToOne(() => Role, (role) => role.users)
  role?: Role
}