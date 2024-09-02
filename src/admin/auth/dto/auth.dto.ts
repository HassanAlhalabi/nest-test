import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userNameOrEmailAddress: string;

  @ApiPropertyOptional()
  @IsBoolean()
  rememberClient: boolean

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
