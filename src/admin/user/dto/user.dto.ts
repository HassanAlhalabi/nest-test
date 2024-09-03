import { ApiPropertyOptional } from '@nestjs/swagger';

import { BaseAdminDto } from 'src/admin/dto/base.dto';
import { SearchItem } from 'src/common/types';
export class UserDto extends BaseAdminDto {
  @ApiPropertyOptional()
  emailAddress: string;

  @ApiPropertyOptional()
  password: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  surname?: string;

  @ApiPropertyOptional()
  roleId: number;

  @ApiPropertyOptional()
  textCreationTime: string;

  @ApiPropertyOptional()
  fullName: string;

  @ApiPropertyOptional()
  phoneNumber: string;

  @ApiPropertyOptional()
  roleNames: SearchItem[];

  @ApiPropertyOptional()
  userName: string;
}
