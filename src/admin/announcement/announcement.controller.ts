import { Controller, Post } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Announcements')
@Controller('Admin/Announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send emails to all users' })
  create() {
    return this.announcementService.create();
  }
}
