import { Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FaqService } from './faq.service';
import { CustomerController } from 'src/customer/decorators';

@CustomerController('Faq')
@ApiTags('Faq')
export class FaqController {
  constructor(private faqService: FaqService) {}

  @Get()
  getAllFaqs() {
    return this.faqService.filter();
  }
}
