import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';

import { Permission as PermissionEnum } from '../permissions/enum';
import { Role } from '../role/entities/role.entity';
import {
  SUPER_ADMIN_ROLE_NAME,
  SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PHONE_NUMBER,
} from '../constants';
import { User } from '../user/entities/user.entity';
import { Permission } from '../permissions/entities';
import { LANGUAGES } from 'src/common/constants';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {}

  private permissions: { displayName: string; name: PermissionEnum }[] = [
    // Admin Permissions
    { displayName: 'Admin View', name: PermissionEnum.AdminView },
    { displayName: 'Admin Create / Edit', name: PermissionEnum.AdminUpsert },
    {
      displayName: 'Admin Activate / Deactivate',
      name: PermissionEnum.AdminActivation,
    },

    // Role Permissions
    { displayName: 'Role View', name: PermissionEnum.RoleView },
    { displayName: 'Role Create / Edit', name: PermissionEnum.RoleUpsert },
    {
      displayName: 'Role Activate / Deactivate',
      name: PermissionEnum.RoleActivation,
    },
    { displayName: 'Role Delete', name: PermissionEnum.RoleDelete },

    // Permission Permissions
    { displayName: 'Permission View', name: PermissionEnum.PermissionView },
    {
      displayName: 'Permission Create / Edit',
      name: PermissionEnum.PermissionUpsert,
    },

    // Config Permissions
    { displayName: 'Config View', name: PermissionEnum.ConfigView },
    { displayName: 'Config Edit', name: PermissionEnum.ConfigUpsert },
  ];

  async seedPermissions() {
    const allPreviousPermissions = await this.permissionRepository.find();
    const filteredPermissions = this.permissions.filter(
      (permission) =>
        !allPreviousPermissions.find(
          (subPermission) =>
            permission.displayName === subPermission.displayName
        )
    );

    for (const permission of filteredPermissions) {
      await this.permissionRepository.save(permission);
    }
  }

  // Roles Seed
  async seedRoles() {
    const superAdminRole = await this.roleRepository.findOneBy({
      name: SUPER_ADMIN_ROLE_NAME,
    });
    const permissions = await this.permissionRepository.find();

    const savedSuperAdmin = await this.roleRepository.save({
      ...(superAdminRole && { id: superAdminRole.id }),
      name: SUPER_ADMIN_ROLE_NAME,
      permissions: permissions,
    });

    if (!superAdminRole) {
      const updatedSuperAdminRole = this.roleRepository.create({
        id: savedSuperAdmin.id,
        creatorId: savedSuperAdmin.id,
        translations: [
          {
            language: LANGUAGES.EN,
            name: SUPER_ADMIN_ROLE_NAME,
            isDefault: true,
            role: savedSuperAdmin,
          },
          {
            language: LANGUAGES.AR,
            name: 'أدمن',
            isDefault: false,
            role: savedSuperAdmin,
          },
        ],
      });
      await this.roleRepository.save(updatedSuperAdminRole);
    }
  }

  // Admins Seed
  async seedAdmins() {
    const superAdmin = await this.userRepository.findOneBy({
      emailAddress: SUPER_ADMIN_EMAIL,
    });
    if (superAdmin) return;
    const superAdminRole = await this.roleRepository.findOneBy({
      name: SUPER_ADMIN_ROLE_NAME,
    });
    const hashedPassword = await hash('1234');
    const savedAdmin = await this.userRepository.save({
      emailAddress: SUPER_ADMIN_EMAIL.toLocaleLowerCase(),
      hash: hashedPassword,
      name: 'Admin',
      surname: 'Admin',
      roleId: superAdminRole.id,
      userName: SUPER_ADMIN_EMAIL.toLocaleLowerCase(),
      phoneNumber: SUPER_ADMIN_PHONE_NUMBER,
    });
    await this.userRepository.save({
      id: savedAdmin.id,
      creatorId: savedAdmin.id,
      lastModifiedById: savedAdmin.id,
    });
  }
}
