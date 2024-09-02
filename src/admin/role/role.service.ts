import { applyGlobalWhereFilter, applyOrderBy } from './../../common/helpers/index';
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

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository:  Repository<Role>,
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>
  ) {}

  
  async findAll(filter: BaseFilter): Promise<PaginatedResult<Role & { usersCount: number }>> {    
    const [data, totalCount] = await this.roleRepository.findAndCount({
      relations: {
        users: true,
        permissions: true
      },
      select: {
        id: true, 
        creationTime: true,
        creatorId: true,
        isActive: true,
        name: true,
        permissions: true,
        users: {
          id: true
        }
      },
      where: {
        ...applyGlobalWhereFilter(filter),
        name: Not(SUPER_ADMIN_ROLE_NAME)
      },
      order: applyOrderBy(filter.orderBy, filter.isDesc),
      ...applyPagination(filter.page, filter.pageSize, filter.ignorePagination),
    })
    
    const formattedData = data.map(role => {
      const formattedRole = {
        ...role,
        displayName: role.name,
        usersCount: role.users.length
      }
      delete formattedRole.users
      return formattedRole
    })

    return {
      items: formattedData,
      totalCount
    }
  }

  async search(filter:BaseFilter): Promise<PaginatedResult<SearchItem>> {
      const [data, totalCount] = await this.roleRepository.findAndCount({
      select: {
        id: true, 
        name: true,
      },
      where: {
        ...applyGlobalWhereFilter(filter),
        name: Not(SUPER_ADMIN_ROLE_NAME)
      },
      order: applyOrderBy(filter.orderBy, filter.isDesc),
      ...applyPagination(filter.page, filter.pageSize, filter.ignorePagination),
    })   

    return {
      items: data,
      totalCount
    }
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
        id: In(createRoleDto.grantedPermissions)
      }
    })
    const newRole = await this.roleRepository.save(
     { 
      name: createRoleDto.displayName,
      permissions,
      creatorId: userId
     },
    );
    return newRole; 
  }
  
  async update(updateRoleDto: UpdateRoleDto, userId: number) {
    const permissions = await this.permissionRepository.find({
      where: {
        id: In(updateRoleDto.grantedPermissions)
      }
    })
    const updatedRole = await this.roleRepository.save({
      id: updateRoleDto.id,
      name: updateRoleDto.displayName,
      permissions,
      lastModifiedById: userId
    });
    return updatedRole;
  }

  async activate(id: number, userId: number) {
    return await this.roleRepository.save({
      id,
      isActive: true,
      lastModifiedById: userId
    });
  }

  async deActivate(id: number, userId: number) {
    return await this.roleRepository.save({
      id,
      isActive: false,
      lastModifiedById: userId
    });
  }
  
  async remove(id: number, userId: number) {
    const deletedRole = await this.roleRepository.save({
      id,
      isDeleted: true,
      deletedById: userId
    });
    return deletedRole;
  }
}
