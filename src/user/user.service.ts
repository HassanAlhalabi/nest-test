import {  Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { Repository } from 'typeorm';

import { UserDto } from './dto';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BaseFilter } from '../types';
import { applyPagination } from '../helpers';



@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>,) {}

  async getAllUsers(filter: BaseFilter) {
    return await this.userRepository.findAndCount({
      ...applyPagination(filter.page, filter.pageSize, filter.ignorePagination),
      // order: applyOrderBy(filter.orderBy, filter.isDesc)
    })
  }

  async createNewUser(user: UserDto) {
    const hashedPassword = await hash(user.password);
    const createdUser = await this.userRepository.save({
        email: user.email,
        hash: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
        roleId: user.roleId ?? 2, // Default value if not provided
    });
    return createdUser;
  }
}
