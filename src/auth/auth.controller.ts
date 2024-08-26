import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@ApiTags('Auth')
@Controller('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('SignIn')
  login(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @Post('SignUp')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }
}
