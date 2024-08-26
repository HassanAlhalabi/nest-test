"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon2_1 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const dto_1 = require("./dto");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signIn(userDto) {
        try {
            const user = await this.userRepository.findOneBy({
                email: userDto.email,
            });
            if (!user) {
                throw new common_1.NotFoundException('User Not Found');
            }
            const isValidPassword = await (0, argon2_1.verify)(user.hash, userDto.password);
            if (!isValidPassword) {
                throw new common_1.ForbiddenException('Invalid Password');
            }
            const token = await this.signToken(user.id, user.email);
            return { token };
        }
        catch (error) {
            throw error;
        }
    }
    async signUp(user) {
        const hashedPassword = await (0, argon2_1.hash)(user.password);
        const newUser = await this.userRepository.save({
            email: user.email,
            hash: hashedPassword,
            roleId: 2,
        });
        delete newUser.hash;
        return newUser;
    }
    signToken(userId, email) {
        const secret = this.configService.get('JWT_SECRET');
        return this.jwtService.signAsync({
            userId,
            email,
        }, {
            secret,
            expiresIn: '15m',
        });
    }
};
exports.AuthService = AuthService;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signIn", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map