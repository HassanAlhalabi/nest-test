import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FaqService } from './faq.service';

@Controller('Customer/FAQ')
@ApiTags('Faq')
export class FaqController {
  constructor(private faqService: FaqService) {}

  @Get()
  getAllFaqs() {
    return this.faqService.filter();
  }
}
