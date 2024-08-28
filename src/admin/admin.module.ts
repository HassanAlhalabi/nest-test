import { Module } from "@nestjs/common";

import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";
import { AnnouncementModule } from "./announcement/announcement.module";
import { FaqModule } from "./faq/faq.module";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Module({imports: [UserModule, RoleModule, AnnouncementModule, FaqModule]})
export class AdminModule {}