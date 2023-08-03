import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() body: AuthDTO) {
    return this.authService.signup(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signin(@Body() body: AuthDTO) {
    return this.authService.signin(body);
  }
}
