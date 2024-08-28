import { Injectable } from '@nestjs/common';

@Injectable()
export class FaqService {
  private faqs = []; // This will be a simple in-memory array for demonstration

  findAll() {
    return this.faqs;
  }

  create(faq) {
    this.faqs.push(faq);
    return faq;
  }

  update(id: number, faq) {
    const index = this.faqs.findIndex(item => item.id === id);
    if (index > -1) {
      this.faqs[index] = faq;
      return faq;
    }
    return null;
  }
}