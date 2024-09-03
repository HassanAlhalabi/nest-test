import { Controller } from '@nestjs/common';
import { MAIN_MODULES } from 'src/common/constants';

// Create a decorator for Admin routes
export const CustomerController = (path?: string): ClassDecorator => {
  return Controller(`api/${MAIN_MODULES.customer}/${path}`);
};
