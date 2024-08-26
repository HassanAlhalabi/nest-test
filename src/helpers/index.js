"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyOrderBy = exports.applyPagination = exports.applyGlobalWhereFilter = void 0;
var applyGlobalWhereFilter = function (filter) {
    var whereFilter = __assign({ id: filter.id ? Number(filter.id) : undefined, isActive: filter.isActive, isDeleted: filter.isDeleted, createdAt: filter.minDate || filter.maxDate
            ? __assign(__assign({}, (filter.minDate ? { gte: filter.minDate } : {})), (filter.maxDate ? { lte: filter.maxDate } : {})) : undefined }, (filter.search && {
        name: {
            contains: filter.search,
            mode: 'insensitive', // Case-insensitive search
        },
    }));
    return whereFilter;
};
exports.applyGlobalWhereFilter = applyGlobalWhereFilter;
var applyPagination = function (page, pageSize, ignorePagination) {
    if (page === void 0) { page = 1; }
    if (pageSize === void 0) { pageSize = 10; }
    if (ignorePagination === void 0) { ignorePagination = false; }
    return ignorePagination ? {} : {
        skip: (page - 1) * pageSize,
        take: pageSize,
    };
};
exports.applyPagination = applyPagination;
var applyOrderBy = function (orderBy, isDesc) {
    var _a;
    return orderBy ? (_a = {},
        _a[orderBy] = isDesc ? 'desc' : 'asc',
        _a) : {
        id: isDesc ? 'desc' : 'asc'
    };
};
exports.applyOrderBy = applyOrderBy;
