import { ApiProperty } from "@nestjs/swagger";

export class BaseDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    isActive: boolean
}