import { Entity, Column, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Expose } from 'class-transformer';

import { Role } from '../../role/entities/role.entity';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ default: '' })
  name?: string;

  @Column({ default: '' })
  surname?: string;

  @Column({ unique: true, nullable: true })
  userName: string;

  @Column({ unique: true })
  emailAddress: string;

  @Column({ default: 2 })
  roleId: number;

  @Column()
  hash: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @ManyToOne(() => Role, (role) => role.users)
  role?: Role;

  @Expose()
  get fullName(): string {
    return `${this.name} ${this.surname}`.trim();
  }

  @BeforeInsert()
  @BeforeUpdate()
  setUserName() {
    if (!this.userName) {
      this.userName = this.emailAddress;
    }
  }
}
