import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';

import { ForgotPwdDTO, ResetPwdDTO } from './dto';
import { AuthConfirmationsService } from './auth-confirmations.service';

@Controller('auth')
export class AuthConfirmationsController {
  constructor(private authConfirmationsService: AuthConfirmationsService) {}

  // Confirm email
  @HttpCode(HttpStatus.OK)
  @Post('confirm-email')
  confirmEmail(@Query('token') token: string) {
    return this.authConfirmationsService.confirmEmail(token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPwdDTO) {
    return this.authConfirmationsService.forgotPassword(body);
  }

  // reset password
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  resetPassword(@Query('token') token: string, @Body() body: ResetPwdDTO) {
    return this.authConfirmationsService.resetPassword(token, body);
  }
}
