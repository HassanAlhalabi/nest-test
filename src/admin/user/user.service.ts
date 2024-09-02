import {  ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { FindOptionsOrder, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { SimpleUserDto, UserDto } from './dto';
import { User } from './entities/user.entity';
import { BaseFilter, PaginatedResult } from '../../common/types';
import {  applyGlobalWhereFilter, applyOrderBy, applyPagination } from '../../common/helpers';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>,) {}

  async filter(filter: BaseFilter): Promise<PaginatedResult<SimpleUserDto>> {

    const [data, totalCount] = await this.userRepository.findAndCount({
      relations: {
       role: true
      },
      where: {
        ...applyGlobalWhereFilter(filter)
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        creationTime: true,
        email: true,
        isActive: true,
      },
      order: this.applyUserOrder(filter.orderBy, filter.isDesc),
      ...applyPagination(filter.page, filter.pageSize, filter.ignorePagination),
    })

    return {
      items: data,
      totalCount
    }
  }

  async getById(id: number) {
    const user = await this.userRepository.findOneBy({id})
    delete user.hash
    return user;
  }

  async createNewUser(user: UserDto) {
    const hashedPassword = await hash(user.password);
    try {
      const createdUser = await this.userRepository.save({
          email: user.email,
          hash: hashedPassword,
          firstName: user.firstName,
          lastName: user.lastName,
          roleId: user.roleId ?? 2, // Default value if not provided
      });
      return createdUser;
    } catch(error) {
      if (error.code === '23505') { // Unique violation
        throw new ConflictException('Email already exists');
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  applyUserOrder(orderBy: string, isDesc: boolean): FindOptionsOrder<User> {
    switch (orderBy) {
        case 'firstName':
            return {
                firstName: isDesc ? 'DESC' : 'ASC' 
            }
        case 'lastName':
            return {
                lastName: isDesc ? 'DESC' : 'ASC' 
            }
        case 'email':
            return {
                email: isDesc ? 'DESC' : 'ASC' 
            }
        default:
            return applyOrderBy(orderBy, isDesc)
    }
  }

}
