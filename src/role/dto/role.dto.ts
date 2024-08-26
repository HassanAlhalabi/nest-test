import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../types';

export class RoleDto extends BaseDto {
  @ApiProperty({ description: 'The permissions associated with the role.' })
  permissions: string[];
}
