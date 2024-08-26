import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { AudioConsumer } from './announcement.consumer';

@Module({
  imports: [BullModule.registerQueue({ name: 'email' })],
  controllers: [AnnouncementController],
  providers: [AnnouncementService, AudioConsumer],
})
export class AnnouncementModule {}
