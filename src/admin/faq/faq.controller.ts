import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { FaqService } from "./faq.service";
import { MAIN_MODULES } from "src/common/contants";


@Controller(`${MAIN_MODULES.admin}/FAQ`)
@ApiTags('Faq')
export class FaqController {
    constructor(private faqService: FaqService){}

    @Get()
    getAllFaqs() {
        return this.faqService.filter()
    }
}