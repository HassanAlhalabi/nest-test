import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies';
import { JWTGuard, PermissionGuard } from './guards';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JWTGuard, PermissionGuard],
  exports: [AuthService, JWTGuard, PermissionGuard],
})
export class AuthModule {}
