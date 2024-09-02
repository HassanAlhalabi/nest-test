import { Module } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";
import { AnnouncementModule } from "./announcement/announcement.module";

    
@ApiBearerAuth()
@Module({imports: [UserModule, RoleModule, AnnouncementModule]})
export class AdminModule {}