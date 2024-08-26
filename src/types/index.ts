import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsInt, IsOptional, IsString, Min } from "class-validator";

export interface PaginatedResult<T> {
  result: T[];
  totalCount: number
}

export interface CustomResult<T = any> {
  error: string
  result: T
  success: boolean
  targetUrl: string
}

export class BaseDto {
  @ApiProperty({ description: 'Item id' })
  id: number

  @ApiProperty({ description: 'Item name' })
  name: string

  @ApiProperty({ description: 'The date the role was created.' })
  createdAt: Date;

  @ApiProperty({ description: 'The date the role was last updated.' })
  updatedAt: Date;

  @ApiProperty({ description: 'Item status active/notActive' })
  isActive: boolean

  @ApiProperty({description: 'Is item deleted'})
  isDeleted: boolean
}

export class BaseFilter {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  id: number

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page: number
  
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  pageSize: number
  
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  ignorePagination: boolean
  
  @IsString()
  @IsOptional()
  search: string
  
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive: boolean
  
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isDeleted: boolean

  @IsString()
  @IsOptional()
  minDate: Date
  
  @IsString()
  @IsOptional()
  maxDate: Date
  
  @IsString()
  @IsOptional()
  orderBy: string
  
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isDesc: boolean
  
  // @IsString()
  // @IsOptional()
  // acceptLanguage: string
}