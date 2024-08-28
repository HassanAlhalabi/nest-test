import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

import { Role } from './entities/role.entity';
import { BaseFilter, PaginatedResult } from '../../common/types';
import { applyPagination } from '../../common/helpers';




@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository:  Repository<Role>
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const newRole = await this.roleRepository.save(
     createRoleDto,
    );
    return newRole; 
  }

  async findAll(filter: BaseFilter): Promise<PaginatedResult<Role>> {    
    const [data, totalCount] = await this.roleRepository.findAndCount({
      ...applyPagination(filter.page, filter.pageSize, filter.ignorePagination)
    })
    return {
      result: data,
      totalCount
    }
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOneBy({
        id,
    });
    if (role === null) {
      throw new NotFoundException();
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const updatedRole = await this.roleRepository.update(id, updateRoleDto);
    return updatedRole;
  }

  async remove(id: number) {
    const deletedRole = await this.roleRepository.delete(id);
    return deletedRole;
  }
}
