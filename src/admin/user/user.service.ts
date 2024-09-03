import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { hash } from 'argon2';
import { FindOptionsOrder, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserDto } from './dto';
import { User } from './entities/user.entity';
import { BaseFilter, PaginatedResult } from '../../common/types';
import {
  applyGlobalSelect,
  applyGlobalWhereFilter,
  applyOrderBy,
  applyPagination,
} from '../../common/helpers';
import { plainToInstance } from 'class-transformer';
import { SUPER_ADMIN_EMAIL } from '../constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async filter(filter: BaseFilter): Promise<PaginatedResult<UserDto>> {
    const [data, totalCount] = await this.userRepository.findAndCount({
      where: {
        ...applyGlobalWhereFilter(filter),
        emailAddress: Not(SUPER_ADMIN_EMAIL),
      },
      select: {
        ...applyGlobalSelect(),
        name: true,
        surname: true,
        emailAddress: true,
        phoneNumber: true,
      },
      order: this.applyUserOrder(filter.orderBy, filter.isDesc),
      ...applyPagination(filter.page, filter.pageSize, filter.ignorePagination),
    });

    return {
      items: data.map((item) => ({
        ...plainToInstance(UserDto, item),
        fullName: `${item.name} ${item.surname}`,
      })),
      totalCount,
    };
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({ 
      relations: {
        role: true,
      },
      where: {
        id,
      },
      select: {
        ...applyGlobalSelect(),
        name: true,
        surname: true,
        emailAddress: true,
        phoneNumber: true,
        role: {
          id: true,
          name: true
        }
      }
    });
    return {...user, roleNames: [user.role]};
  }

  async create(user: CreateUserDto) {
    const hashedPassword = await hash(user.password);
    try {
      const newUser = this.userRepository.create({...user, hash: hashedPassword})
      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
    } catch (error) {
      if (error.code === '23505') {
        // Unique violation
        throw new ConflictException('Email or phone number already exists');
      }
      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(user: UpdateUserDto) {
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async activate(id: number, userId: number) {
    return await this.userRepository.save({
      id,
      isActive: true,
      lastModifiedById: userId,
    });
  }

  async deActivate(id: number, userId: number) {
    return await this.userRepository.save({
      id,
      isActive: false,
      lastModifiedById: userId,
    });
  }

  async remove(id: number, userId: number) {
    const deletedRole = await this.userRepository.save({
      id,
      isDeleted: true,
      deletedById: userId,
    });
    return deletedRole;
  }

  applyUserOrder(orderBy: string, isDesc: boolean): FindOptionsOrder<User> {
    switch (orderBy) {
      case 'firstName':
        return {
          name: isDesc ? 'DESC' : 'ASC',
        };
      case 'lastName':
        return {
          surname: isDesc ? 'DESC' : 'ASC',
        };
      case 'email':
        return {
          emailAddress: isDesc ? 'DESC' : 'ASC',
        };
      default:
        return applyOrderBy(orderBy, isDesc);
    }
  }
}
