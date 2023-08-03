import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthDTO,
  CheckUsernameDTO,
  RegisterDTO,
  ResendConfirmEmailDTO,
} from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() body: RegisterDTO) {
    return this.authService.signup(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signin(@Body() body: AuthDTO) {
    return this.authService.signin(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/resend-confirmation-email')
  async resendConfirmationEmail(@Body() body: ResendConfirmEmailDTO) {
    return this.authService.resendConfirmationEmail(body);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/check-username')
  async checkUsername(@Body() body: CheckUsernameDTO) {
    return this.authService.checkUsername(body);
  }
}
