import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AnnouncementService {
  constructor(@InjectQueue('email') private audioQueue: Queue) {}
  create() {
    return this.audioQueue.add('sendEmail', {
      email: 'This is email for user',
    });
  }
}
