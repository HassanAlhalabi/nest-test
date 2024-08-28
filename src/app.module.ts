import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { User } from './admin/user/entities/user.entity';
import { Role } from './admin/role/entities/role.entity';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {   
        console.log({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Role], // Adjust the path to your entities
        synchronize: false, // Disable in production!
      })           
      
        return ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Role], // Adjust the path to your entities
        synchronize: false, // Disable in production!
      })}
    }),
    ConfigModule.forRoot({ isGlobal: true,  envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: 6379,
      },  
    }),
    AdminModule,
    CustomerModule,
    AuthModule,
  ],
})
export class AppModule {}
