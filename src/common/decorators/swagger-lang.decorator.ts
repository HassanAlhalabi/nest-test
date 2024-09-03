import { ApiHeader } from '@nestjs/swagger';

export const SwaggerLang = () =>
  ApiHeader({
    name: 'Accept-Language',
    description: 'Return list items by specific language',
    required: false,
    schema: {
      type: 'string',
      default: 'en-US',
    },
  });
