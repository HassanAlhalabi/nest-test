import { ApiPropertyOptional } from '@nestjs/swagger';

import { BaseDto } from 'src/common/dto/base.dto';

export class BaseAdminDto extends BaseDto {

  @ApiPropertyOptional({description: 'Creator id'})
  creatorId: number

  @ApiPropertyOptional({description: 'Last time item modified'})
  lastModifiedTime: Date;

  @ApiPropertyOptional({description: 'Modifier id'})
  lastModifiedById: number;

  @ApiPropertyOptional({description: 'Deleted by id'})
  deletedById: number;

  @ApiPropertyOptional({ description: 'Is item deleted' })
  isDeleted: boolean;
}
