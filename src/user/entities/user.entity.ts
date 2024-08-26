
import { Entity, Column,  ManyToOne} from 'typeorm';
import { BaseEntity } from '../../entities';
import { Role } from '../../role/entities/role.entity';

@Entity('users')
export class User extends BaseEntity {

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string

  @ManyToOne(() => Role, (role) => role.users)
  role: Role

  @Column()
  hash: string
}