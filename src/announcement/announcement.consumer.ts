import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('email')
export class AudioConsumer extends WorkerHost {
  async process(job: Job<{ email: string }>): Promise<any> {
    let progress = 0;
    for (let i = 0; i < 100; i++) {
      console.log(progress);
      await this.sendEmail(job.data.email);
      progress += 1;
      await job.updateProgress(progress);
    }
    return {};
  }

  async sendEmail(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Email sent:', message);
        resolve(true);
      }, 3000);
    });
  }
}
