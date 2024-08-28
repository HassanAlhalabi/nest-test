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

export class BaseFilter {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  id?: number

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page?: number
  
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  pageSize?: number
  
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  ignorePagination?: boolean
  
  @IsString()
  @IsOptional()
  search?: string
  
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean
  
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isDeleted?: boolean

  @IsString()
  @IsOptional()
  minDate?: Date
  
  @IsString()
  @IsOptional()
  maxDate?: Date
  
  @IsString()
  @IsOptional()
  orderBy?: string
  
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isDesc?: boolean
}