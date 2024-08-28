import { Role } from './admin/role/entities/role.entity';
import { User } from './admin/user/entities/user.entity';

import { DataSource } from 'typeorm'; // Adjust the import path as needed

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'hassan',
  password: '12345',
  database: 'starter',
  entities: [User, Role],
  migrations: ['./src/migrations/*.ts'],
  logging: true,
});
