import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SeederService } from "./seeder.service";
import { Role } from "../role/entities/role.entity";
import { User } from "../user/entities/user.entity";
import { Permission } from "../permissions/entities";

@Module({
    imports: [TypeOrmModule.forFeature([Role, User, Permission])],
    exports: [SeederService],
    providers: [SeederService]
})
export class SeederModule {}