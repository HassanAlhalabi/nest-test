import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './admin/auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { SeederModule } from './admin/seeder/seeder.module';
import { PermissionModule } from './admin/permissions/permission.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {   
        return ({
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          synchronize: false, // Disable in production!,
          autoLoadEntities: true,
      })}
    }),
    ConfigModule.forRoot({ isGlobal: true,  envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: 6379,
      },  
    }),
    AuthModule,
    AdminModule,
    CustomerModule,
    PermissionModule,
    SeederModule
  ],
})
export class AppModule {}
