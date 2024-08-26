import { Queue } from 'bullmq';
export declare class AnnouncementService {
    private audioQueue;
    constructor(audioQueue: Queue);
    create(): Promise<import("bullmq").Job<any, any, string>>;
}
