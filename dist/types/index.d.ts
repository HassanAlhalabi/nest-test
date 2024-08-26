export interface PaginatedResult<T> {
    result: T[];
    totalCount: number;
}
export interface CustomResult<T = any> {
    error: string;
    result: T;
    success: boolean;
    targetUrl: string;
}
export declare class BaseDto {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isDeleted: boolean;
}
export declare class BaseFilter {
    id: number;
    page: number;
    pageSize: number;
    ignorePagination: boolean;
    search: string;
    isActive: boolean;
    isDeleted: boolean;
    minDate: Date;
    maxDate: Date;
    orderBy: string;
    isDesc: boolean;
}
