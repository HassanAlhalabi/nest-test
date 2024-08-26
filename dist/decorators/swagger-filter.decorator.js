"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerFilter = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const SwaggerFilter = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        description: 'The page number to retrieve',
        schema: {
            type: 'integer',
            default: 1,
        }
    }), (0, swagger_1.ApiQuery)({
        name: 'pageSize',
        required: false,
        description: 'The number of items per page',
        schema: {
            type: 'integer',
            default: 10,
        }
    }), (0, swagger_1.ApiQuery)({
        name: 'ignorePagination',
        description: 'Ignore pagination and get all items',
        required: false,
        schema: {
            type: 'boolean',
        }
    }), (0, swagger_1.ApiQuery)({
        name: 'isActive',
        description: 'active items',
        required: false,
        schema: {
            type: 'boolean',
        },
    }), (0, swagger_1.ApiQuery)({
        name: 'id',
        description: 'Get item by id',
        required: false,
        schema: {
            type: 'int',
        }
    }), (0, swagger_1.ApiQuery)({
        name: 'isDeleted',
        description: 'Return deleted items',
        required: false,
        schema: {
            type: 'boolean',
        }
    }), (0, swagger_1.ApiQuery)({
        name: 'minDate',
        description: 'Return from min date creation',
        required: false,
        schema: {
            type: 'date',
            format: 'date-time'
        }
    }), (0, swagger_1.ApiQuery)({
        name: 'maxDate',
        description: 'Return to max date creation',
        required: false,
        schema: {
            type: 'date',
            format: 'date-time'
        }
    }), (0, swagger_1.ApiQuery)({
        name: 'orderBy',
        description: 'Order items by property',
        required: false,
        schema: {
            type: 'string',
        }
    }), (0, swagger_1.ApiQuery)({
        name: 'isDesc',
        description: 'Order items in descendant order or not',
        required: false,
        schema: {
            type: 'boolean',
        }
    }), (0, swagger_1.ApiQuery)({
        name: 'search',
        description: 'Search items by key',
        required: false,
        schema: {
            type: 'string',
        }
    }), (0, swagger_1.ApiHeader)({
        name: 'Accept-Language',
        description: 'Return list items by specific language',
        required: false,
        schema: {
            type: 'string',
            default: 'en-US'
        }
    }));
};
exports.SwaggerFilter = SwaggerFilter;
//# sourceMappingURL=swagger-filter.decorator.js.map