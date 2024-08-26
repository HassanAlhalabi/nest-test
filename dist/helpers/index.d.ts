import { BaseFilter } from "../types";
export declare const applyGlobalWhereFilter: (filter: BaseFilter) => {
    name: {
        contains: string;
        mode: string;
    };
    id: number;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: {
        lte?: Date;
        gte?: Date;
    };
};
export declare const applyPagination: (page?: number, pageSize?: number, ignorePagination?: boolean) => {
    skip?: undefined;
    take?: undefined;
} | {
    skip: number;
    take: number;
};
export declare const applyOrderBy: (orderBy: string, isDesc: boolean) => {
    [x: string]: string;
    id?: undefined;
} | {
    id: string;
};
