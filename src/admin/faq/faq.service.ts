import { Injectable } from "@nestjs/common";
import { PaginatedResult } from "src/common/types";
import { FaqDto } from "./dto/faq.dto";

@Injectable()
export class FaqService {
    filter(): PaginatedResult<FaqDto> {
        return {
            items: [],
            totalCount: 0
        }
    }
}