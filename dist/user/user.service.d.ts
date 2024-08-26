import { Repository } from 'typeorm';
import { UserDto } from './dto';
import { User } from './entities/user.entity';
import { BaseFilter } from '../types';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    getAllUsers(filter: BaseFilter): Promise<[User[], number]>;
    createNewUser(user: UserDto): Promise<{
        email: string;
        hash: string;
        firstName: string;
        lastName: string;
        roleId: number;
    } & User>;
}
