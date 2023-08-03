import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, ForgotPwdDTO, ResetPwdDTO } from './dto';

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

  // Confirm email
  @HttpCode(HttpStatus.OK)
  @Post('confirm-email')
  confirmEmail(@Query('token') token: string) {
    return this.authService.confirmEmail(token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPwdDTO) {
    return this.authService.forgotPassword(body);
  }

  // reset password
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  resetPassword(@Query('token') token: string, @Body() body: ResetPwdDTO) {
    return this.authService.resetPassword(token, body);
  }
}
