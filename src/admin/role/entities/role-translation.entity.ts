import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseTranslation } from '../../../common/entities';
import { Role } from '.';

@Entity('role_translations')
export class RoleTranslation extends BaseTranslation {
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Role, (role) => role.translations)
  role: Role;
}
