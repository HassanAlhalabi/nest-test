import { BaseFilter } from "../types"

export const applyGlobalWhereFilter = (filter: BaseFilter) => {
    const whereFilter = {
        id: filter.id ? Number(filter.id) : undefined,
        isActive: filter.isActive,
        isDeleted: filter.isDeleted,
        createdAt: filter.minDate || filter.maxDate
        ? {
            ...(filter.minDate ? { gte: filter.minDate } : {}),
            ...(filter.maxDate ? { lte: filter.maxDate } : {}),
            }
        : undefined,
        // Handle search functionality
        ...(filter.search && {
            name: {
                contains: filter.search,
                mode: 'insensitive', // Case-insensitive search
            },
        }),
    }
    return whereFilter
}

export const applyPagination = (page: number = 1,pageSize: number = 10, ignorePagination: boolean = false) => {
    return ignorePagination ? {} : {
        skip: (page - 1) * pageSize,
        take: pageSize,
    }
}

export const applyOrderBy = (orderBy: string, isDesc: boolean) => {
    return orderBy ? {
        [orderBy]: isDesc ? 'desc' : 'asc' 
    } :{
        id: isDesc ? 'desc' : 'asc' 
    }
}