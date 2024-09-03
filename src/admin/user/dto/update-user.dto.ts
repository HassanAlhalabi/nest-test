import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsInt } from "class-validator";
import { Type } from "class-transformer";

import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends OmitType(CreateUserDto,['password']) {
    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    id: number
}