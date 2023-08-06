import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { JwtStrategy } from './strategy';
import { JwtAuthService } from './jwtUtils';
import { AuthConfirmationsService } from './confirmationServices';

@Module({
  imports: [JwtModule.register({}), MailModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthService,
    AuthConfirmationsService,
  ],
})
export class AuthModule {}
