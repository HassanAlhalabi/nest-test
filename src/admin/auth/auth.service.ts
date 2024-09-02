import {
  HttpCode,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthDto } from './dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private expiresIn = Number(this.configService.get('ACCESS_TOKEN_EXPIRATION'))

  @HttpCode(HttpStatus.OK)
  async signIn(userDto: AuthDto) {
    // Get user

    try {
      const user = await this.userRepository.findOne({
          relations:{
            role: {
              permissions: true,
            }
          },
          where:{
            email: userDto.userNameOrEmailAddress.toLocaleLowerCase(),
          }
      });

      // Check if exists
      if (!user) {
        throw new InternalServerErrorException('Invalid email address or password');
      }

      // Check password
      const isValidPassword = await verify(user.hash, userDto.password);

      if (!isValidPassword) {
        throw new  InternalServerErrorException('Invalid email address or password');
      }

      const token = await this.signToken(user.id, user.email);

      return {
              accessToken: token,
              refreshToken: "string",
              discriminator: 1,
              encryptedAccessToken: "string",
              expireInSeconds: this.expiresIn,
              image: "string",
              name: `${user.firstName} ${user.lastName}`,
              roles: [
                user.role
              ],
              userId: user.id,
              // tenantId: 0,
              siteSettings: {
                websiteUrl: "string",
                // templateColors: {
                //   "primaryColor": "#9BbfD2",
                //   "primaryDarkColor": "#10E8a5",
                //   "primaryLightColor": "#0f7460",
                //   "successColor": "#5825FD",
                //   "successDarkColor": "#EFb",
                //   "successLightColor": "#90c",
                //   "warningColor": "#AA6",
                //   "warningDarkColor": "#075",
                //   "warningLightColor": "#45609F"
                // },
                // tenantName: "string",
                logoUrl: "string",
                logoWithNameUrl: "string",
                displayLanguages: [
                  "en-US"
                ],
                dataLanguages: [
                  "en-US"
                ],
                defaultLanguage: "en-US",
                // firebaseFrontendConfigs: {
                //   "additionalProp1": "string",
                //   "additionalProp2": "string",
                //   "additionalProp3": "string"
                // }
              },
              // "plugins": {
              //   "additionalProp1": true,
              //   "additionalProp2": true,
              //   "additionalProp3": true
              // }
            };
    } catch (error) {
      throw error;
    }

    // Return user data
  }

  signToken(userId: number, email: string) {
    const secret = this.configService.get('JWT_SECRET');
    return this.jwtService.signAsync(
      {
        userId,
        email,
      },
      {
        secret,
        expiresIn: this.expiresIn,
      }
    );
  }
}
