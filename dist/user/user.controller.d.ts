import { UserDto } from './dto';
import { UserService } from './user.service';
import { BaseFilter } from '../types';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMyData(user: UserDto): UserDto;
    findAll(filter: BaseFilter, language: any): Promise<[import("./entities/user.entity").User[], number]>;
    createNewUser(user: UserDto): Promise<{
        email: string;
        hash: string;
        firstName: string;
        lastName: string;
        roleId: number;
    } & import("./entities/user.entity").User>;
}
