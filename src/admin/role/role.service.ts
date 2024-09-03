import {
  applyGlobalSelect,
  applyGlobalWhereFilter,
  applyOrderBy,
} from './../../common/helpers/index';
import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { BaseFilter, PaginatedResult, SearchItem } from '../../common/types';
import { applyPagination } from '../../common/helpers';
import { Permission } from '../permissions/entities';
import { SUPER_ADMIN_ROLE_NAME } from '../constants';
import { DEFAULT_LANGUAGE } from 'src/common/constants';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>
  ) {}

  async filter(
    filter: BaseFilter
  ): Promise<PaginatedResult<Role & { usersCount: number }>> {
    const [data, totalCount] = await this.roleRepository.findAndCount({
      relations: {
        users: true,
        permissions: true,
        translations: true,
      },
      select: {
        ...applyGlobalSelect(),
        name: true,
        permissions: true,
        users: {
          id: true,
        },
      },
      where: {
        ...applyGlobalWhereFilter(filter),
        name: Not(SUPER_ADMIN_ROLE_NAME),
      },
      order: applyOrderBy(filter.orderBy, filter.isDesc),
      ...applyPagination(filter.page, filter.pageSize, filter.ignorePagination),
    });

    const formattedData = data.map((role) => {
      const formattedRole = {
        ...role,
        displayName:
          role.translations.length > 0 ? role.translations[0]?.name : [],
        usersCount: role.users.length,
      };
      delete formattedRole.users;

      return formattedRole;
    });

    return {
      items: formattedData,
      totalCount,
    };
  }

  async search(filter: BaseFilter): Promise<PaginatedResult<SearchItem>> {
    const [data, totalCount] = await this.roleRepository.findAndCount({
      select: {
        id: true,
        name: true,
      },
      where: {
        ...applyGlobalWhereFilter(filter),
        name: Not(SUPER_ADMIN_ROLE_NAME),
      },
      order: applyOrderBy(filter.orderBy, filter.isDesc),
      ...applyPagination(filter.page, filter.pageSize, filter.ignorePagination),
    });

    return {
      items: data,
      totalCount,
    };
  }

  async findById(id: number) {
    const role = await this.roleRepository.findOneBy({
      id,
    });
    if (role === null) {
      throw new NotFoundException();
    }
    return role;
  }

  async create(createRoleDto: CreateRoleDto, userId: number) {
    const permissions = await this.permissionRepository.find({
      where: {
        id: In(createRoleDto.grantedPermissions),
      },
    });
    const newRole = await this.roleRepository.save({
      name: createRoleDto.displayName,
      permissions,
      creatorId: userId,
      translations: [
        {
          isDefault: true,
          language: DEFAULT_LANGUAGE,
          name: createRoleDto.displayName,
        },
      ],
    });
    return newRole;
  }

  async update(updateRoleDto: UpdateRoleDto, userId: number) {
    // Get granted permissions from IDs
    const permissions = await this.permissionRepository.find({
      where: {
        id: In(updateRoleDto.grantedPermissions),
      },
    });
    // Get original translations
    const roleTranslations = await this.roleRepository.find({
      relations: { translations: true },
      where: {
        id: updateRoleDto.id,
      },
    });
    // Update
    const updatedRole = await this.roleRepository.save({
      id: updateRoleDto.id,
      name: updateRoleDto.displayName,
      permissions,
      translations: [
        {
          ...roleTranslations[0].translations[0],
          name: updateRoleDto.displayName,
        },
      ],
      lastModifiedById: userId,
    });
    return updatedRole;
  }

  async activate(id: number, userId: number) {
    return await this.roleRepository.save({
      id,
      isActive: true,
      lastModifiedById: userId,
    });
  }

  async deActivate(id: number, userId: number) {
    return await this.roleRepository.save({
      id,
      isActive: false,
      lastModifiedById: userId,
    });
  }

  async remove(id: number, userId: number) {
    const deletedRole = await this.roleRepository.save({
      id,
      isDeleted: true,
      deletedById: userId,
    });
    return deletedRole;
  }
}
