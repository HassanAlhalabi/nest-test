import { PartialType } from '@nestjs/swagger';

import { CreateRoleDto } from './create-role.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
