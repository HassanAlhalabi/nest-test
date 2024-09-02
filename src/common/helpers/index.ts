import { And, FindOptionsOrder, FindOptionsWhere, ILike, LessThanOrEqual, MoreThanOrEqual } from "typeorm"

import { BaseFilter } from "../types"
import { BaseEntity } from "../entities"


export const applyGlobalWhereFilter = (filter: BaseFilter) => {
    const whereFilter = {
        id: filter.id ? Number(filter.id) : undefined,
        isActive: filter.isActive,
        isDeleted: filter.isDeleted,
        createdAt: handleMinMax(filter.minDate, filter.maxDate),
        ...(Boolean(filter.search) && {name: ILike(`%${filter.search}%`)}),
    } as FindOptionsWhere<BaseEntity>
       
    return whereFilter
}

export const applyPagination = (page: number = 0,pageSize: number = 10, ignorePagination: boolean = false) => {
    return ignorePagination ? {} : {
        skip: page * pageSize,
        take: pageSize,
    }
}

export const applyOrderBy = (orderBy: string, isDesc: boolean): FindOptionsOrder<BaseEntity> => {
    switch (orderBy) {
        case 'id':
            return {
                id: isDesc ? 'DESC' : 'ASC' 
            }
        case 'createdAt':
            return {
                creationTime: isDesc ? 'DESC' : 'ASC' 
            }
        case 'status':
            return {
                isActive: isDesc ? 'DESC' : 'ASC' 
            }
        default:
            return { creationTime: isDesc ? 'DESC' : 'ASC' }
    }
}

const handleMinMax = (minDate: Date, maxDate: Date) => {
    if(!minDate && !maxDate) return undefined
    if(minDate && !maxDate) return MoreThanOrEqual(new Date(minDate))
    if(maxDate && !minDate) return LessThanOrEqual(new Date(maxDate))
    return And(MoreThanOrEqual(new Date(minDate)), LessThanOrEqual(new Date(maxDate)))
}