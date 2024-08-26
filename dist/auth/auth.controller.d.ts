import { AuthService } from './auth.service';
import { AuthDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: AuthDto): Promise<{
        token: string;
    }>;
    signUp(dto: AuthDto): Promise<{
        email: string;
        hash: string;
        roleId: number;
    } & import("../user/entities/user.entity").User>;
}
