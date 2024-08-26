import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { BaseFilter } from '../types';



export const ListFilter = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const query = request.query; // Get query parameters
    const acceptLanguage = request.headers['accept-language']; // Get the 'accept-language' header

    const filter: BaseFilter = {
      ...query,
      acceptLanguage,
    }

    // Transform the filter object to the BaseFilter class
    const filterObject = plainToClass(BaseFilter, filter);

    try {
      // Validate the transformed object
      await validateOrReject(filterObject);
    } catch (errors) {
      // Handle validation errors (optional)
      console.error('Validation failed:', errors);
      throw new Error('Validation failed');
    }

    return filter
  },
);