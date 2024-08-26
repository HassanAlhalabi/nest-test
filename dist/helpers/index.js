"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyOrderBy = exports.applyPagination = exports.applyGlobalWhereFilter = void 0;
const applyGlobalWhereFilter = (filter) => {
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
        ...(filter.search && {
            name: {
                contains: filter.search,
                mode: 'insensitive',
            },
        }),
    };
    return whereFilter;
};
exports.applyGlobalWhereFilter = applyGlobalWhereFilter;
const applyPagination = (page = 1, pageSize = 10, ignorePagination = false) => {
    return ignorePagination ? {} : {
        skip: (page - 1) * pageSize,
        take: pageSize,
    };
};
exports.applyPagination = applyPagination;
const applyOrderBy = (orderBy, isDesc) => {
    return orderBy ? {
        [orderBy]: isDesc ? 'desc' : 'asc'
    } : {
        id: isDesc ? 'desc' : 'asc'
    };
};
exports.applyOrderBy = applyOrderBy;
//# sourceMappingURL=index.js.map