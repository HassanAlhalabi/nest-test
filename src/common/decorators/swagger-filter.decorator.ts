import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiQuery } from '@nestjs/swagger';

export const SwaggerFilter = () => {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      required: false,
      description: 'The page number to retrieve',
      schema: {
        type: 'integer',
        default: 1, // Default value for Swagger
      }
    }),
    ApiQuery({
      name: 'pageSize',
      required: false,
      description: 'The number of items per page',
      schema: {
        type: 'integer',
        default: 10, // Default value for Swagger
      }
    }),
    ApiQuery({
      name: 'ignorePagination',
      description: 'Ignore pagination and get all items',
      required: false,
      schema: {
        type: 'boolean',
      }
    }),
    ApiQuery({
      name: 'isActive',
      description: 'active items',
      required: false,
      schema: {
        type: 'boolean',
      },
    }),
    ApiQuery({
      name: 'id',
      description: 'Get item by id',
      required: false,
      schema: {
        type: 'int',
      }
    }),
    ApiQuery({
      name: 'isDeleted',
      description: 'Return deleted items',
      required: false,
      schema: {
        type: 'boolean',
      }
    }),
    ApiQuery({
      name: 'minDate',
      description: 'Return from min date creation',
      required: false,
      schema: {
        type: 'date',
        format: 'date-time'
      }
    }),
    ApiQuery({
      name: 'maxDate',
      description: 'Return to max date creation',
      required: false,
      schema: {
        type: 'date',
        format: 'date-time'
      }
    }),
    ApiQuery({
      name: 'orderBy',
      description: 'Order items by property',
      required: false,
      schema: {
        type: 'string',
      }
    }),
    ApiQuery({
      name: 'isDesc',
      description: 'Order items in descendant order or not',
      required: false,
      schema: {
        type: 'boolean',
      }
    }),
    ApiQuery({
      name: 'search',
      description: 'Search items by key',
      required: false,
      schema: {
        type: 'string',
      }
    }),
    ApiHeader({
      name: 'Accept-Language',
      description: 'Return list items by specific language',
      required: false,
      schema: {
        type: 'string',
        default: 'en-US'
      }
    })
)}
