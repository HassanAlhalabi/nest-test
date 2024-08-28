import { ApiProperty } from "@nestjs/swagger";

import { BaseDto } from "src/common/dto/base.dto";

export class BaseAdminDto extends BaseDto {
  @ApiProperty({description: 'Is item deleted'})
  isDeleted: boolean
}