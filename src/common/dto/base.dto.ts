import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseDto {
  @ApiPropertyOptional({description: 'Item id'})
  id: string;

  @ApiPropertyOptional({description: 'Item status: active or not'})
  isActive: boolean;

  @ApiPropertyOptional({description: 'Item creation time'})
  creationTime: Date;
}
