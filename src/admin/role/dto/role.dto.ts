import { ApiProperty } from '@nestjs/swagger';
import { BaseAdminDto } from 'src/admin/dto/base.dto';

export class RoleDto extends BaseAdminDto {
  @ApiProperty({ description: 'The permissions associated with the role.' })
  permissions: string[];

  @ApiProperty({description: 'Number of users with this Role'})
  usersCount: number
}
