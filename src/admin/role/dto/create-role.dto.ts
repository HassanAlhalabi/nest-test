import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Permission } from '../../../auth/enum';

export class CreateRoleDto {
  @ApiProperty({ description: 'The name of the role' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The permissions associated with the role',
    type: [String], // Define the type explicitly if it's an array
  })
  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  permissions: Permission[];
}
