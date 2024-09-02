import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@ApiTags('Auth')
@Controller('api/TokenAuth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('Authenticate')
  login(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }
}
