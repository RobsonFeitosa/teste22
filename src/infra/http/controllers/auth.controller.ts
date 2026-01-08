import { AuthLogin } from '@app/use-cases/users/auth-login';
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authLogin: AuthLogin) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>): Promise<any> {
    return this.authLogin.signIn(signInDto.email, signInDto.password);
  }
}
