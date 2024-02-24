import { Body, Controller, Post, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto): Promise<any> {
    try {
      const result = await this.authService.signIn(signInDto.email, signInDto.password);
      return result;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
    }
  }
}