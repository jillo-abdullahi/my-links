import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthDTO,
  CheckUsernameDTO,
  RegisterDTO,
  ResendConfirmEmailDTO,
  ForgotPwdDTO,
  ResetPwdDTO,
} from './dto';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthConfirmationsService } from './confirmationServices';
import { JwtGuard } from '../auth/guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authConfirmationsService: AuthConfirmationsService,
  ) {}

  @Post('/signup')
  @ApiBody({
    type: RegisterDTO,
    description: 'Register a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'New user record successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Username or email already exists' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async signup(@Body() body: RegisterDTO) {
    return this.authService.signup(body);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in.',
  })
  @ApiResponse({ status: 403, description: 'Incorrect credentials' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Post('/signin')
  async signin(@Body() body: AuthDTO) {
    return this.authService.signin(body);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Confirmation email successfully sent.',
  })
  @ApiResponse({
    status: 403,
    description: 'User not found or already confirmed',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Post('/resend-confirmation-email')
  async resendConfirmationEmail(@Body() body: ResendConfirmEmailDTO) {
    return this.authService.resendConfirmationEmail(body);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Username exists or does not exist.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Post('/check-username')
  async checkUsername(@Body() body: CheckUsernameDTO) {
    return this.authService.checkUsername(body);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'User details successfully retrieved. Token is valid.',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Invalid access token' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @Get('verify-user')
  updateProfile(@Req() req: any) {
    const { user } = req;
    return this.authService.verifyUser(user.sub);
  }

  // Confirm email
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Email confirmed successfully.',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Invalid confirmation token.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Post('confirm-email')
  confirmEmail(@Query('token') token: string) {
    return this.authConfirmationsService.confirmEmail(token);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Password reset email successfully sent.',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({
    status: 403,
    description: 'Reset token already exists for the user',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPwdDTO) {
    return this.authConfirmationsService.forgotPassword(body);
  }

  // reset password
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Password reset successfully.',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Invalid reset token.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Post('reset-password')
  resetPassword(@Query('token') token: string, @Body() body: ResetPwdDTO) {
    return this.authConfirmationsService.resetPassword(token, body);
  }
}
