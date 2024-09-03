import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class  CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  emailAddress: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({type: [Number]})
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({each: true})
  @Type(() => Number)
  rolesIds: number[];
}
