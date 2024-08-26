import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private configService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, configService: ConfigService);
    signIn(userDto: AuthDto): Promise<{
        token: string;
    }>;
    signUp(user: AuthDto): Promise<{
        email: string;
        hash: string;
        roleId: number;
    } & User>;
    signToken(userId: number, email: string): Promise<string>;
}
