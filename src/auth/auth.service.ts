import {
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthDto } from './dto';
import { Repository } from 'typeorm';
import { User } from '../admin/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  @HttpCode(HttpStatus.OK)
  async signIn(userDto: AuthDto) {
    // Get user

    try {
      const user = await this.userRepository.findOneBy({
          email: userDto.email,
      });

      // check if exists
      if (!user) {
        throw new NotFoundException('User Not Found');
      }

      // Check password
      const isValidPassword = await verify(user.hash, userDto.password);

      if (!isValidPassword) {
        throw new ForbiddenException('Invalid Password');
      }

      const token = await this.signToken(user.id, user.email);

      return { token };
    } catch (error) {
      throw error;
    }

    // Return user data
  }

  async signUp(user: AuthDto) {
    const hashedPassword = await hash(user.password);
      const newUser = await this.userRepository.save({
          email: user.email,
          hash: hashedPassword,
          roleId: 2,
      });
      delete newUser.hash;
      return newUser;
  }

  signToken(userId: number, email: string) {
    const secret = this.configService.get('JWT_SECRET');
    return this.jwtService.signAsync(
      {
        userId,
        email,
      },
      {
        secret,
        expiresIn: '15m',
      }
    );
  }
}
