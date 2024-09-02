import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Permission as PermissionEnum } from '../permissions/enum';
import { Role } from '../role/entities/role.entity';
import { SUPER_ADMIN_ROLE_NAME, SUPER_ADMIN_EMAIL } from '../constants';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { hash } from 'argon2';
import { Permission } from '../permissions/entities';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>
  ) {}

  private permissions: { displayName: string, name: PermissionEnum}[] = [
      // Admin Permissions
      { displayName: 'Admin View', name: PermissionEnum.AdminView },
      { displayName: 'Admin Create / Edit', name: PermissionEnum.AdminUpsert },
      { displayName: 'Admin Activate / Deactivate', name: PermissionEnum.AdminActivation },

      // Role Permissions
      { displayName: 'Role View', name: PermissionEnum.RoleView  },
      { displayName: 'Role Create / Edit', name: PermissionEnum.RoleUpsert },
      { displayName: 'Role Activate / Deactivate', name: PermissionEnum.RoleActivation  },

      // Permission Permissions
      { displayName: 'Permission View', name: PermissionEnum.PermissionView },
      { displayName: 'Permission Create / Edit', name: PermissionEnum.PermissionUpsert },

      // Config Permissions
      { displayName: 'Config View', name: PermissionEnum.ConfigView },
      { displayName: 'Config Edit', name: PermissionEnum.ConfigUpsert },
    ];

  async seedPermissions() {
    const allPreviousPermissions = await this.permissionRepository.find();
    const filteredPermissions = this.permissions.filter(permission => !allPreviousPermissions.find(subPermission => permission.displayName === subPermission.displayName))

    for (const permission of filteredPermissions) {
      await this.permissionRepository.save(permission);
    }
  }


  // Roles Seed
  async seedRoles() {
    const superAdmin = await this.roleRepository.findOneBy({name: SUPER_ADMIN_ROLE_NAME})
    if(superAdmin) return
    const permissions = await this.permissionRepository.find({})
    this.roleRepository.save({
      name: SUPER_ADMIN_ROLE_NAME,
      permissions: permissions
    })
  }

  
  // Admins Seed
  async seedAdmins() {
    const superAdmin = await this.userRepository.findOneBy({email: SUPER_ADMIN_EMAIL})  
    if(superAdmin) return
    const superAdminRole = await this.roleRepository.findOneBy({name: SUPER_ADMIN_ROLE_NAME})
    const hashedPassword = await hash('1234')
    this.userRepository.save({
      email: SUPER_ADMIN_EMAIL.toLocaleLowerCase(),
      hash: hashedPassword,
      firstName: 'Admin',
      lastName:'Admin',
      roleId: superAdminRole.id,
    })
  }

}