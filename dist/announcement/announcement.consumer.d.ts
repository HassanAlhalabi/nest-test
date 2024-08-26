import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
export declare class AudioConsumer extends WorkerHost {
    process(job: Job<{
        email: string;
    }>): Promise<any>;
    sendEmail(message: string): Promise<boolean>;
}
