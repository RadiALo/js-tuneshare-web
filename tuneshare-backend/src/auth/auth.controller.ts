import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/request/user.login.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signIn')
  @HttpCode(200)
  async signIn(@Body() { email, password }: UserLoginDto) {
    return this.authService.signIn(email, password);
  }
}
