import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: 'The name of the role' })
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @ApiProperty({
    description: 'The permissions associated with the role',
    type: [Number], // Define the type explicitly if it's an array
  })
  @IsArray()
  @IsNotEmpty()
  grantedPermissions: number[];
}
